import Header from '@/components/Header';
import AdmissionsForm from '@/components/AdmissionsForm';
import ImageSlider from '@/components/ImageSlider';
import Footer from '@/components/Footer';
import { ArrowRight, BookOpen, Users, Globe } from 'lucide-react';

export default function Index() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <Header />

      {/* Hero + Admissions — Image Slider LEFT, Form RIGHT */}
      <section className="flex-1 bg-gray-900">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row min-h-[600px]">
          {/* Left — Image Slider (takes ~60%) */}
          <div className="flex-1 lg:flex-[1.6] min-h-[400px] lg:min-h-[600px]">
            <ImageSlider />
          </div>

          {/* Right — Compact Admissions Form (~40%) */}
          <div className="lg:flex-[1] flex items-center justify-center bg-white px-6 py-8 lg:px-8 lg:py-10">
            <div className="w-full max-w-sm">
              <div className="mb-5">
                <span className="inline-block bg-red-100 text-red-700 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3">
                  Admissions Open 2025
                </span>
                <h2 className="text-2xl font-extrabold text-gray-900 leading-tight">
                  Start Your Journey at KGI
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Register or login to apply to Koshys Group of Institutions (KGI)
                </p>
              </div>
              <AdmissionsForm minimal={true} />
            </div>
          </div>
        </div>
      </section>

      {/* Institutions Section */}
      <section className="py-16 px-4 md:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block bg-red-100 text-red-700 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3">
              Our Campuses
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Our Institutions
            </h2>
            <p className="text-gray-500 mt-2 max-w-xl mx-auto text-sm">
              Koshys Group of Institutions (KGI) offers diverse programs across four specialized institutions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* KIMS */}
            <a href="https://kimsbengaluru.edu.in/" className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all overflow-hidden border border-gray-100 hover:-translate-y-1">
              <div className="bg-gradient-to-br from-red-600 to-red-800 h-32 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
                <Users size={44} className="text-white relative z-10" />
              </div>
              <div className="p-5">
                <h3 className="text-base font-bold text-gray-900 mb-1">Management Studies</h3>
                <p className="text-xs text-gray-500 mb-4 leading-relaxed">World-class business education at Koshys Institute of Management Studies</p>
                <span className="text-red-600 font-semibold flex items-center gap-1 text-sm">
                  Explore <ArrowRight size={14} />
                </span>
              </div>
            </a>

            {/* KIHS */}
            <a href="https://www.kgi.edu.in/KIHS/index.php" className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all overflow-hidden border border-gray-100 hover:-translate-y-1">
              <div className="bg-gradient-to-br from-red-600 to-red-800 h-32 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
                <Globe size={44} className="text-white relative z-10" />
              </div>
              <div className="p-5">
                <h3 className="text-base font-bold text-gray-900 mb-1">Health Sciences</h3>
                <p className="text-xs text-gray-500 mb-4 leading-relaxed">Comprehensive nursing and health science programs for healthcare professionals</p>
                <span className="text-red-600 font-semibold flex items-center gap-1 text-sm">
                  Explore <ArrowRight size={14} />
                </span>
              </div>
            </a>

            {/* Hotel Management */}
            <a href="https://kihm.kgi.edu.in/" className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all overflow-hidden border border-gray-100 hover:-translate-y-1">
              <div className="bg-gradient-to-br from-red-600 to-red-800 h-32 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
                <BookOpen size={44} className="text-white relative z-10" />
              </div>
              <div className="p-5">
                <h3 className="text-base font-bold text-gray-900 mb-1">Hotel Management</h3>
                <p className="text-xs text-gray-500 mb-4 leading-relaxed">Excellence in hospitality and hotel management education and training</p>
                <span className="text-red-600 font-semibold flex items-center gap-1 text-sm">
                  Explore <ArrowRight size={14} />
                </span>
              </div>
            </a>

            {/* School */}
            <a href="https://kgischool.edu.in/" className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all overflow-hidden border border-gray-100 hover:-translate-y-1">
              <div className="bg-gradient-to-br from-red-600 to-red-800 h-32 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
                <Users size={44} className="text-white relative z-10" />
              </div>
              <div className="p-5">
                <h3 className="text-base font-bold text-gray-900 mb-1">School (CBSE)</h3>
                <p className="text-xs text-gray-500 mb-4 leading-relaxed">Quality school education with modern pedagogy and holistic development</p>
                <span className="text-red-600 font-semibold flex items-center gap-1 text-sm">
                  Explore <ArrowRight size={14} />
                </span>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
