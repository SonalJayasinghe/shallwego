import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { AuthOptions } from "../auth/authOptions";
import prisma from "@/prisma/client";
import z from 'zod';

const schema = z.object({
    email: z.string().email(),   
    name: z.string().min(1),
    partner: z.string().min(1),
    imageUrl: z.string().url(), 
});

export async function POST(request: NextRequest) {
    const session = await getServerSession(AuthOptions);
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await request.json();
    const validitity = schema.safeParse(body);
    if (!validitity.success) {
        return NextResponse.json({ error: validitity.error }, { status: 400 });
    }

    const newPost = await prisma.post.create({
        data: {
            ...body,
        }
    });
    return NextResponse.json(newPost, { status: 201 });
}