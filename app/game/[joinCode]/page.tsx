import { AuthOptions } from "@/app/api/auth/[...nextauth]/route";
import { ShowSpy } from "@/components/game/gameOver/ShowSpy";
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
  let gameStatus = game?.status;
  if (gameStatus === GameStatusEnum.CREATING) {
    return <div>{LobbyPage(joinCode)}</div>;
  }
  if (game?.players.includes(session?.user?.name || "")) {
    if (gameStatus === GameStatusEnum.ONGOING) {
      return <div>{OngoingGamePage(joinCode)}</div>;
    }
    if (gameStatus === GameStatusEnum.FINISHED) {
      return (
        <div>
          <ShowSpy currentSpy={game.currentSpy} location={game.location} />
        </div>
      );
    }
  }
  return <div>Game not found</div>;
}
