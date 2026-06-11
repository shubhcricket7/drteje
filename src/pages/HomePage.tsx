import {
  Award,
  CheckCircle,
  Clock,
  MapPin,
  Star,
  ChevronRight,
  Activity,
  Droplets,
  Heart,
  Thermometer,
  Brain,
  Shield,
  ExternalLink,
  Phone,
  PlayCircle // New import for video testimonials
} from 'lucide-react';
import { videoTestimonials } from '../pages/TestimonialsPage'; // New import for video testimonials data

interface HomePageProps {
  onNavigate: (page: string) => void;
  onOpenModal: () => void;
}

const expertiseCards = [
  { icon: Droplets, title: 'Diabetes & Complications', desc: 'London RCP Certified', highlights: 'Blood sugar management, Neuropathy, Retinopathy' },
  { icon: Heart, title: 'Hypertension Management', desc: 'Blood Pressure Care', highlights: 'Stage 1/2 HTN, Resistant HTN' },
  { icon: Activity, title: 'Thyroid Conditions', desc: 'Thyroid Disorders', highlights: 'Hypothyroidism, Hyperthyroidism' },
  { icon: Thermometer, title: 'Fever & Infections', desc: 'Infectious Diseases', highlights: 'Dengue, Malaria, Typhoid, Flu' },
  { icon: Brain, title: 'Stress & Sleep Disorders', desc: 'Mental Wellness', highlights: 'Insomnia, Anxiety management' },
  { icon: Shield, title: 'Preventive Health', desc: 'Vaccines & Checkups', highlights: 'Annual health screening' },
];

// New data for Google Reviews
const googleReviews = [
  {
    name: 'A. Sharma',
    text: 'Dr. Teje is incredibly thorough and patient. My health has significantly improved under his care. Highly recommended!',
  },
  {
    name: 'P. Kumar',
    text: 'A truly compassionate doctor who listens. He explained my condition clearly and the treatment plan was very effective.',
  },
  {
    name: 'S. Gupta',
    text: 'Excellent physician! The diagnosis was spot on, and the treatment worked wonders. Very professional and trustworthy.',
  },
  {
    name: 'R. Singh',
    text: 'I appreciate the detailed consultation and the focus on minimal medication. Feeling much better now. Thank you, Doctor!',
  },
];

const treatmentColors: Record<string, string> = {
  'Diabetes': 'bg-blue-50 text-blue-700 border-blue-100',
  'Thyroid': 'bg-purple-50 text-purple-700 border-purple-100',
  'Fever & Infections': 'bg-orange-50 text-orange-700 border-orange-100',
  'Hypertension': 'bg-red-50 text-red-700 border-red-100',
  'Cholesterol': 'bg-green-50 text-green-700 border-green-100',
  'Preventive Health': 'bg-teal-50 text-teal-700 border-teal-100',
};

