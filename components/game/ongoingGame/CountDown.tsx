"use client";
import { pusherClient } from "@/lib/pusher";
import { useState } from "react";

type Props = {
  startDate: Date;
  countDownEnd: () => void;
};

import React from "react";

export const CountDown: React.FC<Props> = ({ startDate, countDownEnd }) => {
  const diff = 5;

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
      countDownEnd();
      clearInterval(x);
    }
  }, 1000);
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
