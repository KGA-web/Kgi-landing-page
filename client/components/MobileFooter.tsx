import { MessageCircle } from "lucide-react";

export default function MobileFooter() {
  return (
    <div className="fixed bottom-0 left-0 right-0 md:hidden bg-white border-t border-gray-200 z-40">
      <div className="flex">
        {/* WhatsApp Section */}
        <a
          href="https://wa.me/918061234567"
          className="flex-1 bg-secondary hover:bg-opacity-80 transition px-4 py-3 flex items-center justify-center gap-2 border-r border-gray-200"
        >
          <MessageCircle className="w-5 h-5 text-text-dark" />
          <span className="font-montserrat font-600 text-text-dark text-sm">
            WhatsApp Us
          </span>
        </a>

        {/* Apply Now Section */}
        <button className="flex-1 bg-primary hover:opacity-90 transition px-4 py-3 flex items-center justify-center">
          <span className="font-montserrat font-600 text-white text-sm">
            Apply Now
          </span>
        </button>
      </div>
    </div>
  );
}
