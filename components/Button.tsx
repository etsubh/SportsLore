import Link from "next/link";
import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit";
}

export default function Button({
  children,
  href,
  onClick,
  variant = "primary",
  className = "",
  disabled = false,
  type = "button",
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium transition-all duration-300 ease-out sm:px-8 sm:py-3.5 sm:text-base";

  const variants = {
    primary:
      "bg-bestie-purple text-white shadow-button hover:-translate-y-0.5 hover:scale-[1.03] hover:bg-bestie-purple-dark hover:shadow-lg active:translate-y-0 active:scale-[0.97]",
    secondary:
      "border border-bestie-border bg-white text-bestie-text shadow-card hover:-translate-y-0.5 hover:scale-[1.02] hover:border-bestie-purple/40 hover:bg-bestie-purple-light/40 hover:shadow-soft active:translate-y-0 active:scale-[0.97]",
    ghost:
      "text-bestie-muted hover:-translate-y-0.5 hover:scale-[1.02] hover:bg-bestie-purple-light/50 hover:text-bestie-purple active:translate-y-0 active:scale-[0.97]",
  };

  const disabledStyles = disabled ? "opacity-50 cursor-not-allowed hover:scale-100" : "";

  const combined = `${baseStyles} ${variants[variant]} ${disabledStyles} ${className}`;

  if (href && !disabled) {
    return (
      <Link href={href} className={combined}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={combined}>
      {children}
    </button>
  );
}
