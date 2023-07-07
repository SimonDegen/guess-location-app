import React from "react";
import Link from "next/link";
import { SignInButtons } from "@/components/buttons";

export const NavMenu: React.FC = () => {
  return (
    <div className="navbar bg-base-100 flex justify-between box-border">
      <Link className="btn btn-ghost normal-case text-xl" href="/">
        Secret Game
      </Link>
      <div>Org nummer: 922 817 413</div>
      <div className="min-w-100">
        <SignInButtons />
      </div>
    </div>
  );
};
