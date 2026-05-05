import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg" | "xl";
}

export function Container({
  size = "lg",
  className,
  children,
  ...props
}: ContainerProps) {
  const sizes = {
    sm: "max-w-xl",
    md: "max-w-2xl",
    lg: "max-w-5xl",
    xl: "max-w-6xl",
  };

  return (
    <div
      className={cn("mx-auto w-full px-6", sizes[size], className)}
      {...props}
    >
      {children}
    </div>
  );
}
