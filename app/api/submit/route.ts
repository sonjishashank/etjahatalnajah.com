import { prisma } from "@/lib/database";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import path from "path";
import fs from "fs/promises";
import { v4 as uuid } from "uuid";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: corsHeaders,
    });
  }

  const formData = await req.formData();

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    return new Response(JSON.stringify({ error: "User not found" }), {
      status: 404,
      headers: corsHeaders,
    });
  }

  const saveFiles = async (fieldName: string) => {
    const files = formData.getAll(fieldName) as File[];
    const urls: string[] = [];

    for (const file of files) {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const filename = `${uuid()}-${file.name}`;
      const filePath = path.join(process.cwd(), "public/uploads", filename);
      await fs.writeFile(filePath, buffer);
      urls.push(`/uploads/${filename}`);
    }

    return urls;
  };

  const vehiclePictures = await saveFiles("vehicle_pictures");
  const accessoriesPictures = await saveFiles("accessories_pictures");

  const handover = await prisma.handover.create({
    data: {
      handoverDate: new Date(formData.get("handoverDate")!.toString()),
      plateNo: formData.get("plateNo")!.toString(),
      vehicleType: formData.get("vehicleType")!.toString(),
      handoverBy: formData.get("handoverBy")!.toString(),
      takeoverBy: formData.get("takeoverBy")!.toString(),
      idNo: parseInt(formData.get("idNo")!.toString(), 10),
      odoMeterReading: parseInt(formData.get("odoMeterReading")!.toString(), 10),
      registrationCard: formData.get("registrationCard") === "true",
      vehicleAuthorization: formData.get("vehicleAuthorization")!.toString(),
      authorizationRemarks: formData.get("authorizationRemarks")?.toString() ?? "",
      contactNo: formData.get("contactNo")!.toString(),
      handoverSignature: formData.get("handoverSignature")?.toString() ?? "",
      takeoverSignature: formData.get("takeoverSignature")?.toString() ?? "",
      vehiclePictures: JSON.stringify(vehiclePictures),
      accessoriesPictures: JSON.stringify(accessoriesPictures),
      userId: user.id,
    },
  });

  return new Response(JSON.stringify({ success: true, id: handover.id }), {
    headers: corsHeaders,
  });
}

export async function OPTIONS() {
  return new Response(null, {
    headers: corsHeaders,
  });
}
