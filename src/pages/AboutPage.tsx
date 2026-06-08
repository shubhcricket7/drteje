import { CheckCircle, Award, GraduationCap, Stethoscope, Globe, BookOpen, Building2 } from 'lucide-react';

interface AboutPageProps {
  onNavigate: (page: string) => void;
}

const experience = [
  {
    role: 'Ex-Fortis Hospital, Bangalore',
    hospital: '(Senior Resident)',
    period: '2019 – 2022',
    note: '',
  },
  {
    role: 'Ex-Consultant Physician',
    hospital: 'Aditya Birla Hospital, Pune',
    period: '2022 – 2023',
    note: '',
  },
  {
    role: 'Consultant Physician',
    hospital: 'Manipal Hospital, Baner, Pune',
    period: '2023 – Present',
    note: '',
  },
];

const languages = [
  { lang: 'English', flag: '🇬🇧' },
  { lang: 'Hindi', flag: '🇮🇳' },
  { lang: 'Marathi', flag: '🟠' },
  { lang: 'Kannada', flag: '🟡' },
];

export default function AboutPage({ onNavigate }: AboutPageProps) {
  return (
    <div className="font-sans">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-navy-800 to-navy-700 text-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="font-sans text-teal-400 text-sm font-semibold tracking-widest uppercase mb-3">
              About the Doctor
            </p>
            <h1 className="font-serif text-3xl md:text-4xl font-bold mb-3">
              Dr. Prathamesh Teje
            </h1>
            <p className="font-sans text-blue-200 text-lg">
              MBBS, DNB (Internal Medicine) · RCP London Certified Diabetologist
            </p>
          </div>
        </div>
      </div>

      {/* ── WHO IS DR. TEJE ── */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Stethoscope size={22} className="text-teal-500" />
                <h2 className="section-heading text-2xl">Who is Dr. Teje?</h2>
              </div>
              <div className="space-y-4 font-sans text-gray-600 leading-relaxed text-base">
                <p>
                  Dr. Prathamesh Teje is a Consultant Physician and Diabetologist based in Pimpri-Chinchwad, Pune,
                  with over 7+ years of medical experience — including 5 years as a specialist in Internal Medicine.
                </p>
                <p>
                  He completed his MBBS from Government Medical College, Latur (Maharashtra University of Health Sciences)
                  and went on to earn his DNB in Internal Medicine from the National Board of Examinations, India — completing
                  his residency at the prestigious Fortis Hospital, Bangalore.
                </p>
                <p>
                  His special interest in diabetes led him to pursue an Advanced Certification in Diabetes Management in
                  Special Situations from the Royal College of Physicians (RCP), London — one of the most respected medical
                  institutions globally. This makes him uniquely qualified to manage complex and complicated diabetic patients.
                </p>
                <p>
                  Dr. Teje is known for his methodical, "Diagnosis-First" approach: he firmly believes that no treatment
                  should begin without a thorough clinical evaluation. This philosophy of{' '}
                  <em>"Standardized, Scientific and Safe Practice"</em> sets him apart from conventional practitioners.
                </p>
              </div>
            </div>

            <div>
              {/* Photo */}
              <div className="rounded-2xl overflow-hidden shadow-xl mb-6">
                <img
                  src="https://www.manipalhospitals.com/uploads/doctors_photo/dr-prathamesh-teje-top-internal-medicine-doctor-baner-pune.png"
                  alt="Dr. Prathamesh Teje"
                  className="w-full object-cover object-top max-h-96"
                />
              </div>

              {/* Quick facts */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Specialisation', value: 'Physician & Diabetologist' },
                  { label: 'Experience', value: '7+ Years' },
                  { label: 'Qualifications', value: 'MBBS, DNB Medicine' },
                ].map((f) => (
                  <div key={f.label} className="bg-light-grey rounded-lg p-3">
                    <div className="font-sans text-gray-500 text-xs mb-0.5">{f.label}</div>
                    <div className="font-sans font-semibold text-navy-800 text-sm">{f.value}</div>
                  </div>
                ))}
              </div>

              {/* Registration badge */}
              <div className="mt-4 flex items-center gap-3 p-3 bg-teal-50 border border-teal-100 rounded-lg">
                <CheckCircle size={18} className="text-teal-500 flex-shrink-0" />
                <div>
                  <div className="font-sans text-navy-800 font-semibold text-sm">Maharashtra Medical Council</div>
                  <div className="font-sans text-gray-500 text-xs">Verified Registration</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── EDUCATION TIMELINE (Removed) ── */}
      {/* ── DIAGNOSIS-FIRST PHILOSOPHY ── */}
      <section className="py-16 bg-navy-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 items-center">
            <div className="md:col-span-2">
              <h2 className="font-serif text-2xl md:text-3xl font-bold mb-4 text-white">
                The "Diagnosis-First" Philosophy
              </h2>
              <p className="font-sans text-blue-200 leading-relaxed mb-6">
                In an era of rushed consultations and over-prescription, Dr. Teje stands firmly by a
                principle: <strong className="text-white">no treatment without a thorough diagnosis.</strong>
              </p>
              <div className="grid sm:grid-cols-3 gap-4">
                {[
                  { title: 'Diagnosis-First', desc: 'Comprehensive evaluation before any prescription' },
                  { title: 'Scientific & Standardized', desc: 'Evidence-based, protocol-driven care' },
                  { title: 'Minimize Prescription', desc: 'Least medicines needed; maximum safety' },
                ].map((p) => (
                  <div key={p.title} className="bg-white/10 rounded-xl p-4 border border-white/10">
                    <div className="font-sans font-semibold text-teal-400 text-sm mb-1">{p.title}</div>
                    <div className="font-sans text-blue-200/80 text-xs leading-relaxed">{p.desc}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-center">
              <div className="w-36 h-36 rounded-full bg-teal-500/20 border-4 border-teal-400/30 flex items-center justify-center">
                <div className="text-center">
                  <div className="font-serif text-4xl font-bold text-teal-400">Dx</div>
                  <div className="font-sans text-teal-300/80 text-xs mt-1">Diagnosis First</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── EXPERIENCE ── */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-10">
            <Building2 size={22} className="text-teal-500" />
            <h2 className="section-heading text-2xl">Hospital Experience & Affiliations</h2>
          </div>
          <div className="space-y-4">
            {experience.map((e, i) => (
              <div key={i} className="card flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-navy-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="font-sans font-bold text-navy-800 text-xs">{i + 1}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                    <h3 className="font-sans font-semibold text-navy-800 text-sm">{e.role}</h3>
                    <p className="font-sans text-teal-600 text-sm font-medium">{e.hospital}</p>
                    {e.note && <p className="font-sans text-gray-400 text-xs mt-0.5">{e.note}</p>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MEMBERSHIPS & CREDENTIALS ── */}
      <section className="py-14 bg-light-grey">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-10">
            <Award size={22} className="text-teal-500" />
            <h2 className="section-heading text-2xl">Memberships & Credentials</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <div className="card border-l-4 border-l-amber-500">
              <div className="font-sans font-bold text-navy-800 mb-1">Royal College of Physicians (RCP)</div>
              <div className="font-sans text-gray-500 text-sm mb-2">London, United Kingdom</div>
              <span className="badge bg-amber-50 text-amber-700 border border-amber-200">
                <Award size={11} /> Certified Member
              </span>
            </div>
            <div className="card border-l-4 border-l-teal-500">
              <div className="font-sans font-bold text-navy-800 mb-1">National Board of Examinations</div>
              <div className="font-sans text-gray-500 text-sm mb-2">India — DNB Internal Medicine</div>
              <span className="badge bg-teal-50 text-teal-700 border border-teal-200">
                <CheckCircle size={11} /> Board Certified
              </span>
            </div>
            <div className="card border-l-4 border-l-navy-500">
              <div className="font-sans font-bold text-navy-800 mb-1">Maharashtra Medical Council</div>
              <div className="font-sans text-gray-500 text-sm mb-2">Verified Registration</div>
              <span className="badge bg-green-50 text-green-700 border border-green-200">
                <CheckCircle size={11} /> Verified Registration
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── LANGUAGES ── */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-8">
            <Globe size={22} className="text-teal-500" />
            <h2 className="section-heading text-2xl">Languages Spoken</h2>
          </div>
          <div className="flex flex-wrap gap-4">
            {languages.map(({ lang, flag }) => (
              <div key={lang} className="flex items-center gap-2 px-5 py-3 bg-light-grey rounded-full border border-gray-200">
                <span className="text-xl">{flag}</span>
                <span className="font-sans font-medium text-navy-800 text-sm">{lang}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PUBLICATIONS ── */}
      <section className="py-12 bg-light-grey">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-6">
            <BookOpen size={22} className="text-teal-500" />
            <h2 className="section-heading text-2xl">Publications & Research</h2>
          </div>
          <div className="card max-w-xl">
            <p className="font-sans text-gray-600 text-sm leading-relaxed">
              Dr. Teje has contributed to Indian and International medical journals, with research focused on
              diabetes management, internal medicine, and clinical protocols. Details available on request.
            </p>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-12 bg-teal-500">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-2xl font-bold text-white mb-3">
            Book a Consultation with Dr. Teje
          </h2>
          <p className="font-sans text-teal-50 mb-6 text-sm">
            Available Mon–Sat, 11 AM–1 PM & 5:30–9 PM at Pimpri-Chinchwad clinic.
          </p>
          <button
            onClick={() => onNavigate('appointments')}
            className="bg-white text-teal-600 px-7 py-3 rounded-md font-sans font-semibold text-sm hover:bg-teal-50 transition-colors duration-200"
          >
            Book Appointment
          </button>
        </div>
      </section>
    </div>
  );
}
