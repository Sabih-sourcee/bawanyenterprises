import React from "react";

interface BentoTileProps {
  children: React.ReactNode;
  className?: string;
  variant?: "border" | "fill";
  id?: string;
}

export default function BentoTile({
  children,
  className = "",
  variant = "border",
  id,
}: BentoTileProps) {
  const base =
    variant === "fill"
      ? "bg-chalk-white border border-jet-black"
      : "bg-pure-white border border-jet-black";

  return (
    <div id={id} className={`${base} ${className}`}>
      {children}
    </div>
  );
}
