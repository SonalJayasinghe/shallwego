import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import z from 'zod';

const schema = z.object({
    status: z.enum(['APPROVED', 'REJECTED', 'WAITING'])
});

interface Props {
    params: { id: string }
}

export async function PATCH(request: NextRequest, { params }: Props) {
    const session = await getServerSession();
    const body =  await request.json();
    const validation = schema.safeParse(body);
    if (!validation.success) return NextResponse.json({ error: 'Invalid body' }, { status: 400 });
    const {status} = body;


    if (!body) return NextResponse.json({ error: 'Invalid body' }, { status: 400 });
    
    const post = await prisma.post.findUnique({
        where: {
            id: params.id
        }
    });
    if (!post) return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    if (post.status === 'APPROVED' || post.status === 'REJECTED') return NextResponse.json({ error: 'Approved or Rejected Posts Cannot Edit' }, { status: 400 });
    if(post.email === session?.user?.email ) return NextResponse.json({ error: 'You cannot approve or reject your own post' }, { status: 403});

    const update = await prisma.post.update({
        where: {
            id: params.id
        },
        data: {
            status: status
        }
    });
    return NextResponse.json({ message: "Post updated successfully", status: 200});


}