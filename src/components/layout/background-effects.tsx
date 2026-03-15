export function BackgroundEffects() {
  return (
    <div className="fixed inset-0 -z-10">
      {/* Base background */}
      <div className="absolute inset-0 bg-gradient-to-br from-sky-50 via-cyan-50/40 to-white" />
      {/* Warm glow top */}
      <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-to-b from-sky-100/40 via-cyan-100/20 to-transparent rounded-full blur-3xl" />
      {/* Accent glow bottom-right */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gradient-to-t from-teal-100/20 via-sky-100/10 to-transparent rounded-full blur-3xl" />
    </div>
  );
}
