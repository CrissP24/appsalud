import * as React from "react";
import { cn } from "@/lib/utils";

interface LifeButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "anchor";
  size?: "default" | "sm" | "lg";
  children: React.ReactNode;
}

const LifeButton = React.forwardRef<HTMLButtonElement, LifeButtonProps>(
  ({ className, variant = "primary", size = "default", children, ...props }, ref) => {
    const baseStyles = "font-sans font-medium transition-all duration-500 ease-out disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-primary/30";
    
    const variants = {
      primary: "bg-primary text-primary-foreground rounded-full hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]",
      secondary: "bg-secondary text-secondary-foreground rounded-full hover:bg-secondary/80 active:scale-[0.98]",
      ghost: "text-muted-foreground rounded-full hover:bg-muted hover:text-foreground",
      anchor: "bg-life-sage-light text-life-sage rounded-2xl hover:bg-life-sage hover:text-primary-foreground border border-life-sage/20",
    };
    
    const sizes = {
      default: "px-8 py-4 text-base",
      sm: "px-4 py-2 text-sm",
      lg: "px-10 py-5 text-lg",
    };
    
    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

LifeButton.displayName = "LifeButton";

export { LifeButton };
