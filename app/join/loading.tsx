export default function LoadingPage() {
  return (
    <div className="flex flex-col items-center justify-center flex-grow">
      <span className="loading loading-spinner text-primary w-24"></span>
      <h1 className="m-8">Loading...</h1>
    </div>
  );
}
