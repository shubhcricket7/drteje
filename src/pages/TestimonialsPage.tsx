import { Star, PlayCircle } from 'lucide-react';
import { useState } from 'react';

interface TestimonialsPageProps {
  onNavigate: (page: string) => void;
  onOpenModal: () => void;
}

interface VideoTestimonial {
  id: string;
  title: string;
  patientName: string;
  reviewSnippet: string;
  stars: number;
  treatmentTag: string;
  thumbnail: string;
}

export const videoTestimonials: VideoTestimonial[] = [
  {
    id: '0j9Mta-Mr1I',
    title: 'Patient Testimonial 1',
    patientName: 'Mrs. S.K.',
    reviewSnippet: 'My diabetes is now well-controlled thanks to Dr. Teje\'s personalized plan.',
    stars: 5,
    treatmentTag: 'Diabetes',
    thumbnail: 'https://img.youtube.com/vi/0j9Mta-Mr1I/hqdefault.jpg',
  },
  {
    id: 'AnvRAoqAS2o',
    title: 'Patient Testimonial 2',
    patientName: 'Mr. R.P.',
    reviewSnippet: 'He patiently explained my thyroid condition and the treatment options.',
    stars: 5,
    treatmentTag: 'Thyroid',
    thumbnail: 'https://img.youtube.com/vi/AnvRAoqAS2o/hqdefault.jpg',
  },
  {
    id: '11Ex_R00VUg',
    title: 'Patient Testimonial 3',
    patientName: 'Ms. A.G.',
    reviewSnippet: 'Recovered quickly from a persistent fever with his accurate diagnosis.',
    stars: 4,
    treatmentTag: 'Fever & Infections',
    thumbnail: 'https://img.youtube.com/vi/11Ex_R00VUg/hqdefault.jpg',
  },
  {
    id: 'Olx-IT7wSP0',
    title: 'Patient Testimonial 4',
    patientName: 'Mr. V.S.',
    reviewSnippet: 'My blood pressure is stable now. Highly recommend his holistic approach.',
    stars: 5,
    treatmentTag: 'Hypertension',
    thumbnail: 'https://img.youtube.com/vi/Olx-IT7wSP0/hqdefault.jpg',
  },
  {
    id: 'yjB-UalZOMQ',
    title: 'Patient Testimonial 5',
    patientName: 'Mrs. P.M.',
    reviewSnippet: 'Grateful for the clear guidance on managing my cholesterol levels.',
    stars: 5,
    treatmentTag: 'Cholesterol',
    thumbnail: 'https://img.youtube.com/vi/yjB-UalZOMQ/hqdefault.jpg',
  },
  {
    id: 'TgQqFTTgzrg',
    title: 'Patient Testimonial 6',
    patientName: 'Mr. K.L.',
    reviewSnippet: 'His advice on preventive health has made a huge difference.',
    stars: 4,
    treatmentTag: 'Preventive Health',
    thumbnail: 'https://img.youtube.com/vi/TgQqFTTgzrg/hqdefault.jpg',
  },
];

const googleReviews = [
  {
    name: 'Patient from Pimpri-Chinchwad',
    stars: 5,
    text: 'Dr. Teje is an excellent physician. He took the time to explain my diabetes condition thoroughly and provided a clear treatment plan. Highly recommend!',
  },
  {
    name: 'Patient from Pune',
    stars: 5,
    text: 'Very professional and empathetic doctor. My hypertension is now well-managed thanks to his guidance and precise medication.',
  },
  {
    name: 'Patient from Thergaon',
    stars: 4,
    text: 'Visited for a persistent fever. Dr. Teje quickly diagnosed the issue and I recovered fast. Trustworthy and knowledgeable.',
  },
];

const treatmentColors: Record<string, string> = {
  'Diabetes': 'bg-blue-50 text-blue-700 border-blue-100',
  'Thyroid': 'bg-purple-50 text-purple-700 border-purple-100',
  'Fever & Infections': 'bg-orange-50 text-orange-700 border-orange-100',
  'Hypertension': 'bg-red-50 text-red-700 border-red-100',
  'Cholesterol': 'bg-green-50 text-green-700 border-green-100',
  'Preventive Health': 'bg-teal-50 text-teal-700 border-teal-100',
};

export default function TestimonialsPage({ onNavigate, onOpenModal }: TestimonialsPageProps) {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  return (
    <div className="font-sans">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-navy-800 to-navy-700 text-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="font-sans text-teal-400 text-sm font-semibold tracking-widest uppercase mb-3">
              Patient Stories
            </p>
            <h1 className="font-serif text-3xl md:text-4xl font-bold mb-3">
              Patient Testimonials
            </h1>
            <p className="font-sans text-blue-200 text-lg">
              Real patients. Real results. Real stories.
            </p>
          </div>
        </div>
      </div>

      {/* ── VIDEO TESTIMONIALS ── */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-heading">Video Stories</h2>
            <p className="section-subheading">
              Hear directly from our patients about their journey to better health.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {videoTestimonials.map((video) => (
              <div
                key={video.id}
                className="card p-0 overflow-hidden group cursor-pointer relative"
                onClick={() => setSelectedVideo(video.id)}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <PlayCircle size={60} className="text-white opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex gap-0.5 mb-2">
                    {Array.from({ length: video.stars }).map((_, i) => (
                      <Star key={i} size={16} fill="#e9c46a" className="text-amber-500" />
                    ))}
                  </div>
                  <p className="font-sans text-gray-600 text-sm leading-relaxed mb-3 line-clamp-2">
                    "{video.reviewSnippet}"
                  </p>
                  <div className="font-sans text-navy-800 font-semibold text-sm">{video.patientName}</div>
                  <span className={`badge border text-xs mt-3 ${treatmentColors[video.treatmentTag]}`}>
                    {video.treatmentTag}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4" onClick={() => setSelectedVideo(null)}>
          <div className="relative w-full max-w-3xl aspect-video rounded-lg overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Patient Testimonial Video"
            ></iframe>
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute -top-3 -right-3 bg-white text-navy-800 rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
              aria-label="Close video"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* ── GOOGLE REVIEWS ── */}
      <section className="py-16 bg-light-grey">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-heading">What Patients Say on Google</h2>
            <p className="section-subheading">
              Trusted by hundreds of patients across Pimpri-Chinchwad.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {googleReviews.map((t, index) => (
              <div key={index} className="card">
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: t.stars }).map((_, i) => (
                    <Star key={i} size={16} fill="#e9c46a" className="text-amber-500" />
                  ))}
                </div>
                <p className="font-sans text-gray-600 text-sm leading-relaxed mb-4">
                  "{t.text}"
                </p>
                <div className="font-sans text-navy-800 font-semibold text-sm">{t.name}</div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <a
              href="https://www.google.com/maps/search/Dr+Prathamesh+Teje+Pimpri+Chinchwad"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full max-w-md mx-auto bg-teal-500 text-white rounded-lg py-4 px-6 font-sans font-semibold text-base flex items-center justify-center gap-2 transition-colors duration-200 hover:bg-teal-600"
            >
              Read All Google Reviews &rarr;
            </a>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-12 bg-teal-500">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-2xl font-bold text-white mb-3">
            Ready to experience the same care?
          </h2>
          <p className="font-sans text-teal-50 mb-6 text-sm">
            Book your appointment today and start your journey to better health.
          </p>
          <button
            onClick={onOpenModal}
            className="bg-white text-teal-600 px-7 py-3 rounded-md font-sans font-semibold text-sm hover:bg-teal-50 transition-colors duration-200"
          >
            Book Appointment
          </button>
        </div>
      </section>
    </div>
  );
}
