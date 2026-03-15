"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <h2 className="text-xl font-extrabold font-heading text-gray-800 mb-2">Something went wrong</h2>
      <p className="text-gray-400 mb-6 text-sm">{error.message}</p>
      <button
        onClick={reset}
        className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-sky-500 to-teal-500 text-white text-sm font-semibold shadow-lg shadow-sky-200/40 cursor-pointer"
      >
        Try again
      </button>
    </div>
  );
}
