import { MapPin, Clock, Phone, ExternalLink } from 'lucide-react';

interface ContactPageProps {
  onNavigate: (page: string) => void;
}

export default function ContactPage({ onNavigate }: ContactPageProps) {
  return (
    <div className="font-sans">
      {/* Header */}
      <div className="bg-gradient-to-r from-navy-800 to-navy-700 text-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="font-sans text-teal-400 text-sm font-semibold tracking-widest uppercase mb-3">
              Get In Touch
            </p>
            <h1 className="font-serif text-3xl md:text-4xl font-bold mb-3">Contact Us</h1>
            <p className="font-sans text-blue-200 text-lg">
              Reach out to the clinic for appointments, directions, or any queries.
            </p>
          </div>
        </div>
      </div>

      <section className="py-16 bg-light-grey">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-10">
            {/* Thergaon Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 flex flex-col h-full hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center flex-shrink-0">
                  <MapPin size={24} className="text-teal-500" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-navy-800 text-xl mb-2">Dr. Teje's Physician & Diabetology Clinic</h3>
                  <p className="font-sans text-gray-600 text-sm leading-relaxed">
                    Greens Centre, Opposite Pudumjee Paper Mill,<br />
                    Thergaon, Pimpri-Chinchwad, Pune – 411033
                  </p>
                </div>
              </div>
              <div className="bg-gray-50 rounded-xl p-5 mb-8 flex-grow border border-gray-100">
                <h4 className="font-sans font-semibold text-navy-800 text-sm mb-4 flex items-center gap-2">
                  <Clock size={18} className="text-teal-500" /> Consultation Hours
                </h4>
                <ul className="space-y-3 font-sans text-sm">
                  <li className="flex justify-between items-center text-gray-600">
                    <span>Mon, Tue, Wed, Fri, Sat</span>
                    <span className="font-semibold text-navy-800 bg-white px-3 py-1 rounded-md shadow-sm border border-gray-100">6:00 PM – 8:30 PM</span>
                  </li>
                  <li className="flex justify-between items-center text-red-500 font-medium pt-3 border-t border-gray-200">
                    <span>Thursday & Sunday</span>
                    <span className="bg-red-50 px-3 py-1 rounded-md">Closed</span>
                  </li>
                </ul>
              </div>
              <a
                href="https://maps.app.goo.gl/pajyPZSXdb4GYNc76"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full flex items-center justify-center gap-2 py-3.5"
              >
                Get Directions <ExternalLink size={18} />
              </a>
            </div>

            {/* Manipal Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 flex flex-col h-full hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                  <MapPin size={24} className="text-blue-500" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-navy-800 text-xl mb-2">Manipal Hospitals, Baner</h3>
                  <p className="font-sans text-gray-600 text-sm leading-relaxed">
                    Survey No 111/11/1, Veerbhadra Nagar Road,<br />
                    Baner-Mhalunge Main Road, Baner, Pune – 411045
                  </p>
                  
                </div>
              </div>
              <div className="bg-gray-50 rounded-xl p-5 mb-8 flex-grow border border-gray-100">
                <h4 className="font-sans font-semibold text-navy-800 text-sm mb-4 flex items-center gap-2">
                  <Clock size={18} className="text-blue-500" /> Consultation Hours
                </h4>
                <ul className="space-y-3 font-sans text-sm">
                  <li className="flex justify-between items-center text-gray-600">
                    <span>Tue, Wed, Fri, Sat</span>
                    <span className="font-semibold text-navy-800 bg-white px-3 py-1 rounded-md shadow-sm border border-gray-100">9:00 AM – 3:00 PM</span>
                  </li>
                  <li className="flex justify-between items-center text-gray-600">
                    <span>Thursday</span>
                    <span className="font-semibold text-navy-800 bg-white px-3 py-1 rounded-md shadow-sm border border-gray-100">2:00 PM – 8:00 PM</span>
                  </li>
                  <li className="flex justify-between items-center text-gray-600">
                    <span>Sunday</span>
                    <span className="font-semibold text-navy-800 bg-white px-3 py-1 rounded-md shadow-sm border border-gray-100">10:00 AM – 12:00 PM</span>
                  </li>
                  <li className="flex justify-between items-center text-red-500 font-medium pt-3 border-t border-gray-200">
                    <span>Monday</span>
                    <span className="bg-red-50 px-3 py-1 rounded-md">Not Available</span>
                  </li>
                </ul>
              </div>
              <a
                href="https://maps.app.goo.gl/pMJBgrX3WtyW75mi9"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 border-2 border-blue-500 text-blue-600 rounded-xl font-sans font-semibold text-sm hover:bg-blue-50 transition-colors flex items-center justify-center gap-2"
              >
                Get Directions <ExternalLink size={18} />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
