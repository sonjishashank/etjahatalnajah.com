"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { LoginForm } from "@/components/login-form"

export default function LoginPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (session?.user) {
      // Redirect based on user role
      if (session.user.role === "admin") {
        router.push("/admin")
      } else {
        router.push("/")
      }
    }
  }, [session, router])

  // Loading state
  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  // User is logged in - show loading while redirecting
  if (session?.user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Redirecting...</p>
        </div>
      </div>
    )
  }

  // Show login form for unauthenticated users
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="text-right mr-4">
              <h2 className="text-lg font-bold">شركة اتجاهات النجاح للمقاولات</h2>
              <p className="text-sm">ETJAHAT AL NAJAH CONTRACTING CO.</p>
            </div>
            <div className="w-16 h-16 bg-red-600 flex items-center justify-center text-white font-bold text-xl rounded">
              ETC
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Login to System</h1>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}
