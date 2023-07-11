import { PlayerList } from "@/components/PlayerList";
import { QrCode } from "@/components/QrCode";
import { prisma } from "@/lib/prisma";
import { pusherClient } from "@/lib/pusher";
import { GameStatusEnum } from "@/types/GameStatusEnum";
import createLocation from "@/utils/createLocation";
import getRandomLocationIdFromEnum from "@/utils/getRandomLocationId";
import { getServerSession } from "next-auth";
import { AuthOptions } from "../api/auth/[...nextauth]/route";

export const dynamic = "auto";

export default async function HostPage() {
  const session = await getServerSession(AuthOptions);

  const joinCode = Math.random().toString(36).substring(2, 10);
  const location = getRandomLocationIdFromEnum();
  await prisma.games
    .create({
      data: {
        id: joinCode,
        location: location,
        status: GameStatusEnum.CREATING,
        players: session?.user?.name || "Anonymous",
      },
    })
    .then(async () => {
      createLocation(location);
    })
    .finally(() => prisma.$disconnect());

  return (
    <>
      <div className="flex flex-col justify-center align-middle text-center flex-grow">
        <div>QR code for new game</div>
        <QrCode joinCode={joinCode} />
        <h1>JOIN CODE: {joinCode}</h1>
        <PlayerList gameId={joinCode} />
      </div>
    </>
  );
}
