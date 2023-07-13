import { prisma } from "@/lib/prisma";
import { pusherServer } from "@/lib/pusher";
import { GameStatusEnum } from "@/types/GameStatusEnum";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: any) {
  const joinCode = params.joinCode;
  // const joinCode = request.nextUrl.searchParams.get("joinCode")!;
  await prisma.games
    .update({
      where: { id: joinCode },
      data: {
        status: GameStatusEnum.FINISHED,
      },
    })
    .then(() => prisma.$disconnect());
  pusherServer.trigger(`GameChannel-${joinCode}`, "game-finished", {});
}
