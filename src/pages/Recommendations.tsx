import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Loader2 } from 'lucide-react';
import RecommendationCard from '../components/RecommendationCard';

const SEGMENTS = ['VIP Customers', 'Discount Hunters', 'At Risk Customers', 'Window Shoppers'];

const PRODUCTS: Record<string, any[]> = {
  "VIP Customers": [
    { product: "Premium Linen Blazer", category: "Outerwear", price: 2800, score: 0.97 },
    { product: "Handcrafted Leather Belt", category: "Accessories", price: 950, score: 0.94 },
    { product: "Silk Kaftan — Limited Edition", category: "Dresses", price: 3500, score: 0.91 },
    { product: "Egyptian Cotton Trousers", category: "Bottoms", price: 1800, score: 0.89 },
    { product: "Artisan Tote Bag", category: "Bags", price: 2200, score: 0.87 },
  ],
  "Discount Hunters": [
    { product: "Classic Tee 3-Pack Bundle", category: "Tops", price: 399, score: 0.96 },
    { product: "Denim Shorts — Flash Sale", category: "Bottoms", price: 299, score: 0.93 },
    { product: "Summer Dress Bundle", category: "Dresses", price: 549, score: 0.90 },
    { product: "Printed Scarf Set", category: "Accessories", price: 199, score: 0.88 },
    { product: "Basics Pack (5 items)", category: "Tops", price: 699, score: 0.85 },
  ],
  "At Risk Customers": [
    { product: "We Miss You — Mystery Box", category: "Bundles", price: 799, score: 0.95 },
    { product: "Bestseller Restock — Linen Top", category: "Tops", price: 680, score: 0.92 },
    { product: "Fan Favorite Maxi Dress", category: "Dresses", price: 1100, score: 0.89 },
    { product: "New Season Opener Pack", category: "Bundles", price: 999, score: 0.86 },
    { product: "Comfort Jogger Set", category: "Sets", price: 750, score: 0.83 },
  ],
  "Window Shoppers": [
    { product: "Starter Tee — First Purchase", category: "Tops", price: 249, score: 0.94 },
    { product: "Trending Cargo Pants", category: "Bottoms", price: 890, score: 0.91 },
    { product: "Influencer Pick — Slip Dress", category: "Dresses", price: 750, score: 0.88 },
    { product: "Welcome Gift Set", category: "Bundles", price: 499, score: 0.85 },
    { product: "Viral Cap — As Seen on Instagram", category: "Accessories", price: 320, score: 0.82 },
  ],
};

export default function Recommendations() {
  const [segment, setSegment] = useState('');
  const [recs, setRecs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleGet = async (targetSeg?: string) => {
    const s = targetSeg || segment;
    if (!s) return;
    setLoading(true);
    // Simulate API delay
    setTimeout(() => {
      setRecs(PRODUCTS[s] || []);
      setLoading(false);
    }, 600);
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
