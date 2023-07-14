
import { redirect } from "next/navigation";
import { JoinCodeForm } from "@/components/join/joinCodeForm";
import getGameByJoinCode from "@/lib/getGameByJoinCode";

export default async function JoinPage() {
  async function joinGame(formData: FormData) {
    "use server";
    // const session = await getServerSession(AuthOptions);
    const joinCode = formData.get("joinCode") as string;
    const findGame = await getGameByJoinCode(joinCode);
    console.log(findGame?.id);
    if (findGame?.id !== undefined) {
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
