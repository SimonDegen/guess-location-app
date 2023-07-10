"use client";

import { pusherClient } from "@/lib/pusher";
import React, { useEffect, useState } from "react";
export const revalidate = 5; // revalidate this page every 60 seconds

interface Props {
  gameId: string;
}

export const PlayerList: React.FC<Props> = ({ gameId }) => {
  const [players, setPlayers] = useState<string[]>([]);
  useEffect(() => {
    const getPlayers = async () => {
      const res = await fetch(`/api/host/${gameId}`);
      const json = await res.json();
      console.log(json[0].players);
      setPlayers(json[0].players);
    };
    getPlayers();

    pusherClient.subscribe("GameChannel");
    pusherClient.bind("new-player", (data: any) => {
      console.log("new-player", data);
      setPlayers(data.players);
    });
    return () => {
      pusherClient.unsubscribe("GameChannel");
    };
  }, []);

  return (
    <div>
      {players.map((player) => (
        <div className="card-body items-center text-center" key={player}>
          <h2 className="card-title">{player}</h2>
        </div>
      ))}
    </div>
  );
};
