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
    "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300 sm:px-8 sm:py-3.5 sm:text-base";

  const variants = {
    primary:
      "bg-gradient-to-r from-bestie-pink to-bestie-purple text-white shadow-lg shadow-bestie-purple/30 hover:scale-105 hover:shadow-xl hover:shadow-bestie-purple/40 active:scale-95",
    secondary:
      "border border-white/20 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 hover:scale-105 active:scale-95",
    ghost: "text-white/70 hover:text-white hover:bg-white/10",
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
