import React from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";

interface ButtonProps {
  variant?: ButtonVariant;
  href?: string;
  className?: string;
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-jet-black text-pure-white border border-jet-black hover:bg-electric-lime hover:text-jet-black hover:border-electric-lime",
  secondary:
    "bg-transparent text-jet-black border border-jet-black hover:bg-jet-black hover:text-pure-white",
  ghost:
    "bg-transparent text-jet-black border-0 underline-offset-4 hover:underline",
};

export default function Button({
  variant = "primary",
  href,
  children,
  className = "",
  onClick,
  type = "button",
  disabled,
}: ButtonProps) {
  const classes = `inline-flex items-center justify-center gap-2 px-6 py-3 text-label-caps cursor-pointer transition-colors duration-200 ${variants[variant]} ${className}`;

  if (href) {
    return (
      <a href={href} className={classes} onClick={onClick}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} className={classes} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}
