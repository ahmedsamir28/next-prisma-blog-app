import prisma from "@/app/Utils/db";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcryptjs';
import { setCookie } from "@/app/Utils/generateToken";
import { loginSchema } from "@/app/Utils/validation";

/**
 *  @method  POST
 *  @route   ~/api/users/login
 *  @desc    Login User
 *  @access  public
 */

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { email, password } = body;

        // Validate the login input using the loginSchema
        const validation = await loginSchema.safeParseAsync(body);

        if (!validation.success) {
            return NextResponse.json(
                { message: validation.error.errors[0].message },
                { status: 400 }
            );
        }

        // Check if the user exists in the database
        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
            return NextResponse.json(
                { message: "invalid email or password" },
                { status: 404 }
            );
        }

        // Compare the provided password with the stored hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return NextResponse.json(
                { message: "Invalid credentials" },
                { status: 401 }
            );
        }

        // Generate JWT token
        const cookie = setCookie({
            id: user.id,
            email: user.email,
            username: user.username
        });

        return NextResponse.json(
            { user, message: "Login successful" },
            {
                status: 200,
                headers: { "Set-Cookie": cookie }

            }
        );
    } catch (error) {
        console.error("Error during login:", error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}
