interface RecommendationCardProps {
  product: string;
  score: number;
  category: string;
  price: number;
}

export default function RecommendationCard({ product, score, category, price }: RecommendationCardProps) {
  return (
    <div className="lokal-card flex justify-between items-center group hover:bg-lokal-gray transition-colors cursor-default border-l-2 border-l-transparent hover:border-l-lokal-green">
      <div>
        <div className="lokal-label mb-1">{category}</div>
        <h4 className="text-lokal-white text-[14px] font-bold mb-1 uppercase tracking-wide">
          {product}
        </h4>
        <p className="text-lokal-muted text-[11px] font-medium tracking-widest uppercase">
          Match score: <span className="text-lokal-green">{(score * 100).toFixed(0)}%</span>
        </p>
      </div>
      <div className="text-right">
        <div className="text-lokal-green font-black text-lg tracking-tight">
          {price} <span className="text-[10px] font-bold">EGP</span>
        </div>
        <div className="mt-1.5 inline-block bg-lokal-green/10 text-lokal-green text-[9px] font-black tracking-widest px-2 py-0.5 rounded uppercase">
          Recommended
        </div>
      </div>
    </div>
  );
}
