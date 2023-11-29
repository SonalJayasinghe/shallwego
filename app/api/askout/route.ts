import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const session = await getServerSession();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const post = await prisma.post.findUnique({
        where: {
            email: session?.user?.email!
        }
    })
    return NextResponse.json(post);
}

export async function DELETE(request: NextRequest) {
    const session = await getServerSession();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const checkPost = await prisma.post.findUnique({
        where: {
            email: session?.user?.email!
        }
    });
    if (!checkPost) return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    if (checkPost.status === 'APPROVED') return NextResponse.json({ error: 'Approved Posts Cannot Delete' }, { status: 400 });

    const post = await prisma.post.delete({
        where: {
            email: session?.user?.email!
        }
    });

    return NextResponse.json({ message: "Post deleted successfully", status: 200 });

}