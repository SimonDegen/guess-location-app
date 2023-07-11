import { AuthOptions } from "@/app/api/auth/[...nextauth]/route";
import addPlayerToGame from "@/lib/addPlayerToGame";
import { prisma } from "@/lib/prisma";
import { pusherServer } from "@/lib/pusher";
import { GameStatusEnum } from "@/types/GameStatusEnum";
import { getServerSession } from "next-auth";

export default async function GamePage({
  params,
}: {
  params: { joinCode: string };
}) {
  const session = await getServerSession(AuthOptions);
  if (session && session.user) {
    const joinCode = params.joinCode;
    const currentGame = await prisma.games
      .findFirst({ where: { id: joinCode } })
      .finally(() => {
        prisma.$disconnect();
      });

    if (
      !currentGame?.players?.includes(session.user.name as string) &&
      currentGame?.status === GameStatusEnum.CREATING
    ) {
      await addPlayerToGame(joinCode, session.user.name as string);
      await pusherServer.trigger(`GameChannel-${joinCode}`, "new-player", {
        players: [...(currentGame?.players || []), session?.user?.name],
      });
    }
  
    if (currentGame === null) {
      return <>Current game could not be found</>;
    }

    return <div>You are waiting for the game to start</div>;
  }
}
