"use client"

import { useEffect } from "react"

interface PrintableFormProps {
  submission: any
}

export function PrintableForm({ submission }: PrintableFormProps) {
  useEffect(() => {
    // Auto-print when component loads
    const timer = setTimeout(() => {
      window.print()
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-white p-8 print:p-0">
      <div className="max-w-4xl mx-auto">
        {/* Company Header */}
        <div className="text-center mb-8 border-b-2 border-black pb-4">
          <div className="flex items-center justify-center mb-4">
            <div className="text-right mr-4">
              <h2 className="text-lg font-bold">شركة اتجاهات النجاح للمقاولات</h2>
              <p className="text-sm">ETJAHAT AL NAJAH CONTRACTING CO.</p>
            </div>
            <div className="w-16 h-16 bg-red-600 flex items-center justify-center text-white font-bold text-xl">
              ETC
            </div>
          </div>
          <h1 className="text-2xl font-bold underline">VEHICLE HAND OVER TAKE OVER FORM</h1>
          <div className="text-right mt-2">
            <span className="font-semibold">Date: {new Date(submission.handover_date).toLocaleDateString()}</span>
          </div>
        </div>

        {/* Form Content */}
        <div className="space-y-6">
          {/* Vehicle Information Table */}
          <table className="w-full border-collapse border border-black text-sm">
            <tbody>
              <tr>
                <td className="border border-black p-2 font-semibold bg-gray-100 w-1/3">Region / Branch</td>
                <td className="border border-black p-2"></td>
              </tr>
              <tr>
                <td className="border border-black p-2 font-semibold bg-gray-100">Vehicle Number</td>
                <td className="border border-black p-2">{submission.plate_no}</td>
              </tr>
              <tr>
                <td className="border border-black p-2 font-semibold bg-gray-100">Vehicle Type</td>
                <td className="border border-black p-2">{submission.vehicle_type}</td>
              </tr>
              <tr>
                <td className="border border-black p-2 font-semibold bg-gray-100">Insurance Valid Till</td>
                <td className="border border-black p-2"></td>
              </tr>
              <tr>
                <td className="border border-black p-2 font-semibold bg-gray-100">Registration Valid Till</td>
                <td className="border border-black p-2">{submission.registration_card}</td>
              </tr>
              <tr>
                <td className="border border-black p-2 font-semibold bg-gray-100">Take Over by (Name)</td>
                <td className="border border-black p-2">{submission.takeover_by}</td>
              </tr>
              <tr>
                <td className="border border-black p-2 font-semibold bg-gray-100">Document provided</td>
                <td className="border border-black p-2">{submission.vehicle_authorization}</td>
              </tr>
              <tr>
                <td className="border border-black p-2 font-semibold bg-gray-100">ID Number</td>
                <td className="border border-black p-2">{submission.id_no}</td>
              </tr>
              <tr>
                <td className="border border-black p-2 font-semibold bg-gray-100">ODO Meter Reading</td>
                <td className="border border-black p-2">{submission.odo_meter_reading}</td>
              </tr>
              <tr>
                <td className="border border-black p-2 font-semibold bg-gray-100">PABX Extension</td>
                <td className="border border-black p-2">{submission.contact_no}</td>
              </tr>
            </tbody>
          </table>

          {/* Notes Section */}
          <div>
            <h3 className="font-semibold mb-2">Notes:</h3>
            <div className="border border-black min-h-[100px] p-2">{submission.remarks || ""}</div>
          </div>

          {/* Vehicle Diagram Placeholder */}
          <div className="text-center my-8">
            <div className="border border-black p-4 bg-gray-50">
              <p className="text-sm text-gray-600 mb-4">Vehicle Inspection Diagram</p>
              <div className="grid grid-cols-2 gap-4">
                <div className="border border-gray-400 h-32 flex items-center justify-center">
                  <span className="text-xs">Front View</span>
                </div>
                <div className="border border-gray-400 h-32 flex items-center justify-center">
                  <span className="text-xs">Rear View</span>
                </div>
                <div className="border border-gray-400 h-32 flex items-center justify-center">
                  <span className="text-xs">Left Side</span>
                </div>
                <div className="border border-gray-400 h-32 flex items-center justify-center">
                  <span className="text-xs">Right Side</span>
                </div>
              </div>
            </div>
          </div>

          {/* Vehicle Images */}
          {submission.vehicle_pictures && submission.vehicle_pictures.length > 0 && (
            <div className="print:break-inside-avoid">
              <h3 className="font-semibold mb-2">Vehicle Pictures:</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {submission.vehicle_pictures.slice(0, 6).map((picture: string, index: number) => (
                  <img
                    key={index}
                    src={picture || "/placeholder.svg"}
                    alt={`Vehicle ${index + 1}`}
                    className="w-full h-24 object-cover border border-black"
                  />
                ))}
              </div>
            </div>
          )}

          {/* Accessories Images */}
          {submission.accessories_pictures && submission.accessories_pictures.length > 0 && (
            <div className="print:break-inside-avoid">
              <h3 className="font-semibold mb-2">Accessories Pictures:</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {submission.accessories_pictures.slice(0, 6).map((picture: string, index: number) => (
                  <img
                    key={index}
                    src={picture || "/placeholder.svg"}
                    alt={`Accessory ${index + 1}`}
                    className="w-full h-24 object-cover border border-black"
                  />
                ))}
              </div>
            </div>
          )}

          {/* Signatures */}
          <div className="grid grid-cols-3 gap-8 mt-12 print:break-inside-avoid">
            <div className="text-center">
              <div className="border-b border-black pb-2 mb-2 h-20 flex items-end justify-center">
                {submission.handover_signature && (
                  <img
                    src={submission.handover_signature || "/placeholder.svg"}
                    alt="Handover Signature"
                    className="max-h-16 max-w-full"
                  />
                )}
              </div>
              <p className="font-semibold">HAND OVER BY</p>
              <p className="text-sm">{submission.handover_by}</p>
            </div>

            <div className="text-center">
              <div className="border-b border-black pb-2 mb-2 h-20 flex items-end justify-center">
                {submission.takeover_signature && (
                  <img
                    src={submission.takeover_signature || "/placeholder.svg"}
                    alt="Takeover Signature"
                    className="max-h-16 max-w-full"
                  />
                )}
              </div>
              <p className="font-semibold">TAKE OVER BY</p>
              <p className="text-sm">{submission.takeover_by}</p>
            </div>

            <div className="text-center">
              <div className="border-b border-black pb-2 mb-2 h-20"></div>
              <p className="font-semibold">ADMINISTRATION</p>
            </div>
          </div>
        </div>
      </div>

      {/* Print Styles */}
      <style jsx>{`
        @media print {
          body { margin: 0; }
          .print\\:p-0 { padding: 0 !important; }
          .print\\:break-inside-avoid { break-inside: avoid; }
        }
      `}</style>
    </div>
  )
}
