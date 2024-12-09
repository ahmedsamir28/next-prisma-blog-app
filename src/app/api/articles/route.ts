import prisma from "@/app/Utils/db";
import { NextRequest, NextResponse } from "next/server";

/**
 *  @method  POST
 *  @route   /api/articles
 *  @desc    Create New Article
 *  @access  private 
 */
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        if (!body.title || !body.description) {
            return NextResponse.json(
                { error: "Missing required fields: title or description" },
                { status: 400 })
        }

        const newArticle = await prisma.article.create({
            data: {
                title: body.title,
                description: body.description,
            },
        });

        return NextResponse.json(newArticle, { status: 201 });
    }
    catch (error) {
        console.error("Error creating article:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}

/**
 *  @method  GET
 *  @route   /api/articles
 *  @desc    Create New Article
 *  @access  public 
 */

export async function GET(request: NextRequest) {
    try {
        const pageNumber = request.nextUrl.searchParams.get("page") || "1";
        const limit = parseInt(request.nextUrl.searchParams.get("limit") || "10");
        const skip = (parseInt(pageNumber) - 1) * limit;

        const articles = await prisma.article.findMany({
            skip: skip,
            take: limit,
            orderBy: { createAt: 'desc' }
        });

        return NextResponse.json(
            {
                page: parseInt(pageNumber),
                limit,
                articles,
            },
            { status: 200 }
        );
    } catch {
        return NextResponse.json(
            { message: 'Internal server error' },
            { status: 500 }
        );
    }
}
