"use server";
import { AuthOptions } from "@/app/api/auth/[...nextauth]/route";
import addPlayerToGame from "@/lib/addPlayerToGame";
import getGameByJoinCode from "@/lib/getGameByJoinCode";
import { getServerSession } from "next-auth";
import { LobbyRoom } from "./LobbyRoom";

export default async function LobbyPage(joinCode: string) {
  const session = await getServerSession(AuthOptions);
  if (session && session.user) {
    const currentGame = await getGameByJoinCode(joinCode);
    await addPlayerToGame(joinCode, session.user.name as string);

    if (currentGame === null) {
      return <>Current game could not be found</>;
    }
    return (
      <div>
        <LobbyRoom joinCode={joinCode} />
      </div>
    );
  }
  return <>You are not logged in</>;
}
