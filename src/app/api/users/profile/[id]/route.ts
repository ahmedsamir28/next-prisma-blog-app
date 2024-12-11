import { NextResponse, NextRequest } from 'next/server';
import prisma from '@/app/Utils/db';
import { verifyToken } from '@/app/Utils/verifyToken';
import  bcrypt from 'bcryptjs';

interface IProps {
    params: { id: string };
}

/**
 *  @method  DELETE
 *  @route   ~/api/users/profile/:id
 *  @desc    Delete Profile
 *  @access  private 
 */

export async function DELETE(req: NextRequest, { params }: IProps) {
    try {
        const user = await prisma.user.findUnique({
            where: { id: parseInt(params.id) },
            include: { comments: true }
        })
        if (!user) {
            return NextResponse.json(
                { message: 'user not found' },
                { status: 404 }
            )
        }
        const userData = verifyToken(req);
        if (userData !== null && userData.id === user.id) {
            await prisma.user.delete({ where: { id: parseInt(params.id) } })
            return NextResponse.json(
                { message: 'your profile (account has been deleted)' },
                { status: 200 }
            );
        }

        return NextResponse.json(
            { message: 'only user himself can delete his profile, forbidden' },
            { status: 403 }
        )
    } catch {
        return NextResponse.json(
            { message: 'internal server error' },
            { status: 500 }
        )
    }
}

/**
 *  @method  GET
 *  @route   ~/api/users/profile/:id
 *  @desc    Get Profile By Id
 *  @access  private (only user himself can get his account/profile)
 */

export async function GET(request: NextRequest, { params }: IProps) {
    try {
        const user = await prisma.user.findUnique({
            where: { id: parseInt(params.id) },
            select: {
                id: true,
                email: true,
                username: true,
                createAt: true,
                isAdmin: true,
            }
        });

        if (!user) {
            return NextResponse.json({ message: 'user not found' }, { status: 404 });
        }

        const userData = verifyToken(request);
        if (userData !== null && userData.id !== user.id) {
            return NextResponse.json(
                { message: 'you are not allowed, access denied' },
                { status: 403 }
            );
        }

        return NextResponse.json(user, { status: 200 });

    } catch {
        return NextResponse.json(
            { message: 'internal server error' },
            { status: 500 }
        )
    }
}


/**
 *  @method  PUT
 *  @route   ~/api/users/profile/:id
 *  @desc    Update Profile
 *  @access  private (only user himself can update his account/profile)
 */
export async function PUT(request: NextRequest, { params }: IProps) {
    try {
        const user = await prisma.user.findUnique({ where: { id: parseInt(params.id) } });
        if (!user) {
            return NextResponse.json({ message: 'user not found' }, { status: 404 });
        }

        const userData = verifyToken(request);
        if (userData === null || userData.id !== user.id) {
            return NextResponse.json(
                { message: 'you are not allowed, access denied' },
                { status: 403 }
            )
        }

        const body = await request.json()
        if (body.password) {
            body.password = await bcrypt.hash(body.password, 10);
        }
        const updatedUser = await prisma.user.update({
            where: { id: parseInt(params.id) },
            data: {
                email: body.email,
                username: body.username,
                password: body.password
            }
        });

        
        return NextResponse.json(updatedUser, { status: 200 });

    } catch  {
        return NextResponse.json(
            { message: 'internal server error' },
            { status: 500 }
        )
    }
}