import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Target, Sparkles, ArrowRight } from 'lucide-react';

const tools = [
  {
    to: '/segmentation',
    title: 'Customer Segmentation',
    desc: 'Upload your customer CSV and get AI-powered segments: VIP, Discount Hunters, At-Risk, Window Shoppers.',
    badge: 'AI Intelligence',
    icon: <Target className="w-5 h-5 text-lokal-green" />
  },
  {
    to: '/recommendations',
    title: 'Recommendation System',
    desc: 'Get personalized product recommendations for each customer segment based on behavior patterns.',
    badge: 'AI Prediction',
    icon: <Sparkles className="w-5 h-5 text-lokal-green" />
  },
];

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
      {/* Hero */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-24"
      >
        <div className="lokal-label mb-4 opacity-80">
          AI-Powered Fashion Intelligence
        </div>
        <h1 className="text-5xl md:text-6xl font-black tracking-tight text-lokal-white leading-[1.1] mb-6 uppercase">
          Know Your<br />
          <span className="text-lokal-green">Customers.</span>
        </h1>
        <p className="text-lokal-muted text-base max-w-md mx-auto mb-10 leading-relaxed uppercase tracking-wide">
          LOKAL's AI platform helps you understand customer behavior,
          segment your audience, and make smarter marketing decisions.
        </p>
        <Link to="/segmentation">
          <button className="lokal-btn group">
            Start Segmenting <ArrowRight className="inline-block ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </Link>
      </motion.div>

      {/* Tools Grid */}
      <div className="lokal-label mb-6 opacity-60">Available Tools</div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tools.map((tool, i) => (
          <motion.div
            key={tool.to}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * (i + 1) }}
          >
            <Link to={tool.to} className="no-underline block h-full">
              <div className="lokal-card h-full cursor-pointer transition-all duration-300 border-l-4 border-l-lokal-green hover:bg-lokal-mid group">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-lokal-green/10 rounded-lg group-hover:bg-lokal-green/20 transition-colors">
                    {tool.icon}
                  </div>
                  <div className="lokal-label !text-lokal-muted group-hover:!text-lokal-green transition-colors">{tool.badge}</div>
                </div>
                <h2 className="text-lg font-bold mb-2 text-lokal-white uppercase tracking-tight">
                  {tool.title}
                </h2>
                <p className="text-lokal-muted text-xs leading-relaxed uppercase tracking-wider line-clamp-2">
                  {tool.desc}
                </p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
