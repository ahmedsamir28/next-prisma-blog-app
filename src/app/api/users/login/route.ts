import prisma from "@/app/Utils/db";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcryptjs';
import { generateJWT } from "@/app/Utils/generateToken";
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
        const token = generateJWT({ id: user.id, email: user.email });

        return NextResponse.json(
            { user, token, message: "Login successful" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error during login:", error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}
