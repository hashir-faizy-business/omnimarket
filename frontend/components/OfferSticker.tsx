import React from 'react';
import { Percent, Zap } from 'lucide-react';

export default function OfferSticker() {
  return (
    <div className="bg-emerald-600 rounded-[2.5rem] p-8 text-white relative overflow-hidden flex flex-col justify-center h-full shadow-lg">
      <div className="relative z-10">
        <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-6">
          <Percent size={24} />
        </div>
        <h3 className="text-3xl font-bold mb-4 leading-tight">Flash Sale<br/>Up to 70% Off</h3>
        <p className="text-emerald-100 text-sm mb-8 max-w-[200px]">Limited time offer on selected electronics and fashion items.</p>
        <button className="bg-white text-emerald-700 px-8 py-3 rounded-full font-bold text-xs hover:bg-emerald-50 transition-all flex items-center gap-2">
          Shop Now <Zap size={14} fill="currentColor" />
        </button>
      </div>
      <div className="absolute -bottom-10 -right-10 opacity-10 rotate-12">
        <Percent size={200} />
      </div>
    </div>
  );
}
