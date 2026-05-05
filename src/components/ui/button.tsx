import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost";
  size?: "sm" | "md" | "lg";
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 font-medium rounded-2xl transition-all duration-200 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed";

  const variants = {
    primary: "bg-white text-black hover:bg-white/90 btn-glow",
    ghost:
      "text-[#8a8a8a] hover:text-white border hover:border-white/20",
  };

  const sizes = {
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-3.5 text-sm",
  };

  const ghostStyle =
    variant === "ghost" ? { borderColor: "#2a2a2a" } : undefined;

  return (
    <button
      className={cn(base, variants[variant], sizes[size], className)}
      style={ghostStyle}
      {...props}
    >
      {children}
    </button>
  );
}
