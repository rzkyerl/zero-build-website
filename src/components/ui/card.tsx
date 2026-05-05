import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  padding?: "sm" | "md" | "lg";
}

export function Card({ padding = "md", className, children, ...props }: CardProps) {
  const paddings = { sm: "p-4", md: "p-5", lg: "p-6 sm:p-8" };

  return (
    <div
      className={cn("rounded-2xl", paddings[padding], className)}
      style={{ background: "#121212", border: "1px solid #2a2a2a" }}
      {...props}
    >
      {children}
    </div>
  );
}
