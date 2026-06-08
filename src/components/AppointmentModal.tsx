import { useState, useEffect, useMemo } from 'react';
import { X, Calendar, Clock, User, Phone, FileText, MapPin } from 'lucide-react';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormState {
  name: string;
  phone: string;
  location: string;
  date: string;
  timeSlot: string;
  reason: string;
}

const initialForm: FormState = {
  name: '',
  phone: '',
  location: '',
  date: '',
  timeSlot: '',
  reason: '',
};

const LOCATIONS = {
  THERGAON: 'Thergaon Clinic',
  MANIPAL: 'Manipal Hospital',
};

export default function AppointmentModal({ isOpen, onClose }: AppointmentModalProps) {
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<Partial<FormState>>({});

  // Close on escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => document.body.style.overflow = 'unset';
  }, [isOpen]);

  // --- DYNAMIC SCHEDULING LOGIC ---

  // 1. Generate available dates (Next 30 days) based on selected location
  const availableDates = useMemo(() => {
    const dates = [];
    const today = new Date();
    
    for (let i = 1; i <= 30; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      const day = d.getDay(); // 0 = Sun, 1 = Mon, ..., 6 = Sat
      
      let isValid = false;

      if (!form.location) {
        // If no location selected, show date if AT LEAST ONE location is open
        if (day !== 0) isValid = true;
      } else if (form.location === LOCATIONS.THERGAON) {
        // Thergaon is closed on Thursday (4) and Sunday (0)
        if (day !== 0 && day !== 4) isValid = true;
      } else if (form.location === LOCATIONS.MANIPAL) {
        // Manipal is ONLY open on Thursday (4) and Friday (5)
        if (day === 4 || day === 5) isValid = true;
      }
      
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

  // 2. Determine available locations based on selected date
  const availableLocations = useMemo(() => {
    if (!form.date) return [LOCATIONS.THERGAON, LOCATIONS.MANIPAL];
    const day = new Date(form.date).getDay();
    
    if (day === 4) return [LOCATIONS.MANIPAL]; // Thursday: Only Manipal
    if (day === 5) return [LOCATIONS.THERGAON, LOCATIONS.MANIPAL]; // Friday: Both open
    if (day === 0) return []; // Sunday: Both closed
    return [LOCATIONS.THERGAON]; // Mon, Tue, Wed, Sat: Only Thergaon
  }, [form.date]);

  // 3. Generate time slots based on selected date AND location
  const availableTimeSlots = useMemo(() => {
    if (!form.date || !form.location) return [];

    if (form.location === LOCATIONS.THERGAON) {
      return ['6:00 PM - 6:30 PM', '6:30 PM - 7:00 PM', '7:00 PM - 7:30 PM', '7:30 PM - 8:00 PM', '8:00 PM - 8:30 PM'];
    }

    if (form.location === LOCATIONS.MANIPAL) {
      // Manipal is strictly 9:00 AM - 3:00 PM on Thu & Fri
      return ['9:00 AM - 10:00 AM', '10:00 AM - 11:00 AM', '11:00 AM - 12:00 PM', '12:00 PM - 1:00 PM', '1:00 PM - 2:00 PM', '2:00 PM - 3:00 PM'];
    }
    return [];
  }, [form.date, form.location]);

  // --- HANDLERS ---

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    
    setForm((prev) => {
      const next = { ...prev, [name]: value };

      // Smart Reset Logic
      if (name === 'location') {
        if (next.date) {
          const day = new Date(next.date).getDay();
          if (value === LOCATIONS.THERGAON && (day === 0 || day === 4)) {
            next.date = ''; // Reset date if invalid for Thergaon
          } else if (value === LOCATIONS.MANIPAL && day !== 4 && day !== 5) {
            next.date = ''; // Reset date if invalid for Manipal
          }
        }
        next.timeSlot = ''; // Always reset time slot
      }

      if (name === 'date') {
        const day = new Date(value).getDay();
        if (next.location === LOCATIONS.THERGAON && (day === 0 || day === 4)) {
          next.location = day === 4 ? LOCATIONS.MANIPAL : '';
        } else if (next.location === LOCATIONS.MANIPAL && day !== 4 && day !== 5) {
          next.location = day !== 0 ? LOCATIONS.THERGAON : '';
        }
        next.timeSlot = ''; // Always reset time slot
      }

      return next;
    });

    if (errors[name as keyof FormState]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors: Partial<FormState> = {};
    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!form.location) newErrors.location = 'Location is required';
    if (!form.date) newErrors.date = 'Date is required';
    if (!form.timeSlot) newErrors.timeSlot = 'Time slot is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const formattedDate = new Date(form.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    
    // Clean phone number for the API link (extract only digits)
    let rawPhone = form.phone.replace(/\D/g, '');
    // If user included 91 at the start, remove it to avoid duplication, then prepend 91
    if (rawPhone.startsWith('91') && rawPhone.length > 10) {
      rawPhone = rawPhone.substring(2);
    }
    const apiPhone = `91${rawPhone}`;

    // Generate the highly formatted confirmation link for the doctor to click
    const confirmText = `Hello ${form.name}, 

Your appointment with Dr. Prathamesh Teje has been successfully CONFIRMED! ✅

📅 Date: ${formattedDate}
⏰ Time Slot: ${form.timeSlot}
📍 Location: ${form.location}

📌 Important Instructions:
1. Please report 15 minutes prior to your booking time to ensure a smooth consultation.
2. If you are visiting the Thergaon Clinic, here is the Google Maps location for easy navigation: https://maps.app.goo.gl/r5f3GisgXw6hA5o66 
(If visiting Manipal Hospital, please report directly to the Baner branch OPD reception).

Thank you,
Dr. Prathamesh Teje's Clinic Team`;

    const confirmLink = `https://api.whatsapp.com/send?phone=${apiPhone}&text=${encodeURIComponent(confirmText)}`;

    const message = `Hello Dr. Teje, I would like to book an appointment.
*Patient Name:* ${form.name}
*Phone:* ${form.phone}
*Location:* ${form.location}
*Date:* ${formattedDate}
*Time Slot:* ${form.timeSlot}
*Reason:* ${form.reason || 'Not specified'}

---
⚡ *Click here to instantly confirm this appointment via WhatsApp:*
${confirmLink}`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/918999046916?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
    setForm(initialForm);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <div className="absolute inset-0 bg-navy-900/60 backdrop-blur-sm transition-opacity" onClick={onClose} />

      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-navy-800 px-6 py-4 flex items-center justify-between flex-shrink-0">
          <div>
            <h2 className="text-white font-serif text-xl font-bold">Book Appointment</h2>
            <p className="text-teal-400 text-xs font-sans mt-0.5">Fast confirmation via WhatsApp</p>
          </div>
          <button onClick={onClose} className="text-blue-200 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <div className="p-6 overflow-y-auto custom-scrollbar">
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Name & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block font-sans text-xs font-semibold text-navy-700 uppercase tracking-wide mb-1.5">Full Name *</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><User size={16} className="text-gray-400" /></div>
                  <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="John Doe" className={`w-full pl-10 pr-4 py-2.5 border rounded-lg font-sans text-sm focus:outline-none focus:ring-2 transition-colors ${errors.name ? 'border-red-300 focus:border-red-500 focus:ring-red-100' : 'border-gray-200 focus:border-teal-500 focus:ring-teal-100'}`} />
                </div>
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block font-sans text-xs font-semibold text-navy-700 uppercase tracking-wide mb-1.5">Phone Number *</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Phone size={16} className="text-gray-400" /></div>
                  <input type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="+91 XXXXX XXXXX" className={`w-full pl-10 pr-4 py-2.5 border rounded-lg font-sans text-sm focus:outline-none focus:ring-2 transition-colors ${errors.phone ? 'border-red-300 focus:border-red-500 focus:ring-red-100' : 'border-gray-200 focus:border-teal-500 focus:ring-teal-100'}`} />
                </div>
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
              </div>
            </div>

            {/* Location */}
            <div>
              <label className="block font-sans text-xs font-semibold text-navy-700 uppercase tracking-wide mb-1.5">Select Location *</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><MapPin size={16} className="text-gray-400" /></div>
                <select name="location" value={form.location} onChange={handleChange} className={`w-full pl-10 pr-4 py-2.5 border rounded-lg font-sans text-sm bg-white focus:outline-none focus:ring-2 transition-colors appearance-none ${errors.location ? 'border-red-300 focus:border-red-500 focus:ring-red-100' : 'border-gray-200 focus:border-teal-500 focus:ring-teal-100'}`}>
                  <option value="">Select a clinic location</option>
                  {availableLocations.map(loc => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
              </div>
              {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location}</p>}
            </div>

            {/* Date & Time */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block font-sans text-xs font-semibold text-navy-700 uppercase tracking-wide mb-1.5">Preferred Date *</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Calendar size={16} className="text-gray-400" /></div>
                  <select name="date" value={form.date} onChange={handleChange} className={`w-full pl-10 pr-4 py-2.5 border rounded-lg font-sans text-sm bg-white focus:outline-none focus:ring-2 transition-colors appearance-none ${errors.date ? 'border-red-300 focus:border-red-500 focus:ring-red-100' : 'border-gray-200 focus:border-teal-500 focus:ring-teal-100'}`}>
                    <option value="">Select a date</option>
                    {availableDates.map(d => (
                      <option key={d.value} value={d.value}>{d.label}</option>
                    ))}
                  </select>
                </div>
                {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date}</p>}
              </div>

              <div>
                <label className="block font-sans text-xs font-semibold text-navy-700 uppercase tracking-wide mb-1.5">Time Slot *</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Clock size={16} className="text-gray-400" /></div>
                  <select name="timeSlot" value={form.timeSlot} onChange={handleChange} disabled={!form.date || !form.location} className={`w-full pl-10 pr-4 py-2.5 border rounded-lg font-sans text-sm bg-white focus:outline-none focus:ring-2 transition-colors appearance-none disabled:bg-gray-50 disabled:text-gray-400 ${errors.timeSlot ? 'border-red-300 focus:border-red-500 focus:ring-red-100' : 'border-gray-200 focus:border-teal-500 focus:ring-teal-100'}`}>
                    <option value="">{(!form.date || !form.location) ? 'Select date & location first' : 'Select a slot'}</option>
                    {availableTimeSlots.map(slot => (
                      <option key={slot} value={slot}>{slot}</option>
                    ))}
                  </select>
                </div>
                {errors.timeSlot && <p className="text-red-500 text-xs mt-1">{errors.timeSlot}</p>}
              </div>
            </div>

            {/* Reason */}
            <div>
              <label className="block font-sans text-xs font-semibold text-navy-700 uppercase tracking-wide mb-1.5">Reason for Visit <span className="text-gray-400 normal-case font-normal">(Optional)</span></label>
              <div className="relative">
                <div className="absolute top-3 left-3 pointer-events-none"><FileText size={16} className="text-gray-400" /></div>
                <textarea name="reason" value={form.reason} onChange={handleChange} rows={2} placeholder="Briefly describe your symptoms..." className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg font-sans text-sm focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100 transition-colors resize-none" />
              </div>
            </div>

            {/* Submit */}
            <div className="pt-2">
              <button type="submit" className="w-full bg-teal-500 hover:bg-teal-600 text-white font-sans font-semibold py-3.5 rounded-lg shadow-md hover:shadow-lg transition-all duration-200">
                Submit Appointment Request
              </button>
              <p className="text-center text-gray-400 text-xs mt-3 font-sans">You will be redirected to WhatsApp to confirm your booking.</p>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}
