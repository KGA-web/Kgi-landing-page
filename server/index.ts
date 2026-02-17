import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import {
  handleAdmissionSubmission,
  getAllAdmissions,
} from "./routes/admission";
import {
  handleRequestOTP,
  handleVerifyOTP,
  checkOTPStatus,
} from "./routes/otp";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  // OTP Routes
  app.post("/api/otp/request", handleRequestOTP);
  app.post("/api/otp/verify", handleVerifyOTP);
  app.get("/api/otp/status", checkOTPStatus);

  // Admission Routes
  app.post("/api/admission/submit", handleAdmissionSubmission);
  app.get("/api/admission/all", getAllAdmissions); // Protected in production

  return app;
}
