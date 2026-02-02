import * as React from "react";
import { cn } from "@/lib/utils";

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
  centered?: boolean;
}

export function PageContainer({ children, className, centered = false }: PageContainerProps) {
  return (
    <div
      className={cn(
        "min-h-screen bg-background",
        centered && "flex items-center justify-center",
        className
      )}
    >
      <div className="max-w-md mx-auto px-6 py-8 w-full">
        {children}
      </div>
    </div>
  );
}
