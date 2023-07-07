import playerList from "@/components/PlayerList";
import { QrCode } from "@/components/QrCode";
import { prisma } from "@/lib/prisma";
import createLocation from "@/utils/createLocation";
import getRandomLocationIdFromEnum from "@/utils/getRandomLocationId";

export const dynamic = "force-dynamic";

export default async function HostPage() {
  const joinCode = Math.random().toString(36).substring(2, 10);
  const location = getRandomLocationIdFromEnum();
  await prisma.games
    .create({
      data: {
        id: joinCode,
        location: location,
        status: "test",
        players: "test",
      },
    })
    .then(async () => {
      createLocation(location);
    });

  return (
    <>
      <div className="flex flex-col justify-center align-middle text-center flex-grow">
        <div>QR code for new game</div>
        <QrCode joinCode={joinCode} />
        <h1>JOIN CODE: {joinCode}</h1>
        {playerList({ gameId: joinCode })}
      </div>
    </>
  );
}
