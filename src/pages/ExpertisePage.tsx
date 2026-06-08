import { Droplets, Heart, Activity, Thermometer, Flame, Zap, Brain, Shield, Stethoscope, AlertCircle } from 'lucide-react';

interface ExpertisePageProps {
  onNavigate: (page: string) => void;
}

const groups = [
  {
    groupTitle: 'Metabolic & Endocrine',
    conditions: [
      {
        icon: Droplets,
        title: 'Diabetes & Its Complications',
        badge: 'London RCP Certified',
        description:
          'Comprehensive management of Type 1, Type 2, and gestational diabetes. Special expertise in complicated and hard-to-control cases, insulin therapy, and diabetic complications (neuropathy, nephropathy, retinopathy).',
        symptoms: [
          'Excessive thirst & frequent urination',
          'Unexplained weight loss or gain',
          'Blurry vision or tingling in feet',
          'High blood sugar readings',
        ],
      },
      {
        icon: Activity,
        title: 'Thyroid-Related Conditions',
        badge: 'Endocrine Specialist',
        description:
          'Diagnosis and management of hypothyroidism, hyperthyroidism, Hashimoto\'s thyroiditis, and thyroid nodules. Hormone optimization and long-term management plans.',
        symptoms: [
          'Fatigue and excessive tiredness',
          'Weight gain or difficulty losing weight',
          'Neck swelling or discomfort',
          'Cold intolerance or excessive sweating',
        ],
      },
      {
        icon: Flame,
        title: 'Liver & Cholesterol Disorders',
        badge: 'Metabolic Health',
        description:
          'Management of fatty liver disease (NAFLD/NASH), elevated cholesterol (dyslipidemia), and other liver conditions. Diet-based and medical treatment approaches.',
        symptoms: [
          'Right upper abdomen discomfort',
          'Elevated lipid or liver enzyme reports',
          'Jaundice or unexplained fatigue',
          'Poor appetite with bloating',
        ],
      },
    ],
  },
  {
    groupTitle: 'Cardiovascular & Renal',
    conditions: [
      {
        icon: Heart,
        title: 'Hypertension Management',
        badge: 'BP Specialist',
        description:
          'Evidence-based treatment for high blood pressure including lifestyle modification, medication protocols, and long-term BP control. Special attention to hypertension in diabetic patients.',
        symptoms: [
          'Persistent headaches or dizziness',
          'BP readings above 130/80 mmHg',
          'Palpitations or chest discomfort',
          'Blurry vision in the morning',
        ],
      },
      {
        icon: Zap,
        title: 'Cardiac & Kidney Diseases',
        badge: 'Cardio-Renal Evaluation',
        description:
          'Evaluation and management of heart disease risk factors and chronic kidney disease (CKD). Coordinated care for patients with both cardiac and renal involvement.',
        symptoms: [
          'Swelling in legs or ankles',
          'Shortness of breath on exertion',
          'Abnormal kidney function tests',
          'Reduced urine output or colour change',
        ],
      },
    ],
  },
  {
    groupTitle: 'Infectious & Respiratory',
    conditions: [
      {
        icon: Thermometer,
        title: 'Fever Workup & Infectious Diseases',
        badge: 'Internal Medicine',
        description:
          'Systematic workup of fever of unknown origin (FUO), tropical infections (malaria, dengue, typhoid), and viral illnesses. Evidence-based protocols for diagnosis and treatment.',
        symptoms: [
          'Persistent fever beyond 3–5 days',
          'Chills, rigors or body ache',
          'Rash or lymph node swelling',
          'Travel-related illness symptoms',
        ],
      },
    ],
  },
  {
    groupTitle: 'Gastrointestinal & Lifestyle',
    conditions: [
      {
        icon: AlertCircle,
        title: 'Gastrointestinal Disorders & IBS',
        badge: 'GI Specialist',
        description:
          'Management of irritable bowel syndrome (IBS), acid reflux (GERD), peptic ulcers, and functional bowel disorders. Integrates dietary guidance with medical treatment.',
        symptoms: [
          'Chronic bloating or gas',
          'Alternating diarrhea and constipation',
          'Abdominal pain after meals',
          'Heartburn or acid reflux',
        ],
      },
      {
        icon: Brain,
        title: 'Stress & Sleep Disorders',
        badge: 'Lifestyle Medicine',
        description:
          'Evaluation and treatment of stress-related physical symptoms, insomnia, and sleep disruption. Holistic management including counselling, lifestyle changes, and judicious medication when needed.',
        symptoms: [
          'Difficulty falling or staying asleep',
          'Fatigue despite adequate sleep',
          'Physical symptoms linked to anxiety',
          'Mood changes with somatic complaints',
        ],
      },
    ],
  },
  {
    groupTitle: 'Preventive Care',
    conditions: [
      {
        icon: Shield,
        title: 'Preventive Health Check-ups & Adult Vaccination',
        badge: 'Preventive Medicine',
        description:
          'Comprehensive adult health screening, risk assessment, and personalised preventive care plans. Complete adult vaccination / immunisation schedules including Hepatitis, Pneumococcal, Influenza, HPV, and more.',
        symptoms: [
          'Annual health screening',
          'Pre-employment or pre-surgery fitness',
          'Adult immunisation (catch-up or schedule)',
          'Chronic disease risk assessment',
        ],
      },
      {
        icon: Stethoscope,
        title: 'Critical Care',
        badge: 'ICU Experience',
        description:
          'Evaluation and management of acutely ill patients. Experienced in critical care decision-making from Fortis Hospital ICU rotations during DNB training.',
        symptoms: [
          'Sudden deterioration of chronic illness',
          'High-grade fever with complications',
          'Severe breathlessness or altered consciousness',
          'Multi-organ involvement',
        ],
      },
    ],
  },
];

