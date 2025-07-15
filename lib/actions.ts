"use server"
import { query } from "./database"
import { safeParseImageArray } from "./utils"
import { prisma } from './database';

// Client-side auth check helper
async function getCurrentUser() {
  if (typeof window !== "undefined") {
    const { getUser } = await import("./auth")
    return await getUser()
  }
  return null
}

// Replace existing query with:
export const submitVehicleForm = async (formData: FormData) => {
  try {
    // Convert FormData to plain object
    const data = Object.fromEntries(Array.from(formData.entries()));
    
    // Ensure required fields are present
    if (!data.plateNo) {
      throw new Error('Plate number is required');
    }

    const currentDate = new Date();
    const vehiclePictures = data.vehiclePictures ? JSON.parse(data.vehiclePictures as string) : [];
    const accessoriesPictures = data.accessoriesPictures ? JSON.parse(data.accessoriesPictures as string) : [];

    // Convert empty strings to null for optional fields
    const nullIfEmpty = (value: string) => value === '' ? null : value;

    await prisma.handover.create({
      data: {
        plateNo: data.plateNo as string,
        vehicleType: nullIfEmpty(data.vehicleType as string),
        idNo: data.idNo ? parseInt(data.idNo as string) : 0,
        odoMeterReading: data.odoMeterReading ? parseInt(data.odoMeterReading as string) : 0,
        registrationCard: data.registrationCard === 'true',
        vehicleAuthorization: nullIfEmpty(data.vehicleAuthorization as string),
        authorizationRemarks: nullIfEmpty(data.authorizationRemarks as string),
        contactNo: nullIfEmpty(data.contactNo as string),
        vehiclePictures,
        accessoriesPictures,
        handoverSignature: nullIfEmpty(data.handoverSignature as string),
        takeoverSignature: nullIfEmpty(data.takeoverSignature as string),
        userId: data.userId as string,
        handoverDate: data.handoverDate ? new Date(data.handoverDate as string) : currentDate,
        handoverBy: nullIfEmpty(data.handoverBy as string),
        takeoverBy: nullIfEmpty(data.takeoverBy as string)
      }
    });
  } catch (error) {
    console.error("Submit form error:", error);
    throw error;
  }
};

export async function getUserSubmissions(userId: string) { // Change number to string
  try {
    const submissions = await query(
      `
      SELECT * FROM handovers 
      WHERE userId = ? 
      ORDER BY createdAt DESC
    `,
      [userId],
    )

    return submissions.map((submission) => ({
      ...submission,
      vehiclePictures: safeParseImageArray(submission.vehiclePictures),
      accessoriesPictures: safeParseImageArray(submission.accessoriesPictures),
    }))
  } catch (error) {
    console.error("Get submissions error:", error)
    throw new Error("Failed to get submissions")
  }
}

export async function getSubmissionById(id: string) { // Change number to string
  try {
    const submissions = await query(
      `
      SELECT h.*, u.name as userName, u.email as userEmail
      FROM handovers h
      JOIN users u ON h.userId = u.id
      WHERE h.id = ?
    `,
      [id],
    )

    if (submissions.length === 0) {
      return null
    }

    const submission = submissions[0]
    return {
      ...submission,
      vehicle_pictures: safeParseImageArray(submission.vehicle_pictures),
      accessories_pictures: safeParseImageArray(submission.accessories_pictures),
    }
  } catch (error) {
    console.error("Get submission error:", error)
    throw new Error("Failed to get submission")
  }
}

export const getAllSubmissions = async () => {
  try {
    return await prisma.handover.findMany({
      orderBy: { createdAt: 'desc' }
    });
  } catch (error) {
    console.error('Failed to fetch submissions:', error);
    throw error;
  }
};