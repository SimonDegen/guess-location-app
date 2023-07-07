import { signIn } from "next-auth/react";
import React from "react";

export const SignInCard: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen ">
      <div className="card w-96 bg-base-100 shadow-xl">
        <figure>
          <img
            src="https://vipps.no/documents/60/vipps-rgb-orange-neg.png"
            alt="Shoes"
          />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title">
            Vipps login!
            <span className="badge badge-secondary">NEW</span>
          </h2>
          <p>Logg inn med vipps for å komme igang!</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary mt-4" onClick={() => signIn()}>
              Sign in
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
