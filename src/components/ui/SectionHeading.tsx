import React from "react";

interface SectionHeadingProps {
  label: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export default function SectionHeading({
  label,
  title,
  description,
  align = "left",
  className = "",
}: SectionHeadingProps) {
  const alignClass = align === "center" ? "text-center mx-auto" : "text-left";

  return (
    <div className={`max-w-3xl ${alignClass} ${className}`}>
      <p className="text-label-caps text-on-surface-variant mb-3">{label}</p>
      <h2 className="text-headline-lg text-jet-black">{title}</h2>
      {description && (
        <p className="text-body-md text-on-surface-variant mt-4 max-w-xl">
          {description}
        </p>
      )}
    </div>
  );
}
