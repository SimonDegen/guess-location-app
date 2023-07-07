import playerList from "@/components/PlayerList";
import { QrCode } from "@/components/QrCode";
import { prisma } from "@/lib/prisma";
import createLocation from "@/utils/createLocation";
import getRandomLocationIdFromEnum from "@/utils/getRandomLocationId";
import { revalidatePath } from "next/cache";

export default async function JoinPage() {
  revalidatePath("http://localhost:3000/host");

  return (
    <>
      <div className="flex flex-col justify-center align-middle text-center flex-grow">
        <div>Join page</div>
      </div>
    </>
  );
}
