import { GameStatusEnum } from "@/types/GameStatusEnum";
import { prisma } from "./prisma";

export default async function updateGameStatus(
  joinCode: string,
  gameStatus: GameStatusEnum
) {
  await prisma.games.update({
    where: { id: joinCode },
    data: {
      status: gameStatus,
    },
  });
}
