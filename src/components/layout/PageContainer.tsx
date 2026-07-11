import React from "react";

type PageContainerProps = {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "section" | "footer" | "nav";
  id?: string;
};

/** Shared max-width + horizontal padding — use on every section inner wrapper */
export default function PageContainer({
  children,
  className = "",
  as: Tag = "div",
  id,
}: PageContainerProps) {
  return (
    <Tag id={id} className={`page-shell ${className}`.trim()}>
      {children}
    </Tag>
  );
}
