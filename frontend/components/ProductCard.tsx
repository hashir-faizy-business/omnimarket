import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart } from 'lucide-react';
import { formatPrice } from '../lib/utils';

export default function ProductCard({ product }: { product: any }) {
  return (
    <div className="bg-white rounded-[2.5rem] p-4 border border-black/5 shadow-sm group hover:shadow-xl transition-all duration-500">
      <Link to={`/product/${product.slug}`} className="block relative aspect-[4/5] rounded-[2rem] overflow-hidden bg-zinc-50 mb-6">
        <img 
          src={product.images?.[0] || 'https://picsum.photos/seed/product/800/800'} 
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
          <button className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-zinc-900 hover:bg-emerald-500 hover:text-white transition-colors">
            <Heart size={18} />
          </button>
        </div>
      </Link>
      
      <div className="px-2">
        <div className="flex justify-between items-start mb-2">
          <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">{product.category}</p>
          <div className="flex items-center gap-1 text-zinc-400">
            <ShoppingCart size={14} />
            <span className="text-[10px] font-bold">{product.stock || 0}</span>
          </div>
        </div>
        <Link to={`/product/${product.slug}`}>
          <h3 className="text-lg font-bold text-zinc-900 mb-1 line-clamp-1 group-hover:text-emerald-600 transition-colors">{product.name}</h3>
        </Link>
        <p className="text-xs text-zinc-500 line-clamp-2 mb-4 h-8">{product.description}</p>
        
        <div className="flex items-center justify-between pt-4 border-t border-zinc-50">
          <p className="text-xl font-bold text-zinc-900">{formatPrice(product.price)}</p>
          <button className="bg-zinc-900 text-white px-5 py-2 rounded-full text-xs font-bold hover:bg-emerald-600 transition-colors">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
