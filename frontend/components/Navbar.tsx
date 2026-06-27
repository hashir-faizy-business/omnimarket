import React from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { ShoppingBag, User, Search, Heart, LogOut } from 'lucide-react';
import { useApp } from '../lib/AppContext';

export default function Navbar() {
  const { cart, wishlist, currentUser, logout } = useApp();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get('q') || '';

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val) {
      setSearchParams({ q: val });
    } else {
      searchParams.delete('q');
      setSearchParams(searchParams);
    }
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const wishlistCount = wishlist.length;

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
                value={query}
                onChange={handleSearchChange}
                placeholder="Search for products..."
                className="w-full bg-transparent border-none py-3 pl-12 pr-4 text-sm outline-none"
              />
            </div>
          </div>

          <div className="flex items-center gap-6 shrink-0">
            <Link to="/wishlist" className="relative p-2 text-zinc-600 hover:text-black transition-colors">
              <Heart size={22} />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white font-black text-[10px] flex items-center justify-center border-2 border-white shadow-sm">
                  {wishlistCount}
                </span>
              )}
            </Link>
            <Link to="/cart" className="relative p-2 text-zinc-600 hover:text-black transition-colors">
              <ShoppingBag size={22} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-emerald-600 text-white font-black text-[10px] flex items-center justify-center border-2 border-white shadow-sm">
                  {cartCount}
                </span>
              )}
            </Link>
            
            {currentUser ? (
              <div className="flex items-center gap-3">
                <Link to="/login" className="flex items-center gap-2 text-sm font-bold bg-zinc-100 hover:bg-zinc-200 text-zinc-800 px-5 py-2.5 rounded-full transition-all">
                  <User size={16} />
                  <span>{currentUser.name.split(' ')[0]}</span>
                </Link>
                <button 
                  onClick={() => { logout(); navigate('/'); }}
                  title="Sign Out"
                  className="p-2.5 text-zinc-400 hover:text-red-500 rounded-full hover:bg-red-50 transition-colors"
                >
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <Link to="/login" className="flex items-center gap-2 text-sm font-bold bg-black text-white px-6 py-2.5 rounded-full hover:bg-zinc-800 transition-all">
                <User size={18} />
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
