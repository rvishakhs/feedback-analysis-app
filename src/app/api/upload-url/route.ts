import { error } from "console";
import { NextResponse } from "next/server";
import { db } from "~/server/db";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { env } from "~/env";

export async function POST(req: Request) {
    try {
        // Get the API key from the request headers
        const api_key = req.headers.get('Authorization')?.replace('Bearer ', '');

        if (!api_key) {
            return NextResponse.json({
                error: 'API key is required',
                status: 401
            })
        }

        // Find the user by API key
        const quota = await db.apiQuota.findUnique({
            where: {
                secretKey: api_key,
            }, select: {
                userId : true, 
            }            
        });

        if (!quota) {
            return NextResponse.json({
                error: 'Invalid API key',
                status: 401
            })
        }

        // Parse the request body
        const {fileType} = await req.json();

        if(!fileType || !fileType.match(/\.(mp4|mov|avi|mkv|webm)$/i)) {
            return NextResponse.json({
                error: 'Invalid file type. Supported types are: mp4, mov, avi, mkv, webm',
                status: 400
            });
        }

        // Generate a unique upload URL
        const s3Client = new S3Client({
            region: env.AWS_REGION,
            credentials: {
                accessKeyId: env.AWS_ACCESS_KEY_ID,
                secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
            },


        })

        const id = crypto.randomUUID();
        const key = `inference/${id}${fileType}`;
        const command = new PutObjectCommand({
            Bucket: env.AWS_INFERENCE_BUCKET,
            Key: key,
            ContentType: `video/${fileType.replace('.', '')}`,
        })

        const url = await getSignedUrl(s3Client, command, {expiresIn: 3600})

        await db.videofile.create({
            data: {
                key: key,
                userId: quota.userId,
                analyzed: false,                
            },
        });

        return NextResponse.json({
            url,
            fileId: id,
            fileType,
            key,
            status: 200
        })

    } catch (error) {
        console.error('Error in POST /api/upload-url:', error);
        return new Response('Internal Server Error', { status: 500 });
    }
}