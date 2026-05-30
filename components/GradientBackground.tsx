import { ReactNode } from "react";

interface GradientBackgroundProps {
  children: ReactNode;
}

export default function GradientBackground({ children }: GradientBackgroundProps) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-bestie-dark">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 -top-40 h-80 w-80 animate-pulse-soft rounded-full bg-bestie-purple/30 blur-3xl" />
        <div className="absolute -right-40 top-1/4 h-96 w-96 animate-float rounded-full bg-bestie-pink/20 blur-3xl" />
        <div className="absolute -bottom-40 left-1/3 h-80 w-80 animate-pulse-soft rounded-full bg-bestie-orange/20 blur-3xl" />
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  );
}
