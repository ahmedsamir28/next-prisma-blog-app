import { verifyToken } from '@/app/Utils/verifyToken';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const token = request.headers.get('Authorization')?.replace('Bearer ', '')

        if (!token) {
            return NextResponse.json(
                { message: 'Token is missing' },
                { status: 400 }
            );
        }

        const userData = verifyToken(request);
        if (!userData) {
            return NextResponse.json(
                { message: 'Invalid token' },
                { status: 401 }
            );
        }

        const response = NextResponse.json(
            { message: 'Logged out successfully' },
            { status: 200 }
        );
        response.cookies.set('token', '', { maxAge: 0, httpOnly: true }); 

        return response;
    } catch  {
        return NextResponse.json(
            { message: 'Internal server error' },
            { status: 500 }
        );
    }
}
