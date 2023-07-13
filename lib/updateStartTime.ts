import { GameStatusEnum } from "@/types/GameStatusEnum";
import { prisma } from "./prisma";

export default async function updateStartTime(joinCode: string) {
  await prisma.games
    .update({
      where: { id: joinCode },
      data: {
        startedAt: new Date(),
      },
    })
    .finally(() => prisma.$disconnect());
}
