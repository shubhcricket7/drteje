import { Clock, ChevronRight, User } from 'lucide-react';

interface BlogPageProps {
  onNavigate: (page: string, slug?: string) => void;
}

const posts = [
  {
    slug: 'managing-diabetes-in-summer',
    title: 'Managing Diabetes in Summer: What Every Diabetic Patient Must Know',
    excerpt:
      'Heat affects blood sugar levels more than most patients realise. This article explains why summer demands extra vigilance for diabetics — from hydration to insulin storage and monitoring frequency.',
    category: 'Diabetes',
    readTime: '5 min read',
    date: 'May 2025',
    image: 'https://images.pexels.com/photos/3683053/pexels-photo-3683053.jpeg?auto=compress&cs=tinysrgb&w=600',
    tags: ['Diabetes', 'Summer Health', 'Insulin'],
  },
  {
    slug: 'understanding-hba1c',
    title: 'Understanding HbA1c: The 3-Month Average That Defines Your Diabetes Control',
    excerpt:
      'Most patients know their fasting sugar but don\'t understand HbA1c. This comprehensive guide explains what HbA1c is, why it matters more than daily readings, and what your target should be.',
    category: 'Diabetes',
    readTime: '6 min read',
    date: 'Apr 2025',
    image: 'https://images.pexels.com/photos/6823568/pexels-photo-6823568.jpeg?auto=compress&cs=tinysrgb&w=600',
    tags: ['Diabetes', 'Blood Tests', 'HbA1c'],
  },
  {
    slug: 'when-to-see-physician-for-fever',
    title: 'When Should You See a Physician for Fever? Red Flags to Watch For',
    excerpt:
      'Not all fevers need a doctor visit — but some absolutely do. Dr. Teje outlines the warning signs that demand immediate medical attention and why early evaluation prevents complications.',
    category: 'General Medicine',
    readTime: '4 min read',
    date: 'Mar 2025',
    image: 'https://images.pexels.com/photos/5327580/pexels-photo-5327580.jpeg?auto=compress&cs=tinysrgb&w=600',
    tags: ['Fever', 'Infections', 'When to See a Doctor'],
  },
  {
    slug: 'hypertension-silent-killer',
    title: 'Hypertension: Why India\'s Silent Killer Often Goes Undetected for Years',
    excerpt:
      'High blood pressure has no symptoms until it causes a stroke or heart attack. Dr. Teje discusses why routine BP screening is non-negotiable and what lifestyle changes make the biggest difference.',
    category: 'Hypertension',
    readTime: '5 min read',
    date: 'Feb 2025',
    image: 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=600',
    tags: ['Hypertension', 'Heart Health', 'Prevention'],
  },
];

const categoryColors: Record<string, string> = {
  'Diabetes': 'bg-blue-50 text-blue-700 border-blue-100',
  'General Medicine': 'bg-teal-50 text-teal-700 border-teal-100',
  'Hypertension': 'bg-red-50 text-red-700 border-red-100',
};

export default function BlogPage({ onNavigate }: BlogPageProps) {
  return (
    <div className="font-sans">
      {/* Header */}
      <div className="bg-gradient-to-r from-navy-800 to-navy-700 text-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="font-sans text-teal-400 text-sm font-semibold tracking-widest uppercase mb-3">
              Patient Education
            </p>
            <h1 className="font-serif text-3xl md:text-4xl font-bold mb-3">Health Blog</h1>
            <p className="font-sans text-blue-200 text-lg">
              Evidence-based health information from Dr. Prathamesh Teje — helping you understand your conditions and make informed decisions.
            </p>
          </div>
        </div>
      </div>

      <section className="py-16 bg-light-grey">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Featured post */}
          <div className="card p-0 overflow-hidden mb-10">
            <div className="grid md:grid-cols-2">
              <div className="h-56 md:h-auto overflow-hidden">
                <img
                  src={posts[0].image}
                  alt={posts[0].title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <div className="p-8 flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-3">
                  <span className={`badge border text-xs ${categoryColors[posts[0].category]}`}>
                    {posts[0].category}
                  </span>
                  <span className="font-sans text-gray-400 text-xs">Featured</span>
                </div>
                <h2 className="font-serif font-bold text-navy-800 text-xl mb-3 leading-snug">
                  {posts[0].title}
                </h2>
                <p className="font-sans text-gray-600 text-sm leading-relaxed mb-4">
                  {posts[0].excerpt}
                </p>
                <div className="flex items-center gap-4 text-gray-400 text-xs font-sans mb-5">
                  <span className="flex items-center gap-1"><User size={12} /> Dr. Prathamesh Teje</span>
                  <span className="flex items-center gap-1"><Clock size={12} /> {posts[0].readTime}</span>
                  <span>{posts[0].date}</span>
                </div>
                <button
                  onClick={() => onNavigate('blog-post', posts[0].slug)}
                  className="btn-primary inline-flex items-center gap-2 self-start text-sm"
                >
                  Read Article <ChevronRight size={15} />
                </button>
              </div>
            </div>
          </div>

          {/* Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.slice(1).map((post) => (
              <div key={post.slug} className="card p-0 overflow-hidden group cursor-pointer" onClick={() => onNavigate('blog-post', post.slug)}>
                <div className="h-44 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <span className={`badge border text-xs mb-3 ${categoryColors[post.category]}`}>
                    {post.category}
                  </span>
                  <h3 className="font-serif font-bold text-navy-800 text-base leading-snug mb-2">
                    {post.title}
                  </h3>
                  <p className="font-sans text-gray-500 text-xs leading-relaxed mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-gray-400 text-xs font-sans">
                      <span className="flex items-center gap-1"><Clock size={11} /> {post.readTime}</span>
                      <span>{post.date}</span>
                    </div>
                    <span className="font-sans text-teal-500 text-xs font-semibold flex items-center gap-1">
                      Read <ChevronRight size={13} />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Newsletter */}
          <div className="mt-14 bg-navy-800 rounded-2xl p-8 text-white text-center">
            <h2 className="font-serif text-xl font-bold mb-2">Stay Informed</h2>
            <p className="font-sans text-blue-200 text-sm mb-6">
              Get health tips and clinic updates delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-4 py-2.5 rounded-lg border border-white/20 bg-white/10 text-white placeholder-blue-300 font-sans text-sm focus:outline-none focus:border-teal-400"
              />
              <button className="btn-primary flex-shrink-0 px-5 py-2.5 text-sm">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
