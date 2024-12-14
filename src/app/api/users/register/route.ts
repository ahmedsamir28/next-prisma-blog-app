import prisma from "@/app/Utils/db";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcryptjs';
import { registerSchema } from "@/app/Utils/validation";
import { setCookie } from "@/app/Utils/generateToken";

/**
 *  @method  POST
 *  @route   ~/api/users/register
 *  @desc    Create New User
 *  @access  public
 */

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { username, email, password } = body;

        // Validate the login input using the loginSchema
        const validation = await registerSchema.safeParseAsync(body);

        if (!validation.success) {
            return NextResponse.json(
                { message: validation.error.errors[0].message },
                { status: 400 }
            );
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword,
            },
        });

        const cookie = setCookie({
            id: newUser.id,
            email: newUser.email,
            username: newUser.username
        });

        return NextResponse.json(
            { newUser, message: "Registered & Authenticated" },
            {
                status: 201,
                headers: { "Set-Cookie": cookie }
            }
        );
    } catch {
        return NextResponse.json(
            { message: "Internal server error 5000" },
            { status: 500 }
        );
    }
}
