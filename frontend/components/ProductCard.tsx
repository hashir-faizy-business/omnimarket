import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart } from 'lucide-react';
import { formatPrice } from '../lib/utils';
import { useApp } from '../lib/AppContext';

export default function ProductCard({ product }: { product: any }) {
  const { addToCart, toggleWishlist, isInWishlist } = useApp();
  const isFav = isInWishlist(product.id || product._id);

  return (
    <div className="bg-white rounded-[2.5rem] p-4 border border-black/5 shadow-sm group hover:shadow-xl transition-all duration-500">
      <div className="block relative aspect-[4/5] rounded-[2rem] overflow-hidden bg-zinc-50 mb-6">
        <Link to={`/product/${product.slug}`} className="block w-full h-full">
          <img 
            src={product.images?.[0] || 'https://picsum.photos/seed/product/800/800'} 
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            referrerPolicy="no-referrer"
          />
        </Link>
        {/* Wishlist Button - visible always or on hover */}
        <div className="absolute top-4 right-4 flex flex-col gap-2 md:opacity-0 md:group-hover:opacity-100 transition-all md:translate-x-4 md:group-hover:translate-x-0">
          <button 
            onClick={() => toggleWishlist(product)}
            className={`w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center transition-all ${
              isFav ? 'text-red-500 scale-105' : 'text-zinc-900 hover:bg-emerald-500 hover:text-white'
            }`}
          >
            <Heart size={18} fill={isFav ? 'currentColor' : 'none'} />
          </button>
        </div>
      </div>
      
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
          <button 
            onClick={() => addToCart(product)}
            className="bg-zinc-900 text-white px-5 py-2.5 rounded-full text-xs font-bold hover:bg-emerald-600 transition-colors"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
