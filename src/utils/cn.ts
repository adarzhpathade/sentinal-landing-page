import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Reusable class merging utility combining clsx and tailwind-merge.
 * Resolves Tailwind class conflicts while allowing conditional styles.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
