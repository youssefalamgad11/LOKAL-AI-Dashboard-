import { useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'motion/react';
import { Download, Loader2, AlertCircle } from 'lucide-react';
import UploadBox from '../components/UploadBox';
import SegmentChart from '../components/SegmentChart';
import SegmentCard from '../components/SegmentCard';

export default function Segmentation() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    if (!file) return;
    setLoading(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await axios.post('/api/segment', formData);
      setResult(res.data);
    } catch (e: any) {
      setError(e.response?.data?.error || 'Failed to analyze. Please check your CSV columns.');
    }
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <div className="lokal-label mb-3 opacity-80">AI Analysis Tool</div>
      <h1 className="text-4xl font-black mb-4 text-lokal-white uppercase tracking-tight">
        Customer Segmentation
      </h1>
      <p className="text-lokal-muted text-sm mb-10 leading-relaxed uppercase tracking-widest max-w-2xl font-light">
        Requirements: <code className="text-lokal-green bg-lokal-green/10 px-1 rounded mx-1">avg_order_value</code>, 
        <code className="text-lokal-green bg-lokal-green/10 px-1 rounded mx-1">purchase_frequency</code>, 
        <code className="text-lokal-green bg-lokal-green/10 px-1 rounded mx-1">days_since_last_purchase</code>...
      </p>

      <UploadBox onFile={setFile} />
      
      <div className="flex gap-4 mt-6 items-center flex-wrap">
        <button 
          className="lokal-btn flex items-center gap-2" 
          onClick={handleAnalyze} 
          disabled={!file || loading}
        >
          {loading ? (
            <><Loader2 className="w-4 h-4 animate-spin" /> Analyzing...</>
          ) : (
            '⚡ Run Intelligence'
          )}
        </button>
        
        {result && (
          <a
            href={`data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(result, null, 2))}`}
            download="lokal_segments.json"
            className="text-lokal-muted text-[10px] font-bold tracking-widest uppercase hover:text-lokal-white transition-colors flex items-center gap-1.5 no-underline px-2 py-1 rounded hover:bg-lokal-mid"
          >
            <Download className="w-3 h-3" /> Download Results
          </a>
        )}
      </div>

      <AnimatePresence>
        {error && (
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 text-red-500 mt-6 bg-red-500/10 p-3 rounded-lg border border-red-500/20 text-xs font-bold uppercase tracking-wider"
          >
            <AlertCircle className="w-4 h-4" /> {error}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {result && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-16"
          >
            <div className="lokal-label mb-6 opacity-60">
              Intelligence Report — {result.total_customers} customers profiled
            </div>
            
            <div className="lokal-card mb-6">
              <SegmentChart data={result.segments} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {result.segments.map((seg: any) => (
                <SegmentCard
                  key={seg.segment}
                  name={seg.segment}
                  count={seg.count}
                  percentage={seg.percentage}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
