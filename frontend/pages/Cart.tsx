import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShoppingBag, Trash2, ArrowLeft, ArrowRight, Minus, 
  Plus, Check, Award, ShieldCheck, CreditCard
} from 'lucide-react';
import { useApp } from '../lib/AppContext';
import { formatPrice } from '../lib/utils';

export default function Cart() {
  const { cart, updateCartQuantity, removeFromCart, clearCart } = useApp();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  const subtotal = cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  const shipping = subtotal > 50 || subtotal === 0 ? 0 : 9.99;
  const tax = subtotal * 0.08; // 8% sales tax
  const total = subtotal + shipping + tax;

  const handleCheckout = () => {
    setIsCheckingOut(true);
    // Simulate API call to process checkout
    setTimeout(() => {
      setIsCheckingOut(false);
      setOrderComplete(true);
      clearCart();
    }, 1500);
  };

  if (orderComplete) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
          <Check size={40} className="stroke-[3]" />
        </div>
        <h2 className="text-3xl font-extrabold text-zinc-950 tracking-tight">Order Placed Successfully!</h2>
        <p className="text-zinc-500 max-w-md mx-auto">
          Thank you for shopping at OMNIMARKET. Your order has been registered, and we are preparing to ship your items directly from our verified vendor hub.
        </p>
        <div className="pt-6">
          <Link to="/" className="inline-flex items-center gap-2 bg-emerald-600 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-emerald-700 transition-all">
            Continue Shopping <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-zinc-100 text-zinc-400 flex items-center justify-center mx-auto">
          <ShoppingBag size={28} />
        </div>
        <h2 className="text-2xl font-bold text-zinc-950">Your cart is empty</h2>
        <p className="text-zinc-500 max-w-sm mx-auto">
          Explore the OMNIMARKET catalog and discover amazing deals from local and international craft sellers.
        </p>
        <div className="pt-4">
          <Link to="/" className="inline-flex items-center gap-2 bg-zinc-950 text-white px-8 py-3 rounded-full font-bold">
            Explore Marketplace <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-black text-zinc-950 tracking-tight mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Cart items list - Col 8 */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white rounded-[2.5rem] border border-black/5 overflow-hidden">
            <div className="divide-y divide-zinc-100">
              {cart.map(item => {
                const prod = item.product;
                const itemId = prod.id || prod._id;
                return (
                  <div key={itemId} className="p-6 sm:p-8 flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                    <Link to={`/product/${prod.slug}`} className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden bg-zinc-50 border border-black/5 shrink-0 block">
                      <img src={prod.images?.[0] || 'https://picsum.photos/seed/product/800/800'} alt={prod.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </Link>

                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest mb-1">{prod.category}</p>
                      <Link to={`/product/${prod.slug}`} className="hover:text-emerald-600 transition-colors">
                        <h3 className="font-extrabold text-zinc-950 text-lg leading-tight mb-1 truncate">{prod.name}</h3>
                      </Link>
                      <p className="text-xs text-zinc-500 mb-3 truncate">Sold by {prod.vendor_name || 'Verified Partner'}</p>

                      <div className="flex flex-wrap items-center gap-6">
                        <div className="flex items-center border border-zinc-200 rounded-xl bg-zinc-50 overflow-hidden px-1">
                          <button 
                            onClick={() => updateCartQuantity(itemId, item.quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center text-zinc-500 hover:text-zinc-950 font-bold text-sm"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="w-10 text-center text-xs font-bold text-zinc-950">{item.quantity}</span>
                          <button 
                            onClick={() => updateCartQuantity(itemId, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center text-zinc-500 hover:text-zinc-950 font-bold text-sm"
                          >
                            <Plus size={12} />
                          </button>
                        </div>

                        <button 
                          onClick={() => removeFromCart(itemId)}
                          className="text-zinc-400 hover:text-red-600 transition-colors text-xs font-semibold flex items-center gap-1"
                        >
                          <Trash2 size={14} /> Remove
                        </button>
                      </div>
                    </div>

                    <div className="text-right sm:self-center shrink-0 w-full sm:w-auto">
                      <p className="font-extrabold text-zinc-950 text-xl">{formatPrice(prod.price * item.quantity)}</p>
                      {item.quantity > 1 && (
                        <p className="text-xs text-zinc-400 mt-0.5">{formatPrice(prod.price)} each</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <Link to="/" className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-950 font-semibold group">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Keep exploring marketplace
          </Link>
        </div>

        {/* Summary sidebar - Col 4 */}
        <div className="lg:col-span-4 bg-white p-6 sm:p-8 rounded-[2.5rem] border border-black/5 shadow-sm space-y-6">
          <h2 className="text-xl font-extrabold text-zinc-950 tracking-tight">Order Summary</h2>

          <div className="space-y-3 pt-2">
            <div className="flex justify-between text-sm text-zinc-500 font-medium">
              <span>Items Subtotal</span>
              <span className="text-zinc-950 font-bold">{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm text-zinc-500 font-medium">
              <span>Shipping Fee</span>
              <span className="text-zinc-950 font-bold">
                {shipping === 0 ? <span className="text-emerald-600">FREE</span> : formatPrice(shipping)}
              </span>
            </div>
            <div className="flex justify-between text-sm text-zinc-500 font-medium">
              <span>Estimated Sales Tax</span>
              <span className="text-zinc-950 font-bold">{formatPrice(tax)}</span>
            </div>
            <div className="border-t border-zinc-100 pt-4 flex justify-between text-base text-zinc-950 font-bold">
              <span>Total Bill</span>
              <span className="text-2xl font-black text-zinc-950">{formatPrice(total)}</span>
            </div>
          </div>

          {/* Checkout button */}
          <div className="pt-4">
            <button 
              onClick={handleCheckout}
              disabled={isCheckingOut}
              className="w-full bg-emerald-600 text-white rounded-2xl font-bold py-4 hover:bg-emerald-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/10 disabled:opacity-50"
            >
              {isCheckingOut ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Securing order...
                </>
              ) : (
                <>
                  Proceed to Secure Checkout <ArrowRight size={16} />
                </>
              )}
            </button>
          </div>

          <div className="p-4 rounded-2xl bg-zinc-50 space-y-3">
            <div className="flex gap-2.5 items-start">
              <ShieldCheck size={18} className="text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-zinc-900 leading-tight">Authentic & Secured</p>
                <p className="text-[10px] text-zinc-500 mt-0.5">Checkout runs with encrypted SSL parameters and genuine vendor checks.</p>
              </div>
            </div>
            <div className="flex gap-2.5 items-start">
              <Award size={18} className="text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-zinc-900 leading-tight">Omni Guarantee</p>
                <p className="text-[10px] text-zinc-500 mt-0.5">30-day effortless refunds on all orders handled directly by verified shops.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
