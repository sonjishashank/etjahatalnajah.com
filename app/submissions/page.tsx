import { getUserSubmissions } from "@/lib/actions"
import { getUser } from "@/lib/auth"
import { redirect } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Eye, Printer } from "lucide-react"
import Link from "next/link"

export default async function SubmissionsPage() {
  const user = await getUser()

  if (!user) {
    redirect("/login")
  }

  const submissions = await getUserSubmissions()

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <img src="/images/company-header.png" alt="Company Header" className="mx-auto mb-4 max-w-md h-auto" />
          <h1 className="text-3xl font-bold text-gray-800">My Submissions</h1>
        </div>

        <div className="space-y-4">
          {submissions.length === 0 ? (
            <Card>
              <CardContent className="text-center py-8">
                <p className="text-gray-500 mb-4">No submissions found</p>
                <Link href="/submit">
                  <Button>Create New Submission</Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            submissions.map((submission: any) => (
              <Card key={submission.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">
                        {submission.plate_no} - {submission.vehicle_type}
                      </CardTitle>
                      <p className="text-sm text-gray-500">
                        Submitted on {new Date(submission.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <Badge variant={submission.vehicle_authorization === "complete" ? "default" : "destructive"}>
                      {submission.vehicle_authorization}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p>
                        <strong>Handover Date:</strong> {new Date(submission.handover_date).toLocaleDateString()}
                      </p>
                      <p>
                        <strong>Handover By:</strong> {submission.handover_by}
                      </p>
                      <p>
                        <strong>Takeover By:</strong> {submission.takeover_by}
                      </p>
                    </div>
                    <div>
                      <p>
                        <strong>ID No:</strong> {submission.id_no}
                      </p>
                      <p>
                        <strong>ODO Reading:</strong> {submission.odo_meter_reading}
                      </p>
                      <p>
                        <strong>Contact:</strong> {submission.contact_no}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Link href={`/submission/${submission.id}`}>
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                    </Link>
                    <Link href={`/print/${submission.id}`}>
                      <Button size="sm" variant="outline">
                        <Printer className="h-4 w-4 mr-2" />
                        Print
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
