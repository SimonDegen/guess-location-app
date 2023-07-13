import { PlayerList } from "@/components/PlayerList";
import { QrCode } from "@/components/QrCode";
import { prisma } from "@/lib/prisma";
import { GameStatusEnum } from "@/types/GameStatusEnum";
import createLocation from "@/utils/createLocation";
import getRandomLocationIdFromEnum from "@/utils/getRandomLocationId";
import { getServerSession } from "next-auth";
import { AuthOptions } from "../api/auth/[...nextauth]/route";
import updateGameStatus from "@/lib/updateGameStatus";
import { redirect } from "next/navigation";
import { pusherServer } from "@/lib/pusher";
import selectAndSetSpy from "@/lib/selectAndSetSpy";
import updateStartTime from "@/lib/updateStartTime";

export const dynamic = "auto";

export default async function HostPage() {
  const session = await getServerSession(AuthOptions);
  await prisma.games.deleteMany({});
  const joinCode = Math.random().toString(36).substring(2, 10);
  const location = getRandomLocationIdFromEnum();
  await prisma.games
    .create({
      data: {
        id: joinCode,
        location: location,
        status: GameStatusEnum.CREATING,
        players: session?.user?.name || "Anonymous",
        currentSpy: "",
        startedAt: new Date(),
      },
    })
    .then(async () => {
      createLocation(location);
    })
    .finally(() => prisma.$disconnect());

  async function startGame() {
    "use server";
    await Promise.all([
      updateGameStatus(joinCode, GameStatusEnum.ONGOING),
      selectAndSetSpy(joinCode),
      updateStartTime(joinCode),
    ]);
    pusherServer.trigger(`GameChannel-${joinCode}`, "start-game", {});
    redirect(`/game/${joinCode}`);
  }

  return (
    <>
      <div className="flex flex-col justify-center align-middle text-center flex-grow">
        <div>QR code for new game</div>
        <QrCode joinCode={joinCode} />
        <h1>JOIN CODE: {joinCode}</h1>
        <PlayerList gameId={joinCode} />
        <div>
          <form action={startGame}>
            <button className="btn btn-primary w-32" type="submit">
              Start game
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
