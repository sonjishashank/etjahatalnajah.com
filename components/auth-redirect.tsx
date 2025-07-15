"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import type { User } from "@/lib/auth"

interface AuthRedirectProps {
  user: User
  from?: string
}

export function AuthRedirect({ user, from = "/login" }: AuthRedirectProps) {
  const router = useRouter()

  useEffect(() => {
    if (user) {
      // Determine redirect URL based on user role
      let redirectUrl = "/"

      if (user.role === "admin") {
        redirectUrl = "/admin"
      }

      // Add a small delay to ensure the session is properly set
      setTimeout(() => {
        router.replace(redirectUrl)
      }, 100)
    }
  }, [user, router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="text-center">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-600">Redirecting to dashboard...</p>
      </div>
    </div>
  )
}
