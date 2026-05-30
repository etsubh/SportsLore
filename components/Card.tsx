import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  hover?: boolean;
}

export default function Card({ children, className = "", onClick, hover = false }: CardProps) {
  const hoverStyles = hover
    ? "cursor-pointer transition-all duration-200 hover:border-bestie-purple/20 hover:shadow-soft active:scale-[0.99]"
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
      className={`rounded-2xl border border-bestie-border bg-bestie-card p-5 shadow-card sm:p-6 ${hoverStyles} ${className}`}
    >
      {children}
    </div>
  );
}
