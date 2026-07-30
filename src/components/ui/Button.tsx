"use client";

import React from "react";
import { cn } from "@/utils/cn";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "black";
  withSquareIcon?: boolean;
  href?: string;
  children: React.ReactNode;
  className?: string;
}

/**
 * Reusable Button component matching the exact visual styling of the uploaded reference design.
 * Primary buttons feature sharp rectangular corners, bright orange (#FB460D) fill, dark black text,
 * and an attached square icon box separated by a clean 2px gap.
 */
export const Button = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>(
  (
    {
      variant = "primary",
      withSquareIcon = false,
      href,
      children,
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FB460D] focus-visible:ring-offset-2 focus-visible:ring-offset-[#141314] disabled:opacity-50 disabled:pointer-events-none select-none rounded-none";

    const variantStyles = {
      primary:
        "bg-[#FB460D] text-[#141314] hover:bg-[#FF5C26] px-10 py-2 text-xs sm:text-sm tracking-normal uppercase font-mono font-normal",
      black:
        "bg-[#141314] text-white hover:bg-[#000000] px-10 py-2 text-xs sm:text-sm tracking-normal uppercase font-mono font-normal",
      secondary:
        "group relative text-white hover:text-white/90 py-1 text-sm sm:text-base font-mono font-normal",
      outline:
        "border border-white/20 text-white hover:border-white/50 px-10 py-2 text-xs sm:text-sm tracking-normal uppercase font-mono font-normal",
    };

    const content = (
      <>
        <span>{children}</span>
        {variant === "secondary" && (
          <span
            className="absolute bottom-0 left-0 h-[1px] w-full overflow-hidden"
            aria-hidden="true"
          >
            {/* Dim line starts immediately on hover (delay-0), waits on unhover (delay-240ms) */}
            <span className="absolute inset-0 bg-white/50 transition-transform delay-[240ms] duration-300 ease-out group-hover:translate-x-full group-hover:delay-0" />
            {/* Bright line waits on hover (delay-240ms), exits immediately on unhover (delay-0) */}
            <span className="absolute inset-0 -translate-x-full bg-white transition-transform delay-0 duration-300 ease-out group-hover:translate-x-0 group-hover:delay-[240ms]" />
          </span>
        )}
      </>
    );

    const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (href && href.startsWith("#")) {
        e.preventDefault();
        const targetId = href.substring(1);
        const targetEl = document.getElementById(targetId);
        
        const l = (window as unknown as { lenis?: { scrollTo: (target: HTMLElement | string | number, opts: { duration: number; easing: (t: number) => number }) => void } }).lenis;
        
        if (l && targetEl) {
          l.scrollTo(targetEl, { duration: 2.5, easing: (t: number) => 1 - Math.pow(1 - t, 4) });
        } else if (targetEl) {
          targetEl.scrollIntoView({ behavior: "smooth" });
        }
      }
      if (props.onClick) {
        (props.onClick as unknown as React.MouseEventHandler<HTMLAnchorElement>)(e);
      }
    };

    // If withSquareIcon is enabled for primary or black buttons (signature two-block CTA layout)
    if ((variant === "primary" || variant === "black") && withSquareIcon) {
      const wrapperClasses = cn("inline-flex items-stretch group", className);
      const isBlack = variant === "black";
      const iconBgClass = isBlack 
        ? "bg-[#141314] text-white group-hover:bg-[#000000] hover:bg-[#000000]" 
        : "bg-[#FB460D] text-[#141314] group-hover:bg-[#FF5C26] hover:bg-[#FF5C26]";
      const focusRingClass = isBlack
        ? "focus-visible:ring-[#141314]"
        : "focus-visible:ring-[#FB460D]";

      if (href) {
        return (
          <a
            href={href}
            ref={ref as React.Ref<HTMLAnchorElement>}
            className={wrapperClasses}
            aria-label={typeof children === "string" ? children : "Action"}
            onClick={handleAnchorClick}
          >
            {/* Left Square (Appears on Hover) */}
            <span
              className={cn("mr-0 flex w-0 items-center justify-center overflow-hidden rounded-none transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:mr-1 group-hover:w-9", iconBgClass)}
              aria-hidden="true"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="min-w-[14px] -translate-x-full -rotate-180 transform transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0 group-hover:rotate-0"
              >
                <path
                  d="M7 2V9.5M4 6.5L7 9.5L10 6.5M2.5 12H11.5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="square"
                  strokeLinejoin="miter"
                />
              </svg>
            </span>

            {/* Main Button Content */}
            <span
              className={cn(
                baseStyles,
                variantStyles[variant],
                "h-full flex-1 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
              )}
            >
              {children}
            </span>

            {/* Right Square (Disappears on Hover) */}
            <span
              className={cn("ml-1 flex w-9 items-center justify-center overflow-hidden rounded-none transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:ml-0 group-hover:w-0", iconBgClass)}
              aria-hidden="true"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="min-w-[14px] translate-x-0 rotate-0 transform transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-full group-hover:rotate-180"
              >
                <path
                  d="M7 2V9.5M4 6.5L7 9.5L10 6.5M2.5 12H11.5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="square"
                  strokeLinejoin="miter"
                />
              </svg>
            </span>
          </a>
        );
      }

      return (
        <div className={wrapperClasses}>
          {/* Left Square (Appears on Hover) */}
          <button
            type="button"
            className={cn("mr-0 flex w-0 items-center justify-center overflow-hidden rounded-none transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:mr-1 group-hover:w-9 focus-visible:ring-2 focus-visible:outline-none", iconBgClass, focusRingClass)}
            disabled={disabled}
            aria-hidden="true"
            tabIndex={-1}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="min-w-[14px] -translate-x-full -rotate-180 transform transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0 group-hover:rotate-0"
            >
              <path
                d="M7 2V9.5M4 6.5L7 9.5L10 6.5M2.5 12H11.5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="square"
                strokeLinejoin="miter"
              />
            </svg>
          </button>

          {/* Main Button Content */}
          <button
            ref={ref as React.Ref<HTMLButtonElement>}
            className={cn(
              baseStyles,
              variantStyles[variant],
              "h-full flex-1 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
            )}
            disabled={disabled}
            {...props}
          >
            {children}
          </button>

          {/* Right Square (Disappears on Hover) */}
          <button
            type="button"
            className={cn("ml-1 flex w-9 items-center justify-center overflow-hidden rounded-none transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:ml-0 group-hover:w-0 focus-visible:ring-2 focus-visible:outline-none", iconBgClass, focusRingClass)}
            disabled={disabled}
            aria-hidden="true"
            tabIndex={-1}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="min-w-[14px] translate-x-0 rotate-0 transform transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-full group-hover:rotate-180"
            >
              <path
                d="M7 2V9.5M4 6.5L7 9.5L10 6.5M2.5 12H11.5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="square"
                strokeLinejoin="miter"
              />
            </svg>
          </button>
        </div>
      );
    }

    if (href) {
      return (
        <a
          href={href}
          ref={ref as React.Ref<HTMLAnchorElement>}
          className={cn(baseStyles, variantStyles[variant], className)}
          onClick={handleAnchorClick}
        >
          {content}
        </a>
      );
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        className={cn(baseStyles, variantStyles[variant], className)}
        disabled={disabled}
        {...props}
      >
        {content}
      </button>
    );
  }
);

Button.displayName = "Button";
