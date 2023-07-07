"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export function SignInButtons() {
  const { data: session, status } = useSession();
  console.log(session, status);

  if (status === "loading") {
    return <span className="loading loading-dots loading-xs"></span>;
  }

  if (status === "authenticated") {
    return (
      <>
        <div> {session?.user?.name ?? "Anonymous"}</div>
        <a className="btn btn-ghost normal-case text-xl">
          <button onClick={() => signOut()}>Sign out</button>
        </a>
      </>
    );
  }
  return (
    <a className="btn btn-ghost normal-case text-xl">
      <button onClick={() => signIn()}>Sign in</button>
    </a>
  );
}