export default function ExpertisePage({ onNavigate }: ExpertisePageProps) {
  return (
    <div className="font-sans">
      {/* Header */}
      <div className="bg-gradient-to-r from-navy-800 to-navy-700 text-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="font-sans text-teal-400 text-sm font-semibold tracking-widest uppercase mb-3">
              Conditions Treated
            </p>
            <h1 className="font-serif text-3xl md:text-4xl font-bold mb-3">Areas of Expertise</h1>
            <p className="font-sans text-blue-200 text-lg">
              Specialised care across 10 key areas of internal medicine — from metabolic diseases to critical care.
            </p>
          </div>
        </div>
      </div>

      {/* Groups */}
      <div className="py-16 bg-light-grey">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          {groups.map((group) => (
            <div key={group.groupTitle}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-7 bg-teal-500 rounded-full" />
                <h2 className="font-serif text-xl font-bold text-navy-800">{group.groupTitle}</h2>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {group.conditions.map(({ icon: Icon, title, badge, description, symptoms }) => (
                  <div key={title} className="card flex flex-col">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center flex-shrink-0">
                        <Icon size={22} className="text-teal-500" />
                      </div>
                      <div>
                        <h3 className="font-serif font-bold text-navy-800 text-base leading-snug">{title}</h3>
                        <span className="inline-block mt-1 badge bg-amber-50 text-amber-700 border border-amber-100 text-xs">
                          {badge}
                        </span>
                      </div>
                    </div>

                    <p className="font-sans text-gray-600 text-sm leading-relaxed mb-4">{description}</p>

                    <div className="mt-auto">
                      <p className="font-sans text-xs font-semibold text-navy-700 uppercase tracking-wide mb-2">
                        Symptoms to Watch
                      </p>
                      <ul className="space-y-1 mb-5">
                        {symptoms.map((s) => (
                          <li key={s} className="flex items-start gap-2 font-sans text-xs text-gray-500">
                            <span className="w-1.5 h-1.5 rounded-full bg-teal-400 mt-1.5 flex-shrink-0" />
                            {s}
                          </li>
                        ))}
                      </ul>
                      <button
                        onClick={() => onNavigate('appointments')}
                        className="w-full btn-primary text-xs py-2.5"
                      >
                        Book Consultation
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
