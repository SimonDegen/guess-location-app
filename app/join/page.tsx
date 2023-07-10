import { prisma } from "@/lib/prisma";
import { pusherServer } from "@/lib/pusher";
import { redirect } from "next/navigation";

export default async function JoinPage() {
  async function joinGame(formData: FormData) {
    "use server";
    const joinCode = formData.get("joinCode") as string;
    console.log("joinCode", joinCode);
    const obj = await prisma.games
      .findFirst({
        where: { id: joinCode },

        select: { players: true },
      })
      .finally(() => prisma.$disconnect());

    await prisma.games
      .update({
        where: { id: joinCode },
        data: {
          players: {
            set: [...(obj?.players || []), "testing"],
          },
        },
      })
      .finally(() => prisma.$disconnect());
    await pusherServer.trigger("GameChannel", "new-player", {
      players: [...(obj?.players || []), "testing"],
    });

    redirect(`/game/${joinCode}`);
  }

  return (
    <>
      <div className="flex flex-col justify-center align-middle text-center flex-grow">
        <form action={joinGame}>
          <div className="p-8 my-4 mx-auto shadow-md max-w-2xl bg-black rounded-lg">
            <div className="prose mb-8 mx-auto">
              <h1>Enter join code</h1>
            </div>
            <input
              type="text"
              name="joinCode"
              placeholder="Type here"
              className="input input-bordered input-primary w-full max-w-xs"
            />
          </div>
          <div>
            <button className="btn btn-primary w-32">Join</button>
          </div>
        </form>
      </div>
    </>
  );
}
