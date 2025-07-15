"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { GoogleAuth } from "@/components/google-auth"

export function LoginForm() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Sign in with your Google account to access the system</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <GoogleAuth />

        <div className="mt-4 text-sm text-gray-600 text-center">
          <p>By signing in, you agree to our terms of service</p>
        </div>
      </CardContent>
    </Card>
  )
}
