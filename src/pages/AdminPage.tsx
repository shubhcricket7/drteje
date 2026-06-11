import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { CheckCircle, XCircle, Clock, Calendar, MapPin, User, Phone, FileText, Lock, LogOut } from 'lucide-react';
import { toast } from 'react-toastify';

interface Appointment {
  id: number;
  patient_name: string;
  phone: string;
  location: string;
  appointment_date: string;
  time_slot: string;
  reason: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  booked_at: string;
}

interface BlockedSlot {
  id: number;
  location: string;
  blocked_date: string;
  time_slot: string | null;
  block_type: 'slot' | 'full_day' | 'custom_hours';
  from_time: string | null;
  to_time: string | null;
  reason: string | null;
  created_at: string;
}

const LOCATIONS = {
  THERGAON: 'Thergaon Clinic',
  MANIPAL: 'Manipal Hospital',
  'ALL': 'All Locations'
};

// Helper function to format date
const fmt = (dateStr: string) => {
  if (!dateStr) return '';
  const p = dateStr.split('-');
  const d = new Date(+p[0], +p[1]-1, +p[2]);
  const days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  const months = ['Jan','Feb','Mar','Apr','May','Jun',
                  'Jul','Aug','Sep','Oct','Nov','Dec'];
  return `${days[d.getDay()]} ${+p[2]} ${months[+p[1]-1]} ${+p[0]}`;
};

