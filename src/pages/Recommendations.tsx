import { useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Loader2 } from 'lucide-react';
import RecommendationCard from '../components/RecommendationCard';

const SEGMENTS = ['VIP Customers', 'Discount Hunters', 'At Risk Customers', 'Window Shoppers'];

export default function Recommendations() {
  const [segment, setSegment] = useState('');
  const [recs, setRecs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleGet = async (targetSeg?: string) => {
    const s = targetSeg || segment;
    if (!s) return;
    setLoading(true);
    try {
      const res = await axios.post('/api/recommend', { segment_name: s });
      setRecs(res.data.recommendations);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  const handleSegmentClick = (s: string) => {
    setSegment(s);
    handleGet(s);
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <div className="lokal-label mb-3 opacity-80">AI Tool</div>
      <h1 className="text-4xl font-black mb-4 text-lokal-white uppercase tracking-tight">
        Recommendation System
      </h1>
      <p className="text-lokal-muted text-sm mb-12 uppercase tracking-widest font-light">
        Select a profile to generate algorithmic product matches.
      </p>

      <div className="flex flex-wrap gap-2 mb-10">
        {SEGMENTS.map(s => (
          <button 
            key={s} 
            onClick={() => handleSegmentClick(s)} 
            className={`px-5 py-2.5 rounded-lg text-[10px] font-black tracking-widest uppercase transition-all duration-200 border ${
              segment === s 
                ? 'bg-lokal-green border-lokal-green text-lokal-black scale-[1.02] shadow-[0_4px_12px_rgba(190,255,4,0.3)]' 
                : 'bg-lokal-dark border-lokal-mid text-lokal-muted hover:border-lokal-muted hover:text-lokal-white'
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div 
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center py-20 grayscale opacity-50"
          >
            <Loader2 className="w-10 h-10 text-lokal-green animate-spin mb-4" />
            <div className="lokal-label">Generating picks...</div>
          </motion.div>
        ) : recs.length > 0 ? (
          <motion.div 
            key="results"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-3 mb-6">
              <Sparkles className="w-4 h-4 text-lokal-green" />
              <div className="lokal-label opacity-60 uppercase font-black tracking-[0.2em]">
                Strategic Picks for {segment}
              </div>
            </div>
            {recs.map((r, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <RecommendationCard {...r} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div 
            key="empty"
            className="text-center py-20 border border-lokal-mid border-dashed rounded-xl"
          >
            <div className="lokal-label opacity-30">NO PROFILE SELECTED</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
