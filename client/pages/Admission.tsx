import AdmissionForm from "@/components/AdmissionForm";
import Navbar from "@/components/Navbar";

export default function Admission() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <AdmissionForm />
    </div>
  );
}
