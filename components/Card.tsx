import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  hover?: boolean;
}

export default function Card({ children, className = "", onClick, hover = false }: CardProps) {
  const hoverStyles = hover
    ? "cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:border-white/20 hover:shadow-lg hover:shadow-bestie-purple/10 active:scale-[0.98]"
    : "";

  return (
    <div
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={
        onClick
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") onClick();
            }
          : undefined
      }
      className={`rounded-2xl border border-white/10 bg-bestie-card/80 p-5 backdrop-blur-sm sm:p-6 ${hoverStyles} ${className}`}
    >
      {children}
    </div>
  );
}
