import prisma from "@/app/Utils/db";
import { verifyToken } from "@/app/Utils/verifyToken";
import { NextRequest, NextResponse } from "next/server";

/**
 *  @method  PUT
 *  @route   ~/api/comments/:id
 *  @desc    Update Comment
 *  @access  private 
**/
interface IProps {
    params: { id: string };
}

export async function PUT(req: NextRequest, { params }: IProps) {
    try {
        const comment = await prisma.comment.findUnique(
            { where: { id: parseInt(params.id) } }
        )
        if (!comment) {
            return NextResponse.json(
                { message: 'comment not found' }, { status: 404 }
            )
        }

        const userData = verifyToken(req);
        if (!userData || !userData.id) {
            return NextResponse.json(
                { message: 'only admin, access denied' },
                { status: 403 }
            );
        }

        const body = await req.json()
        const newComment = await prisma.comment.update({
            where: { id: parseInt(params.id) },
            data: {
                text: body.text
            }
        })

        return NextResponse.json(newComment, { status: 200 })
    } catch {
        return NextResponse.json(
            { message: 'internal server error' },
            { status: 500 }
        )
    }
}

/**
 *  @method  DELETE
 *  @route   ~/api/comments/:id
 *  @desc    Delete Comment
 *  @access  private
 */
export async function DELETE(req: NextRequest, { params }: IProps) {
    try {
        const comment = await prisma.comment.findUnique(
            { where: { id: parseInt(params.id) } }
        )
        if (!comment) {
            return NextResponse.json(
                { message: 'comment not found' }, { status: 404 }
            )
        }

        const userData = verifyToken(req);
        if (!userData || !userData.id) {
            return NextResponse.json(
                { message: 'only admin, access denied' },
                { status: 403 }
            );
        }

        if (userData.id == comment.userId) {
            await prisma.comment.delete({ where: { id: parseInt(params.id) } })
            return NextResponse.json(
                { message: 'comment deleted' },
                { status: 200 }
            )
        }

    } catch {
        return NextResponse.json(
            { message: 'internal server error' },
            { status: 500 }
        )
    }
}