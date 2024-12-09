import prisma from "@/app/Utils/db";
import { NextRequest, NextResponse } from "next/server";

interface IProps {
    params: { id: string }
}
/**
 *  @method  GET
 *  @route   ~/api/articles/:id
 *  @desc    Get Single Article By Id
 *  @access  public
 */

export async function GET(req: NextRequest, { params }: IProps) {
    try {
        const { id } = params;

        const article = await prisma.article.findUnique({
            where: { id: parseInt(id) },
        });

        if (!article) {
            return NextResponse.json({ message: "Article not found" }, { status: 404 });
        }

        return NextResponse.json(article, { status: 200 });
    } catch (error) {
        console.error("Error fetching article:", error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}

/**
 *  @method  PUT
 *  @route   ~/api/articles/:id
 *  @desc    Get Single Article By Id
 *  @access  public
 */

export async function PUT(req: NextRequest, { params }: IProps) {
    try {
        const article = await prisma.article.findUnique({
            where: { id: parseInt(params.id) },
        })
        if (!article) {
            return NextResponse.json({ message: 'article not foound' }, { status: 404 })
        }

        const body = await req.json()
        const updateArticle = await prisma.article.update({
            where: { id: parseInt(params.id) },
            data: {
                title: body.title,
                description: body.description
            }
        })
        return NextResponse.json(updateArticle, { status: 200 })
    } catch {
        return NextResponse.json(
            { message: 'internal server error' },
            { status: 500 }
        )
    }
}

export async function DELETE(req: NextRequest, { params }: IProps) {
    try {
        const article = await prisma.article.findUnique({
            where: { id: parseInt(params.id) },
        })
        if (!article) {
            return NextResponse.json({ message: 'article not foound' }, { status: 404 })
        }
        //delete th article
        await prisma.article.delete({ where: { id: parseInt(params.id) } })
        return NextResponse.json({ message: 'article is deleted' }, { status: 204 })
    } catch {
        return NextResponse.json(
            { message: "interanl server error" },
            { status: 500 }
        )
    }
}