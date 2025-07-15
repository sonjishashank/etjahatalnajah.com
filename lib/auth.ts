// Simplified auth implementation for v0 preview
// In production, use NextAuth.js or your preferred auth solution

import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

export interface User {
  id: number
  email: string
  name: string
  role: "user" | "admin"
}

// Simple session management for preview
export async function getUser(): Promise<User | null> {
  if (typeof window === "undefined") {
    // Server-side: use NextAuth.js for session management
    const session = await getServerSession(authOptions)
    return session?.user || null
  }

  try {
    const userSession = localStorage.getItem("userSession")
    if (!userSession) return null

    const session = JSON.parse(userSession)

    // Check if session is expired (24 hours)
    if (new Date(session.expires) < new Date()) {
      localStorage.removeItem("userSession")
      return null
    }

    return session.user
  } catch (error) {
    console.error("Error getting user:", error)
    return null
  }
}

export async function createUserSession(user: User): Promise<void> {
  if (typeof window === "undefined") return

  const session = {
    user,
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours
  }

  localStorage.setItem("userSession", JSON.stringify(session))
}

export async function clearUserSession(): Promise<void> {
  if (typeof window === "undefined") return
  localStorage.removeItem("userSession")
}

// Legacy functions for compatibility
export async function createSession(userId: number): Promise<string> {
  return "session-" + userId
}

export async function deleteSession(sessionId: string): Promise<void> {
  await clearUserSession()
}
