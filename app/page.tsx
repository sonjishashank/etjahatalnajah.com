"use client"

import { useSession } from "next-auth/react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LogoutButton } from "@/components/logout-button"
import { StorageNotice } from "@/components/storage-notice"

export default function HomePage() {
  const { data: session, status } = useSession()
  const loading = status === "loading"
  const user = session?.user

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="text-center flex-1">
            <div className="flex items-center justify-center mb-4">
              <div className="text-right mr-4">
                <h2 className="text-lg font-bold">شركة اتجاهات النجاح للمقاولات</h2>
                <p className="text-sm">ETJAHAT AL NAJAH CONTRACTING CO.</p>
              </div>
              <div className="w-16 h-16 bg-red-600 flex items-center justify-center text-white font-bold text-xl rounded">
                ETC
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-800">Vehicle Handover Management System</h1>
          </div>
          {user && (
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">Welcome, {user.name}</span>
              <LogoutButton />
            </div>
          )}
        </div>

        <StorageNotice />

        {loading ? (
          <div className="text-center py-8">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p>Loading...</p>
          </div>
        ) : user ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Submit New Form */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-xl text-blue-600">Submit New Form</CardTitle>
                <CardDescription>Create a new vehicle handover form</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/submit">
                  <Button className="w-full">Create New Submission</Button>
                </Link>
              </CardContent>
            </Card>

            {/* View Submissions */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-xl text-green-600">My Submissions</CardTitle>
                <CardDescription>View your submitted forms</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/submissions">
                  <Button variant="outline" className="w-full bg-transparent">
                    View Submissions
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Admin Panel */}
            {user.role === "admin" && (
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl text-red-600">Admin Panel</CardTitle>
                  <CardDescription>Manage all submissions and users</CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href="/admin">
                    <Button variant="destructive" className="w-full">
                      Admin Dashboard
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )}
          </div>
        ) : (
          <div className="text-center">
            <Card className="max-w-md mx-auto">
              <CardHeader>
                <CardTitle>Welcome</CardTitle>
                <CardDescription>Please login to access the vehicle handover system</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/login">
                  <Button className="w-full">Login</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
