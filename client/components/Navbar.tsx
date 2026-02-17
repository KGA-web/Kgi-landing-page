import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState<string[]>([]);

  const toggleDropdown = (name: string) => {
    setOpenDropdowns(prev =>
      prev.includes(name)
        ? prev.filter(item => item !== name)
        : [...prev, name]
    );
  };

  return (
    <header className="bg-kgi-red w-full z-50">
      <div className="flex items-center justify-between px-4 md:px-[4%]">
        {/* Logo */}
        <div className="flex-shrink-0 py-4">
          <a href="https://kgi.edu.in/" className="inline-block">
            <img
              alt="Koshys Global Academia logo"
              loading="lazy"
              src="https://www.kgi.edu.in/assets/images/kgi-light-logo.png"
              className="max-w-xs md:max-w-sm h-auto hidden md:block"
            />
            <img
              alt="KGI favicon"
              loading="lazy"
              src="https://kgi.edu.in/assets/images/fav.png"
              className="max-w-12 md:hidden"
            />
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-white"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex items-center gap-0">
            {/* About KGI */}
            <li className="relative group">
              <a
                href="#"
                className="text-white text-sm font-semibold uppercase px-5 py-6 block hover:bg-black/10 transition-colors"
              >
                About KGI
              </a>
              <ul className="absolute left-0 top-full bg-white text-black w-48 hidden group-hover:block shadow-lg">
                <li>
                  <a href="https://www.kgi.edu.in/AboutWhyKGI.php" className="block px-4 py-3 text-xs uppercase hover:bg-gray-100 transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="https://www.kgi.edu.in/mission-and-vission.php" className="block px-4 py-3 text-xs uppercase hover:bg-gray-100 transition-colors">
                    Mission & Vision
                  </a>
                </li>
                <li>
                  <a href="https://www.kgi.edu.in/milestone.php" className="block px-4 py-3 text-xs uppercase hover:bg-gray-100 transition-colors">
                    Milestones
                  </a>
                </li>
                <li>
                  <a href="https://www.kgi.edu.in/FounderMessageKGI.php" className="block px-4 py-3 text-xs uppercase hover:bg-gray-100 transition-colors">
                    Founder
                  </a>
                </li>
                <li>
                  <a href="https://www.kgi.edu.in/leadership.php" className="block px-4 py-3 text-xs uppercase hover:bg-gray-100 transition-colors">
                    Leadership Team
                  </a>
                </li>
                <li>
                  <a href="https://www.kgi.edu.in/industrial-association.php" className="block px-4 py-3 text-xs uppercase hover:bg-gray-100 transition-colors">
                    Industrial Association
                  </a>
                </li>
                <li>
                  <a href="https://www.kgi.edu.in/advisory-board.php" className="block px-4 py-3 text-xs uppercase hover:bg-gray-100 transition-colors">
                    Advisory Board
                  </a>
                </li>
                <li>
                  <a href="https://www.kgi.edu.in/affiliarion.php" className="block px-4 py-3 text-xs uppercase hover:bg-gray-100 transition-colors">
                    Affiliation and Accreditation
                  </a>
                </li>
              </ul>
            </li>

            {/* Institutions */}
            <li className="relative group">
              <a
                href="#"
                className="text-white text-sm font-semibold uppercase px-5 py-6 block hover:bg-black/10 transition-colors"
              >
                Institutions
              </a>
              <ul className="absolute left-0 top-full bg-white text-black w-48 hidden group-hover:block shadow-lg">
                <li>
                  <a href="https://kimsbengaluru.edu.in/" className="block px-4 py-3 text-xs uppercase hover:bg-gray-100 transition-colors">
                    Koshys Institute of Management Studies
                  </a>
                </li>
                <li>
                  <a href="https://www.kgi.edu.in/KIHS/index.php" className="block px-4 py-3 text-xs uppercase hover:bg-gray-100 transition-colors">
                    Koshys Institute of Health Sciences
                  </a>
                </li>
                <li>
                  <a href="https://kimsbengaluru.edu.in/bhm" className="block px-4 py-3 text-xs uppercase hover:bg-gray-100 transition-colors">
                    Koshys Institute of Hotel Management
                  </a>
                </li>
                <li>
                  <a href="https://koshysglobalacademia.com/" className="block px-4 py-3 text-xs uppercase hover:bg-gray-100 transition-colors">
                    Koshys Global Academia (CBSC)
                  </a>
                </li>
              </ul>
            </li>

            {/* Courses */}
            <li className="relative group">
              <a
                href="#"
                className="text-white text-sm font-semibold uppercase px-5 py-6 block hover:bg-black/10 transition-colors"
              >
                Courses
              </a>
              <ul className="absolute left-0 top-full bg-white text-black w-48 hidden group-hover:block shadow-lg">
                {/* UG */}
                <li className="relative group/ug">
                  <a href="#" className="block px-4 py-3 text-xs uppercase hover:bg-gray-100 transition-colors flex items-center justify-between">
                    UG
                    <span>›</span>
                  </a>
                  <ul className="absolute left-48 top-0 bg-white text-black w-48 hidden group-hover/ug:block shadow-lg">
                    <li><a href="https://kimsbengaluru.edu.in/BA-cpj.php" className="block px-4 py-3 text-xs uppercase hover:bg-gray-100 transition-colors">B.Sc Forensic Sc.</a></li>
                    <li><a href="https://kimsbengaluru.edu.in/BVA.php" className="block px-4 py-3 text-xs uppercase hover:bg-gray-100 transition-colors">BVA - Animation and Multimedia Design</a></li>
                    <li><a href="https://kimsbengaluru.edu.in/bvaag.php" className="block px-4 py-3 text-xs uppercase hover:bg-gray-100 transition-colors">BVA - Applied Arts and Graphic Design</a></li>
                    <li><a href="https://kimsbengaluru.edu.in/BVA-aa.php" className="block px-4 py-3 text-xs uppercase hover:bg-gray-100 transition-colors">BVA - Interior & Spatial Design</a></li>
                    <li><a href="https://kimsbengaluru.edu.in/bba.php" className="block px-4 py-3 text-xs uppercase hover:bg-gray-100 transition-colors">BBA</a></li>
                    <li><a href="https://kimsbengaluru.edu.in/BBA-ava.php" className="block px-4 py-3 text-xs uppercase hover:bg-gray-100 transition-colors">BBA Aviation (BNU)</a></li>
                    <li><a href="https://kimsbengaluru.edu.in/bba.php" className="block px-4 py-3 text-xs uppercase hover:bg-gray-100 transition-colors">BBA Advanced</a></li>
                    <li><a href="https://kimsbengaluru.edu.in/BCom.php" className="block px-4 py-3 text-xs uppercase hover:bg-gray-100 transition-colors">B.Com</a></li>
                    <li><a href="https://kimsbengaluru.edu.in/BCOM-log.php" className="block px-4 py-3 text-xs uppercase hover:bg-gray-100 transition-colors">B.Com Logistics</a></li>
                    <li><a href="https://kimsbengaluru.edu.in/BCom" className="block px-4 py-3 text-xs uppercase hover:bg-gray-100 transition-colors">B.Com Advanced</a></li>
                    <li><a href="https://kimsbengaluru.edu.in/BCA.php" className="block px-4 py-3 text-xs uppercase hover:bg-gray-100 transition-colors">BCA</a></li>
                    <li><a href="https://kimsbengaluru.edu.in/BCA.php" className="block px-4 py-3 text-xs uppercase hover:bg-gray-100 transition-colors">BCA Advanced</a></li>
                  </ul>
                </li>

                {/* PG */}
                <li className="relative group/pg">
                  <a href="#" className="block px-4 py-3 text-xs uppercase hover:bg-gray-100 transition-colors flex items-center justify-between">
                    PG
                    <span>›</span>
                  </a>
                  <ul className="absolute left-48 top-0 bg-white text-black w-48 hidden group-hover/pg:block shadow-lg">
                    <li><a href="https://kimsbengaluru.edu.in/MBA.php" className="block px-4 py-3 text-xs uppercase hover:bg-gray-100 transition-colors">MBA</a></li>
                    <li><a href="https://kimsbengaluru.edu.in/MCA.php" className="block px-4 py-3 text-xs uppercase hover:bg-gray-100 transition-colors">MCA</a></li>
                  </ul>
                </li>

                {/* Nursing */}
                <li className="relative group/nursing">
                  <a href="#" className="block px-4 py-3 text-xs uppercase hover:bg-gray-100 transition-colors flex items-center justify-between">
                    Nursing
                    <span>›</span>
                  </a>
                  <ul className="absolute left-48 top-0 bg-white text-black w-48 hidden group-hover/nursing:block shadow-lg">
                    <li><a href="https://kgi.edu.in/KIHS/gnm.php" className="block px-4 py-3 text-xs uppercase hover:bg-gray-100 transition-colors">GNM</a></li>
                    <li><a href="https://kgi.edu.in/KIHS/bscNursing.php" className="block px-4 py-3 text-xs uppercase hover:bg-gray-100 transition-colors">B.Sc Nursing</a></li>
                    <li><a href="https://kgi.edu.in/KIHS/pbBsc.php" className="block px-4 py-3 text-xs uppercase hover:bg-gray-100 transition-colors">PBBSc</a></li>
                    <li><a href="https://kgi.edu.in/KIHS/MscNursing.php" className="block px-4 py-3 text-xs uppercase hover:bg-gray-100 transition-colors">M.Sc Nursing</a></li>
                  </ul>
                </li>

                {/* Allied Health Sciences */}
                <li className="relative group/allied">
                  <a href="#" className="block px-4 py-3 text-xs uppercase hover:bg-gray-100 transition-colors flex items-center justify-between">
                    Allied Health Sciences
                    <span>›</span>
                  </a>
                  <ul className="absolute left-48 top-0 bg-white text-black w-48 hidden group-hover/allied:block shadow-lg">
                    <li><a href="https://kgi.edu.in/KIHS/BSCren.php" className="block px-4 py-3 text-xs uppercase hover:bg-gray-100 transition-colors">B.Sc Renal Dialysis</a></li>
                    <li><a href="https://kgi.edu.in/KIHS/BSCres.php" className="block px-4 py-3 text-xs uppercase hover:bg-gray-100 transition-colors">B.Sc Respiratory</a></li>
                    <li><a href="https://kgi.edu.in/KIHS/bscOtt.php" className="block px-4 py-3 text-xs uppercase hover:bg-gray-100 transition-colors">B.Sc AT & OT</a></li>
                    <li><a href="https://kgi.edu.in/KIHS/bscMit.php" className="block px-4 py-3 text-xs uppercase hover:bg-gray-100 transition-colors">B.Sc MIT</a></li>
                    <li><a href="https://kgi.edu.in/KIHS/BSCmlt.php" className="block px-4 py-3 text-xs uppercase hover:bg-gray-100 transition-colors">B.Sc MLT</a></li>
                  </ul>
                </li>

                <li>
                  <a href="https://kimsbengaluru.edu.in/bhm" className="block px-4 py-3 text-xs uppercase hover:bg-gray-100 transition-colors">
                    Hotel Management
                  </a>
                </li>
                <li>
                  <a href="https://koshysglobalacademia.com/" className="block px-4 py-3 text-xs uppercase hover:bg-gray-100 transition-colors">
                    School
                  </a>
                </li>
              </ul>
            </li>

            {/* Admissions */}
            <li className="relative group">
              <a
                href="#"
                className="text-white text-sm font-semibold uppercase px-5 py-6 block hover:bg-black/10 transition-colors"
              >
                Admissions
              </a>
              <ul className="absolute left-0 top-full bg-white text-black w-48 hidden group-hover:block shadow-lg">
                <li>
                  <a href="https://apply.kgi.edu.in/" className="block px-4 py-3 text-xs uppercase hover:bg-gray-100 transition-colors">
                    Apply Now
                  </a>
                </li>
                <li className="relative group/brochure">
                  <a href="#" className="block px-4 py-3 text-xs uppercase hover:bg-gray-100 transition-colors flex items-center justify-between">
                    Download Brochure
                    <span>›</span>
                  </a>
                  <ul className="absolute left-48 top-0 bg-white text-black w-48 hidden group-hover/brochure:block shadow-lg">
                    <li><a href="https://kimsbengaluru.edu.in/kimsmail" className="block px-4 py-3 text-xs uppercase hover:bg-gray-100 transition-colors">UG & PG</a></li>
                    <li><a href="https://www.kgi.edu.in/KIHS/kihsmail" className="block px-4 py-3 text-xs uppercase hover:bg-gray-100 transition-colors">Health Sciences</a></li>
                  </ul>
                </li>
              </ul>
            </li>

            {/* Login */}
            <li className="relative group">
              <a
                href="#"
                className="text-white text-sm font-semibold uppercase px-5 py-6 block hover:bg-black/10 transition-colors"
              >
                Login
              </a>
              <ul className="absolute left-0 top-full bg-white text-black w-48 hidden group-hover:block shadow-lg">
                <li>
                  <a href="https://kgi.pro910.com/Pro910/Login/login.php" className="block px-4 py-3 text-xs uppercase hover:bg-gray-100 transition-colors">
                    Employee Login
                  </a>
                </li>
                <li>
                  <a href="https://kgi.pro910.com/Pro910/Login/login.php" className="block px-4 py-3 text-xs uppercase hover:bg-gray-100 transition-colors">
                    Student Login
                  </a>
                </li>
              </ul>
            </li>

            {/* Contact Button */}
            <li>
              <a href="https://kgi.edu.in/ContactKGI.php">
                <button className="bg-gray-100 text-gray-800 font-semibold py-2 px-6 rounded text-xs uppercase hover:bg-gray-200 transition-colors ml-2">
                  Contact Us
                </button>
              </a>
            </li>
          </ul>
        </nav>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <nav className="md:hidden bg-white text-black border-t border-gray-200">
          <div className="px-4 py-4 space-y-2 max-h-96 overflow-y-auto">
            {/* About KGI */}
            <div>
              <button
                onClick={() => toggleDropdown('about')}
                className="w-full text-left px-3 py-2 text-sm font-semibold uppercase hover:bg-gray-100 rounded"
              >
                About KGI {openDropdowns.includes('about') ? '▼' : '▶'}
              </button>
              {openDropdowns.includes('about') && (
                <div className="bg-gray-50 pl-4 space-y-1">
                  <a href="https://www.kgi.edu.in/AboutWhyKGI.php" className="block px-3 py-2 text-xs uppercase hover:bg-gray-100 rounded">About Us</a>
                  <a href="https://www.kgi.edu.in/mission-and-vission.php" className="block px-3 py-2 text-xs uppercase hover:bg-gray-100 rounded">Mission & Vision</a>
                  <a href="https://www.kgi.edu.in/milestone.php" className="block px-3 py-2 text-xs uppercase hover:bg-gray-100 rounded">Milestones</a>
                  <a href="https://www.kgi.edu.in/FounderMessageKGI.php" className="block px-3 py-2 text-xs uppercase hover:bg-gray-100 rounded">Founder</a>
                  <a href="https://www.kgi.edu.in/leadership.php" className="block px-3 py-2 text-xs uppercase hover:bg-gray-100 rounded">Leadership Team</a>
                  <a href="https://www.kgi.edu.in/industrial-association.php" className="block px-3 py-2 text-xs uppercase hover:bg-gray-100 rounded">Industrial Association</a>
                  <a href="https://www.kgi.edu.in/advisory-board.php" className="block px-3 py-2 text-xs uppercase hover:bg-gray-100 rounded">Advisory Board</a>
                  <a href="https://www.kgi.edu.in/affiliarion.php" className="block px-3 py-2 text-xs uppercase hover:bg-gray-100 rounded">Affiliation and Accreditation</a>
                </div>
              )}
            </div>

            {/* Institutions */}
            <div>
              <button
                onClick={() => toggleDropdown('institutions')}
                className="w-full text-left px-3 py-2 text-sm font-semibold uppercase hover:bg-gray-100 rounded"
              >
                Institutions {openDropdowns.includes('institutions') ? '▼' : '▶'}
              </button>
              {openDropdowns.includes('institutions') && (
                <div className="bg-gray-50 pl-4 space-y-1">
                  <a href="https://kimsbengaluru.edu.in/" className="block px-3 py-2 text-xs uppercase hover:bg-gray-100 rounded">Koshys Institute of Management Studies</a>
                  <a href="https://www.kgi.edu.in/KIHS/index.php" className="block px-3 py-2 text-xs uppercase hover:bg-gray-100 rounded">Koshys Institute of Health Sciences</a>
                  <a href="https://kimsbengaluru.edu.in/bhm" className="block px-3 py-2 text-xs uppercase hover:bg-gray-100 rounded">Koshys Institute of Hotel Management</a>
                  <a href="https://koshysglobalacademia.com/" className="block px-3 py-2 text-xs uppercase hover:bg-gray-100 rounded">Koshys Global Academia (CBSC)</a>
                </div>
              )}
            </div>

            {/* Courses */}
            <div>
              <button
                onClick={() => toggleDropdown('courses')}
                className="w-full text-left px-3 py-2 text-sm font-semibold uppercase hover:bg-gray-100 rounded"
              >
                Courses {openDropdowns.includes('courses') ? '▼' : '▶'}
              </button>
              {openDropdowns.includes('courses') && (
                <div className="bg-gray-50 pl-4 space-y-1">
                  <a href="https://kimsbengaluru.edu.in/BA-cpj.php" className="block px-3 py-2 text-xs uppercase hover:bg-gray-100 rounded">B.Sc Forensic Sc.</a>
                  <a href="https://kimsbengaluru.edu.in/BVA.php" className="block px-3 py-2 text-xs uppercase hover:bg-gray-100 rounded">BVA - Animation and Multimedia Design</a>
                  <a href="https://kimsbengaluru.edu.in/bvaag.php" className="block px-3 py-2 text-xs uppercase hover:bg-gray-100 rounded">BVA - Applied Arts and Graphic Design</a>
                  <a href="https://kimsbengaluru.edu.in/BVA-aa.php" className="block px-3 py-2 text-xs uppercase hover:bg-gray-100 rounded">BVA - Interior & Spatial Design</a>
                  <a href="https://kimsbengaluru.edu.in/bba.php" className="block px-3 py-2 text-xs uppercase hover:bg-gray-100 rounded">BBA</a>
                  <a href="https://kimsbengaluru.edu.in/BBA-ava.php" className="block px-3 py-2 text-xs uppercase hover:bg-gray-100 rounded">BBA Aviation (BNU)</a>
                  <a href="https://kimsbengaluru.edu.in/bba.php" className="block px-3 py-2 text-xs uppercase hover:bg-gray-100 rounded">BBA Advanced</a>
                  <a href="https://kimsbengaluru.edu.in/BCom.php" className="block px-3 py-2 text-xs uppercase hover:bg-gray-100 rounded">B.Com</a>
                  <a href="https://kimsbengaluru.edu.in/BCOM-log.php" className="block px-3 py-2 text-xs uppercase hover:bg-gray-100 rounded">B.Com Logistics</a>
                  <a href="https://kimsbengaluru.edu.in/BCom" className="block px-3 py-2 text-xs uppercase hover:bg-gray-100 rounded">B.Com Advanced</a>
                  <a href="https://kimsbengaluru.edu.in/BCA.php" className="block px-3 py-2 text-xs uppercase hover:bg-gray-100 rounded">BCA</a>
                  <a href="https://kimsbengaluru.edu.in/BCA.php" className="block px-3 py-2 text-xs uppercase hover:bg-gray-100 rounded">BCA Advanced</a>
                  <a href="https://kimsbengaluru.edu.in/MBA.php" className="block px-3 py-2 text-xs uppercase hover:bg-gray-100 rounded">MBA</a>
                  <a href="https://kimsbengaluru.edu.in/MCA.php" className="block px-3 py-2 text-xs uppercase hover:bg-gray-100 rounded">MCA</a>
                  <a href="https://kgi.edu.in/KIHS/gnm.php" className="block px-3 py-2 text-xs uppercase hover:bg-gray-100 rounded">GNM</a>
                  <a href="https://kgi.edu.in/KIHS/bscNursing.php" className="block px-3 py-2 text-xs uppercase hover:bg-gray-100 rounded">B.Sc Nursing</a>
                  <a href="https://kgi.edu.in/KIHS/pbBsc.php" className="block px-3 py-2 text-xs uppercase hover:bg-gray-100 rounded">PBBSc</a>
                  <a href="https://kgi.edu.in/KIHS/MscNursing.php" className="block px-3 py-2 text-xs uppercase hover:bg-gray-100 rounded">M.Sc Nursing</a>
                  <a href="https://kgi.edu.in/KIHS/BSCren.php" className="block px-3 py-2 text-xs uppercase hover:bg-gray-100 rounded">B.Sc Renal Dialysis</a>
                  <a href="https://kgi.edu.in/KIHS/BSCres.php" className="block px-3 py-2 text-xs uppercase hover:bg-gray-100 rounded">B.Sc Respiratory</a>
                  <a href="https://kgi.edu.in/KIHS/bscOtt.php" className="block px-3 py-2 text-xs uppercase hover:bg-gray-100 rounded">B.Sc AT & OT</a>
                  <a href="https://kgi.edu.in/KIHS/bscMit.php" className="block px-3 py-2 text-xs uppercase hover:bg-gray-100 rounded">B.Sc MIT</a>
                  <a href="https://kgi.edu.in/KIHS/BSCmlt.php" className="block px-3 py-2 text-xs uppercase hover:bg-gray-100 rounded">B.Sc MLT</a>
                  <a href="https://kimsbengaluru.edu.in/bhm" className="block px-3 py-2 text-xs uppercase hover:bg-gray-100 rounded">Hotel Management</a>
                  <a href="https://koshysglobalacademia.com/" className="block px-3 py-2 text-xs uppercase hover:bg-gray-100 rounded">School</a>
                </div>
              )}
            </div>

            {/* Admissions */}
            <div>
              <button
                onClick={() => toggleDropdown('admissions')}
                className="w-full text-left px-3 py-2 text-sm font-semibold uppercase hover:bg-gray-100 rounded"
              >
                Admissions {openDropdowns.includes('admissions') ? '▼' : '▶'}
              </button>
              {openDropdowns.includes('admissions') && (
                <div className="bg-gray-50 pl-4 space-y-1">
                  <a href="https://apply.kgi.edu.in/" className="block px-3 py-2 text-xs uppercase hover:bg-gray-100 rounded">Apply Now</a>
                  <a href="https://kimsbengaluru.edu.in/kimsmail" className="block px-3 py-2 text-xs uppercase hover:bg-gray-100 rounded">Download Brochure - UG & PG</a>
                  <a href="https://www.kgi.edu.in/KIHS/kihsmail" className="block px-3 py-2 text-xs uppercase hover:bg-gray-100 rounded">Download Brochure - Health Sciences</a>
                </div>
              )}
            </div>

            {/* Login */}
            <div>
              <button
                onClick={() => toggleDropdown('login')}
                className="w-full text-left px-3 py-2 text-sm font-semibold uppercase hover:bg-gray-100 rounded"
              >
                Login {openDropdowns.includes('login') ? '▼' : '▶'}
              </button>
              {openDropdowns.includes('login') && (
                <div className="bg-gray-50 pl-4 space-y-1">
                  <a href="https://kgi.pro910.com/Pro910/Login/login.php" className="block px-3 py-2 text-xs uppercase hover:bg-gray-100 rounded">Employee Login</a>
                  <a href="https://kgi.pro910.com/Pro910/Login/login.php" className="block px-3 py-2 text-xs uppercase hover:bg-gray-100 rounded">Student Login</a>
                </div>
              )}
            </div>

            {/* Contact Button */}
            <div>
              <a href="https://kgi.edu.in/ContactKGI.php" className="block">
                <button className="w-full bg-kgi-red text-white font-semibold py-2 px-4 rounded text-xs uppercase hover:bg-red-800 transition-colors">
                  Contact Us
                </button>
              </a>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
