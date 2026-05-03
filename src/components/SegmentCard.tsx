const SEG_CONFIG: Record<string, { color: string; icon: string; strategy: string }> = {
  'VIP Customers': { 
    color: '#BEFF04', 
    icon: '🏆', 
    strategy: 'Early access to new drops · VIP events · Premium packaging' 
  },
  'Discount Hunters': { 
    color: '#FF6B35', 
    icon: '🔥', 
    strategy: 'Flash sales · Bundle deals · Loyalty points' 
  },
  'At Risk Customers': { 
    color: '#FF3B3B', 
    icon: '⚠️', 
    strategy: 'Win-back coupons · Personalized SMS · Retargeting ads' 
  },
  'Window Shoppers': { 
    color: '#5BC8FF', 
    icon: '👀', 
    strategy: 'Influencer content · First-purchase discount · Welcome series' 
  },
};

interface SegmentCardProps {
  name: string;
  count: number;
  percentage: number;
}

export default function SegmentCard({ name, count, percentage }: SegmentCardProps) {
  const cfg = SEG_CONFIG[name] || { color: '#888', icon: '👤', strategy: 'General engagement' };
  
  return (
    <div className="lokal-card border-l-4" style={{ borderColor: cfg.color }}>
      <div className="flex justify-between items-start mb-3">
        <span className="text-2xl">{cfg.icon}</span>
        <span 
          className="text-[11px] font-bold tracking-widest px-2.5 py-0.5 rounded-sm"
          style={{ backgroundColor: `${cfg.color}33`, color: cfg.color }}
        >
          {percentage}%
        </span>
      </div>
      <h3 
        className="text-[15px] font-bold mb-1 uppercase tracking-wider" 
        style={{ color: cfg.color }}
      >
        {name}
      </h3>
      <p className="text-lokal-muted text-xs mb-3 font-medium uppercase tracking-tight">
        {count} customers
      </p>
      <div className="h-px bg-lokal-mid w-full mb-3" />
      <p className="text-lokal-white text-xs leading-relaxed font-light italic">
        {cfg.strategy}
      </p>
    </div>
  );
}
