import { prisma } from "./prisma";

export default async function getStartDate(joinCode: string) {
  const data = await prisma.games
    .findFirst({
      where: { id: joinCode },
      select: {
        startedAt: true,
      },
    })
    .finally(() => prisma.$disconnect());
  return data?.startedAt;
}
