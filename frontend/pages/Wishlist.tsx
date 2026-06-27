import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Trash2, ArrowRight } from 'lucide-react';
import { useApp } from '../lib/AppContext';
import { formatPrice } from '../lib/utils';

export default function Wishlist() {
  const { wishlist, toggleWishlist, addToCart } = useApp();

  if (wishlist.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-red-50 text-red-400 flex items-center justify-center mx-auto">
          <Heart size={28} />
        </div>
        <h2 className="text-2xl font-bold text-zinc-950">Your wishlist is empty</h2>
        <p className="text-zinc-500 max-w-sm mx-auto">
          Save items that catch your eye while scrolling the OMNIMARKET feed, and buy them whenever you are ready.
        </p>
        <div className="pt-4">
          <Link to="/" className="inline-flex items-center gap-2 bg-zinc-950 text-white px-8 py-3 rounded-full font-bold">
            Start Saving Items <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-black text-zinc-950 tracking-tight mb-8 flex items-center gap-3">
        Saved Wishlist <Heart className="text-red-500 fill-red-500" size={28} />
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {wishlist.map(product => {
          const itemId = product.id || product._id;
          return (
            <div key={itemId} className="bg-white rounded-[2.5rem] p-4 border border-black/5 shadow-sm group hover:shadow-xl transition-all duration-500 flex flex-col h-full">
              <div className="relative aspect-square rounded-[2rem] overflow-hidden bg-zinc-50 mb-6">
                <img 
                  src={product.images?.[0] || 'https://picsum.photos/seed/product/800/800'} 
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-115 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <button 
                  onClick={() => toggleWishlist(product)}
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white text-red-500 flex items-center justify-center shadow-md border border-black/5 hover:scale-105 transition-transform"
                >
                  <Heart size={18} fill="currentColor" />
                </button>
              </div>

              <div className="px-2 flex-1 flex flex-col">
                <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest mb-1">{product.category}</p>
                <Link to={`/product/${product.slug}`} className="hover:text-emerald-600 transition-colors">
                  <h3 className="text-base font-bold text-zinc-900 mb-1 line-clamp-1">{product.name}</h3>
                </Link>
                <p className="text-xs text-zinc-400 mb-4">by {product.vendor_name || 'Verified Vendor'}</p>
                
                <div className="mt-auto pt-4 border-t border-zinc-50 flex items-center justify-between">
                  <p className="text-lg font-bold text-zinc-950">{formatPrice(product.price)}</p>
                  <button 
                    onClick={() => addToCart(product)}
                    className="bg-zinc-950 text-white px-4 py-2.5 rounded-full text-xs font-bold hover:bg-emerald-600 transition-colors flex items-center gap-1.5"
                  >
                    <ShoppingCart size={14} /> Add to Cart
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
