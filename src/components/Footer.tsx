import { MapPin, Clock, ExternalLink } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <>
      {/* ── FOOTER ── */}
      <footer className="bg-navy-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Column 1: Logo & Description */}
            <div className="space-y-4">
              <button
                onClick={() => onNavigate('home')}
                className="flex items-center gap-3 group"
              >
                <div className="w-10 h-10 rounded-full bg-navy-800 flex items-center justify-center flex-shrink-0 group-hover:bg-teal-500 transition-colors duration-200">
                  <span className="text-white font-serif font-bold text-sm">DT</span>
                </div>
                <div className="leading-tight text-left">
                  <div className="font-serif font-bold text-white text-base leading-tight">Dr. Teje</div>
                  <div className="font-sans text-xs text-teal-500 font-medium">Physician & Diabetologist</div>
                </div>
              </button>
              <p className="font-sans text-gray-400 text-sm leading-relaxed">
                Comprehensive and compassionate care for diabetes and internal medicine conditions.
                Diagnosis-first approach for effective treatment.
              </p>
            </div>

            {/* Column 2: Quick Links */}
            <div>
              <h3 className="font-serif text-lg font-bold text-white mb-4">Quick Links</h3>
              <ul className="space-y-3">
                {[
                  { label: 'Home', page: 'home' },
                  { label: 'About Dr. Teje', page: 'about' },
                  { label: 'Expertise', page: 'expertise' },
                  { label: 'Services', page: 'services' },
                  { label: 'Testimonials', page: 'testimonials' }, // Added Testimonials
                  { label: 'Appointments', page: 'appointments' },
                  { label: 'Health Blog', page: 'blog' },
                  { label: 'Contact Us', page: 'contact' },
                ].map((link) => (
                  <li key={link.label}>
                    <button
                      onClick={() => onNavigate(link.page)}
                      className="font-sans text-gray-400 hover:text-teal-500 transition-colors text-sm"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Thergaon Clinic */}
            <div>
              <h3 className="font-serif text-lg font-bold text-white mb-4">Thergaon Clinic</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <MapPin size={18} className="text-teal-500 flex-shrink-0 mt-1" />
                  <p className="font-sans text-gray-400 text-sm">
                    Greens Centre, Opposite Pudumjee Paper Mill, Thergaon, Pimpri-Chinchwad, Pune – 411033
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <Clock size={18} className="text-teal-500 flex-shrink-0 mt-1" />
                  <p className="font-sans text-gray-400 text-sm">
                    Mon-Sat: 6:00 PM – 8:30 PM <br />
                    (Closed on Thu & Sun)
                  </p>
                </div>
                <a
                  href="https://maps.app.goo.gl/pajyPZSXdb4GYNc76"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-teal-500 hover:text-teal-400 transition-colors text-sm font-medium"
                >
                  Get Directions <ExternalLink size={14} />
                </a>
              </div>
            </div>

            {/* Column 4: Manipal Hospital */}
            <div>
              <h3 className="font-serif text-lg font-bold text-white mb-4">Manipal Hospital, Baner</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <MapPin size={18} className="text-blue-400 flex-shrink-0 mt-1" />
                  <p className="font-sans text-gray-400 text-sm">
                    Survey No 111/11/1, Veerbhadra Nagar Road, Baner-Mhalunge Main Road, Baner, Pune – 411045
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <Clock size={18} className="text-blue-400 flex-shrink-0 mt-1" />
                  <p className="font-sans text-gray-400 text-sm">
                    Tue, Wed, Fri, Sat: 9:00 AM – 3:00 PM <br />
                    Thu: 2:00 PM – 8:00 PM <br />
                    Sun: 10:00 AM – 12:00 PM <br />
                    (Closed on Mon)
                  </p>
                </div>
                <a
                  href="https://maps.app.goo.gl/pMJBgrX3WtyW75mi9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors text-sm font-medium"
                >
                  Get Directions <ExternalLink size={14} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
            <p className="font-sans text-gray-500 text-xs">
              © {year} Dr. Prathamesh Teje. All rights reserved.
            </p>
            <p className="font-sans text-gray-600 text-xs text-center sm:text-right">
              Designed by <a href="https://studio-sr.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-teal-400 transition-colors">Studio SR</a>
            </p>
            <p className="font-sans text-gray-600 text-xs">
              This website is for informational purposes only. Please consult the doctor for medical advice.
            </p>
					<button
  onClick={() => onNavigate("admin")}
  className="font-sans text-xs text-gray-500 hover:text-teal-500 transition-colors duration-200"
>
  Staff Login
</button>
          </div>
        </div>
      </footer>

      {/* ── WHATSAPP FLOAT BUTTON ── */}
      <a
        href="https://wa.me/918999046916"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-green-500 flex items-center justify-center shadow-lg hover:bg-green-600 transition-colors whatsapp-pulse"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>
    </>
  );
}
