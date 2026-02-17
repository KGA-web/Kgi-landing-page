import { useState } from "react";
import { Eye, EyeOff, Mail, Phone, AlertCircle, CheckCircle, Loader } from "lucide-react";
import { AdmissionFormData } from "@shared/api";

type FormStep = "register" | "login" | "otp" | "form" | "success";

interface FormState extends Partial<AdmissionFormData> {
  password?: string;
  confirmPassword?: string;
  otpCode?: string;
}

const nationalities = ["Indian", "NRI", "International"];

const academicSessions = [
  "2024-2025",
  "2025-2026",
  "2026-2027",
];

const states = [
  "Andhra Pradesh",
  "Karnataka",
  "Kerala",
  "Maharashtra",
  "Tamil Nadu",
  "Telangana",
  "Other",
];

const cities: Record<string, string[]> = {
  "Andhra Pradesh": ["Visakhapatnam", "Hyderabad", "Tirupati", "Vijayawada"],
  Karnataka: ["Bangalore", "Mangalore", "Mysore", "Hubli"],
  Kerala: ["Kochi", "Thiruvananthapuram", "Kozhikode", "Thrissur"],
  Maharashtra: ["Mumbai", "Pune", "Nagpur", "Aurangabad"],
  "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Salem"],
  Telangana: ["Hyderabad", "Warangal", "Vijayawada"],
};

const programLevels = ["UG", "PG", "Diploma", "Lateral"];

const programs: Record<string, string[]> = {
  UG: [
    "B.Tech",
    "B.Sc Forensic Science",
    "BBA",
    "B.Com",
    "BCA",
    "B.Sc Nursing",
  ],
  PG: ["M.Tech", "MBA", "MCA", "M.Sc"],
  Diploma: ["Diploma in Engineering", "Diploma in Management"],
  Lateral: ["B.Tech Lateral", "BCA Lateral"],
};

const specializations: Record<string, string[]> = {
  "B.Tech": [
    "CSE",
    "ECE",
    "EEE",
    "Mechanical",
    "Civil",
  ],
  MBA: ["Finance", "HR", "Marketing", "Operations"],
  MCA: ["Software Development", "Data Analytics"],
  BBA: ["Finance", "Marketing", "HR"],
};

const countryCodes = [
  { code: "+91", country: "India" },
  { code: "+1", country: "USA" },
  { code: "+44", country: "UK" },
  { code: "+60", country: "Malaysia" },
  { code: "+65", country: "Singapore" },
];

