"use client"

import { useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"

export function RouteDebug() {
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    console.log("Current pathname:", pathname)
    console.log("Router object:", router)
  }, [pathname, router])

  return (
    <div className="fixed bottom-4 right-4 bg-black text-white p-2 rounded text-xs opacity-50">
      Current route: {pathname}
    </div>
  )
}
