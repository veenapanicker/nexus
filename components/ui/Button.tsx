"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "tertiary" | "warning" | "negative" | "positive";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  asChild?: boolean;
}

export function Button({
  variant = "primary",
  size = "md",
  isLoading = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  children,
  className,
  disabled,
  asChild = false,
  ...props
}: ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const baseStyles =
    "inline-flex items-center justify-center rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-60 disabled:cursor-not-allowed";

  const variants = {
    primary: "bg-[#1E3A8A] text-white hover:bg-[#1E40AF] hover:shadow-md",
    secondary: "border border-[#E5E7EB] text-[#1F2937] hover:border-[#1E3A8A] hover:bg-[#F9FAFB] hover:shadow-sm",
    tertiary: "text-[#1E3A8A] hover:text-[#1E40AF] hover:bg-[#EFF6FF]",
    warning: "bg-[#F59E0B] text-white hover:bg-[#D97706] hover:shadow-md",
    negative: "bg-[#EF4444] text-white hover:bg-[#DC2626] hover:shadow-md",
    positive: "bg-[#10B981] text-white hover:bg-[#059669] hover:shadow-md",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-2.5 text-base",
  };

  const disabledStyles = disabled || isLoading ? "opacity-60 cursor-not-allowed" : "";

  const buttonClassName = cn(
    baseStyles,
    variants[variant],
    sizes[size],
    fullWidth && "w-full",
    disabledStyles,
    className
  );

  if (asChild) {
    return (
      <div className={buttonClassName} {...props}>
        {children}
      </div>
    );
  }

  return (
    <button
      className={buttonClassName}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          {children}
        </>
      ) : (
        <>
          {leftIcon && <span className="mr-2">{leftIcon}</span>}
          {children}
          {rightIcon && <span className="ml-2">{rightIcon}</span>}
        </>
      )}
    </button>
  );
}
