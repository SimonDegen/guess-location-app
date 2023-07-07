"use client";

import { useSession } from "next-auth/react";
import { SignInCard } from "./SignInCard";

export default function AuthCheck({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();

  console.log(session, status);

  if (status === "loading")
    return (
      <div className="flex flex-col items-center justify-center flex-grow">
        <span className="loading loading-spinner text-primary w-24"></span>
        <h1 className="m-8">Checking login status...</h1>
      </div>
    );

  if (status === "authenticated") {
    return <>{children}</>;
  } else {
    return (
      <>
        <SignInCard />
      </>
    );
  }
}
