import { prisma } from "./prisma";

export default async function getLocation(joinCode: string) {
  const data = await prisma.games
    .findFirst({
      where: { id: joinCode },
      select: {
        location: true,
      },
    })
    .finally(() => prisma.$disconnect());
  return data?.location;
}
