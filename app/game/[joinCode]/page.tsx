import { AuthOptions } from "@/app/api/auth/[...nextauth]/route";
import LobbyPage from "@/components/game/lobby/LobbyPage";
import OngoingGamePage from "@/components/game/ongoingGame/OngoingGame";
import getGameByJoinCode from "@/lib/getGameByJoinCode";
import { GameStatusEnum } from "@/types/GameStatusEnum";
import { getServerSession } from "next-auth";

export default async function GamePage({
  params,
}: {
  params: { joinCode: string };
}) {
  const session = await getServerSession(AuthOptions);
  const joinCode = params.joinCode;
  const game = await getGameByJoinCode(params.joinCode);
  if (game?.players.includes(session?.user?.name || "")) {
    let gameStatus = game?.status;
    if (gameStatus === GameStatusEnum.CREATING) {
      return <div>{LobbyPage(joinCode)}</div>;
    }
    if (gameStatus === GameStatusEnum.ONGOING) {
      return <div>{OngoingGamePage(joinCode)}</div>;
    }
    if (gameStatus === GameStatusEnum.FINISHED) {
      return <div>The game has finished</div>;
    }
  }
  return <div>Game not found</div>;
}