// Plain JavaScript date formatting function for display
const formatDisplayDate = (dateStr: string) => {
  const parts = dateStr.split('-');
  const d = new Date(
    parseInt(parts[0]), 
    parseInt(parts[1]) - 1, 
    parseInt(parts[2])
  );
  const months = ['Jan','Feb','Mar','Apr','May','Jun',
                  'Jul','Aug','Sep','Oct','Nov','Dec'];
  return `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
};

// Helper to get today's date in YYYY-MM-DD format
const getTodayLocal = () => {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
};

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    sessionStorage.getItem('drTeje_admin') === 'true'
  );
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [activeTab, setActiveTab] = useState<'appointments' | 'block_slots' | 'availability'>('appointments');

  // Appointments Tab State
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loadingAppointments, setLoadingAppointments] = useState(true);

  // Block Slots Tab State
  const [blockForm, setBlockForm] = useState({
    location: '',
    blocked_date: '',
    block_type: 'slot',
    time_slot: '',
    from_time: '',
    to_time: '',
    reason: '',
  });
  const [blockErrors, setBlockErrors] = useState<any>({});

  // Availability Tab State
  const [blockedSlots, setBlockedSlots] = useState<BlockedSlot[]>([]);
  const [loadingBlockedSlots, setLoadingBlockedSlots] = useState(true);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'teje@admin') {
      sessionStorage.setItem('drTeje_admin', 'true');
      setIsAuthenticated(true);
      setLoginError('');
    } else {
      setLoginError('Incorrect username or password');
      toast.error('Incorrect username or password');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('drTeje_admin');
    setIsAuthenticated(false);
    setUsername('');
    setPassword('');
    toast.info('Logged out successfully!');
  };

  const fetchAppointments = async () => {
    setLoadingAppointments(true);
    const today = getTodayLocal();
   const { data, error } = await supabase
  .from('appointments')
  .select('*')
  .order('appointment_date', { ascending: true })
  .order('time_slot', { ascending: true });

    if (error) {
      console.error('Error fetching appointments:', error);
      toast.error('Failed to fetch appointments.');
    } else {
      setAppointments(data || []);
    }
    setLoadingAppointments(false);
  };

  const fetchBlockedSlots = async () => {
    setLoadingBlockedSlots(true);
    const { data, error } = await supabase
      .from('blocked_slots')
      .select('*')
      .order('blocked_date', { ascending: true })
      .order('from_time', { ascending: true });

    if (error) {
      console.error('Error fetching blocked slots:', error);
      toast.error('Failed to fetch blocked slots.');
    } else {
      setBlockedSlots(data || []);
    }
    setLoadingBlockedSlots(false);
  };

  useEffect(() => {
    if (isAuthenticated) {
      if (activeTab === 'appointments') {
        fetchAppointments();
      } else if (activeTab === 'availability') {
        fetchBlockedSlots();
      }
    }
  }, [isAuthenticated, activeTab]);

  const updateAppointmentStatus = async (id: number, status: 'confirmed' | 'cancelled', appointment: Appointment) => {
    const { error } = await supabase
      .from('appointments')
      .update({ status })
      .eq('id', id);

    if (error) {
      console.error(`Error updating appointment ${id} status to ${status}:`, error);
      toast.error(`Failed to ${status} appointment.`);
    } else {
      toast.success(`Appointment ${status} successfully!`);
      
      if (status === 'confirmed') {
        const patientCleanedPhone = appointment.phone.replace(/\D/g, ''); // Basic cleaning
        const confirmationMessage = 
          `Hello ${appointment.patient_name} 👋` +
          `\n\nYour appointment with *Dr. Prathamesh Teje* is confirmed! ✅` +
          `\n\n📍 ${appointment.location}` +
          `\n📅 ${fmt(appointment.appointment_date)}` + // Using fmt helper
          `\n⏰ ${appointment.time_slot}` +
          `\n\nPlease arrive 5 mins early.` +
          `\n— Dr. Teje's Clinic 🏥`;
        
        const whatsappUrl = `https://wa.me/${patientCleanedPhone}?text=${encodeURIComponent(confirmationMessage)}`;
        window.open(whatsappUrl, '_blank');
      } else if (status === 'cancelled') {
        // Also delete the corresponding blocked slot
        const { error: deleteBlockError } = await supabase
          .from('blocked_slots')
          .delete()
          .eq('blocked_date', appointment.appointment_date)
          .eq('time_slot', appointment.time_slot)
          .eq('location', appointment.location.toLowerCase().includes('thergaon') ? 'thergaon' : 'manipal');
        
        if (deleteBlockError) {
          console.error('Error deleting blocked slot:', deleteBlockError);
          toast.error('Failed to delete associated blocked slot.');
        }
      }
      fetchAppointments(); // Refresh the list
    }
  };

  const handleBlockChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setBlockForm(prev => ({ ...prev, [name]: value }));
    if (blockErrors[name]) {
      setBlockErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateBlockForm = () => {
    const newErrors: any = {};
    if (!blockForm.location) newErrors.location = 'Location is required';
    if (!blockForm.blocked_date) newErrors.blocked_date = 'Date is required';

    if (blockForm.block_type === 'slot' && !blockForm.time_slot) {
      newErrors.time_slot = 'Time slot is required for slot blocking';
    }
    if (blockForm.block_type === 'custom_hours') {
      if (!blockForm.from_time) newErrors.from_time = 'From time is required';
      if (blockForm.from_time && blockForm.to_time && blockForm.from_time >= blockForm.to_time) {
        newErrors.to_time = 'To time must be after From time';
      }
    }
    setBlockErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleBlockSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateBlockForm()) return;

    const payload: any = {
      location: blockForm.location,
      blocked_date: blockForm.blocked_date,
      block_type: blockForm.block_type,
      reason: blockForm.reason || null,
    };

    if (blockForm.block_type === 'slot') {
      payload.time_slot = blockForm.time_slot;
    } else if (blockForm.block_type === 'custom_hours') {
      payload.from_time = blockForm.from_time;
      payload.to_time = blockForm.to_time;
    }

    const { error } = await supabase
      .from('blocked_slots')
      .insert(payload);

    if (error) {
      console.error('Error blocking slot:', error);
      toast.error('Failed to block slot.');
    } else {
      toast.success('Slot blocked successfully!');
      setBlockForm({
        location: '',
        blocked_date: '',
        block_type: 'slot',
        time_slot: '',
        from_time: '',
        to_time: '',
        reason: '',
      });
      fetchBlockedSlots(); // Refresh availability tab
    }
  };

  const handleDeleteBlockedSlot = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this blocked slot?')) return;

    const { error } = await supabase
      .from('blocked_slots')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting blocked slot:', error);
      toast.error('Failed to delete blocked slot.');
    } else {
      toast.success('Blocked slot deleted successfully!');
      fetchBlockedSlots(); // Refresh the list
    }
  };

  const todayAppointments = appointments.filter(appt => appt.appointment_date === getTodayLocal());
  const thergaonAppointments = todayAppointments.filter(appt => appt.location === LOCATIONS.THERGAON);
  const manipalAppointments = todayAppointments.filter(appt => appt.location === LOCATIONS.MANIPAL);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            <span role="img" aria-label="clinic">🏥</span> Dr. Teje Clinic
            <br />
            <span className="text-xl font-normal">Admin Panel</span>
          </h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User size={18} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                  placeholder="Enter username"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock size={18} className="text-gray-400" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                  placeholder="Enter password"
                />
              </div>
              {loginError && <p className="text-red-500 text-xs mt-1">{loginError}</p>}
            </div>
            <button
              type="submit"
              className="w-full bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2.5 rounded-md transition-colors"
            >
              Login
            </button>
            <p className="text-center text-gray-500 text-xs mt-3">⚠️ Authorised access only</p>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-teal-500 to-cyan-600 p-6 text-white flex justify-between items-center">
          <h1 className="text-3xl font-bold flex items-center">
            <Lock className="mr-3" size={28} /> Admin Dashboard
          </h1>
          <button
            onClick={handleLogout}
            className="flex items-center px-4 py-2 bg-red-500 hover:bg-red-600 rounded-md text-white font-semibold transition-colors"
          >
            <LogOut size={18} className="mr-2" /> Logout
          </button>
        </div>

        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 px-6" aria-label="Tabs">
            <button
              onClick={() => setActiveTab('appointments')}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'appointments'
                  ? 'border-teal-500 text-teal-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Appointments
            </button>
            <button
              onClick={() => setActiveTab('block_slots')}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'block_slots'
                  ? 'border-teal-500 text-teal-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Block Slots
            </button>
            <button
              onClick={() => setActiveTab('availability')}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'availability'
                  ? 'border-teal-500 text-teal-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Availability
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'appointments' && (
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Today's Appointments</h2>
              <div className="mb-6 p-4 bg-teal-50 border-l-4 border-teal-500 text-teal-800">
                <p className="font-semibold text-lg">📅 Today: {todayAppointments.length} appointments</p>
                <p className="text-sm">📍 Thergaon: {thergaonAppointments.length} | Manipal: {manipalAppointments.length}</p>
              </div>
              {loadingAppointments ? (
                <div className="text-center py-8 text-gray-500">Loading appointments...</div>
              ) : appointments.length === 0 ? (
                <div className="text-center py-8 text-gray-500">No appointments found for today.</div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {appointments.map((appt) => (
                    <div key={appt.id} className="bg-white border border-gray-200 rounded-lg shadow-sm p-4">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-lg font-semibold text-gray-900 flex items-center">
                          <Clock size={18} className="mr-2 text-teal-600" /> {appt.time_slot}
                        </p>
                        <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${
                          appt.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                          appt.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {appt.status}
                        </span>
                      </div>
                      <p className="text-gray-700 flex items-center mb-1">
                        <MapPin size={16} className="mr-2 text-gray-500" /> {appt.location}
                      </p>
                      <p className="text-gray-700 flex items-center mb-1">
                        <User size={16} className="mr-2 text-gray-500" /> {appt.patient_name}
                      </p>
                      <p className="text-gray-700 flex items-center mb-1">
                        <Phone size={16} className="mr-2 text-gray-500" /> {appt.phone}
                      </p>
                      <p className="text-gray-700 flex items-center text-sm mb-3">
                        <FileText size={16} className="mr-2 text-gray-500" /> {appt.reason || 'No reason specified'}
                      </p>

                      {appt.status === 'pending' && (
                        <div className="flex space-x-2 mt-4">
                          <button
                            onClick={() => updateAppointmentStatus(appt.id, 'confirmed', appt)}
                            className="flex-1 flex items-center justify-center px-3 py-2 bg-green-500 hover:bg-green-600 text-white text-sm font-medium rounded-md transition-colors"
                          >
                            <CheckCircle size={16} className="mr-2" /> Confirm
                          </button>
                          <button
                            onClick={() => updateAppointmentStatus(appt.id, 'cancelled', appt)}
                            className="flex-1 flex items-center justify-center px-3 py-2 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-md transition-colors"
                          >
                            <XCircle size={16} className="mr-2" /> Cancel
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'block_slots' && (
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Block Appointment Slots</h2>
              <form onSubmit={handleBlockSubmit} className="space-y-5 bg-gray-50 p-6 rounded-lg shadow-inner">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location *</label>
                  <select
                    name="location"
                    value={blockForm.location}
                    onChange={handleBlockChange}
                    className={`w-full py-2.5 border rounded-lg font-sans text-sm bg-white focus:outline-none focus:ring-2 transition-colors ${blockErrors.location ? 'border-red-300 focus:border-red-500 focus:ring-red-100' : 'border-gray-200 focus:border-teal-500 focus:ring-teal-100'}`}
                  >
                    <option value="">Select a location</option>
                    <option value={LOCATIONS.THERGAON}>{LOCATIONS.THERGAON}</option>
                    <option value={LOCATIONS.MANIPAL}>{LOCATIONS.MANIPAL}</option>
                    <option value={LOCATIONS.ALL}>{LOCATIONS.ALL}</option>
                  </select>
                  {blockErrors.location && <p className="text-red-500 text-xs mt-1">{blockErrors.location}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date *</label>
                  <input
                    type="date"
                    name="blocked_date"
                    value={blockForm.blocked_date}
                    onChange={handleBlockChange}
                    className={`w-full py-2.5 border rounded-lg font-sans text-sm bg-white focus:outline-none focus:ring-2 transition-colors ${blockErrors.blocked_date ? 'border-red-300 focus:border-red-500 focus:ring-red-100' : 'border-gray-200 focus:border-teal-500 focus:ring-teal-100'}`}
                  />
                  {blockErrors.blocked_date && <p className="text-red-500 text-xs mt-1">{blockErrors.blocked_date}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Block Type *</label>
                  <select
                    name="block_type"
                    value={blockForm.block_type}
                    onChange={handleBlockChange}
                    className="w-full py-2.5 border border-gray-200 rounded-lg font-sans text-sm bg-white focus:outline-none focus:ring-2 focus:border-teal-500 focus:ring-teal-100"
                  >
                    <option value="slot">Specific Time Slot</option>
                    <option value="full_day">Full Day</option>
                    <option value="custom_hours">Custom Hour Range</option>
                  </select>
                </div>

                {blockForm.block_type === 'slot' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Time Slot *</label>
                    <input
                      type="text"
                      name="time_slot"
                      value={blockForm.time_slot}
                      onChange={handleBlockChange}
                      placeholder="e.g., 6:00 PM"
                      className={`w-full py-2.5 border rounded-lg font-sans text-sm focus:outline-none focus:ring-2 transition-colors ${blockErrors.time_slot ? 'border-red-300 focus:border-red-500 focus:ring-red-100' : 'border-gray-200 focus:border-teal-500 focus:ring-teal-100'}`}
                    />
                    {blockErrors.time_slot && <p className="text-red-500 text-xs mt-1">{blockErrors.time_slot}</p>}
                  </div>
                )}

                {blockForm.block_type === 'custom_hours' && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">From Time *</label>
                      <input
                        type="time"
                        name="from_time"
                        value={blockForm.from_time}
                        onChange={handleBlockChange}
                        className={`w-full py-2.5 border rounded-lg font-sans text-sm bg-white focus:outline-none focus:ring-2 transition-colors ${blockErrors.from_time ? 'border-red-300 focus:border-red-500 focus:ring-red-100' : 'border-gray-200 focus:border-teal-500 focus:ring-teal-100'}`}
                      />
                      {blockErrors.from_time && <p className="text-red-500 text-xs mt-1">{blockErrors.from_time}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">To Time *</label>
                      <input
                        type="time"
                        name="to_time"
                        value={blockForm.to_time}
                        onChange={handleBlockChange}
                        className={`w-full py-2.5 border rounded-lg font-sans text-sm bg-white focus:outline-none focus:ring-2 transition-colors ${blockErrors.to_time ? 'border-red-300 focus:border-red-500 focus:ring-red-100' : 'border-gray-200 focus:border-teal-500 focus:ring-teal-100'}`}
                      />
                      {blockErrors.to_time && <p className="text-red-500 text-xs mt-1">{blockErrors.to_time}</p>}
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Reason (Optional)</label>
                  <textarea
                    name="reason"
                    value={blockForm.reason}
                    onChange={handleBlockChange}
                    rows={2}
                    placeholder="e.g., Doctor on leave, Holiday"
                    className="w-full py-2.5 border border-gray-200 rounded-lg font-sans text-sm focus:outline-none focus:ring-2 focus:border-teal-500 focus:ring-teal-100 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2.5 rounded-md transition-colors"
                >
                  Block Slot
                </button>
              </form>
            </div>
          )}

          {activeTab === 'availability' && (
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Blocked Slots & Availability</h2>
              {loadingBlockedSlots ? (
                <div className="text-center py-8 text-gray-500">Loading blocked slots...</div>
              ) : blockedSlots.length === 0 ? (
                <div className="text-center py-8 text-gray-500">No blocked slots found.</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Location
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Type
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Details
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Reason
                        </th>
                        <th scope="col" className="relative px-6 py-3">
                          <span className="sr-only">Actions</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {blockedSlots.map((block) => (
                        <tr key={block.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {formatDisplayDate(block.blocked_date)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {block.location}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {block.block_type.replace('_', ' ')}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {block.block_type === 'slot' && block.time_slot}
                            {block.block_type === 'custom_hours' && `${block.from_time} - ${block.to_time}`}
                            {block.block_type === 'full_day' && 'Entire Day'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {block.reason || 'N/A'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button
                              onClick={() => handleDeleteBlockedSlot(block.id)}
                              className="text-red-600 hover:text-red-900"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
