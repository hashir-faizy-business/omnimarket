import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, User, Search, Heart } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-black/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center gap-8">
          <div className="flex items-center gap-6 shrink-0">
            <Link to="/" className="text-2xl font-bold tracking-tighter text-black">
              OMNI<span className="text-emerald-600">MARKET</span>
            </Link>
          </div>

          <div className="hidden md:flex flex-1 max-w-2xl relative group bg-zinc-100 rounded-full overflow-hidden border border-transparent focus-within:border-emerald-500/30 focus-within:bg-white transition-all">
            <div className="relative flex-1 flex items-center">
              <div className="absolute left-4 text-zinc-400 pointer-events-none">
                <Search size={18} />
              </div>
              <input 
                type="text" 
                placeholder="Search for products..."
                className="w-full bg-transparent border-none py-3 pl-12 pr-4 text-sm outline-none"
              />
            </div>
          </div>

          <div className="flex items-center gap-6 shrink-0">
            <Link to="/wishlist" className="relative p-2 text-zinc-600 hover:text-black transition-colors">
              <Heart size={22} />
            </Link>
            <Link to="/cart" className="relative p-2 text-zinc-600 hover:text-black transition-colors">
              <ShoppingBag size={22} />
            </Link>
            <Link to="/login" className="flex items-center gap-2 text-sm font-bold bg-black text-white px-6 py-2.5 rounded-full hover:bg-zinc-800 transition-all">
              <User size={18} />
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
