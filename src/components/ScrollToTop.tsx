import { useEffect } from 'react';

interface ScrollToTopProps {
  currentPage: string;
}

const ScrollToTop = ({ currentPage }: ScrollToTopProps) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  return null; // This component doesn't render anything
};

export default ScrollToTop;
