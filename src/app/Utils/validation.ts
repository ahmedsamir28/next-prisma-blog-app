import { z } from "zod";
import prisma from "./db";

export const registerSchema = z.object({
    username: z.string().min(1, { message: "Username is required" }),
    email: z.string().email({ message: "Invalid email format" }).refine(async (email) => {
        const existingUser = await prisma.user.findUnique({ where: { email } });
        return !existingUser;
    }, {
        message: "Email is already registered",
    }),
    password: z.string().min(8, { message: "Password must be at least 8 characters long" })
});

export const loginSchema = z.object({
    email: z.string().min(3).max(200).email(),
    password: z.string().min(6),
});
