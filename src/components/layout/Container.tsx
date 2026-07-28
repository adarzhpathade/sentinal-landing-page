import React from "react";
import { cn } from "@/utils/cn";

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}

/**
 * Reusable layout container enforcing generous editorial horizontal padding and widescreen max-width.
 * Aligns content cleanly to the left edge without massive empty gutters on widescreen monitors,
 * matching the exact horizontal proportions of the reference design.
 */
export const Container: React.FC<ContainerProps> = ({
  children,
  className,
  as: Component = "div",
  ...props
}) => {
  return (
    <Component
      className={cn(
        "w-full px-4 sm:px-6 md:px-8",
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
};

Container.displayName = "Container";
