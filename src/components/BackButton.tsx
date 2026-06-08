import { ChevronLeft } from 'lucide-react';
import { useEffect, useState } from 'react';

interface BackButtonProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

const BackButton = ({ onNavigate, currentPage }: BackButtonProps) => {
  const [canGoBack, setCanGoBack] = useState(false);

  useEffect(() => {
    // Check if there's history to go back to
    setCanGoBack(window.history.length > 1);
  }, [currentPage]);

  const handleBack = () => {
    if (canGoBack) {
      window.history.back();
    } else {
      onNavigate('home'); // Fallback to home if no history
    }
  };

  // Don't render on the home page
  if (currentPage === 'home') {
    return null;
  }

  return (
    <button
      onClick={handleBack}
      className="fixed top-20 left-4 z-40 p-3 bg-white rounded-full shadow-lg border border-gray-100 text-navy-800 hover:bg-gray-50 transition-all duration-200 flex items-center justify-center group"
      aria-label="Go back"
    >
      <ChevronLeft size={20} className="group-hover:-translate-x-0.5 transition-transform duration-200" />
    </button>
  );
};

export default BackButton;
