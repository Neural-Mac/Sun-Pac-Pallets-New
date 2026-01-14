"use client";

import * as React from "react";
import { Loader2 } from "lucide-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline";
  isLoading?: boolean;
}

export function Button({
  className,
  variant = "primary",
  isLoading = false,
  children,
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles = "inline-flex items-center justify-center rounded-sm px-6 py-3 font-poppins font-medium transition-transform duration-200 focus:outline-none disabled:opacity-70 disabled:pointer-events-none active:scale-[0.98]";
  
  const variants = {
    primary: "bg-[var(--color-brand-accent)] text-black hover:bg-[#ffe600] border-b-2 border-[#d4c304] hover:-translate-y-0.5 shadow-md",
    outline: "border border-[var(--color-gold-light)] text-white hover:bg-[var(--color-gold-light)]/10 hover:border-[var(--color-brand-accent)] hover:text-[var(--color-brand-accent)]",
  };

  return (
    <button
      disabled={isLoading || disabled}
      className={`${baseStyles} ${variants[variant]} ${className || ""}`}
      {...props}
    >
      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin text-current" />}
      {children}
    </button>
  );
}
