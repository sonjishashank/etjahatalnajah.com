"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { ImageUpload } from "@/components/image-upload"
import { SignatureCanvas } from "@/components/signature-canvas"
import { useToast } from "@/hooks/use-toast"

const vehicleTypes = [
  "BACKHOE LOADER", "BOOM TRUCK", "BUS", "COASTER", "DIESEL TANKER", "DYNA IPV", "DYNA TRUCK",
  "FLAT BED TRAILER", "FOOD TRUCK", "FORKLIFT", "MINIBUS", "POTABLE WT", "SKID STEER LOADER",
  "SUV", "TOW TRUCK", "WATER TANKER", "SEDAN", "MOBILE CRANE", "CHAIN EXCAVATOR",
  "WHEEL EXCAVATOR", "WHEEL LOADER", "TELEHANDLER", "LOW BED TRAILER", "PICKUP", "ROLLER COMPACTOR",
]

export function VehicleHandoverForm() {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    handoverDate: "",
    plateNo: "",
    vehicleType: "",
    handoverBy: "",
    takeoverBy: "",
    idNo: "",
    odoMeterReading: "",
    registrationCard: "",
    vehicleAuthorization: "",
    authorizationRemarks: "",
    contactNo: "",
  })
  const [vehicleFiles, setVehicleFiles] = useState<File[]>([])
  const [accessoriesFiles, setAccessoriesFiles] = useState<File[]>([])
  const [handoverSignature, setHandoverSignature] = useState("")
  const [takeoverSignature, setTakeoverSignature] = useState("")

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const requiredFields = [
        "handoverDate", "plateNo", "vehicleType", "handoverBy", "takeoverBy",
        "idNo", "odoMeterReading", "registrationCard", "vehicleAuthorization", "contactNo"
      ]
      for (const field of requiredFields) {
        if (!formData[field as keyof typeof formData]) {
          throw new Error("Missing required fields.")
        }
      }

      const submissionData = new FormData()
      submissionData.append("handoverDate", formData.handoverDate)
      submissionData.append("plateNo", formData.plateNo)
      submissionData.append("vehicleType", formData.vehicleType)
      submissionData.append("handoverBy", formData.handoverBy)
      submissionData.append("takeoverBy", formData.takeoverBy)
      submissionData.append("idNo", formData.idNo)
      submissionData.append("odoMeterReading", formData.odoMeterReading)
      submissionData.append("registrationCard", formData.registrationCard === "yes" ? "true" : "false")
      submissionData.append("vehicleAuthorization", formData.vehicleAuthorization)
      submissionData.append("authorizationRemarks", formData.authorizationRemarks || "")
      submissionData.append("contactNo", formData.contactNo)

      vehicleFiles.forEach((file) => submissionData.append("vehicle_pictures", file))
      accessoriesFiles.forEach((file) => submissionData.append("accessories_pictures", file))

      if (handoverSignature) submissionData.append("handoverSignature", handoverSignature)
      if (takeoverSignature) submissionData.append("takeoverSignature", takeoverSignature)

      const response = await fetch("/api/submit", {
        method: "POST",
        body: submissionData,
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "Submission failed")
      }

      toast({ title: "Success", description: "Form submitted successfully" })
      router.push("/")
    } catch (error: any) {
      console.error("Submission error:", error)
      toast({ title: "Error", description: error.message || "Submission failed", variant: "destructive" })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Vehicle Handover Form</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="handoverDate">Handover Date</Label>
              <Input
                id="handoverDate"
                type="date"
                value={formData.handoverDate}
                onChange={(e) => handleInputChange("handoverDate", e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="plateNo">Plate No</Label>
              <Input
                id="plateNo"
                placeholder="1111-AAA"
                value={formData.plateNo}
                onChange={(e) => handleInputChange("plateNo", e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="vehicleType">Vehicle Type</Label>
            <Select value={formData.vehicleType} onValueChange={(value) => handleInputChange("vehicleType", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select vehicle type" />
              </SelectTrigger>
              <SelectContent>
                {vehicleTypes.map((type) => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="handoverBy">Handover By</Label>
              <Input
                id="handoverBy"
                value={formData.handoverBy}
                onChange={(e) => handleInputChange("handoverBy", e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="takeoverBy">Takeover By</Label>
              <Input
                id="takeoverBy"
                value={formData.takeoverBy}
                onChange={(e) => handleInputChange("takeoverBy", e.target.value)}
                required
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="idNo">ID No.</Label>
              <Input
                id="idNo"
                type="number"
                value={formData.idNo}
                onChange={(e) => handleInputChange("idNo", e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="odoMeterReading">ODO Meter Reading</Label>
              <Input
                id="odoMeterReading"
                type="number"
                value={formData.odoMeterReading}
                onChange={(e) => handleInputChange("odoMeterReading", e.target.value)}
                required
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="registrationCard">Registration Card</Label>
              <Select
                value={formData.registrationCard}
                onValueChange={(value) => handleInputChange("registrationCard", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="yes">Yes</SelectItem>
                  <SelectItem value="no">No</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="vehicleAuthorization">Vehicle Authorization</Label>
              <Select
                value={formData.vehicleAuthorization}
                onValueChange={(value) => handleInputChange("vehicleAuthorization", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="complete">Complete</SelectItem>
                  <SelectItem value="incomplete">Incomplete</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {formData.vehicleAuthorization === "incomplete" && (
            <div>
              <Label htmlFor="authorizationRemarks">Remarks for Incomplete</Label>
              <Textarea
                id="authorizationRemarks"
                value={formData.authorizationRemarks}
                onChange={(e) => handleInputChange("authorizationRemarks", e.target.value)}
                placeholder="Enter remarks for incomplete authorization"
              />
            </div>
          )}

          <div>
            <Label htmlFor="contactNo">Contact No.</Label>
            <Input
              id="contactNo"
              type="number"
              value={formData.contactNo}
              onChange={(e) => handleInputChange("contactNo", e.target.value)}
              required
            />
          </div>

          <div>
            <Label>Vehicle Pictures (Maximum 10 Photos)</Label>
            <ImageUpload maxFiles={10} onImagesChange={setVehicleFiles} accept="image/*" />
          </div>

          <div>
            <Label>Accessories Pictures (Maximum 5 Photos)</Label>
            <ImageUpload maxFiles={5} onImagesChange={setAccessoriesFiles} accept="image/*" />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Label>Handover By Signature</Label>
              <SignatureCanvas onSignatureChange={setHandoverSignature} width={300} height={150} />
            </div>
            <div>
              <Label>Takeover By Signature</Label>
              <SignatureCanvas onSignatureChange={setTakeoverSignature} width={300} height={150} />
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Form"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
