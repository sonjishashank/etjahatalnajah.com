"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Info, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function StorageNotice() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const hasSeenNotice = localStorage.getItem("hasSeenStorageNotice")
    if (!hasSeenNotice) {
      setIsVisible(true)
    }
  }, [])

  const handleDismiss = () => {
    localStorage.setItem("hasSeenStorageNotice", "true")
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <Card className="mb-6 border-blue-200 bg-blue-50">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <Info className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <h3 className="font-semibold text-blue-900 mb-1">Preview Mode - Google OAuth Enabled</h3>
            <p className="text-sm text-blue-800 mb-3">
              This preview uses Google OAuth for authentication and local storage for data. Sign in with your Google
              account to test the system.
            </p>
            <p className="text-xs text-blue-700">
              For production, the system will automatically create user accounts on first Google sign-in.
            </p>
          </div>
          <Button variant="ghost" size="sm" onClick={handleDismiss} className="text-blue-600 hover:text-blue-800 p-1">
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
