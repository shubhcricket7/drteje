import { useEffect, useState } from 'react';
import { Clock, User } from 'lucide-react';

interface BlogPostPageProps {
  slug: string;
  onNavigate: (page: string) => void;
}

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  image: string;
  tags: string[];
  content: string; // Full content of the blog post
}

const allPosts: BlogPost[] = [
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
    content: `
      <p>Summer brings unique challenges for individuals managing diabetes. The increased heat can significantly impact blood sugar levels and the effectiveness of insulin. It's crucial for diabetic patients to be extra vigilant during these months to prevent complications.</p>
      
      <h3>Hydration is Key</h3>
      <p>Dehydration can lead to higher blood glucose concentrations. Ensure you drink plenty of water throughout the day, even if you don't feel thirsty. Avoid sugary drinks, which can spike your blood sugar.</p>

      <h3>Insulin Storage</h3>
      <p>Insulin is sensitive to temperature extremes. Never leave insulin in direct sunlight or in a hot car. Store it as recommended by your doctor or pharmacist, typically in a cool, dark place or refrigerated. High temperatures can degrade insulin, making it less effective.</p>

      <h3>Frequent Monitoring</h3>
      <p>Hot weather can cause fluctuations in blood sugar. Monitor your levels more frequently than usual, especially if you're engaging in outdoor activities or experiencing symptoms of heat exhaustion. Adjust your medication or diet as advised by your healthcare provider.</p>

      <h3>Foot Care</h3>
      <p>Diabetic neuropathy can make your feet more vulnerable to injury. Wear comfortable, breathable shoes and inspect your feet daily for blisters, cuts, or sores. Avoid walking barefoot, especially on hot surfaces.</p>

      <h3>Recognizing Heat-Related Illnesses</h3>
      <p>Diabetics are at a higher risk for heat exhaustion and heatstroke. Symptoms include heavy sweating, weakness, dizziness, nausea, and a fast, weak pulse. If you experience these, move to a cool place, hydrate, and seek medical attention if symptoms worsen.</p>

      <p>By taking these precautions, you can enjoy the summer safely while effectively managing your diabetes.</p>
    `,
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
    content: `
      <p>While daily blood sugar readings provide a snapshot of your glucose levels, HbA1c offers a broader perspective. It's a crucial test for managing diabetes effectively.</p>

      <h3>What is HbA1c?</h3>
      <p>HbA1c, or glycated hemoglobin, is a blood test that measures your average blood sugar levels over the past two to three months. It works by measuring the percentage of hemoglobin (a protein in red blood cells) that is coated with sugar (glycated).</p>

      <h3>Why Does It Matter More Than Daily Readings?</h3>
      <p>Daily blood sugar tests show your glucose levels at a specific moment. However, these can fluctuate significantly due to diet, exercise, stress, and medication. HbA1c provides a more stable, long-term picture of your blood sugar control, helping your doctor assess the effectiveness of your treatment plan and your risk of developing diabetes complications.</p>

      <h3>What Should Your Target Be?</h3>
      <p>For most adults with diabetes, the American Diabetes Association recommends an HbA1c target of less than 7%. However, individual targets can vary based on age, other health conditions, and duration of diabetes. Always discuss your personal HbA1c target with your doctor.</p>

      <h3>How to Improve Your HbA1c</h3>
      <ul>
        <li><strong>Diet:</strong> Focus on a balanced diet rich in whole grains, lean proteins, fruits, and vegetables. Limit processed foods, sugary drinks, and unhealthy fats.</li>
        <li><strong>Exercise:</strong> Regular physical activity helps lower blood sugar levels. Aim for at least 150 minutes of moderate-intensity aerobic exercise per week.</li>
        <li><strong>Medication:</strong> Adhere to your prescribed medication regimen.</li>
        <li><strong>Monitoring:</strong> Regularly check your blood sugar levels and keep a record to identify patterns and make informed adjustments.</li>
      </ul>

      <p>Understanding and managing your HbA1c is a cornerstone of effective diabetes care, empowering you to take control of your health.</p>
    `,
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
    content: `
      <p>Fever is a common symptom, often indicating that your body is fighting an infection. While many fevers resolve on their own, some require prompt medical attention. Knowing when to see a doctor can prevent serious complications.</p>

      <h3>What is a Fever?</h3>
      <p>A fever is generally defined as a body temperature of 100.4°F (38°C) or higher. It's a natural response of your immune system to various illnesses, including viral and bacterial infections.</p>

      <h3>Red Flags for Adults</h3>
      <p>Seek immediate medical attention if you experience a fever accompanied by any of the following:</p>
      <ul>
        <li>Severe headache, stiff neck, or sensitivity to light.</li>
        <li>Difficulty breathing or chest pain.</li>
        <li>Persistent vomiting or severe abdominal pain.</li>
        <li>Skin rash, especially if it's rapidly spreading.</li>
        <li>Confusion, irritability, or unusual drowsiness.</li>
        <li>Seizures.</li>
        <li>Fever over 103°F (39.4°C).</li>
        <li>Fever lasting more than three days.</li>
        <li>Recent travel to an area with known infectious diseases.</li>
        <li>If you have a compromised immune system (e.g., due to cancer, HIV, or organ transplant).</li>
      </ul>

      <h3>Red Flags for Children</h3>
      <p>For infants and children, specific guidelines apply:</p>
      <ul>
        <li><strong>Newborns (under 3 months):</strong> Any fever should be evaluated by a doctor immediately.</li>
        <li><strong>Infants (3-6 months):</strong> Fever over 102°F (38.9°C) or any fever with unusual irritability or lethargy.</li>
        <li><strong>Children (6 months to 2 years):</strong> Fever over 102°F (38.9°C) lasting more than 24 hours, or any fever with severe symptoms.</li>
      </ul>

      <h3>Why Early Evaluation Matters</h3>
      <p>Early diagnosis and treatment can prevent minor infections from escalating into severe conditions. For example, a fever with a stiff neck could indicate meningitis, which requires urgent medical intervention. Trust your instincts; if you're concerned, it's always best to consult a physician.</p>
    `,
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
    content: `
      <p>Hypertension, or high blood pressure, is a pervasive health issue in India, often earning the moniker "silent killer" because it typically presents no symptoms until it leads to severe complications like heart attack or stroke.</p>

      <h3>The Silent Threat</h3>
      <p>Unlike many other conditions, high blood pressure usually doesn't cause noticeable symptoms in its early stages. This lack of warning signs means that many individuals live with hypertension for years without knowing it, allowing the condition to silently damage their blood vessels and vital organs.</p>

      <h3>Why Routine BP Screening is Non-Negotiable</h3>
      <p>Given its asymptomatic nature, regular blood pressure screening is the only way to detect hypertension early. Adults should have their blood pressure checked at least once every two years, or more frequently if they have risk factors such as a family history of hypertension, obesity, or diabetes.</p>

      <h3>Lifestyle Changes That Make a Difference</h3>
      <p>Even if you've been diagnosed with hypertension, significant improvements can be made through lifestyle modifications:</p>
      <ul>
        <li><strong>Dietary Adjustments:</strong> Adopt a diet rich in fruits, vegetables, whole grains, and lean proteins. Reduce sodium intake, processed foods, and unhealthy fats. The DASH (Dietary Approaches to Stop Hypertension) diet is highly recommended.</li>
        <li><strong>Regular Exercise:</strong> Aim for at least 150 minutes of moderate-intensity aerobic activity or 75 minutes of vigorous-intensity activity per week.</li>
        <li><strong>Maintain a Healthy Weight:</strong> Losing even a small amount of weight can significantly lower blood pressure.</li>
        <li><strong>Limit Alcohol Consumption:</strong> Excessive alcohol intake can raise blood pressure.</li>
        <li><strong>Manage Stress:</strong> Practice stress-reduction techniques such as meditation, yoga, or deep breathing exercises.</li>
        <li><strong>Quit Smoking:</strong> Smoking damages blood vessels and significantly increases the risk of heart disease and stroke.</li>
      </ul>

      <p>Early detection and consistent management are crucial in preventing the devastating consequences of hypertension. Make routine blood pressure checks a priority for your health.</p>
    `,
  },
];

