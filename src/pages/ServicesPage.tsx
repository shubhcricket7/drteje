import {
  Droplets, Heart, Thermometer, AlertCircle, Brain, Shield,
  Activity, Flame, Zap, Stethoscope, Wind, Pill,
  Apple, Bone, Syringe, Coffee, ChevronRight
} from 'lucide-react';

interface ServicesPageProps {
  onNavigate: (page: string) => void;
}

const services = [
  {
    icon: Droplets,
    title: 'Diabetes Management / Insulin Treatment',
    desc: 'Complete management of diabetes including oral medications, insulin initiation, dose adjustment, and continuous monitoring.',
  },
  {
    icon: Apple,
    title: 'Lifestyle Disorders Treatment',
    desc: 'Addressing obesity, sedentary lifestyle, metabolic syndrome through medically guided interventions and counselling.',
  },
  {
    icon: Thermometer,
    title: 'Fever Workup & Viral Fever Treatment',
    desc: 'Systematic evaluation of fever to identify causative infections, with targeted treatment for viral and bacterial causes.',
  },
  {
    icon: AlertCircle,
    title: 'Abdominal Pain & GI Disorders Treatment',
    desc: 'Diagnosis and management of abdominal pain, gastritis, peptic ulcer disease, and functional GI disorders.',
  },
  {
    icon: Brain,
    title: 'Migraine Treatment',
    desc: 'Medical management of migraine headaches including acute treatment and long-term preventive therapy.',
  },
  {
    icon: Wind,
    title: 'Upper/Lower Respiratory Tract Infections',
    desc: 'Treatment of URTIs, LRTIs, pneumonia, bronchitis, asthma, and COPD with evidence-based protocols.',
  },
  {
    icon: Coffee,
    title: 'Irritable Bowel Syndrome (IBS) Treatment',
    desc: 'Integrated management of IBS including dietary modification, stress management, and pharmacological therapy.',
  },
  {
    icon: Heart,
    title: 'Hypertension Management',
    desc: 'Target-based blood pressure management, medication optimisation, and lifestyle modification counselling.',
  },
  {
    icon: Activity,
    title: 'Thyroid Disorders Treatment',
    desc: 'Thyroid function evaluation, hormone replacement therapy, and long-term monitoring of thyroid conditions.',
  },
  {
    icon: Flame,
    title: 'Cholesterol & Liver Disorders',
    desc: 'Management of dyslipidemia, NAFLD, elevated liver enzymes with dietary and pharmacological interventions.',
  },
  {
    icon: Zap,
    title: 'Kidney Disease (Renal Failure, CKD) Management',
    desc: 'Conservative management of CKD, retarding disease progression, and coordination with nephrology when needed.',
  },
  {
    icon: Stethoscope,
    title: 'Cardiac Evaluation',
    desc: 'Cardiovascular risk assessment, evaluation of chest pain, palpitations, and dyslipidemia with ECG interpretation.',
  },
  {
    icon: Brain,
    title: 'Stress & Sleep Disorders',
    desc: 'Holistic management of insomnia, stress-related physical symptoms, with minimal medication approach.',
  },
  {
    icon: Bone,
    title: 'Musculoskeletal Diseases (Arthritis)',
    desc: 'Evaluation of joint pain, arthritis, gout, and musculoskeletal conditions with appropriate investigations and treatment.',
  },
  {
    icon: Shield,
    title: 'Preventive Health Check-ups',
    desc: 'Comprehensive adult health screenings, risk profiling, and personalised preventive care plans.',
  },
  {
    icon: Syringe,
    title: 'Adult Vaccination & Immunisation',
    desc: 'Complete adult immunisation including Hepatitis A & B, Pneumococcal, Influenza, HPV, Typhoid, and travel vaccines.',
  },
  {
    icon: Pill,
    title: 'Critical Care Consultation',
    desc: 'Management of acutely ill patients in critical care settings, multi-organ evaluation and stabilisation.',
  },
];

export default function ServicesPage({ onNavigate }: ServicesPageProps) {
  return (
    <div className="font-sans">
      {/* Header */}
      <div className="bg-gradient-to-r from-navy-800 to-navy-700 text-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="font-sans text-teal-400 text-sm font-semibold tracking-widest uppercase mb-3">
              What We Treat
            </p>
            <h1 className="font-serif text-3xl md:text-4xl font-bold mb-3">Our Services</h1>
            <p className="font-sans text-blue-200 text-lg">
              17 specialised treatment services — from acute infections to complex chronic disease management.
            </p>
          </div>
        </div>
      </div>

      {/* Diabetes Callout Banner */}
      <div className="bg-amber-50 border-b border-amber-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center flex-shrink-0">
                <Droplets size={18} className="text-white" />
              </div>
              <div>
                <div className="font-sans font-bold text-navy-800 text-sm">
                  Diabetes Specialist — London RCP Certified
                </div>
                <div className="font-sans text-gray-600 text-xs">
                  Advanced Certification in Diabetes Management in Special Situations — Royal College of Physicians (RCP), London
                </div>
              </div>
            </div>
            <button
              onClick={() => onNavigate('appointments')}
              className="btn-primary text-xs flex-shrink-0"
            >
              Book Diabetes Consultation
            </button>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <section className="py-16 bg-light-grey">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="card group cursor-pointer"
                onClick={() => onNavigate('appointments')}
              >
                <div className="flex items-start gap-4 mb-3">
                  <div className="w-11 h-11 rounded-xl bg-teal-50 flex items-center justify-center flex-shrink-0 group-hover:bg-teal-500 transition-colors duration-200">
                    <Icon size={20} className="text-teal-500 group-hover:text-white transition-colors duration-200" />
                  </div>
                  <h3 className="font-sans font-semibold text-navy-800 text-sm leading-snug mt-1">{title}</h3>
                </div>
                <p className="font-sans text-gray-500 text-xs leading-relaxed mb-4">{desc}</p>
                <div className="flex items-center gap-1 text-teal-500 font-sans text-xs font-semibold group-hover:gap-2 transition-all duration-150">
                  Book Consultation <ChevronRight size={13} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-teal-500">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-2xl font-bold text-white mb-3">
            Not Sure Which Service You Need?
          </h2>
          <p className="font-sans text-teal-50 text-sm mb-6">
            Book a general consultation and Dr. Teje will guide you through the right evaluation.
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
