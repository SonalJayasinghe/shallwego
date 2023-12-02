import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { AuthOptions } from "../auth/authOptions";
import { GENDER } from "@prisma/client";

export async function GET(request: NextRequest) {
  const session = await getServerSession(AuthOptions);
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const userGender = await prisma.user.findUnique({
    where: {
      email: session.user.email!,
    },
    select: {
      gender: true
    }
  });

  if (!userGender) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const oppositeGender = userGender ? userGender.gender === 'FEMALE' ? "MALE" : "FEMALE" : null;

  const usersWithoutPosts = await prisma.user.findMany({
    where: {
      posts: {
        none: {},
      },
      lookingFor: true,
      gender: oppositeGender!,
    },
    select: {
      name: true,
    }
  });

  if (!usersWithoutPosts) {
    return NextResponse.json({ name: 'No users found' }, { status: 201 });
  }

  return NextResponse.json(usersWithoutPosts);
}

