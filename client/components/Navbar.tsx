import { useState } from "react";
import { ChevronDown } from "lucide-react";

const courses = [
  {
    category: "Undergraduate",
    items: [
      "B.Sc Forensic Science",
      "BVA - Animation and Multimedia Design",
      "BVA - Applied Arts and Graphic Design",
      "BVA - Interior & Spatial Design",
      "BBA",
      "BBA Aviation",
      "BBA Advanced",
      "B.Com",
      "B.Com Logistics",
      "B.Com Advanced",
      "BCA",
      "BCA Advanced",
    ],
  },
  {
    category: "Postgraduate",
    items: ["MBA", "MCA"],
  },
  {
    category: "Nursing",
    items: ["GNM", "B.Sc Nursing", "PBBSc", "M.Sc Nursing"],
  },
  {
    category: "Allied Health Sciences",
    items: [
      "B.Sc Renal Dialysis",
      "B.Sc Respiratory",
      "B.Sc AT & OT",
      "B.Sc MIT",
      "B.Sc MLT",
    ],
  },
  {
    category: "Hotel Management",
    items: ["Hotel Management"],
  },
];

export default function Navbar() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  return (
    <nav className="bg-red-700 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold">KGI</h1>
          </div>

          {/* Menu Items */}
          <div className="flex items-center space-x-1">
            <div
              className="relative group"
              onMouseEnter={() => setOpenMenu("courses")}
              onMouseLeave={() => setOpenMenu(null)}
            >
              <button className="px-6 py-5 text-sm font-semibold uppercase text-white hover:bg-red-600 transition-colors duration-300 flex items-center gap-2">
                Courses
                <ChevronDown size={16} />
              </button>

              {/* Dropdown Menu */}
              {openMenu === "courses" && (
                <div className="absolute left-0 w-48 bg-white text-black shadow-lg z-50 top-full">
                  {courses.map((course) => (
                    <div key={course.category}>
                      <div className="px-4 py-3 font-semibold text-sm border-b hover:bg-gray-100">
                        {course.category}
                      </div>
                      {course.items.map((item) => (
                        <a
                          key={item}
                          href="#"
                          className="block px-4 py-2 text-xs uppercase text-gray-800 hover:bg-gray-100 transition-colors"
                        >
                          {item}
                        </a>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <a
              href="#"
              className="px-6 py-5 text-sm font-semibold uppercase text-white hover:bg-red-600 transition-colors duration-300"
            >
              About
            </a>
            <a
              href="/admission"
              className="px-6 py-5 text-sm font-semibold uppercase text-white hover:bg-red-600 transition-colors duration-300"
            >
              Admissions
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
