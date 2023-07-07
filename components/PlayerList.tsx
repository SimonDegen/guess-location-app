import { prisma } from "@/lib/prisma";
import React from "react";

export const revalidate = 5; // revalidate this page every 60 seconds

interface Props {
  gameId: string;
}

export default async function playerList({ gameId }: Props) {
  console.log("hello");
  const players = await prisma.games.findMany({
    select: { players: true },
    where: { id: gameId },
  });
  console.log(players);
  return (
    <div>
      {players.map((player) => (
        <div className="card-body items-center text-center">
          <h2 className="card-title">{player.players}</h2>
        </div>
      ))}
    </div>
  );
}
