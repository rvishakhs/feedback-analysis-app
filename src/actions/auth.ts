'use server';
import crypto from 'crypto';
import { hash } from 'bcrypt';
import { create } from 'domain';
import { signUpSchema, type SignUpSchema } from '~/schema/auth'
import { db } from '~/server/db';

async function registerUser(data: SignUpSchema) {
    try {
        // we need to do the server side validation and then call the API to register the user
        const result = signUpSchema.safeParse(data);

        if (!result.success) {
            return {error: "Invalid input data"}
        }

        const {name, email, password} = data;

        // Check for the existing user 
        const existing_User  = await db.user.findUnique({
            where: {email}
        }) 

        if (existing_User) {
            return {error: "User already exists with this email"}
        }

        // Hash the password
        const hashedPassword = await hash(password, 12);

        await db.user.create({
            data: {
                name, 
                email,
                password: hashedPassword,
                ApiQuota: {
                    create: {
                        secretKey: `sa_live_${crypto.randomBytes(24).toString('hex')}`,
                    }
                }
            }
        })

        return {success: true, message: "User registered successfully"};

    } catch (error) {
        return {error: "An error occurred while registering the user. Please try again later."};
    }
}

export default registerUser
