import { ReactNode } from "react";

interface GradientBackgroundProps {
  children: ReactNode;
}

export default function GradientBackground({ children }: GradientBackgroundProps) {
  return (
    <div className="relative min-h-screen bg-bestie-cream">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-bestie-purple/5 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-bestie-purple/5 blur-3xl" />
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  );
}
