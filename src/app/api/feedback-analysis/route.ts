import { error } from "console";
import { NextResponse } from "next/server";
import { db } from "~/server/db";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { env } from "~/env";
import { checkAndUpdateQuota } from "~/lib/quota";
import { SageMakerRuntimeClient } from "@aws-sdk/client-sagemaker-runtime";

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
        const {key} = await req.json();

        if(!key) {
            return NextResponse.json({
                error: 'Key is required',
                status: 400
            })
        }

        // try to find the file and the user it belongs to with the key 
        const file = await db.videofile.findUnique({
            where : {
                key
            }, select: {
                userId: true,
                analyzed: true,
            }
        });

        if(!file) {
            return NextResponse.json({
                error: 'File not found',
                status: 404
            })
        }

        if (file.userId !== quota.userId) {
            return NextResponse.json({
                error: 'File does not belong to the user or unauthorised access',
                status: 403
            })
        }

        const hasQuota = await checkAndUpdateQuota(quota.userId, true)

        if(!hasQuota) {
            return NextResponse.json({
                error: 'You have reached your quota limit',
                status: 403
            })
        }

        // Call sagemaker endpoint 
        const sagemakerClient = new SageMakerRuntimeClient({
            region: env.AWS_REGION,
            credentials: {
                accessKeyId: env.AWS_ACCESS_KEY_ID,
                secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
            },
        })

        // const command = 

        return NextResponse.json({

        })

    } catch (error) {
        console.error('Error in POST /api/upload-url:', error);
        return new Response('Internal Server Error', { status: 500 });
    }
}