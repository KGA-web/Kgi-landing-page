import { AlertCircle, CheckCircle } from "lucide-react";

export default function AdmissionGuidelines() {
  const guidelines = [
    {
      id: 1,
      icon: AlertCircle,
      title: "Email Verification",
      description:
        "Please ensure that the email ID provided by you is correct and up-to-date, as it will be used for all communication until enrollment.",
    },
    {
      id: 2,
      icon: AlertCircle,
      title: "No Email Changes",
      description:
        "Request for change in email ID will not be entertained.",
    },
    {
      id: 3,
      icon: CheckCircle,
      title: "Admission Criteria",
      description:
        "Admission to the BTech, BSc Nursing, BSc (Hons) Biomedical Science, MBA & MCA Programs will be based on merit in the Nitte University Common Admission Test (NUCAT).",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
          Admission Guidelines
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {guidelines.map((guideline) => {
            const Icon = guideline.icon;
            return (
              <div
                key={guideline.id}
                className="flex gap-6 p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="flex-shrink-0">
                  <Icon
                    size={32}
                    className={`${
                      guideline.icon === CheckCircle
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">
                    {guideline.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {guideline.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Important Note */}
        <div className="mt-12 p-6 bg-blue-50 border-l-4 border-blue-600 rounded">
          <h3 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
            <span className="text-2xl">ℹ️</span> Important Notice
          </h3>
          <p className="text-blue-800">
            All information provided during registration must be accurate and
            authentic. Any discrepancies may lead to cancellation of
            registration. Please verify all details before submission.
          </p>
        </div>
      </div>
    </section>
  );
}
