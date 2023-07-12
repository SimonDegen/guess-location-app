"use client";

import { pusherClient } from "@/lib/pusher";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
//TODO: Add something fun to do here while waiting? :D
export const LobbyRoom = ({ joinCode }: { joinCode: string }) => {
  const router = useRouter();
  useEffect(() => {
    pusherClient.subscribe(`GameChannel-${joinCode}`);
    pusherClient.bind("start-game", () => {
      router.refresh();
    });
    return () => {
      pusherClient.unsubscribe(`GameChannel-${joinCode}`);
    };
  }, []);
  return <>You have joined the game. Waiting for host to start the game</>;
};
