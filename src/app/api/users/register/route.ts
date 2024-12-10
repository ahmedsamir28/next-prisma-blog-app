import prisma from "@/app/Utils/db";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcryptjs';

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

        //Validate inputs
        if (!username || !email || !password) {
            return NextResponse.json(
                { message: "All fields are required" },
                { status: 400 }
            );
        }

        // Hash the password
        // const hashedPassword = await bcrypt.hash(password, 10);

        // Create the user in the database
        const newUser = await prisma.user.create({
            data: {
                username,
                email,
                password
            },
        });

        return NextResponse.json(
            { newUser, message: "Registered & Authenticated" },
            { status: 201 }
        );
    } catch {
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}