export default function AdmissionForm() {
  const [currentStep, setCurrentStep] = useState<FormStep>("register");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormState>({
    countryCode: "+91",
    programLevel: "",
    program: "",
    specialization: "",
  });
  const [otpSent, setOtpSent] = useState(false);
  const [otpTimer, setOtpTimer] = useState(0);
  const [error, setError] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [referenceId, setReferenceId] = useState<string>("");

  // Get cities for selected state
  const citiesForState = formData.state
    ? cities[formData.state as keyof typeof cities] || []
    : [];

  // Get specializations for selected program
  const specializationsForProgram = formData.program
    ? specializations[formData.program as keyof typeof specializations] || []
    : [];

  // Handle form field changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Reset dependent fields
    if (name === "state") {
      setFormData((prev) => ({ ...prev, city: "" }));
    }
    if (name === "programLevel") {
      setFormData((prev) => ({ ...prev, program: "", specialization: "" }));
    }
    if (name === "program") {
      setFormData((prev) => ({ ...prev, specialization: "" }));
    }

    setError("");
  };

  // Request OTP
  const handleRequestOTP = async () => {
    if (!formData.mobileNumber || !formData.countryCode) {
      setError("Please enter mobile number");
      return;
    }

    if (!/^\d{10}$/.test(formData.mobileNumber)) {
      setError("Mobile number must be 10 digits");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/otp/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mobileNumber: formData.mobileNumber,
          countryCode: formData.countryCode,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setOtpSent(true);
        setOtpTimer(data.expiresIn || 300);
        setCurrentStep("otp");

        // Start countdown timer
        const interval = setInterval(() => {
          setOtpTimer((prev) => {
            if (prev <= 1) {
              clearInterval(interval);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      } else {
        setError(data.message || "Failed to send OTP");
      }
    } catch (err) {
      setError("Error sending OTP. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Verify OTP
  const handleVerifyOTP = async () => {
    if (!formData.otpCode) {
      setError("Please enter OTP");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/otp/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mobileNumber: formData.mobileNumber,
          otp: formData.otpCode,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setCurrentStep("form");
        setOtpSent(false);
      } else {
        setError(
          data.message ||
            `Invalid OTP. ${data.attemptsRemaining ? `${data.attemptsRemaining} attempts remaining` : ""}`
        );
      }
    } catch (err) {
      setError("Error verifying OTP. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Submit admission form
  const handleSubmitAdmission = async () => {
    // Validation
    if (
      !formData.applicantName ||
      !formData.nationality ||
      !formData.academicSession ||
      !formData.state ||
      !formData.city ||
      !formData.programLevel ||
      !formData.program ||
      !formData.specialization
    ) {
      setError("Please fill all required fields");
      return;
    }

    if (!formData.authorizationConsent) {
      setError("Please accept the authorization");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const submissionData: AdmissionFormData = {
        applicantName: formData.applicantName,
        mobileNumber: formData.mobileNumber!,
        countryCode: formData.countryCode!,
        nationality: formData.nationality,
        academicSession: formData.academicSession,
        state: formData.state,
        city: formData.city,
        programLevel: formData.programLevel,
        program: formData.program,
        specialization: formData.specialization,
        captcha: "verified", // In production, implement actual captcha
        authorizationConsent: formData.authorizationConsent,
        submittedAt: new Date().toISOString(),
      };

      const response = await fetch("/api/admission/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submissionData),
      });

      const data = await response.json();

      if (data.success) {
        setReferenceId(data.referenceId || "");
        setSuccessMessage(data.message);
        setCurrentStep("success");
      } else {
        setError(data.message || "Failed to submit form");
      }
    } catch (err) {
      setError("Error submitting form. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">KGI Admissions</h1>
            <p className="text-gray-600">Admissions Open for 2024-2025</p>
          </div>

          {/* Error Alert */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-600 rounded flex gap-3">
              <AlertCircle size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-red-800 font-semibold">Error</p>
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            </div>
          )}

          {/* Success Alert */}
          {successMessage && (
            <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-600 rounded flex gap-3">
              <CheckCircle size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-green-800 font-semibold">Success</p>
                <p className="text-green-700 text-sm">{successMessage}</p>
              </div>
            </div>
          )}

          {/* Step 1: Register / Login */}
          {(currentStep === "register" || currentStep === "login") && (
            <div className="space-y-6">
              <div className="flex gap-4 mb-8">
                <button
                  onClick={() => {
                    setCurrentStep("register");
                    setError("");
                  }}
                  className={`flex-1 py-3 font-semibold uppercase transition-colors ${
                    currentStep === "register"
                      ? "bg-red-700 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  Register
                </button>
                <button
                  onClick={() => {
                    setCurrentStep("login");
                    setError("");
                  }}
                  className={`flex-1 py-3 font-semibold uppercase transition-colors ${
                    currentStep === "login"
                      ? "bg-red-700 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  Existing User Login
                </button>
              </div>

              {currentStep === "register" && (
                <div className="space-y-4">
                  {/* Applicant Name */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Applicant Name (as per 10th marks card) *
                    </label>
                    <input
                      type="text"
                      name="applicantName"
                      value={formData.applicantName || ""}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition"
                      required
                    />
                  </div>

                  {/* Mobile Number */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <Phone size={16} className="inline mr-2" />
                      Mobile Number *
                    </label>
                    <div className="flex gap-2">
                      <select
                        name="countryCode"
                        value={formData.countryCode}
                        onChange={handleInputChange}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                      >
                        {countryCodes.map((cc) => (
                          <option key={cc.code} value={cc.code}>
                            {cc.code} {cc.country}
                          </option>
                        ))}
                      </select>
                      <input
                        type="tel"
                        name="mobileNumber"
                        value={formData.mobileNumber || ""}
                        onChange={handleInputChange}
                        placeholder="10 digit number"
                        maxLength={10}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition"
                        required
                      />
                    </div>
                  </div>

                  {/* Request OTP Button */}
                  <button
                    onClick={handleRequestOTP}
                    disabled={loading}
                    className="w-full bg-yellow-400 hover:bg-yellow-500 disabled:bg-yellow-300 text-black font-bold py-3 rounded-lg transition-colors uppercase"
                  >
                    {loading ? "Sending OTP..." : "Get OTP"}
                  </button>
                </div>
              )}

              {currentStep === "login" && (
                <div className="space-y-4">
                  <input
                    type="email"
                    placeholder="Email ID"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                  <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 rounded-lg transition-colors uppercase">
                    Login
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Step 2: OTP Verification */}
          {currentStep === "otp" && (
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded text-blue-800">
                <p className="text-sm">
                  OTP sent to {formData.countryCode}
                  {formData.mobileNumber}
                </p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Enter OTP *
                </label>
                <input
                  type="text"
                  name="otpCode"
                  value={formData.otpCode || ""}
                  onChange={handleInputChange}
                  placeholder="6-digit OTP"
                  maxLength={6}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 text-center text-2xl tracking-widest outline-none"
                />
              </div>

              {otpTimer > 0 && (
                <p className="text-sm text-gray-600 text-center">
                  Expires in {otpTimer}s
                </p>
              )}

              {otpTimer === 0 && otpSent && (
                <button
                  onClick={handleRequestOTP}
                  className="w-full text-blue-600 hover:text-blue-700 font-semibold"
                >
                  Resend OTP
                </button>
              )}

              <button
                onClick={handleVerifyOTP}
                disabled={loading}
                className="w-full bg-yellow-400 hover:bg-yellow-500 disabled:bg-yellow-300 text-black font-bold py-3 rounded-lg transition-colors uppercase"
              >
                {loading ? "Verifying..." : "Verify OTP"}
              </button>

              <button
                onClick={() => {
                  setCurrentStep("register");
                  setOtpSent(false);
                }}
                className="w-full text-gray-600 hover:text-gray-800 py-2 font-semibold"
              >
                Back
              </button>
            </div>
          )}

          {/* Step 3: Admission Form */}
          {currentStep === "form" && (
            <div className="space-y-4">
              {/* Nationality */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Nationality *
                </label>
                <select
                  name="nationality"
                  value={formData.nationality || ""}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                >
                  <option value="">Select Nationality</option>
                  {nationalities.map((nat) => (
                    <option key={nat} value={nat}>
                      {nat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Academic Session */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Academic Session *
                </label>
                <select
                  name="academicSession"
                  value={formData.academicSession || ""}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                >
                  <option value="">Select Academic Session</option>
                  {academicSessions.map((session) => (
                    <option key={session} value={session}>
                      {session}
                    </option>
                  ))}
                </select>
              </div>

              {/* State */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  State *
                </label>
                <select
                  name="state"
                  value={formData.state || ""}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                >
                  <option value="">Select State</option>
                  {states.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
              </div>

              {/* City */}
              {formData.state && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    City *
                  </label>
                  <select
                    name="city"
                    value={formData.city || ""}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                  >
                    <option value="">Select City</option>
                    {citiesForState.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Program Level */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Program Level *
                </label>
                <select
                  name="programLevel"
                  value={formData.programLevel || ""}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                >
                  <option value="">Select Program Level</option>
                  {programLevels.map((level) => (
                    <option key={level} value={level}>
                      {level}
                    </option>
                  ))}
                </select>
              </div>

              {/* Program */}
              {formData.programLevel && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Program *
                  </label>
                  <select
                    name="program"
                    value={formData.program || ""}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                  >
                    <option value="">Select Program</option>
                    {(programs[formData.programLevel as keyof typeof programs] || []).map((prog) => (
                      <option key={prog} value={prog}>
                        {prog}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Specialization */}
              {formData.program && specializationsForProgram.length > 0 && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Specialization *
                  </label>
                  <select
                    name="specialization"
                    value={formData.specialization || ""}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                  >
                    <option value="">Select Specialization</option>
                    {specializationsForProgram.map((spec) => (
                      <option key={spec} value={spec}>
                        {spec}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Authorization */}
              <div className="flex items-start gap-3 p-4 bg-gray-50 rounded">
                <input
                  type="checkbox"
                  name="authorizationConsent"
                  id="auth"
                  checked={formData.authorizationConsent || false}
                  onChange={handleInputChange}
                  className="mt-1 w-4 h-4 text-red-600 rounded focus:ring-red-500 cursor-pointer"
                />
                <label htmlFor="auth" className="text-sm text-gray-700 cursor-pointer">
                  I authorize KGI and its representatives to contact me with
                  updates and notifications via email, SMS, WhatsApp and call.
                  This will override the registry on DND/NDNC. *
                </label>
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmitAdmission}
                disabled={loading}
                className="w-full bg-yellow-400 hover:bg-yellow-500 disabled:bg-yellow-300 text-black font-bold py-3 rounded-lg transition-colors uppercase flex items-center justify-center gap-2"
              >
                {loading && <Loader size={20} className="animate-spin" />}
                {loading ? "Submitting..." : "Submit Application"}
              </button>
            </div>
          )}

          {/* Step 4: Success */}
          {currentStep === "success" && (
            <div className="text-center py-8">
              <CheckCircle size={64} className="mx-auto text-green-600 mb-4" />
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Application Submitted!
              </h2>
              <p className="text-gray-600 mb-4">{successMessage}</p>
              {referenceId && (
                <div className="bg-blue-50 p-4 rounded mb-6">
                  <p className="text-sm text-gray-600 mb-2">Reference ID</p>
                  <p className="text-xl font-bold text-blue-900">{referenceId}</p>
                </div>
              )}
              <p className="text-gray-600 text-sm mb-6">
                Please save your reference ID. You'll need it to track your application status.
              </p>
              <button
                onClick={() => window.location.href = "/"}
                className="bg-red-700 hover:bg-red-800 text-white font-bold py-3 px-8 rounded-lg transition-colors"
              >
                Return to Home
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
