import { prisma } from "./prisma";

export default async function selectAndSetSpy(joinCode: string) {
  const data = await prisma.games.findFirst({
    where: { id: joinCode },
    select: { players: true },
  });
  const index = Math.floor(Math.random() * data?.players?.length!);
  await prisma.games.update({
    where: { id: joinCode },
    data: {
      currentSpy: data?.players[index],
    },
  });
}
