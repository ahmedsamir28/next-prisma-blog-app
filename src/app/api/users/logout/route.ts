import { NextResponse } from 'next/server';

/**
 *  @method  GET
 *  @route   ~/api/users/logout
 *  @desc    Logout User
 *  @access  public
 */
export async function GET() {
    try {
        // Set the `jwtToken` cookie to expire immediately
        const response = NextResponse.json({ message: 'logout' }, { status: 200 });
        response.cookies.set('jwtToken', '', { maxAge: 0 }); // Clear the cookie
        return response;
    } catch {
        return NextResponse.json(
            { message: 'internal server error' },
            { status: 500 }
        );
    }
}
