'use client';
import { useState } from 'react';
import { Menu, X, ChevronDown, ChevronRight } from 'lucide-react';

const navItems = [
  {
    label: 'About KGI',
    children: [
      { label: 'About Us', href: 'https://www.kgi.edu.in/AboutWhyKGI.php' },
      { label: 'Mission & Vision', href: 'https://www.kgi.edu.in/mission-and-vission.php' },
      { label: 'Milestones', href: 'https://www.kgi.edu.in/milestone.php' },
      { label: 'Founder', href: 'https://www.kgi.edu.in/FounderMessageKGI.php' },
      { label: 'Leadership Team', href: 'https://www.kgi.edu.in/leadership.php' },
      { label: 'Industrial Association', href: 'https://www.kgi.edu.in/industrial-association.php' },
      { label: 'Advisory Board', href: 'https://www.kgi.edu.in/advisory-board.php' },
      { label: 'Affiliation & Accreditation', href: 'https://www.kgi.edu.in/affiliarion.php' },
    ],
  },
  {
    label: 'Institutions',
    children: [
      { label: 'Koshys Institute of Management Studies', href: 'https://kimsbengaluru.edu.in/' },
      { label: 'Koshys Institute of Health Sciences', href: 'https://www.kgi.edu.in/KIHS/index.php' },
      { label: 'Koshys Institute of Hotel Management', href: 'https://kimsbengaluru.edu.in/bhm' },
      { label: 'Koshys Global Academia (CBSE)', href: 'https://koshysglobalacademia.com/' },
    ],
  },
  {
    label: 'Courses',
    children: [
      {
        label: 'UG', href: '#', children: [
          { label: 'B.Sc Forensic Science', href: 'https://kimsbengaluru.edu.in/BA-cpj.php' },
          { label: 'BVA - Animation & Multimedia', href: 'https://kimsbengaluru.edu.in/BVA.php' },
          { label: 'BVA - Applied Arts & Graphic', href: 'https://kimsbengaluru.edu.in/bvaag.php' },
          { label: 'BVA - Interior & Spatial Design', href: 'https://kimsbengaluru.edu.in/BVA-aa.php' },
          { label: 'BBA', href: 'https://kimsbengaluru.edu.in/bba.php' },
          { label: 'BBA Aviation (BNU)', href: 'https://kimsbengaluru.edu.in/BBA-ava.php' },
          { label: 'BBA Advanced', href: 'https://kimsbengaluru.edu.in/bba.php' },
          { label: 'B.Com', href: 'https://kimsbengaluru.edu.in/BCom.php' },
          { label: 'B.Com Logistics', href: 'https://kimsbengaluru.edu.in/BCOM-log.php' },
          { label: 'B.Com Advanced', href: 'https://kimsbengaluru.edu.in/BCom' },
          { label: 'BCA', href: 'https://kimsbengaluru.edu.in/BCA.php' },
          { label: 'BCA Advanced', href: 'https://kimsbengaluru.edu.in/BCA.php' },
        ],
      },
      {
        label: 'PG', href: '#', children: [
          { label: 'MBA', href: 'https://kimsbengaluru.edu.in/MBA.php' },
          { label: 'MCA', href: 'https://kimsbengaluru.edu.in/MCA.php' },
        ],
      },
      {
        label: 'Nursing', href: '#', children: [
          { label: 'GNM', href: 'https://kgi.edu.in/KIHS/gnm.php' },
          { label: 'B.Sc Nursing', href: 'https://kgi.edu.in/KIHS/bscNursing.php' },
          { label: 'PBBSc', href: 'https://kgi.edu.in/KIHS/pbBsc.php' },
          { label: 'M.Sc Nursing', href: 'https://kgi.edu.in/KIHS/MscNursing.php' },
        ],
      },
      {
        label: 'Allied Health Sciences', href: '#', children: [
          { label: 'B.Sc Renal Dialysis', href: 'https://kgi.edu.in/KIHS/BSCren.php' },
          { label: 'B.Sc Respiratory', href: 'https://kgi.edu.in/KIHS/BSCres.php' },
          { label: 'B.Sc AT & OT', href: 'https://kgi.edu.in/KIHS/bscOtt.php' },
          { label: 'B.Sc MIT', href: 'https://kgi.edu.in/KIHS/bscMit.php' },
          { label: 'B.Sc MLT', href: 'https://kgi.edu.in/KIHS/BSCmlt.php' },
        ],
      },
      { label: 'Hotel Management', href: 'https://kimsbengaluru.edu.in/bhm' },
      { label: 'School', href: 'https://koshysglobalacademia.com/' },
    ],
  },
  {
    label: 'Admissions',
    children: [
      { label: 'Apply Now', href: 'https://apply.kgi.edu.in/' },
      {
        label: 'Download Brochure', href: '#', children: [
          { label: 'UG & PG', href: 'https://kimsbengaluru.edu.in/kimsmail' },
          { label: 'Health Sciences', href: 'https://www.kgi.edu.in/KIHS/kihsmail' },
        ],
      },
    ],
  },
  {
    label: 'Login',
    children: [
      { label: 'Employee Login', href: 'https://kgi.pro910.com/Pro910/Login/login.php' },
      { label: 'Student Login', href: 'https://kgi.pro910.com/Pro910/Login/login.php' },
    ],
  },
];

