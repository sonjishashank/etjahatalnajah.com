"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Eye, Printer } from "lucide-react"
import Link from "next/link"

interface Submission {
  id: number
  user_id: number
  user_name: string
  user_email: string
  handover_date: string
  plate_no: string
  vehicle_type: string
  handover_by: string
  takeover_by: string
  vehicle_authorization: string
  created_at: string
}

export function AdminPanel() {
  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchSubmissions()
  }, [])

  const fetchSubmissions = async () => {
    try {
      const response = await fetch("/api/submissions")
      const data = await response.json()
      setSubmissions(data)
    } catch (error) {
      console.error("Failed to fetch submissions:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="text-center py-8">Loading submissions...</div>
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>All Submissions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Plate No</TableHead>
                  <TableHead>Vehicle Type</TableHead>
                  <TableHead>Submitted By</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {submissions.map((submission) => (
                  <TableRow key={submission.id}>
                    <TableCell>{submission.id}</TableCell>
                    <TableCell>{new Date(submission.handover_date).toLocaleDateString()}</TableCell>
                    <TableCell>{submission.plate_no}</TableCell>
                    <TableCell className="max-w-32 truncate">{submission.vehicle_type}</TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{submission.user_name}</div>
                        <div className="text-sm text-gray-500">{submission.user_email}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={submission.vehicle_authorization === "complete" ? "default" : "destructive"}>
                        {submission.vehicle_authorization}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Link href={`/submission/${submission.id}`}>
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Link href={`/print/${submission.id}`}>
                          <Button size="sm" variant="outline">
                            <Printer className="h-4 w-4" />
                          </Button>
                        </Link>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
