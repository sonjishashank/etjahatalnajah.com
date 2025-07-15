import { AdminPanel } from "@/components/admin-panel"
import { getUser } from "@/lib/auth"
import { redirect } from "next/navigation"

export default async function AdminPage() {
  const user = await getUser()

  if (!user || user.role !== "admin") {
    redirect("/")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <img src="/images/company-header.png" alt="Company Header" className="mx-auto mb-4 max-w-md h-auto" />
          <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
        </div>
        <AdminPanel />
      </div>
    </div>
  )
}
