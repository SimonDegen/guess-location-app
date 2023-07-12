import { GameStatusEnum } from "@/types/GameStatusEnum";
import { prisma } from "./prisma";
import { pusherServer } from "./pusher";

export default async function addPlayerToGame(
  joinCode: string,
  userName: string
) {
  const game = await prisma.games
    .findFirst({
      where: { id: joinCode },
    })
    .finally(() => prisma.$disconnect());
  let playerList = game?.players;
  if (
    !game?.players.includes(userName) &&
    game?.status === GameStatusEnum.CREATING
  ) {
    await prisma.games
      .update({
        where: { id: joinCode },
        data: {
          players: {
            push: userName,
          },
        },
      })
      .finally(() => prisma.$disconnect());
    playerList = [...game?.players, userName];
  }
  await pusherServer.trigger(`GameChannel-${joinCode}`, "new-player", {
    players: playerList,
  });
}
