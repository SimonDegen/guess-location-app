import { GameStatusEnum } from "@/types/GameStatusEnum";
import { prisma } from "./prisma";

export default async function getSpy(joinCode: string) {
  const spy = await prisma.games
    .findFirst({
      where: { id: joinCode },
      select: { currentSpy: true },
    })
    .finally(() => prisma.$disconnect());
  return spy?.currentSpy;
}
