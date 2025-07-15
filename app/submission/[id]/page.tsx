import { getSubmissionById } from "@/lib/actions"
import { getUser } from "@/lib/auth"
import { redirect } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Printer, ArrowLeft } from "lucide-react"
import Link from "next/link"

interface SubmissionPageProps {
  params: {
    id: string
  }
}

export default async function SubmissionPage({ params }: SubmissionPageProps) {
  const user = await getUser()

  if (!user) {
    redirect("/login")
  }

  const submission = await getSubmissionById(Number.parseInt(params.id))

  if (!submission) {
    redirect("/submissions")
  }

  // Check if user owns the submission or is admin
  if (submission.user_id !== user.id && user.role !== "admin") {
    redirect("/submissions")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href={user.role === "admin" ? "/admin" : "/submissions"}>
            <Button variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </Link>
        </div>

        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-2xl">Vehicle Handover Details</CardTitle>
                <p className="text-gray-500">Submission ID: {submission.id}</p>
              </div>
              <div className="flex gap-2">
                <Badge variant={submission.vehicle_authorization === "complete" ? "default" : "destructive"}>
                  {submission.vehicle_authorization}
                </Badge>
                <Link href={`/print/${submission.id}`}>
                  <Button size="sm">
                    <Printer className="h-4 w-4 mr-2" />
                    Print
                  </Button>
                </Link>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Basic Information */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-3">Vehicle Information</h3>
                <div className="space-y-2">
                  <p>
                    <strong>Plate No:</strong> {submission.plate_no}
                  </p>
                  <p>
                    <strong>Vehicle Type:</strong> {submission.vehicle_type}
                  </p>
                  <p>
                    <strong>Handover Date:</strong> {new Date(submission.handover_date).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>ODO Meter Reading:</strong> {submission.odo_meter_reading}
                  </p>
                  <p>
                    <strong>Registration Card:</strong> {submission.registration_card}
                  </p>
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-3">Personnel Information</h3>
                <div className="space-y-2">
                  <p>
                    <strong>Handover By:</strong> {submission.handover_by}
                  </p>
                  <p>
                    <strong>Takeover By:</strong> {submission.takeover_by}
                  </p>
                  <p>
                    <strong>ID No:</strong> {submission.id_no}
                  </p>
                  <p>
                    <strong>Contact No:</strong> {submission.contact_no}
                  </p>
                  <p>
                    <strong>Submitted By:</strong> {submission.user_name} ({submission.user_email})
                  </p>
                </div>
              </div>
            </div>

            {/* Remarks */}
            {submission.remarks && (
              <div>
                <h3 className="font-semibold mb-3">Remarks</h3>
                <p className="bg-gray-50 p-3 rounded">{submission.remarks}</p>
              </div>
            )}

            {/* Vehicle Pictures */}
            {submission.vehicle_pictures && submission.vehicle_pictures.length > 0 && (
              <div>
                <h3 className="font-semibold mb-3">Vehicle Pictures</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {submission.vehicle_pictures.map((picture: string, index: number) => (
                    <img
                      key={index}
                      src={picture || "/placeholder.svg"}
                      alt={`Vehicle ${index + 1}`}
                      className="w-full h-32 object-cover rounded border"
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Accessories Pictures */}
            {submission.accessories_pictures && submission.accessories_pictures.length > 0 && (
              <div>
                <h3 className="font-semibold mb-3">Accessories Pictures</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {submission.accessories_pictures.map((picture: string, index: number) => (
                    <img
                      key={index}
                      src={picture || "/placeholder.svg"}
                      alt={`Accessory ${index + 1}`}
                      className="w-full h-32 object-cover rounded border"
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Signatures */}
            <div>
              <h3 className="font-semibold mb-3">Signatures</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-2">Handover By</h4>
                  {submission.handover_signature ? (
                    <img
                      src={submission.handover_signature || "/placeholder.svg"}
                      alt="Handover Signature"
                      className="border rounded p-2 bg-white max-h-32"
                    />
                  ) : (
                    <p className="text-gray-500">No signature provided</p>
                  )}
                </div>
                <div>
                  <h4 className="font-medium mb-2">Takeover By</h4>
                  {submission.takeover_signature ? (
                    <img
                      src={submission.takeover_signature || "/placeholder.svg"}
                      alt="Takeover Signature"
                      className="border rounded p-2 bg-white max-h-32"
                    />
                  ) : (
                    <p className="text-gray-500">No signature provided</p>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
