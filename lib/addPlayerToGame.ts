import { prisma } from "./prisma";

export default async function addPlayerToGame(
  joinCode: string,
  userName: string
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
}
