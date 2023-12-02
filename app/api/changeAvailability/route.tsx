import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { AuthOptions } from "../auth/authOptions";
import prisma from "@/prisma/client";

export async function PATCH(request: NextRequest) {
  const session = await getServerSession(AuthOptions);
  if (!session?.user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email!,
    },
    select: {
      lookingFor: true,
    },
  });

  if (!user)
    return NextResponse.json({ error: "User Not Found" }, { status: 404 });

  const updatedUser = await prisma.user.update({
    where: {
      email: session.user.email!,
    },
    data: {
      lookingFor: !user.lookingFor,
    },
    select: {
      name: true,
      lookingFor: true,
    },
  });

  return NextResponse.json(updatedUser);
}

export async function GET(request: NextRequest) {
  const session = await getServerSession(AuthOptions);
  if (!session?.user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email!,
    },
    select: {
      lookingFor: true,
    },
  });

  if (!user) {
    return NextResponse.json({ error: "User Not Found" }, { status: 404 });
  }

  return NextResponse.json(user);
}
