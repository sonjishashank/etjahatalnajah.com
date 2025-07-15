"use client"

import { useSession } from "next-auth/react"
import type React from "react"

interface AuthWrapperProps {
  children: (user: any, loading: boolean, error?: string) => React.ReactNode
}

export function AuthWrapper({ children }: AuthWrapperProps) {
  const { data: session, status } = useSession()

  const loading = status === "loading"
  const user = session?.user || null

  return <>{children(user, loading)}</>
}
