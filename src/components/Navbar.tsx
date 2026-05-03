import { Link, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';

export default function Navbar() {
  const { pathname } = useLocation();
  const links = [
    { to: '/', label: 'Home' },
    { to: '/segmentation', label: 'Segmentation' },
    { to: '/recommendations', label: 'Recommendations' },
  ];

  return (
    <nav className="sticky top-0 z-100 bg-lokal-black border-b-2 border-lokal-green px-10 h-16 flex items-center justify-between">
      <Link to="/" className="no-underline">
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="bg-lokal-dark border-[1.5px] border-lokal-green rounded-[7px] px-4 py-1.5 text-lokal-green font-black text-base tracking-[0.14em] uppercase shadow-[0_0_6px_rgba(190,255,4,0.4)]"
        >
          LOKAL
        </motion.div>
      </Link>
      <div className="flex gap-8">
        {links.map(l => (
          <Link 
            key={l.to} 
            to={l.to} 
            className={`text-[12px] font-bold tracking-[0.14em] uppercase transition-colors pb-1 border-b-2 ${
              pathname === l.to ? 'text-lokal-green border-lokal-green' : 'text-lokal-muted border-transparent hover:text-lokal-white'
            }`}
          >
            {l.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
