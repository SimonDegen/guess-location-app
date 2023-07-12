import { prisma } from "./prisma";

export default async function getGameByJoinCode(joinCode: string) {
  const game = await prisma.games
    .findUnique({
      where: { id: joinCode },
    })
    .finally(() => prisma.$disconnect());
  return game;
}
