interface ConfidenceMeterProps {
  score: number;
  label?: string;
}

export default function ConfidenceMeter({ score, label = "Conversation Confidence" }: ConfidenceMeterProps) {
  const clamped = Math.min(100, Math.max(0, score));

  const getMessage = () => {
    if (clamped >= 80) return "You're ready to jump in!";
    if (clamped >= 65) return "Solid footing — drop a take and see what happens";
    return "Enough to follow along — ask questions freely";
  };

  return (
    <div className="w-full">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-sm font-medium text-bestie-purple">{label}</span>
        <span className="font-serif text-2xl font-bold text-bestie-text">{clamped}%</span>
      </div>
      <div className="relative h-3 overflow-hidden rounded-full bg-bestie-purple-light">
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-bestie-purple transition-all duration-1000 ease-out"
          style={{ width: `${clamped}%` }}
        />
      </div>
      <p className="mt-2 text-sm text-bestie-muted">{getMessage()}</p>
    </div>
  );
}
