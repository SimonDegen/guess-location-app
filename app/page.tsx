import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-grow flex-col justify-center content-center flex-wrap text-center">
      <div className="max-w-md">
        <h1 className="text-5xl font-bold">Hello there</h1>
        <p className="py-6">
          Are you ready to play the most secret game in the world? I dont know
          how the game will work yett, but im sure it will be fun! Lets get
          going!
        </p>

        <Link className="btn btn-primary mr-8" href={"/host"}>
          Host Game
        </Link>
        <Link className="btn btn-secondary" href={"/join"}>
          Join Game
        </Link>
      </div>
    </div>
  );
}
