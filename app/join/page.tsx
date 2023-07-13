import addPlayerToGame from "@/lib/addPlayerToGame";
import { prisma } from "@/lib/prisma";
import { pusherServer } from "@/lib/pusher";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { AuthOptions } from "../api/auth/[...nextauth]/route";
import { JoinCodeForm } from "@/components/join/joinCodeForm";

export default async function JoinPage() {
  async function joinGame(formData: FormData) {
    "use server";
    const session = await getServerSession(AuthOptions);
    const joinCode = formData.get("joinCode") as string;
    const obj = await prisma.games
      .findFirst({
        where: { id: joinCode },

        select: { players: true },
      })
      .finally(() => prisma.$disconnect());
    if (obj) {
      await addPlayerToGame(joinCode, session?.user?.name as string);
      redirect(`/game/${joinCode}`);
    } else {
      return {
        error: "Game not found",
      };
    }
  }

  return (
    <>
      <div className="flex flex-col justify-center align-middle text-center flex-grow">
        <JoinCodeForm serverAction={joinGame} />
      </div>
    </>
  );
}
