import { useState, useEffect, useMemo } from 'react';
import { X, Calendar, Clock, User, Phone, FileText, MapPin } from 'lucide-react';
import { bookedSlots } from '../config/bookedSlots'; // Import booked slots
import { toast } from 'react-toastify'; // Assuming react-toastify is installed

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

// Helper to get today's date in local YYYY-MM-DD format
const getTodayLocal = () => {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
};

const initialForm: FormState = {
  name: '',
  phone: '',
  location: '',
  date: getTodayLocal(), // Set default date to today's local date
  timeSlot: '',
  reason: '',
};

const LOCATIONS = {
  THERGAON: 'Thergaon Clinic',
  MANIPAL: 'Manipal Hospital',
};

// Helper to generate time slots
const generateTimeSlots = (startHour: number, startMinute: number, endHour: number, endMinute: number, interval: number = 15) => {
  const slots: string[] = [];
  let current = new Date();
  current.setHours(startHour, startMinute, 0, 0);
  let end = new Date();
  end.setHours(endHour, endMinute, 0, 0);

  while (current <= end) {
    const formatTime = (date: Date) => date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
    slots.push(formatTime(current)); // Changed to single start time
    current.setMinutes(current.getMinutes() + interval);
  }
  return slots;
};

// Phone number cleaning function
const cleanPhone = (phone: string) => {
  let cleaned = phone.replace(/\D/g, '');
  if (cleaned.startsWith('0')) {
    cleaned = '91' + cleaned.slice(1);
  } else if (cleaned.length === 10) {
    cleaned = '91' + cleaned;
  } else if (cleaned.startsWith('91') && cleaned.length === 12) {
    // already correct
  }
  return cleaned;
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

  // 1. Generate available dates (Next 30 days including today) based on selected location
  const availableDates = useMemo(() => {
    const dates = [];
    const today = new Date();
    // Use local date for min value and default value for date input field
    const localToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    localToday.setHours(0, 0, 0, 0); // Normalize to start of day

    for (let i = 0; i < 30; i++) { // Start from today (i=0)
      const d = new Date(localToday);
      d.setDate(localToday.getDate() + i);
      const day = d.getDay(); // 0 = Sun, 1 = Mon, ..., 6 = Sat
      
      let isValid = false;

      if (!form.location) {
        // If no location selected, show date if AT LEAST ONE location is open
        // Thergaon: Mon, Tue, Wed, Fri, Sat
        // Manipal: Tue, Wed, Thu, Fri, Sat, Sun
        if (day !== 0) isValid = true; // Both closed on Sunday
      } else if (form.location === LOCATIONS.THERGAON) {
        // Thergaon is closed on Thursday (4) and Sunday (0)
        if (day !== 0 && day !== 4) isValid = true;
      } else if (form.location === LOCATIONS.MANIPAL) {
        // Manipal is closed on Monday (1)
        if (day !== 1) isValid = true;
      }
      
      if (isValid) {
        dates.push({
          value: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`,
          label: new Date(d.getFullYear(), d.getMonth(), d.getDate()).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
          day,
        });
      }
    }
    return dates;
  }, [form.location]);

  // 2. Determine available locations based on selected date
  const availableLocations = useMemo(() => {
    if (!form.date) return [LOCATIONS.THERGAON, LOCATIONS.MANIPAL];
    const parts = form.date.split('-');
    const day = new Date(parseInt(parts[0]), parseInt(parts[1])-1, parseInt(parts[2])).getDay();
    
    // Thergaon: Mon, Tue, Wed, Fri, Sat
    // Manipal: Tue, Wed, Thu, Fri, Sat, Sun

    if (day === 0) return [LOCATIONS.MANIPAL]; // Sunday: Only Manipal
    if (day === 1) return [LOCATIONS.THERGAON]; // Monday: Only Thergaon
    if (day === 4) return [LOCATIONS.MANIPAL]; // Thursday: Only Manipal
    return [LOCATIONS.THERGAON, LOCATIONS.MANIPAL]; // Tue, Wed, Fri, Sat: Both open
  }, [form.date]);

  // 3. Generate time slots based on selected date AND location, and filter booked slots
  const availableTimeSlots = useMemo(() => {
    if (!form.date || !form.location) return [];

    const p = form.date.split('-');
    const day = new Date(parseInt(p[0]), parseInt(p[1])-1, parseInt(p[2])).getDay(); // 0 = Sun, 1 = Mon, ..., 6 = Sat

    let allSlots: string[] = [];

    if (form.location === LOCATIONS.THERGAON) {
      // Thergaon Clinic: Mon, Tue, Wed, Fri, Sat — 6:00 PM to 8:30 PM (last slot)
      if (day === 0 || day === 4) return []; // Closed on Sunday and Thursday
      allSlots = generateTimeSlots(18, 0, 20, 30); // 6:00 PM to 8:30 PM (last slot)
    } else if (form.location === LOCATIONS.MANIPAL) {
      // Manipal Hospital Baner
      if (day === 1) { // Monday
        return ['Dr. Teje is not available at Manipal on Mondays. Please select another day or choose Thergaon Clinic.'];
      } else if (day === 4) { // Thursday
        allSlots = generateTimeSlots(14, 0, 20, 0); // 2:00 PM to 8:00 PM
      } else if (day === 0) { // Sunday
        allSlots = generateTimeSlots(10, 0, 12, 0); // 10:00 AM to 12:00 PM
      } else { // Tue, Wed, Fri, Sat
        allSlots = generateTimeSlots(9, 0, 15, 0); // 9:00 AM to 3:00 PM
      }
    }

    // Filter out booked slots
    const locationKey = form.location === LOCATIONS.THERGAON ? 'thergaon' : 'manipal';
    const bookedKey = `${form.date}-${locationKey}`;
    const blocked = bookedSlots[bookedKey] || [];
    
    return allSlots.map(slot => ({
      slot,
      isBooked: blocked.includes(slot)
    }));

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
          const dp = next.date.split('-');
          const day = new Date(parseInt(dp[0]), parseInt(dp[1])-1, parseInt(dp[2])).getDay();
          if (value === LOCATIONS.THERGAON && (day === 0 || day === 4)) {
            next.date = ''; // Reset date if invalid for Thergaon
          } else if (value === LOCATIONS.MANIPAL && day === 1) {
            next.date = ''; // Reset date if invalid for Manipal
          }
        }
        next.timeSlot = ''; // Always reset time slot
      }

      if (name === 'date') {
        const vp = value.split('-');
        const day = new Date(parseInt(vp[0]), parseInt(vp[1])-1, parseInt(vp[2])).getDay();
        if (next.location === LOCATIONS.THERGAON && (day === 0 || day === 4)) {
          next.location = ''; // Reset location if Thergaon is closed
        } else if (next.location === LOCATIONS.MANIPAL && day === 1) {
          next.location = ''; // Reset location if Manipal is closed
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
    
    // Check if timeSlot is selected and not a "not available" message
    const isTimeSlotValid = form.timeSlot && !availableTimeSlots[0]?.slot?.includes('not available');
    if (!isTimeSlotValid) {
      newErrors.timeSlot = 'Time slot is required';
    } else {
      // Check if the selected time slot is actually booked
      const selectedSlotInfo = availableTimeSlots.find(s => s.slot === form.timeSlot);
      if (selectedSlotInfo?.isBooked) {
        newErrors.timeSlot = 'This time slot is already booked.';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const getDisplayDate = () => {
    const raw = form.date; // format is "YYYY-MM-DD"
    const parts = raw.split('-');
    const dd = parts[2];
    const mm = parts[1];
    const yyyy = parts[0];
    
    const monthNames = [
      '', 'January', 'February', 'March', 'April',
      'May', 'June', 'July', 'August', 'September',
      'October', 'November', 'December'
    ];
    
    const dayNames = [
      'Sunday', 'Monday', 'Tuesday', 'Wednesday',
      'Thursday', 'Friday', 'Saturday'
    ];

    const dayOfWeek = dayNames[
      new Date(parseInt(yyyy), parseInt(mm) - 1, parseInt(dd)).getDay()
    ];

    return `${dayOfWeek}, ${parseInt(dd)} ${monthNames[parseInt(mm)]} ${yyyy}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const appointmentDate = getDisplayDate();
    const patientCleanedPhone = cleanPhone(form.phone);

    // Confirmation message for the patient
    const confirmationMessage = 
      `Hello ${form.name} 👋` +
      `\n\nYour appointment with *Dr. Prathamesh Teje* is confirmed! ✅` +
      `\n\n📍 ${form.location}` +
      `\n📅 ${appointmentDate}` +
      `\n⏰ ${form.timeSlot}` +
      `\n\nPlease arrive 5 mins early.` +
      `\nQueries? Reply to this message.` +
      `\n\n— Dr. Teje's Clinic 🏥`;

    const confirmationLink = 
      `https://wa.me/${patientCleanedPhone}?text=${encodeURIComponent(confirmationMessage)}`;

    // WhatsApp message to Dr. Teje
    const whatsappMessage = 
      `Hello Dr. Teje, I would like to book an appointment.` +
      `\n\n*Patient Name:* ${form.name}` +
      `\n*Phone:* ${form.phone}` +
      `\n*Location:* ${form.location}` +
      `\n*Date:* ${appointmentDate}` +
      `\n*Time Slot:* ${form.timeSlot}` +
      `\n*Reason:* ${form.reason || 'Not specified'}` +
      `\n\n---` +
      `\n⚡ *Click here to instantly confirm this appointment via WhatsApp:*` +
      `\n${confirmationLink}`;

    const whatsappUrl = 
      `https://wa.me/918999046916?text=${encodeURIComponent(whatsappMessage)}`;
    
    window.open(whatsappUrl, '_blank');
    setForm(initialForm);
    onClose();

    // Show success toast
    toast.success("✅ Redirecting to WhatsApp! Dr. Teje will confirm your appointment shortly.", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
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
                  <select name="timeSlot" value={form.timeSlot} onChange={handleChange} disabled={!form.date || !form.location || availableTimeSlots[0]?.slot?.includes('not available')} className={`w-full pl-10 pr-4 py-2.5 border rounded-lg font-sans text-sm bg-white focus:outline-none focus:ring-2 transition-colors appearance-none disabled:bg-gray-50 disabled:text-gray-400 ${errors.timeSlot ? 'border-red-300 focus:border-red-500 focus:ring-red-100' : 'border-gray-200 focus:border-teal-500 focus:ring-teal-100'}`}>
                    <option value="">
                      {(!form.date || !form.location) ? 'Select date & location first' : 
                       (availableTimeSlots[0]?.slot?.includes('not available') ? availableTimeSlots[0].slot : 'Select a slot')}
                    </option>
                    {availableTimeSlots.map((slotInfo, index) => (
                      slotInfo.slot.includes('not available') ? (
                        <option key={index} value={slotInfo.slot} disabled className="text-gray-500">
                          {slotInfo.slot}
                        </option>
                      ) : (
                        <option 
                          key={slotInfo.slot} 
                          value={slotInfo.slot} 
                          disabled={slotInfo.isBooked} 
                          className={slotInfo.isBooked ? 'text-gray-500 italic' : ''}
                        >
                          {slotInfo.slot} {slotInfo.isBooked && '— Booked'}
                        </option>
                      )
                    ))}
                  </select>
                </div>
                {errors.timeSlot && <p className="text-red-500 text-xs mt-1">{errors.timeSlot}</p>}
                {form.date && form.location && !availableTimeSlots[0]?.slot?.includes('not available') && (
                  <p className="text-gray-500 text-xs mt-1 font-sans">Slots are subject to availability. Dr. Teje's team will confirm via WhatsApp.</p>
                )}
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
