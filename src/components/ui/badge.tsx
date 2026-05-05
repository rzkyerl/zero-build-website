import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

interface BadgeProps extends HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode;
}

export function Badge({ icon, className, children, ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs text-[#8a8a8a]",
        className
      )}
      style={{ borderColor: "#2a2a2a", background: "rgba(255,255,255,0.03)" }}
      {...props}
    >
      {icon}
      {children}
    </div>
  );
}

export function PrivacyBadge() {
  return (
    <div
      className="flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs text-[#8a8a8a]"
      style={{ background: "rgba(255,255,255,0.03)", border: "1px solid #2a2a2a" }}
    >
      <svg
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
      Processed locally · No data uploaded
    </div>
  );
}