// Recursive mobile accordion item
function MobileItem({ item, depth = 0 }: { item: any; depth?: number }) {
  const [open, setOpen] = useState(false);
  const hasChildren = item.children?.length > 0;
  const pl = depth === 0 ? 'px-4' : depth === 1 ? 'px-8' : 'px-12';

  if (!hasChildren) {
    return (
      <a
        href={item.href}
        className={`block ${pl} py-2.5 text-xs font-semibold uppercase tracking-wide text-gray-700 hover:bg-red-50 hover:text-red-700 border-b border-gray-100 transition-colors`}
      >
        {item.label}
      </a>
    );
  }

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className={`w-full flex items-center justify-between ${pl} py-2.5 text-xs font-semibold uppercase tracking-wide text-gray-800 hover:bg-red-50 hover:text-red-700 border-b border-gray-100 transition-colors`}
      >
        {item.label}
        <ChevronDown size={13} className={`mr-1 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className={`bg-gray-50 ${depth > 0 ? 'border-l-2 border-red-200 ml-4' : ''}`}>
          {item.children.map((child: any) => (
            <MobileItem key={child.label} item={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

// Desktop dropdown (recursive)
function DesktopDropdown({ items, level = 0 }: { items: any[]; level?: number }) {
  return (
    <ul className={`absolute bg-white text-black shadow-xl border border-gray-100 w-56 z-50 ${level === 0 ? 'top-full left-0' : 'top-0 left-full'}`}>
      {items.map((item) => {
        const hasChildren = item.children?.length > 0;
        return (
          <li key={item.label} className="relative group/sub">
            <a
              href={item.href || '#'}
              className="flex items-center justify-between px-4 py-3 text-xs uppercase font-medium hover:bg-red-50 hover:text-red-700 transition-colors border-b border-gray-50"
            >
              {item.label}
              {hasChildren && <ChevronRight size={11} className="text-gray-400" />}
            </a>
            {hasChildren && (
              <div className="absolute top-0 left-full hidden group-hover/sub:block">
                <DesktopDropdown items={item.children} level={level + 1} />
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="relative w-full z-50">
      <div className="flex items-center justify-between bg-red-800 px-4">
        {/* Desktop Nav */}
        <nav className="hidden md:block">
          <ul className="flex items-center">
            {navItems.map((item) => (
              <li key={item.label} className="relative group">
                <a
                  href="#"
                  className="text-white text-sm font-semibold uppercase px-4 py-6 flex items-center gap-1 hover:bg-black/15 transition-colors"
                >
                  {item.label}
                  <ChevronDown size={12} className="opacity-70" />
                </a>
                <div className="absolute top-full left-0 hidden group-hover:block">
                  <DesktopDropdown items={item.children} />
                </div>
              </li>
            ))}
            <li>
              <a href="https://kgi.edu.in/ContactKGI.php">
                <button className="ml-2 bg-white text-red-800 font-bold py-2 px-5 rounded text-xs uppercase hover:bg-gray-100 transition-colors">
                  Contact Us
                </button>
              </a>
            </li>
          </ul>
        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-white p-2 rounded hover:bg-white/10 transition-colors"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <nav className="md:hidden bg-white border-t-2 border-red-800 max-h-[80vh] overflow-y-auto shadow-xl absolute w-full left-0">
          {navItems.map((item) => (
            <MobileItem key={item.label} item={item} depth={0} />
          ))}
          <div className="px-4 py-3 border-t border-gray-200">
            <a href="https://kgi.edu.in/ContactKGI.php">
              <button className="w-full bg-red-700 text-white font-bold py-2.5 px-4 rounded text-xs uppercase hover:bg-red-800 transition-colors">
                Contact Us
              </button>
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
