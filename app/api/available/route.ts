import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request:NextRequest) {
    const usersWithoutPosts = await prisma.user.findMany({
        where: {
          posts: {
            none: {},
          },
        },
        select: {
            name: true,
        }
      });

      return NextResponse.json(usersWithoutPosts);
}