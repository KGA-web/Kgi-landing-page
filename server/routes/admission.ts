import { RequestHandler } from "express";
import {
  AdmissionFormData,
  AdmissionSubmissionResponse,
} from "@shared/api";

/**
 * Simple in-memory storage for admissions (can be replaced with Google Sheets API)
 * In production, this would connect to Google Sheets API or a database
 */
const admissionsStore: AdmissionFormData[] = [];

/**
 * Generate a unique reference ID for the admission
 */
function generateReferenceId(): string {
  return `KGI-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
}

/**
 * Mock function to save to Google Sheets
 * In production, integrate with Google Sheets API or use a service like Airtable
 */
async function saveToGoogleSheets(
  data: AdmissionFormData
): Promise<{ success: boolean; error?: string }> {
  try {
    // Here you would integrate with Google Sheets API
    // Example using googleapis library:
    // const sheets = google.sheets({ version: 'v4', auth: authClient });
    // await sheets.spreadsheets.values.append({...});

    // For now, we'll just store in memory and log
    admissionsStore.push(data);
    console.log("Admission saved:", data);

    // In a real implementation, you would:
    // 1. Use GOOGLE_SHEETS_API_KEY environment variable
    // 2. Connect to your Google Sheet
    // 3. Append the row
    return { success: true };
  } catch (error) {
    console.error("Error saving to Google Sheets:", error);
    return {
      success: false,
      error: "Failed to save admission form. Please try again.",
    };
  }
}

/**
 * Handle admission form submission
 */
export const handleAdmissionSubmission: RequestHandler = async (
  req,
  res
) => {
  try {
    const formData: AdmissionFormData = req.body;

    // Validate required fields
    if (
      !formData.applicantName ||
      !formData.mobileNumber ||
      !formData.nationality ||
      !formData.programLevel ||
      !formData.program
    ) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
        error: "All required fields must be filled",
      } as AdmissionSubmissionResponse);
    }

    // Validate phone number format (10 digits for Indian numbers)
    if (!/^\d{10}$/.test(formData.mobileNumber)) {
      return res.status(400).json({
        success: false,
        message: "Invalid phone number",
        error: "Phone number must be 10 digits",
      } as AdmissionSubmissionResponse);
    }

    // Validate authorization consent
    if (!formData.authorizationConsent) {
      return res.status(400).json({
        success: false,
        message: "Authorization required",
        error: "You must authorize to proceed",
      } as AdmissionSubmissionResponse);
    }

    // Add submission timestamp
    formData.submittedAt = new Date().toISOString();

    // Save to Google Sheets (or database)
    const sheetsResult = await saveToGoogleSheets(formData);

    if (!sheetsResult.success) {
      return res.status(500).json({
        success: false,
        message: "Submission failed",
        error: sheetsResult.error,
      } as AdmissionSubmissionResponse);
    }

    // Generate reference ID
    const referenceId = generateReferenceId();

    res.json({
      success: true,
      message: "Admission form submitted successfully",
      referenceId,
    } as AdmissionSubmissionResponse);
  } catch (error) {
    console.error("Error in admission submission:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error:
        error instanceof Error
          ? error.message
          : "An unexpected error occurred",
    } as AdmissionSubmissionResponse);
  }
};

/**
 * Get all admissions (for admin purposes - requires authentication in production)
 */
export const getAllAdmissions: RequestHandler = (_req, res) => {
  res.json({
    total: admissionsStore.length,
    admissions: admissionsStore,
  });
};