export default function HomePage({ onNavigate, onOpenModal }: HomePageProps) {
  return (
    <div className="font-sans">
      {/* ── HERO ── */}
      <section className="bg-gradient-to-br from-navy-800 via-navy-700 to-navy-900 text-white relative overflow-hidden">
        {/* Background pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px',
          }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text */}
            <div className="order-2 lg:order-1">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-teal-500/20 border border-teal-400/30 px-4 py-1.5 rounded-full mb-6">
                <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
                <span className="font-sans text-teal-300 text-xs font-semibold tracking-wide uppercase">
                  Accepting New Patients
                </span>
              </div>

              <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4 text-balance">
                Diagnosis-First.<br />
                <span className="text-teal-400">Guideline-Based.</span><br />
                Patient-Centered.
              </h1>

              <p className="font-sans text-blue-100 text-lg mb-2 leading-relaxed">
                Consultant Physician & Diabetologist (London) | Pimpri-Chinchwad, Pune
              </p>
              <p className="font-sans text-blue-200/70 text-sm mb-8">
                MBBS, DNB – Internal Medicine &nbsp;·&nbsp; RCP London Certified &nbsp;·&nbsp; 7+ Years Experience
              </p>

              <div className="flex flex-wrap gap-4 mb-10">
                <button
                  onClick={onOpenModal}
                  className="btn-primary px-7 py-3.5 text-sm"
                >
                  Book Appointment
                </button>
                <button
                  onClick={() => onNavigate('expertise')}
                  className="flex items-center gap-2 border-2 border-white/30 text-white px-7 py-3.5 rounded-md font-sans font-semibold text-sm transition-all duration-200 hover:border-white hover:bg-white/10"
                >
                  View Expertise <ChevronRight size={16} />
                </button>
              </div>

              {/* Prominent Location & Timings Badges */}
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Thergaon Badge */}
                <div className="bg-white/5 border border-white/10 hover:bg-white/10 transition-colors rounded-xl p-4 flex-1 backdrop-blur-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin size={18} className="text-teal-400" />
                    <span className="font-sans font-semibold text-white text-sm">Thergaon Clinic</span>
                  </div>
                  <p className="font-sans text-blue-100 text-xs leading-relaxed">
                    Mon-Sat (Evening: 6:00 PM – 8:30 PM)
                  </p>
                  <p className="font-sans text-red-300/90 text-xs mt-1 font-medium">
                    Closed on Thu & Sun
                  </p>
                </div>

                {/* Manipal Badge */}
                <div className="bg-white/5 border border-white/10 hover:bg-white/10 transition-colors rounded-xl p-4 flex-1 backdrop-blur-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin size={18} className="text-blue-400" />
                    <span className="font-sans font-semibold text-white text-sm">Manipal Hospital (Baner)</span>
                  </div>
                  <p className="font-sans text-blue-100 text-xs leading-relaxed">
                    Tue, Wed, Fri, Sat: 9:00 AM – 3:00 PM <br />
                    Thu: 2:00 PM – 8:00 PM <br />
                    Sun: 10:00 AM – 12:00 PM <br />
                    (Closed on Mon)
                  </p>
                </div>
              </div>
            </div>

            {/* Doctor Photo */}
            <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
              <div className="relative">
                <div className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-2xl overflow-hidden border-4 border-teal-400/30 shadow-2xl">
                  <img
                    src="https://www.manipalhospitals.com/uploads/doctors_photo/dr-prathamesh-teje-top-internal-medicine-doctor-baner-pune.png"
                    alt="Dr. Prathamesh Teje — Consultant Physician & Diabetologist"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                {/* Floating credential badge */}
                <div className="absolute -bottom-4 -left-4 bg-white rounded-xl px-4 py-3 shadow-xl border border-gray-100">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <Award size={16} className="text-white" />
                    </div>
                    <div>
                      <div className="font-serif text-navy-800 font-bold text-xs">RCP London</div>
                      <div className="font-sans text-gray-500 text-xs">Certified Diabetologist</div>
                    </div>
                  </div>
                </div>
                {/* Verified badge */}
                <div className="absolute -top-3 -right-3 bg-teal-500 rounded-full px-3 py-1.5 shadow-lg flex items-center gap-1">
                  <CheckCircle size={13} className="text-white" />
                  <span className="font-sans text-white text-xs font-semibold">Verified</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TRUST BAR ── */}
      <section className="bg-navy-800 border-t border-navy-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: '🎓', label: 'MBBS + DNB Medicine', sub: 'National Board Exam' },
              { icon: '🏅', label: 'RCP London Certified', sub: 'Diabetes Specialist' },
              { icon: '📅', label: '7+ Years Experience', sub: '' },
              { icon: '✅', label: 'Verified Registration', sub: '' },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3">
                <span className="text-2xl">{item.icon}</span>
                <div>
                  <div className="font-sans text-white text-sm font-semibold">{item.label}</div>
                  <div className="font-sans text-blue-300/70 text-xs">{item.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EXPERTISE SNAPSHOT ── */}
      <section className="py-16 lg:py-20 bg-light-grey">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-heading">Areas ofExpertise</h2>
            <p className="section-subheading max-w-2xl mx-auto">
              Specialised care across the full spectrum of internal medicine — from metabolic
              diseases to preventive health.
            </p>
          </div>
          {/* Expertise Card Grid (Desktop) */}
          <div className="expertise-card-grid hidden md:grid grid-cols-2 md:grid-cols-3 gap-5">
            {expertiseCards.map(({ icon: Icon, title, desc, highlights }) => (
              <div
                key={title}
                className="card flex flex-col cursor-pointer group hover:shadow-md transition-shadow duration-200"
                onClick={() => onNavigate('expertise')}
              >
                <div className="flex items-start gap-4 mb-3">
                  <div className="w-11 h-11 rounded-lg bg-teal-50 flex items-center justify-center flex-shrink-0 group-hover:bg-teal-500 transition-colors duration-200">
                    <Icon size={20} className="text-teal-500 group-hover:text-white transition-colors duration-200" />
                  </div>
                  <div className="flex-1">
                    <div className="font-sans font-semibold text-navy-800 text-sm leading-snug">{title}</div>
                    <div className="font-sans text-gray-500 text-xs mt-0.5">{desc}</div>
                  </div>
                </div>
                <div className="text-xs text-teal-600 font-medium pt-2 border-t border-gray-100">{highlights}</div>
              </div>
            ))}
          </div>
          {/* Expertise Button (Visible on all screen sizes, styled for desktop) */}
          <div className="text-center mt-8">
            <button
              onClick={() => onNavigate('expertise')}
              className="w-full max-w-md mx-auto bg-teal-500 text-white rounded-lg py-4 px-6 font-sans font-semibold text-base flex items-center justify-center gap-2 transition-colors duration-200 hover:bg-teal-600"
            >
              Areas of Expertise &rarr;
            </button>
          </div>
        </div>
      </section>

      {/* ── GOOGLE REVIEWS SECTION ── */}
      <section className="py-16 lg:py-20 bg-white animate-flash-in">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-heading flex items-center justify-center gap-2">
              <span role="img" aria-label="star">⭐</span> Google Reviews
            </h2>
            <p className="section-subheading">
              Real experiences shared by our patients.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {googleReviews.map((review, index) => (
              <div key={index} className="card">
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={16} fill="#e9c46a" className="text-amber-500" />
                  ))}
                </div>
                <p className="font-sans text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                  "{review.text}"
                </p>
                <div className="font-sans text-navy-800 font-semibold text-sm">{review.name}</div>
                <div className="font-sans text-gray-400 text-xs mt-1">Verified Google Review</div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <a
              href="https://share.google/yo4EwenXmEjtt9dx7"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full max-w-md mx-auto bg-teal-500 text-white rounded-lg py-4 px-6 font-sans font-semibold text-base flex items-center justify-center gap-2 transition-colors duration-200 hover:bg-teal-600"
            >
              View All Google Reviews &rarr;
            </a>
          </div>
        </div>
      </section>

      {/* ── VIDEO STORIES PREVIEW ── */}
      <section className="py-16 lg:py-20 bg-light-grey animate-flash-in">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-heading">Video Stories</h2>
            <p className="section-subheading">
              Hear directly from our patients about their journey to better health.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 mb-10">
            {videoTestimonials.slice(0, 2).map((video) => ( // Display only the first 2 video cards
              <div
                key={video.id}
                className="card p-0 overflow-hidden group cursor-pointer relative"
                onClick={() => onNavigate('testimonials')} // Navigate to testimonials page to view video
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <PlayCircle size={60} className="text-white opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex gap-0.5 mb-2">
                    {Array.from({ length: video.stars }).map((_, i) => (
                      <Star key={i} size={16} fill="#e9c46a" className="text-amber-500" />
                    ))}
                  </div>
                  <p className="font-sans text-gray-600 text-sm leading-relaxed mb-3 line-clamp-2">
                    "{video.reviewSnippet}"
                  </p>
                  <div className="font-sans text-navy-800 font-semibold text-sm">{video.patientName}</div>
                  <span className={`badge border text-xs mt-3 ${treatmentColors[video.treatmentTag]}`}>
                    {video.treatmentTag}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <button
              onClick={() => onNavigate('testimonials')}
              className="w-full max-w-md mx-auto bg-teal-500 text-white rounded-lg py-4 px-6 font-sans font-semibold text-base flex items-center justify-center gap-2 transition-colors duration-200 hover:bg-teal-600"
            >
              View All Video Testimonials &rarr;
            </button>
          </div>
        </div>
      </section>

      {/* ── CLINIC LOCATIONS & TIMINGS ── */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-heading">Clinic Locations & Timings</h2>
            <p className="section-subheading">
              Visit us at Thergaon or Manipal Hospital, Baner.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
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
                  <p className="font-sans text-teal-600 font-semibold text-sm mt-3 flex items-center gap-2 bg-teal-50 inline-flex px-3 py-1.5 rounded-lg">
                    <Phone size={16} /> 020 6813 8888
                  </p>
                </div>
              </div>
              <div className="bg-gray-50 rounded-xl p-5 mb-8 flex-grow border border-gray-100">
                <h4 className="font-sans font-semibold text-navy-800 text-sm mb-4 flex items-center gap-2">
                  <Clock size={18} className="text-blue-500" /> Consultation Hours
                </h4>
                <ul className="space-y-3 font-sans text-sm">
                  <li className="flex justify-between items-center text-gray-600">
                    <span>Tuesday, Wednesday, Friday, Saturday</span>
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

      {/* ── PHILOSOPHY ── */}
      <section className="py-16 lg:py-20 bg-navy-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-16 h-1 bg-teal-400 mx-auto mb-8 rounded-full" />
          <blockquote className="font-serif text-2xl md:text-3xl lg:text-4xl font-bold leading-relaxed text-white mb-6">
            "I believe in minimizing prescription and maximizing patient safety. Every treatment
            begins with a{' '}
            <span className="text-teal-400">thorough diagnosis.</span>"
          </blockquote>
          <p className="font-sans text-blue-200 text-lg mb-8">— Dr. Prathamesh Teje</p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              'Diagnosis-First Approach',
              'Standardized & Scientific Practice',
              'Minimize Prescription',
              'Maximize Patient Safety',
            ].map((tag) => (
              <span
                key={tag}
                className="font-sans text-sm text-teal-300 border border-teal-500/40 px-4 py-1.5 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── MMC VERIFICATION & QR CODE ── */}
      <section className="py-12 bg-navy-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-navy-700 to-navy-900 rounded-2xl p-8 md:p-12 border border-teal-500/20 shadow-2xl">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <h3 className="text-white font-serif text-2xl font-bold mb-3">Verified Medical Registration</h3>
                <p className="text-blue-200 mb-6 font-sans text-sm leading-relaxed">
                  Dr. Prathamesh Teje is registered with the Maharashtra Medical Council (MMC) and maintains the highest professional standards of medical practice.
                </p>

                {/* Glowing MMC Badge */}
                <div className="mb-6 inline-flex items-center gap-3 bg-teal-500/10 border border-teal-500/30 px-4 py-3 rounded-xl relative overflow-hidden group">
                  <div className="absolute inset-0 bg-teal-400/5 group-hover:bg-teal-400/10 transition-colors" />
                  <CheckCircle size={22} className="flex-shrink-0 text-green-400 drop-shadow-[0_0_8px_rgba(74,222,128,0.6)]" />
                  <span className="font-sans text-sm relative z-10 text-white">
                    <span className="font-semibold text-teal-300">Verified Registration</span>
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-blue-200">
                    <Award size={18} className="flex-shrink-0 text-teal-500" />
                    <span className="font-sans text-sm"><span className="font-semibold text-white">RCP London Certified:</span> Diabetes Specialist</span>
                  </div>
                  <div className="flex items-center gap-3 text-blue-200">
                    <Award size={18} className="flex-shrink-0 text-teal-500" />
                    <span className="font-sans text-sm"><span className="font-semibold text-white">Medical Expertise:</span> MBBS, DNB Internal Medicine</span>
                  </div>
                </div>
              </div>

              {/* Professional QR Code Display */}
              <div className="flex justify-center md:justify-end">
                <div className="bg-white p-5 rounded-2xl shadow-2xl relative">
                  {/* Corner brackets for scanning effect */}
                  <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-teal-500 rounded-tl-sm"></div>
                  <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-teal-500 rounded-tr-sm"></div>
                  <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-teal-500 rounded-bl-sm"></div>
                  <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-teal-500 rounded-br-sm"></div>

                  <div className="w-48 h-48 bg-gray-50 rounded-xl flex flex-col items-center justify-center text-center p-4 border border-gray-100">
                    {/* SVG QR Code Placeholder */}
                    <svg viewBox="0 0 100 100" className="w-28 h-28 text-navy-800 mb-3" fill="currentColor">
                      <path d="M0 0h30v30H0zM10 10h10v10H10zM70 0h30v30H70zM80 10h10v10H80zM0 70h30v30H0zM10 80h10v10H10zM40 0h20v10H40zM40 20h10v10H40zM50 10h10v20H50zM40 40h20v20H40zM10 40h20v10H10zM0 50h10v20H0zM20 50h10v20H20zM70 40h30v10H70zM80 50h10v10H80zM90 60h10v10H90zM70 70h10v10H70zM80 80h20v20H80zM40 70h20v10H40zM50 80h10v20H50zM40 90h10v10H40z" />
                    </svg>
                    <div className="text-gray-500 font-sans text-[10px] uppercase tracking-wider font-semibold">
                      Scan to Verify
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="py-12 bg-teal-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-white mb-3">
            Ready for a Thorough Consultation?
          </h2>
          <p className="font-sans text-teal-50 mb-6">
            Book your appointment — Evening slots available at Thergaon Clinic.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={onOpenModal}
              className="bg-white text-teal-600 px-7 py-3 rounded-md font-sans font-semibold text-sm hover:bg-teal-50 transition-colors duration-200"
            >
              Book via WhatsApp
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
