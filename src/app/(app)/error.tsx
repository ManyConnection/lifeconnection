"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <h2 className="text-xl font-bold text-gray-800 mb-2">Something went wrong</h2>
      <p className="text-gray-500 mb-6 text-sm">{error.message}</p>
      <button
        onClick={reset}
        className="px-4 py-2 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-500 text-white text-sm font-medium shadow-md shadow-sky-200 cursor-pointer"
      >
        Try again
      </button>
    </div>
  );
}