const categoryColors: Record<string, string> = {
  'Diabetes': 'bg-blue-50 text-blue-700 border-blue-100',
  'General Medicine': 'bg-teal-50 text-teal-700 border-teal-100',
  'Hypertension': 'bg-red-50 text-red-700 border-red-100',
};

export default function BlogPostPage({ slug, onNavigate }: BlogPostPageProps) {
  const [post, setPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    const foundPost = allPosts.find((p) => p.slug === slug);
    if (foundPost) {
      setPost(foundPost);
    } else {
      // Handle case where post is not found, e.g., redirect to blog list or show 404
      onNavigate('blog'); // Redirect to blog list
    }
  }, [slug, onNavigate]);

  if (!post) {
    return (
      <div className="flex justify-center items-center h-screen bg-light-grey">
        <p className="text-navy-800 text-lg">Loading blog post...</p>
      </div>
    );
  }

  return (
    <div className="font-sans bg-light-grey py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs or back button */}
        <button
          onClick={() => onNavigate('blog')}
          className="inline-flex items-center text-teal-600 hover:text-teal-800 transition-colors duration-200 mb-8"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4 mr-2"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          Back to Blog
        </button>

        {/* Post Header */}
        <div className="mb-8">
          <span className={`badge border text-sm mb-3 ${categoryColors[post.category]}`}>
            {post.category}
          </span>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-navy-800 mb-4 leading-tight">
            {post.title}
          </h1>
          <div className="flex items-center gap-4 text-gray-500 text-sm font-sans">
            <span className="flex items-center gap-1"><User size={14} /> Dr. Prathamesh Teje</span>
            <span className="flex items-center gap-1"><Clock size={14} /> {post.readTime}</span>
            <span>{post.date}</span>
          </div>
        </div>

        {/* Post Image */}
        <div className="mb-8 rounded-lg overflow-hidden shadow-lg">
          <img src={post.image} alt={post.title} className="w-full h-auto object-cover" />
        </div>

        {/* Post Content */}
        <article className="prose prose-lg max-w-none text-gray-700 leading-relaxed font-sans">
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </article>

        {/* Tags */}
        <div className="mt-10 pt-6 border-t border-gray-200">
          <p className="font-sans text-gray-600 text-sm font-semibold mb-3">Tags:</p>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
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
    </div>
  );
}
