export function BackgroundEffects() {
  return (
    <div className="fixed inset-0 -z-10">
      {/* Base background */}
      <div className="absolute inset-0 bg-[#0a0a1a]" />
      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(139,92,246,0.3) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      {/* Radial gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-to-b from-violet-500/10 via-indigo-500/5 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-gradient-to-t from-cyan-500/5 to-transparent rounded-full blur-3xl" />
    </div>
  );
}
