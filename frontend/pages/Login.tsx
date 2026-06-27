import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  User, Shield, Lock, Mail, Check, AlertTriangle, 
  HelpCircle, ArrowRight
} from 'lucide-react';
import { useApp } from '../lib/AppContext';

export default function Login() {
  const { currentUser, setCurrentUser, logout } = useApp();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Available test accounts from local DB seed
  const testAccounts = [
    { label: 'Customer demo', email: 'customer@demo.com', pass: 'customer123', icon: 'User' },
    { label: 'Fashion Vendor', email: 'fashion@vendor.com', pass: 'vendor123', icon: 'Shield' }
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    // Simulated local database auth verification
    setTimeout(() => {
      if ((email === 'customer@demo.com' && password === 'customer123') ||
          (email === 'customer@demo.com' && password === 'customer123') ||
          (email === 'fashion@vendor.com' && password === 'vendor123') ||
          (email === 'admin@omnimarket.com' && password === 'admin123') ||
          (email === 'tech@vendor.com' && password === 'vendor123')) {
        
        let role = 'customer';
        let name = 'Jane Doe';
        
        if (email.includes('admin')) {
          role = 'administrator';
          name = 'Global Admin';
        } else if (email.includes('vendor') || email.includes('fashion') || email.includes('tech')) {
          role = 'vendor';
          name = email.includes('fashion') ? 'Elena Rossi' : 'Alex Chen';
        }

        setCurrentUser({
          email,
          name,
          role,
          id: '507f1f77bcf86cd799439016'
        });
        setLoading(false);
        navigate('/');
      } else {
        setError('Invalid email or password combination. Please try one of our demo accounts below!');
        setLoading(false);
      }
    }, 1000);
  };

  const selectDemoAccount = (acc: any) => {
    setEmail(acc.email);
    setPassword(acc.pass);
    setError(null);
  };

  if (currentUser) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
          <User size={28} />
        </div>
        <h2 className="text-2xl font-bold text-zinc-950">Signed in as {currentUser.name}</h2>
        <div className="bg-zinc-50 rounded-2xl p-4 text-xs space-y-2 border border-black/5 text-left">
          <p className="flex justify-between font-medium text-zinc-500">
            <span>Email</span>
            <span className="text-zinc-950 font-bold">{currentUser.email}</span>
          </p>
          <p className="flex justify-between font-medium text-zinc-500">
            <span>Access Role</span>
            <span className="text-emerald-700 font-bold uppercase">{currentUser.role}</span>
          </p>
        </div>
        <div className="pt-4 flex flex-col gap-3">
          <Link to="/" className="bg-zinc-950 text-white rounded-2xl font-bold py-3 text-sm hover:bg-zinc-900 transition-all block">
            Return to Marketplace
          </Link>
          <button 
            onClick={logout}
            className="border border-zinc-200 text-zinc-600 hover:text-red-600 hover:bg-red-50 rounded-2xl font-bold py-3 text-sm transition-all"
          >
            Sign Out of Account
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <div className="bg-white p-8 rounded-[2.5rem] border border-black/5 shadow-sm space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-extrabold text-zinc-950 tracking-tight mb-2">Welcome Back</h1>
          <p className="text-zinc-400 text-sm font-semibold">Sign in to check out and track your items</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-800 text-xs font-bold rounded-xl p-4 flex gap-2.5 border border-red-100">
            <AlertTriangle size={16} className="shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block">Email Address</label>
            <div className="relative flex items-center">
              <Mail size={16} className="absolute left-4 text-zinc-400" />
              <input 
                type="email" 
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full bg-zinc-50 hover:bg-zinc-100/50 focus:bg-white border border-transparent focus:border-zinc-200 py-3.5 pl-12 pr-4 rounded-xl text-sm outline-none transition-all"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block">Password</label>
            <div className="relative flex items-center">
              <Lock size={16} className="absolute left-4 text-zinc-400" />
              <input 
                type="password" 
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full bg-zinc-50 hover:bg-zinc-100/50 focus:bg-white border border-transparent focus:border-zinc-200 py-3.5 pl-12 pr-4 rounded-xl text-sm outline-none transition-all"
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-zinc-950 text-white rounded-xl font-bold py-3.5 text-sm hover:bg-emerald-600 transition-all flex items-center justify-center gap-2"
          >
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>

        {/* Demo profiles quick selection */}
        <div className="pt-6 border-t border-zinc-100 space-y-3">
          <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Select Demo Account Profile</p>
          <div className="grid grid-cols-2 gap-3">
            {testAccounts.map(acc => (
              <button
                key={acc.email}
                onClick={() => selectDemoAccount(acc)}
                className="p-3 text-left border border-zinc-200 hover:border-emerald-500 rounded-xl hover:bg-emerald-50/20 transition-all flex flex-col justify-between"
              >
                <div className="flex items-center gap-1.5 mb-1 text-zinc-900 font-bold text-xs">
                  {acc.icon === 'Shield' ? <Shield size={14} className="text-emerald-600" /> : <User size={14} className="text-zinc-600" />}
                  <span>{acc.label}</span>
                </div>
                <p className="text-[10px] text-zinc-400 font-mono truncate w-full">{acc.email}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
