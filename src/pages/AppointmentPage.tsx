import { useState, useMemo } from 'react';
import { MapPin, Clock, Phone, ExternalLink, CheckCircle } from 'lucide-react';

const conditionOptions = [
  'Diabetes / Blood Sugar Issues',
  'Hypertension / High Blood Pressure',
  'Thyroid Disorder',
  'Fever / Infection',
  'Stomach / GI Issues',
  'Kidney or Liver Issue',
  'Heart-related Evaluation',
  'Stress / Sleep Disorder',
  'Preventive Health Checkup',
  'Adult Vaccination',
  'Respiratory Issues (Asthma / COPD)',
  'Migraine / Headache',
  'Cholesterol / Lipid Issue',
  'Critical Care Consultation',
  'Other / General Consultation',
];

const LOCATIONS = {
  THERGAON: 'Thergaon Clinic',
  MANIPAL: 'Manipal Hospital',
};

interface FormState {
  name: string;
  mobile: string;
  condition: string;
  location: string;
  date: string;
  slot: string;
}

const initialForm: FormState = {
  name: '',
  mobile: '',
  condition: '',
  location: '',
  date: '',
  slot: '',
};

export default function AppointmentPage() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [error, setError] = useState('');
  const [toast, setToast] = useState(false);

  // --- DYNAMIC SCHEDULING LOGIC (Mirrors Modal) ---

  const availableDates = useMemo(() => {
    const dates = [];
    const today = new Date();
    for (let i = 1; i <= 30; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      const day = d.getDay();
      
      let isValid = true;
      if (form.location === LOCATIONS.THERGAON && (day === 0 || day === 4)) isValid = false;
      if (form.location === LOCATIONS.MANIPAL && day === 1) isValid = false;
      
      if (isValid) {
        dates.push({
          value: d.toISOString().split('T')[0],
          label: d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
          day,
        });
      }
    }
    return dates;
  }, [form.location]);

  const availableLocations = useMemo(() => {
    if (!form.date) return [LOCATIONS.THERGAON, LOCATIONS.MANIPAL];
    const day = new Date(form.date).getDay();
    if (day === 0 || day === 4) return [LOCATIONS.MANIPAL];
    if (day === 1) return [LOCATIONS.THERGAON];
    return [LOCATIONS.THERGAON, LOCATIONS.MANIPAL];
  }, [form.date]);

  const availableTimeSlots = useMemo(() => {
    if (!form.date || !form.location) return [];
    const day = new Date(form.date).getDay();

    if (form.location === LOCATIONS.THERGAON) {
      return ['6:00 PM - 6:30 PM', '6:30 PM - 7:00 PM', '7:00 PM - 7:30 PM', '7:30 PM - 8:00 PM', '8:00 PM - 8:30 PM'];
    }

    if (form.location === LOCATIONS.MANIPAL) {
      if (day === 4) return ['2:00 PM - 3:00 PM', '3:00 PM - 4:00 PM', '4:00 PM - 5:00 PM', '5:00 PM - 6:00 PM', '6:00 PM - 7:30 PM'];
      if (day === 0) return ['10:00 AM - 11:00 AM', '11:00 AM - 12:00 PM'];
      return ['9:00 AM - 10:00 AM', '10:00 AM - 11:00 AM', '11:00 AM - 12:00 PM', '12:00 PM - 1:00 PM', '1:00 PM - 2:00 PM', '2:00 PM - 3:00 PM'];
    }
    return [];
  }, [form.date, form.location]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    
    setForm((prev) => {
      const next = { ...prev, [name]: value };

      if (name === 'location') {
        if (next.date) {
          const day = new Date(next.date).getDay();
          if ((value === LOCATIONS.THERGAON && (day === 0 || day === 4)) || 
              (value === LOCATIONS.MANIPAL && day === 1)) {
            next.date = '';
          }
        }
        next.slot = '';
      }

      if (name === 'date') {
        const day = new Date(value).getDay();
        if (next.location === LOCATIONS.THERGAON && (day === 0 || day === 4)) {
          next.location = LOCATIONS.MANIPAL;
        } else if (next.location === LOCATIONS.MANIPAL && day === 1) {
          next.location = LOCATIONS.THERGAON;
        }
        next.slot = '';
      }

      return next;
    });
    setError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!form.name.trim() || !form.mobile.trim() || !form.location || !form.date || !form.slot) {
      setError('Please fill in all required fields (Name, Mobile, Location, Date, Slot).');
      return;
    }

    const message = `Hello Dr. Teje, I would like to book an appointment.
*Patient Name:* ${form.name}
*Phone:* ${form.mobile}
*Location:* ${form.location}
*Date:* ${new Date(form.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
*Time Slot:* ${form.slot}
*Reason/Symptoms:* ${form.condition || 'Not specified'}`;

    const url = `https://wa.me/918999046916?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');

    setToast(true);
    setTimeout(() => setToast(false), 5000);
    setForm(initialForm);
  };

  return (
    <div className="font-sans">
      {/* Header */}
      <div className="bg-gradient-to-r from-navy-800 to-navy-700 text-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="font-sans text-teal-400 text-sm font-semibold tracking-widest uppercase mb-3">
              Schedule a Visit
            </p>
            <h1 className="font-serif text-3xl md:text-4xl font-bold mb-3">Book an Appointment</h1>
            <p className="font-sans text-blue-200 text-lg">
              Request an appointment via WhatsApp for quick confirmation.
            </p>
          </div>
        </div>
      </div>

      <section className="py-16 bg-light-grey">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-10">

            {/* ── FORM (left 3 cols) ── */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                {toast && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3 animate-fade-in">
                    <CheckCircle className="text-green-500 flex-shrink-0" size={20} />
                    <p className="font-sans text-sm text-green-800 font-medium">
                      Redirecting you to WhatsApp to confirm your appointment! ✅
                    </p>
                  </div>
                )}
                
                {error && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3 animate-fade-in">
                    <p className="font-sans text-sm text-red-600 font-medium">
                      {error}
                    </p>
                  </div>
                )}

                <h2 className="font-serif text-xl font-bold text-navy-800 mb-6">
                  Appointment Request Form
                </h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="font-sans text-xs font-semibold text-navy-700 uppercase tracking-wide mb-1.5 block">Full Name *</label>
                      <input type="text" name="name" required value={form.name} onChange={handleChange} placeholder="Your full name" className="w-full border border-gray-200 rounded-lg px-4 py-2.5 font-sans text-sm focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100 transition-colors" />
                    </div>
                    <div>
                      <label className="font-sans text-xs font-semibold text-navy-700 uppercase tracking-wide mb-1.5 block">Mobile Number *</label>
                      <input type="tel" name="mobile" required value={form.mobile} onChange={handleChange} placeholder="+91 XXXXX XXXXX" className="w-full border border-gray-200 rounded-lg px-4 py-2.5 font-sans text-sm focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100 transition-colors" />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="font-sans text-xs font-semibold text-navy-700 uppercase tracking-wide mb-1.5 block">Preferred Location *</label>
                      <select name="location" required value={form.location} onChange={handleChange} className="w-full border border-gray-200 rounded-lg px-4 py-2.5 font-sans text-sm bg-white focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100 transition-colors">
                        <option value="">Select a location</option>
                        {availableLocations.map(loc => (
                          <option key={loc} value={loc}>{loc}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="font-sans text-xs font-semibold text-navy-700 uppercase tracking-wide mb-1.5 block">Condition / Reason *</label>
                      <select name="condition" required value={form.condition} onChange={handleChange} className="w-full border border-gray-200 rounded-lg px-4 py-2.5 font-sans text-sm bg-white focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100 transition-colors">
                        <option value="">Select a condition</option>
                        {conditionOptions.map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="font-sans text-xs font-semibold text-navy-700 uppercase tracking-wide mb-1.5 block">Preferred Date *</label>
                      <select name="date" required value={form.date} onChange={handleChange} className="w-full border border-gray-200 rounded-lg px-4 py-2.5 font-sans text-sm bg-white focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100 transition-colors">
                        <option value="">Select a date</option>
                        {availableDates.map(d => (
                          <option key={d.value} value={d.value}>{d.label}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="font-sans text-xs font-semibold text-navy-700 uppercase tracking-wide mb-1.5 block">Preferred Slot *</label>
                      <select name="slot" required value={form.slot} onChange={handleChange} disabled={!form.date || !form.location} className="w-full border border-gray-200 rounded-lg px-4 py-2.5 font-sans text-sm bg-white focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100 transition-colors disabled:bg-gray-50 disabled:text-gray-400">
                        <option value="">{(!form.date || !form.location) ? 'Select date & location first' : 'Select a slot'}</option>
                        {availableTimeSlots.map(slot => (
                          <option key={slot} value={slot}>{slot}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <button type="submit" className="btn-primary w-full py-3.5 text-sm mt-2">
                    Book via WhatsApp
                  </button>

                  <p className="font-sans text-gray-400 text-xs text-center">
                    Clicking submit will open WhatsApp with your pre-filled details.
                  </p>
                </form>
              </div>
            </div>

            {/* ── RIGHT SIDEBAR (2 cols) ── */}
            <div className="lg:col-span-2 space-y-6">
              {/* Thergaon Card */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center flex-shrink-0">
                    <MapPin size={20} className="text-teal-500" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-navy-800 text-base mb-1">Dr. Teje's Physician & Diabetology Clinic</h3>
                    <p className="font-sans text-gray-600 text-xs leading-relaxed">
                      Greens Centre, Opposite Pudumjee Paper Mill,<br />
                      Thergaon, Pimpri-Chinchwad, Pune – 411033
                    </p>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 mb-5 flex-grow border border-gray-100">
                  <h4 className="font-sans font-semibold text-navy-800 text-xs mb-3 flex items-center gap-2">
                    <Clock size={14} className="text-teal-500" /> Consultation Hours
                  </h4>
                  <ul className="space-y-2 font-sans text-xs">
                    <li className="flex justify-between items-center text-gray-600">
                      <span>Mon, Tue, Wed, Fri, Sat</span>
                      <span className="font-semibold text-navy-800">6:00 PM – 8:30 PM</span>
                    </li>
                    <li className="flex justify-between items-center text-red-500 font-medium pt-2 border-t border-gray-200">
                      <span>Thursday & Sunday</span>
                      <span>Closed</span>
                    </li>
                  </ul>
                </div>
                <a href="https://maps.app.goo.gl/nm4n7T7M5SemgtmBg" target="_blank" rel="noopener noreferrer" className="btn-primary w-full flex items-center justify-center gap-2 py-2.5 text-xs">
                  Get Directions <ExternalLink size={14} />
                </a>
              </div>

              {/* Manipal Card */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                    <MapPin size={20} className="text-blue-500" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-navy-800 text-base mb-1">Manipal Hospitals, Baner</h3>
                    <p className="font-sans text-gray-600 text-xs leading-relaxed">
                      Survey No 111/11/1, Veerbhadra Nagar Road,<br />
                      Baner-Mhalunge Main Road, Baner, Pune – 411045
                    </p>
                    <p className="font-sans text-teal-600 font-semibold text-xs mt-2 flex items-center gap-1.5">
                      <Phone size={14} /> 020 6813 8888
                    </p>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 mb-5 flex-grow border border-gray-100">
                  <h4 className="font-sans font-semibold text-navy-800 text-xs mb-3 flex items-center gap-2">
                    <Clock size={14} className="text-blue-500" /> Consultation Hours
                  </h4>
                  <ul className="space-y-2 font-sans text-xs">
                    <li className="flex justify-between items-center text-gray-600">
                      <span>Tue, Wed, Fri, Sat</span>
                      <span className="font-semibold text-navy-800">9:00 AM – 3:00 PM</span>
                    </li>
                    <li className="flex justify-between items-center text-gray-600">
                      <span>Thursday</span>
                      <span className="font-semibold text-navy-800">2:00 PM – 7:30 PM</span>
                    </li>
                    <li className="flex justify-between items-center text-gray-600">
                      <span>Sunday</span>
                      <span className="font-semibold text-navy-800">10:00 AM – 12:00 PM</span>
                    </li>
                    <li className="flex justify-between items-center text-red-500 font-medium pt-2 border-t border-gray-200">
                      <span>Monday</span>
                      <span>Not Available</span>
                    </li>
                  </ul>
                </div>
                <a href="https://maps.app.goo.gl/yHyQfKFhIKriWIqoY" target="_blank" rel="noopener noreferrer" className="w-full py-2.5 px-4 border-2 border-blue-500 text-blue-600 rounded-lg font-sans font-semibold text-xs hover:bg-blue-50 transition-colors flex items-center justify-center gap-2">
                  Get Directions <ExternalLink size={14} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
