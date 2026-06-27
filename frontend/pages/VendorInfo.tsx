import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Store, TrendingUp, Sparkles, ShieldCheck, CheckCircle, 
  ArrowLeft, ArrowRight, Star, DollarSign, BarChart3, Award
} from 'lucide-react';
import { useApp } from '../lib/AppContext';

export default function VendorInfo() {
  const { currentUser } = useApp();
  const [businessName, setBusinessName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Clothing');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate backend onboarding action
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  if (submitted) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center space-y-6 animate-fade-in">
        <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
          <CheckCircle size={40} className="stroke-[3]" />
        </div>
        <h2 className="text-3xl font-extrabold text-zinc-950 tracking-tight">Application Submitted!</h2>
        <p className="text-zinc-500 max-w-md mx-auto">
          Congratulations! Your store application for <span className="font-bold text-zinc-900">"{businessName}"</span> is currently being processed by OMNIMARKET administrators. You will receive an onboarding invitation shortly.
        </p>
        <div className="pt-6">
          <Link to="/" className="inline-flex items-center gap-2 bg-emerald-600 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-emerald-700 transition-all">
            Back to Marketplace <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Back button */}
      <Link to="/" className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-950 font-semibold mb-8 group">
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Marketplace
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Vendor pitch */}
        <div className="lg:col-span-7 space-y-8">
          <div>
            <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 font-bold text-xs uppercase px-4 py-1.5 rounded-full mb-4">
              <Sparkles size={14} /> OmniMarket Partner Hub
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-zinc-950 tracking-tight leading-none mb-6">
              Sell on the world's finest digital marketplace.
            </h1>
            <p className="text-lg text-zinc-600 leading-relaxed max-w-2xl">
              OMNIMARKET empowers independent creators, manufacturers, brand developers, and digital publishers to list products globally. We provide secure payments, lightning-fast fulfillment, and an unmatched aesthetic platform.
            </p>
          </div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-3xl border border-black/5 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <DollarSign size={20} />
              </div>
              <h3 className="font-extrabold text-zinc-900 text-base">Low Transaction Fees</h3>
              <p className="text-xs text-zinc-500 leading-relaxed">
                Retain up to 96% of every sales volume transaction. No hidden listing fees or monthly hosting payments.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-black/5 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <BarChart3 size={20} />
              </div>
              <h3 className="font-extrabold text-zinc-900 text-base">Advanced Analytics</h3>
              <p className="text-xs text-zinc-500 leading-relaxed">
                Live dashboard insights on visitors, conversion, item saves, reviews, and detailed shipping status.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-black/5 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <ShieldCheck size={20} />
              </div>
              <h3 className="font-extrabold text-zinc-900 text-base">Buyer Trust Protocol</h3>
              <p className="text-xs text-zinc-500 leading-relaxed">
                All vendors get authenticated manually to safeguard genuine luxury fashion, boutique craft, and clean software.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-black/5 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <Award size={20} />
              </div>
              <h3 className="font-extrabold text-zinc-900 text-base">Instant Payouts</h3>
              <p className="text-xs text-zinc-500 leading-relaxed">
                Funds are credited immediately after delivery verification, keeping cash flow fluid and worry-free.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Onboarding application form */}
        <div className="lg:col-span-5 bg-white p-8 rounded-[2.5rem] border border-black/5 shadow-sm space-y-6">
          <div>
            <h2 className="text-xl font-extrabold text-zinc-950 tracking-tight mb-1">Open Your Store</h2>
            <p className="text-xs text-zinc-500 font-semibold">Join thousands of verified makers selling on OmniMarket</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block">Store Business Name</label>
              <input 
                type="text"
                value={businessName}
                onChange={e => setBusinessName(e.target.value)}
                placeholder="e.g. Vintage Vault"
                required
                className="w-full bg-zinc-50 border border-transparent focus:border-zinc-200 py-3.5 px-4 rounded-xl text-sm outline-none transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block">Primary Category</label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value)}
                className="w-full bg-zinc-50 border border-transparent focus:border-zinc-200 py-3.5 px-4 rounded-xl text-sm outline-none transition-all cursor-pointer"
              >
                <option value="Clothing">Clothing & Fashion</option>
                <option value="Electronics">Electronics & Hardware</option>
                <option value="Home Decor">Home Decor & Crafts</option>
                <option value="Beauty">Organic Beauty</option>
                <option value="Software">Software & Digital Products</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block">About Your Business</label>
              <textarea 
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="Describe your craft, materials, and vision..."
                rows={4}
                required
                className="w-full bg-zinc-50 border border-transparent focus:border-zinc-200 py-3.5 px-4 rounded-xl text-sm outline-none transition-all resize-none"
              />
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-zinc-950 text-white rounded-xl font-bold py-3.5 text-sm hover:bg-emerald-600 transition-all flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Registering Brand...
                </>
              ) : (
                <>
                  Submit Application <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          {!currentUser && (
            <div className="bg-amber-50 text-amber-800 text-[11px] font-bold rounded-xl p-3 flex gap-2 border border-amber-100">
              <span className="shrink-0">⚠️</span>
              <span>You are currently not signed in. We will review your application, but sign in first to bind it to your profile.</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
