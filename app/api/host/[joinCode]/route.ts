import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: any) {
  const joinCode = params.joinCode;
  // const joinCode = request.nextUrl.searchParams.get("joinCode")!;
  const data = await prisma.games
    .findMany({
      where: { id: joinCode },
      select: { players: true },
    })
    .finally(() => prisma.$disconnect());

  return NextResponse.json(data);
}
