import prisma from "@/app/Utils/db";
import { NextRequest, NextResponse } from "next/server";

/**
 *  @method  GET
 *  @route   ~/api/articles/search?keyword=value&page=1&limit=10
 *  @desc    Get Articles By Search Text with Pagination
 *  @access  public
 */

export async function GET(req: NextRequest) {
    try {
        const pageNumber = parseInt(req.nextUrl.searchParams.get("page") || "1");
        const limit = parseInt(req.nextUrl.searchParams.get("limit") || "10");
        const skip = (pageNumber - 1) * limit;

        const keyword = req.nextUrl.searchParams.get("keyword");
        let articles;

        if (keyword) {
            articles = await prisma.article.findMany({
                skip,
                take: limit,
                orderBy: { createAt: "desc" },
                where: {
                    OR: [
                        {
                            title: {
                                contains: keyword,
                                mode: "insensitive",
                            },
                        },
                        {
                            description: {
                                contains: keyword,
                                mode: "insensitive",
                            },
                        },
                    ],
                },
            });
        } else {
            articles = await prisma.article.findMany({
                skip,
                take: limit,
                orderBy: { createAt: "desc" },
            });
        }

        if (!articles.length) {
            return NextResponse.json(
                { message: "No articles found." },
                { status: 404 }
            );
        }

        return NextResponse.json(
            {
                page: pageNumber,
                limit,
                articles,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error fetching articles:", error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}
