import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    
    const handover = await prisma.handover.create({
      data: {
        handoverDate: new Date(formData.get('handoverDate') as string),
        plateNo: formData.get('plateNo') as string,
        vehicleType: formData.get('vehicleType') as string,
        handoverBy: formData.get('handoverBy') as string,
        takeoverBy: formData.get('takeoverBy') as string,
        idNo: parseInt(formData.get('idNo') as string),
        odoMeterReading: parseInt(formData.get('odoMeter') as string),
        registrationCard: formData.get('registrationCard') === 'yes',
        vehicleAuthorization: formData.get('vehicleAuthorization') as string,
        authorizationRemarks: formData.get('remarks') as string || null,
        contactNo: formData.get('contactNo') as string,
        // Set empty strings for file fields as requested
        vehiclePictures: '[]',
        accessoriesPictures: '[]',
        handoverSignature: '',
        takeoverSignature: '',
        // Use the authenticated user's ID
        userId: session.user.id
      }
    });

    return NextResponse.json({ success: true, handover });
  } catch (error) {
    console.error('Form processing error:', error);
    return NextResponse.json({ 
      error: "Form processing error", 
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
