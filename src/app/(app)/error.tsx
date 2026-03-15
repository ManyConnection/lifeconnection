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
      <h2 className="text-xl font-bold text-white mb-2">Something went wrong</h2>
      <p className="text-slate-400 mb-6 text-sm">{error.message}</p>
      <button
        onClick={reset}
        className="px-4 py-2 rounded-xl bg-gradient-to-r from-violet-500 to-indigo-600 text-white text-sm font-medium"
      >
        Try again
      </button>
    </div>
  );
}
