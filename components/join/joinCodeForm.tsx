"use client";

import { useState } from "react";

type Props = {
  serverAction: (formData: FormData) => any;
};

export const JoinCodeForm: React.FC<Props> = ({ serverAction }) => {
  const [hasError, setHasError] = useState<boolean>(false);
  const handleAction = async (formData: FormData) => {
    const data = await serverAction(formData);
    if (data.error) {
      setHasError(true);
    }
  };
  return (
    <form action={handleAction}>
      <div className="p-8 my-4 mx-auto shadow-md max-w-2xl bg-black rounded-lg">
        <div className="prose mb-8 mx-auto">
          <h1>Enter join code</h1>
        </div>
        <input
          type="text"
          name="joinCode"
          placeholder="Type here"
          className="input input-bordered input-primary w-full max-w-xs"
          onKeyDown={() => setHasError(false)}
        />
      </div>
      <div>
        <button className="btn btn-primary w-32">Join</button>
      </div>
      {hasError && (
        <div className="toast toast-end">
          <div className="alert alert-error">
            <span>Game not found</span>
          </div>
        </div>
      )}
    </form>
  );
};
