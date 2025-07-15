import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Utility function to safely parse image arrays
export function safeParseImageArray(data: any): string[] {
  if (Array.isArray(data)) {
    return data
  }

  if (typeof data === "string") {
    try {
      const parsed = JSON.parse(data)
      return Array.isArray(parsed) ? parsed : []
    } catch {
      return []
    }
  }

  return []
}

// Utility function to safely stringify image arrays
export function safeStringifyImageArray(data: any): string {
  if (Array.isArray(data)) {
    return JSON.stringify(data)
  }

  return JSON.stringify([])
}
