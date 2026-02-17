/**
 * Shared code between client and server
 * Useful to share types between client and server
 * and/or small pure JS functions that can be used on both client and server
 */

/**
 * Example response type for /api/demo
 */
export interface DemoResponse {
  message: string;
}

/**
 * Admission form submission interface
 */
export interface AdmissionFormData {
  applicantName: string;
  mobileNumber: string;
  countryCode: string;
  nationality: string;
  academicSession: string;
  state: string;
  city: string;
  programLevel: string;
  program: string;
  specialization: string;
  captcha: string;
  authorizationConsent: boolean;
  submittedAt: string;
}

/**
 * OTP request interface
 */
export interface OTPRequest {
  mobileNumber: string;
  countryCode: string;
}

/**
 * OTP verification interface
 */
export interface OTPVerification {
  mobileNumber: string;
  otp: string;
}

/**
 * API response for admission submission
 */
export interface AdmissionSubmissionResponse {
  success: boolean;
  message: string;
  referenceId?: string;
  error?: string;
}
