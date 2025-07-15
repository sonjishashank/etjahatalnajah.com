import { PrintableForm } from "@/components/printable-form"
import { getSubmissionById } from "@/lib/actions"
import { getUser } from "@/lib/auth"
import { redirect } from "next/navigation"

interface PrintPageProps {
  params: {
    id: string
  }
}

export default async function PrintPage({ params }: PrintPageProps) {
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

  return <PrintableForm submission={submission} />
}
