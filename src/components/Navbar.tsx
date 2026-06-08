import { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  onOpenModal: () => void;
}

const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'expertise', label: 'Expertise' },
  { id: 'services', label: 'Services' },
  { id: 'testimonials', label: 'Testimonials' }, // Added Testimonials
  { id: 'appointments', label: 'Appointments' },
  { id: 'blog', label: 'Health Blog' },
  { id: 'contact', label: 'Contact' },
];

export default function Navbar({ currentPage, onNavigate, onOpenModal }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNav = (page: string) => {
    onNavigate(page);
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white ${
          scrolled || mobileOpen ? 'shadow-md' : 'shadow-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <button
              onClick={() => handleNav('home')}
              className="flex items-center gap-3 group flex-shrink-0"
            >
              <div className="w-10 h-10 rounded-full bg-navy-800 flex items-center justify-center flex-shrink-0 group-hover:bg-teal-500 transition-colors duration-200">
                <span className="text-white font-serif font-bold text-sm">DT</span>
              </div>
              <div className="leading-tight text-left">
                <div className="font-serif font-bold text-navy-800 text-base leading-tight">Dr. Teje</div>
                <div className="font-sans text-xs text-teal-500 font-medium">Physician & Diabetologist</div>
              </div>
            </button>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-6">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNav(item.id)}
                  className={`nav-link py-1 ${
                    currentPage === item.id
                      ? 'text-teal-500 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-teal-500 after:rounded-full'
                      : ''
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* CTA + Mobile Toggle */}
            <div className="flex items-center gap-3">
              <a
                href="tel:+918999046916"
                className="hidden md:flex items-center gap-1.5 text-navy-800 hover:text-teal-500 transition-colors duration-150"
              >
                <Phone size={15} />
                <span className="font-sans text-xs font-medium">Call Clinic</span>
              </a>
              <button
                onClick={onOpenModal}
                className="btn-primary text-xs px-4 py-2.5 hidden sm:block"
              >
                Book Appointment
              </button>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2 rounded-md text-navy-800 hover:bg-gray-100 transition-colors"
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-gray-100 bg-white">
            <div className="px-4 py-3 space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNav(item.id)}
                  className={`w-full text-left px-3 py-2.5 rounded-md font-sans text-sm font-medium transition-colors duration-150 ${
                    currentPage === item.id
                      ? 'bg-teal-50 text-teal-600'
                      : 'text-charcoal hover:bg-gray-50 hover:text-teal-500'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <div className="pt-2 pb-1">
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    onOpenModal();
                  }}
                  className="btn-primary w-full text-center"
                >
                  Book Appointment
                </button>
              </div>
            </div>
          </div>
        )}
      </header>
      {/* Spacer */}
      <div className="h-16" />
    </>
  );
}
