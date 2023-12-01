import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { z } from "zod"
import { signIn } from "next-auth/react";

const schema = z.object({
    email: z.string().email(),
    password: z.string().min(5),
});

export async function POST(request: NextRequest) {
    const body = await request.json();
    const validation = schema.safeParse(body);
    if (!validation.success) {
        return NextResponse.json({ error: validation.error.errors }, { status: 400 });
    }
    const user = await prisma.user.findUnique({ where: { email: body.email } });
    if (user) {
        return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }
    const hashedPassword = await bcrypt.hash(body.password, 10);
    const newUser = await prisma.user.create({ data: { email: body.email, hashedPassword: hashedPassword, name: body.name } });

    if (newUser) {
        return NextResponse.json({ email: newUser.email, status: 200 });
    }
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });

}