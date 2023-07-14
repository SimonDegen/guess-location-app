"use client";

type Props = {
  joinCode: string;
  startDate: Date;
  countDownEnded: () => void;
};

import { pusherClient } from "@/lib/pusher";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export const CountDown: React.FC<Props> = ({
  startDate,
  joinCode,
  countDownEnded,
}) => {
  const router = useRouter();
  const diff = 1;

  var countDownDate = startDate.getTime() + diff * 60000;
  // Update the count down every 1 second
  var x = setInterval(function () {
    // Get today's date and time
    var now = new Date().getTime();

    // Find the distance between now and the count down date
    var distance = countDownDate - now;
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    document
      .getElementById("minutes")
      ?.style.setProperty("--value", `${minutes}`);
    document
      .getElementById("seconds")
      ?.style.setProperty("--value", `${seconds}`);
    // Time calculations for days, hours, minutes and seconds
    // setMinutes(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)));
    // setSeconds(Math.floor((distance % (1000 * 60)) / 1000));

    // If the count down is finished, write some text
    if (distance <= 0) {
      countDownEnded();
      clearInterval(x);
    }
  }, 1000);

  useEffect(() => {
    pusherClient.subscribe("GameChannel-" + joinCode);
    pusherClient.bind("game-finished", () => {
      router.refresh();
    });
  }, []);
  return (
    <div className="grid grid-flow-col gap-5 text-center auto-cols-max">
      <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
        <span className="countdown font-mono text-5xl">
          <span id="minutes" />
        </span>
        min
      </div>
      <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
        <span className="countdown font-mono text-5xl">
          <span id="seconds" />
        </span>
        sec
      </div>
    </div>
  );
};
