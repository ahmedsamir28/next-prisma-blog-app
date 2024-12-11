import prisma from "@/app/Utils/db";
import { verifyToken } from "@/app/Utils/verifyToken";
import { NextRequest, NextResponse } from "next/server";

/**
 *  @method  POST
 *  @route   ~/api/comments
 *  @desc    Create New Comment
 *  @access  private (only logged in user)
 */
export async function POST(req: NextRequest) {
    try {
        const userData = verifyToken(req);
        if (!userData || !userData.id) {
            return NextResponse.json(
                { message: 'only admin, access denied' },
                { status: 403 }
            );
        }

        const body = await req.json()
        const newComment = await prisma.comment.create({
            data: {
                text: body.text,
                articelId: body.articelId,
                userId: userData.id
            }
        })
        return NextResponse.json(newComment, { status: 201 })
    } catch {
        return NextResponse.json(
            { message: 'internal server error' },
            { status: 500 }
        )
    }
}

/**
 *  @method  GET
 *  @route   ~/api/comments
 *  @desc    Get All Comments
 *  @access  private (only admin)
 */
export async function GET(req: NextRequest) {
    try {
        const userData = verifyToken(req);
        if (!userData || !userData.id) {
            return NextResponse.json(
                { message: 'only admin, access denied' },
                { status: 403 }
            );
        }
        
        const comments = await prisma.comment.findMany()
        return NextResponse.json(comments, { status: 200 })
    } catch {
        return NextResponse.json(
            { message: 'internal server error' },
            { status: 500 }
        )
    }
}