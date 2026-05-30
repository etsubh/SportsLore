interface ConfidenceMeterProps {
  score: number;
  label?: string;
}

export default function ConfidenceMeter({ score, label = "Conversation Confidence" }: ConfidenceMeterProps) {
  const clamped = Math.min(100, Math.max(0, score));

  const getMessage = () => {
    if (clamped >= 80) return "You're ready to jump in! 🎉";
    if (clamped >= 65) return "Solid footing — drop a take and see what happens";
    return "Enough to follow along — ask questions freely";
  };

  return (
    <div className="w-full">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-sm font-medium text-bestie-pink">{label}</span>
        <span className="text-2xl font-bold text-white">{clamped}%</span>
      </div>
      <div className="relative h-4 overflow-hidden rounded-full bg-white/10">
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-bestie-pink via-bestie-purple to-bestie-blue transition-all duration-1000 ease-out"
          style={{ width: `${clamped}%` }}
        />
        <div
          className="absolute inset-y-0 left-0 rounded-full opacity-50"
          style={{
            width: `${clamped}%`,
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
            backgroundSize: "200% 100%",
            animation: "shimmer 2s linear infinite",
          }}
        />
      </div>
      <p className="mt-2 text-sm text-white/60">{getMessage()}</p>
    </div>
  );
}
