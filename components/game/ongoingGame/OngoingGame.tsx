import { AuthOptions } from "@/app/api/auth/[...nextauth]/route";
import getSpy from "@/lib/getSpy";
import { getServerSession } from "next-auth";
import { ShowLocationButton } from "./ShowLocationButton";
import getLocation from "@/lib/getLocation";

export const dynamic = "force-dynamic";

export default async function OngoingGamePage(joinCode: string) {
  const session = await getServerSession(AuthOptions);
  const currentSpy = await getSpy(joinCode);
  let currentLocation = "";
  if (session?.user?.name !== currentSpy) {
    currentLocation = (await getLocation(joinCode)) || "";
  }
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">
            The game has started press the button below to see the location
          </h1>
          <p className="py-6"></p>
          <ShowLocationButton location={currentLocation || ""} />
        </div>
      </div>
    </div>
  );
}