export function BackgroundEffects() {
  return (
    <div className="fixed inset-0 -z-10">
      {/* Base background */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-50 via-rose-50/50 to-fuchsia-50/30" />
      {/* Soft dot pattern */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(236,72,153,0.15) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      {/* Warm glow top */}
      <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-to-b from-pink-200/30 via-rose-200/20 to-transparent rounded-full blur-3xl" />
      {/* Accent glow bottom-right */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gradient-to-t from-violet-200/20 via-fuchsia-200/10 to-transparent rounded-full blur-3xl" />
      {/* Small accent glow left */}
      <div className="absolute top-1/2 -left-20 w-[300px] h-[300px] bg-gradient-to-r from-rose-200/20 to-transparent rounded-full blur-3xl" />
    </div>
  );
}
