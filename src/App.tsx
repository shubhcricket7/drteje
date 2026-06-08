import { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ExpertisePage from './pages/ExpertisePage';
import ServicesPage from './pages/ServicesPage';
import TestimonialsPage from './pages/TestimonialsPage';
import AppointmentPage from './pages/AppointmentPage';
import BlogPage from './pages/BlogPage';
import ContactPage from './pages/ContactPage';
import BlogPostPage from './pages/BlogPostPage';
import AppointmentModal from './components/AppointmentModal';
import ScrollToTop from './components/ScrollToTop';
import BackButton from './components/BackButton'; // New import

type Page = 'home' | 'about' | 'expertise' | 'services' | 'testimonials' | 'appointments' | 'blog' | 'contact' | `blog-post-${string}`;

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = (page: string, slug?: string) => {
    if (slug) {
      setCurrentPage(`blog-post-${slug}` as Page);
    } else {
      setCurrentPage(page as Page);
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const renderPage = () => {
    if (currentPage.startsWith('blog-post-')) {
      const slug = currentPage.replace('blog-post-', '');
      return <BlogPostPage slug={slug} onNavigate={navigate} />;
    }

    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={navigate} onOpenModal={openModal} />;
      case 'about':
        return <AboutPage onNavigate={navigate} />;
      case 'expertise':
        return <ExpertisePage onNavigate={navigate} />;
      case 'services':
        return <ServicesPage onNavigate={navigate} />;
      case 'testimonials':
        return <TestimonialsPage onNavigate={navigate} onOpenModal={openModal} />;
      case 'appointments':
        return <AppointmentPage />;
      case 'blog':
        return <BlogPage onNavigate={navigate} />;
      case 'contact':
        return <ContactPage onNavigate={navigate} />;
      default:
        return <HomePage onNavigate={navigate} onOpenModal={openModal} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop currentPage={currentPage} />
      <Navbar currentPage={currentPage} onNavigate={navigate} onOpenModal={openModal} />
      <BackButton currentPage={currentPage} onNavigate={navigate} /> {/* Universal Back Button */}
      <main className="flex-1">
        {renderPage()}
      </main>
      <Footer onNavigate={navigate} />
      
      {/* Global Appointment Modal */}
      <AppointmentModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
}

export default App;
