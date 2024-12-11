import jwt, { JwtPayload } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

// Utility function to verify the JWT token
export function verifyToken(request: NextRequest): JwtPayload | null {
    try {
        // Get the JWT token from the Authorization header
        const authHeader = request.headers.get("Authorization");
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return NextResponse.json(
                { error: "Authentication required" },
                { status: 401 }
            );
        }

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(token, JWT_SECRET);
        if (typeof decoded === "object" && decoded !== null) {
            return decoded as JwtPayload;
        }
        return null;
    } catch {
        return null;
    }
}
