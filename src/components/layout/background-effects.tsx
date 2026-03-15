export function BackgroundEffects() {
  return (
    <div className="fixed inset-0 -z-10">
      <div className="absolute inset-0 bg-[#f8fafb]" />
      {/* Subtle warm glow */}
      <div className="absolute top-0 right-0 w-[600px] h-[400px] bg-gradient-to-bl from-sky-100/50 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[300px] bg-gradient-to-tr from-teal-50/40 to-transparent rounded-full blur-3xl" />
    </div>
  );
}
