import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { formatDistanceToNow as formatDistanceToNowFns, parseISO } from 'date-fns';


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


/**
 * Formats an ISO date string to a relative time string (e.g., "2 hours ago").
 * @param dateString - The ISO date string.
 * @returns A formatted relative time string.
 */
export function formatDistanceToNow(dateString: string): string {
  try {
    const date = parseISO(dateString);
    return formatDistanceToNowFns(date, { addSuffix: true });
  } catch (error) {
    console.error("Error parsing date:", dateString, error);
    return "Invalid date";
  }
}
