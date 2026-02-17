import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-white">
      <div className="container max-w-7xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-12">

          {/* Column 1: Quick Links & Certifications */}
          <div>
            <h3 className="font-montserrat font-bold text-lg uppercase mb-6 text-white">
              Quick Links
            </h3>
            <ul className="space-y-3 mb-8 text-sm">
              <li><a href="https://www.kgi.edu.in/" className="text-gray-300 hover:text-primary transition duration-300">KGI Home</a></li>
              <li><a href="https://kimsbengaluru.edu.in/careers.php" className="text-gray-300 hover:text-primary transition duration-300">Careers</a></li>
              <li><a href="https://kimsbengaluru.edu.in/alumni.php" className="text-gray-300 hover:text-primary transition duration-300">Alumni</a></li>
              <li><a href="https://kimsbengaluru.edu.in/research.php" className="text-gray-300 hover:text-primary transition duration-300">Research</a></li>
              <li><a href="https://swayam.gov.in/" className="text-gray-300 hover:text-primary transition duration-300">MOOC</a></li>
            </ul>
            <h3 className="font-montserrat font-bold text-lg uppercase mb-6 text-white">
              Certifications
            </h3>
            <ul className="space-y-3 text-sm">
              <li><a href="https://kimsbengaluru.edu.in/aicte.php" className="text-gray-300 hover:text-primary transition duration-300">AICTE</a></li>
              <li><a href="https://kimsbengaluru.edu.in/naac.php" className="text-gray-300 hover:text-primary transition duration-300">NAAC</a></li>
              <li><a href="https://kimsbengaluru.edu.in/IQAC.php" className="text-gray-300 hover:text-primary transition duration-300">IQAC</a></li>
              <li><a href="https://kimsbengaluru.edu.in/rti.php" className="text-gray-300 hover:text-primary transition duration-300">RTI</a></li>
            </ul>
          </div>

          {/* Column 2: Address */}
          <div>
            <h3 className="font-montserrat font-bold text-lg uppercase mb-6 text-white">
              Address
            </h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <div className="text-gray-300">
                  #31/1, Kannur P.O, Hennur-Bagalur Road, Mitganahalli, Kadusonnapanahalli, Bengaluru, Karnataka 562149.
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                <a href="tel:+91808866000" className="text-gray-300 hover:text-primary transition duration-300">
                  808 866 0000
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                <a href="mailto:info@kgi.edu.in" className="text-gray-300 hover:text-primary transition duration-300">
                  info@kgi.edu.in
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Institutions & Hospitals */}
          <div>
            <h3 className="font-montserrat font-bold text-lg uppercase mb-6 text-white">
              Institutions
            </h3>
            <ul className="space-y-3 mb-8 text-sm">
              <li><a href="https://www.kgi.edu.in/KIMS" className="text-gray-300 hover:text-primary transition duration-300">Koshys Institute of Management Studies</a></li>
              <li><a href="https://www.kgi.edu.in/KIHS" className="text-gray-300 hover:text-primary transition duration-300">Koshys Institute of Health Sciences</a></li>
              <li><a href="https://kimsbengaluru.edu.in/bhm" className="text-gray-300 hover:text-primary transition duration-300">Koshys Institute of Hotel Management</a></li>
            </ul>
            <h3 className="font-montserrat font-bold text-lg uppercase mb-6 text-white">
              Our Hospitals
            </h3>
            <ul className="space-y-3 text-sm">
              <li><a href="https://www.littleflowerhospital.in/" className="text-gray-300 hover:text-primary transition duration-300">Little Flower Hospital Pvt. Ltd.</a></li>
              <li><a href="https://www.koshyshospital.com/" className="text-gray-300 hover:text-primary transition duration-300">Koshys Hospital</a></li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <p>&copy; 2024 KIMS Bengaluru. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-primary transition duration-300">Privacy Policy</a>
              <a href="#" className="hover:text-primary transition duration-300">Terms of Service</a>
              <a href="#" className="hover:text-primary transition duration-300">Contact</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
