import { RequestHandler } from "express";
import { OTPRequest, OTPVerification } from "@shared/api";

/**
 * In-memory OTP storage
 * In production, use Redis or a database with expiry
 */
const otpStore: Map<
  string,
  {
    otp: string;
    createdAt: number;
    attempts: number;
    verified: boolean;
  }
> = new Map();

const OTP_EXPIRY_TIME = 5 * 60 * 1000; // 5 minutes
const MAX_ATTEMPTS = 3;

/**
 * Generate a random 6-digit OTP
 */
function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

/**
 * Mock function to send OTP via SMS
 * In production, integrate with SMS service like Twilio, AWS SNS, etc.
 */
async function sendOTPViaSMS(
  phoneNumber: string,
  otp: string
): Promise<boolean> {
  try {
    // Here you would integrate with SMS service
    // Example using Twilio:
    // const twilio = require('twilio')(accountSid, authToken);
    // await twilio.messages.create({
    //   body: `Your KGI verification code is: ${otp}`,
    //   from: process.env.TWILIO_PHONE_NUMBER,
    //   to: phoneNumber,
    // });

    console.log(`[MOCK SMS] OTP ${otp} sent to ${phoneNumber}`);
    return true;
  } catch (error) {
    console.error("Error sending SMS:", error);
    return false;
  }
}

/**
 * Request OTP for a phone number
 */
export const handleRequestOTP: RequestHandler = async (req, res) => {
  try {
    const { mobileNumber, countryCode } = req.body as OTPRequest;

    // Validate input
    if (!mobileNumber || !countryCode) {
      return res.status(400).json({
        success: false,
        message: "Mobile number and country code are required",
      });
    }

    // Validate phone number format
    if (!/^\d{10}$/.test(mobileNumber)) {
      return res.status(400).json({
        success: false,
        message: "Invalid phone number format",
      });
    }

    const phoneKey = `${countryCode}${mobileNumber}`;

    // Check if OTP already exists and is still valid
    const existingOTP = otpStore.get(phoneKey);
    if (existingOTP && Date.now() - existingOTP.createdAt < OTP_EXPIRY_TIME) {
      return res.status(429).json({
        success: false,
        message: "OTP already sent. Please wait before requesting again.",
        remainingTime: Math.ceil(
          (OTP_EXPIRY_TIME - (Date.now() - existingOTP.createdAt)) / 1000
        ),
      });
    }

    // Generate new OTP
    const otp = generateOTP();

    // Send OTP via SMS
    const smsSent = await sendOTPViaSMS(phoneKey, otp);

    if (!smsSent) {
      return res.status(500).json({
        success: false,
        message: "Failed to send OTP. Please try again.",
      });
    }

    // Store OTP
    otpStore.set(phoneKey, {
      otp,
      createdAt: Date.now(),
      attempts: 0,
      verified: false,
    });

    res.json({
      success: true,
      message: "OTP sent successfully",
      expiresIn: 300, // 5 minutes in seconds
    });
  } catch (error) {
    console.error("Error in OTP request:", error);
    res.status(500).json({
      success: false,
      message: "Server error while sending OTP",
    });
  }
};

/**
 * Verify OTP
 */
export const handleVerifyOTP: RequestHandler = (req, res) => {
  try {
    const { mobileNumber, otp } = req.body as OTPVerification;

    // Validate input
    if (!mobileNumber || !otp) {
      return res.status(400).json({
        success: false,
        message: "Mobile number and OTP are required",
      });
    }

    // For verification without country code (simplified)
    const phoneKey = mobileNumber;

    // Find OTP record
    const otpRecord = otpStore.get(phoneKey);

    if (!otpRecord) {
      return res.status(400).json({
        success: false,
        message: "OTP not found. Please request a new one.",
      });
    }

    // Check if OTP has expired
    if (Date.now() - otpRecord.createdAt > OTP_EXPIRY_TIME) {
      otpStore.delete(phoneKey);
      return res.status(400).json({
        success: false,
        message: "OTP has expired. Please request a new one.",
      });
    }

    // Check attempts
    if (otpRecord.attempts >= MAX_ATTEMPTS) {
      otpStore.delete(phoneKey);
      return res.status(429).json({
        success: false,
        message: "Maximum OTP verification attempts exceeded. Please request a new OTP.",
      });
    }

    // Verify OTP
    if (otpRecord.otp !== otp) {
      otpRecord.attempts += 1;
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
        attemptsRemaining: MAX_ATTEMPTS - otpRecord.attempts,
      });
    }

    // Mark as verified
    otpRecord.verified = true;

    res.json({
      success: true,
      message: "OTP verified successfully",
    });
  } catch (error) {
    console.error("Error in OTP verification:", error);
    res.status(500).json({
      success: false,
      message: "Server error while verifying OTP",
    });
  }
};

/**
 * Check OTP verification status
 */
export const checkOTPStatus: RequestHandler = (req, res) => {
  try {
    const { mobileNumber } = req.query as { mobileNumber: string };

    if (!mobileNumber) {
      return res.status(400).json({
        success: false,
        message: "Mobile number is required",
      });
    }

    const otpRecord = otpStore.get(mobileNumber);

    if (!otpRecord) {
      return res.json({
        verified: false,
        message: "No OTP found for this number",
      });
    }

    res.json({
      verified: otpRecord.verified,
      expiryTime: otpRecord.createdAt + OTP_EXPIRY_TIME,
    });
  } catch (error) {
    console.error("Error checking OTP status:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
