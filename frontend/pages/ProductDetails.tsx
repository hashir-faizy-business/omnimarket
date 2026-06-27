import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, Star, Heart, ShoppingBag, ShieldCheck, 
  Truck, RotateCcw, HelpCircle, AlertCircle, Sparkles, Check
} from 'lucide-react';
import { useApp } from '../lib/AppContext';
import { formatPrice } from '../lib/utils';

export default function ProductDetails() {
  const { slug } = useParams<{ slug: string }>();
  const { addToCart, toggleWishlist, isInWishlist } = useApp();
  const [product, setProduct] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [addedMessage, setAddedMessage] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/products/${slug}`)
      .then(async res => {
        if (!res.ok) {
          throw new Error('Product not found');
        }
        return res.json();
      })
      .then(data => {
        setProduct(data);
        if (data.images && data.images.length > 0) {
          setSelectedImage(data.images[0]);
        }
        // Select first color/size if available
        if (data.metadata?.colors && data.metadata.colors.length > 0) {
          setSelectedColor(data.metadata.colors[0]);
        }
        if (data.metadata?.sizes && data.metadata.sizes.length > 0) {
          setSelectedSize(data.metadata.sizes[0]);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching product:', err);
        setError(err.message || 'Failed to load product');
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
        <p className="text-zinc-500 font-medium">Loading details of this exquisite piece...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <AlertCircle size={48} className="text-zinc-300 mx-auto mb-6" />
        <h2 className="text-2xl font-bold text-zinc-950 mb-2">Something went wrong</h2>
        <p className="text-zinc-500 mb-8">{error || 'The product you are looking for does not exist.'}</p>
        <Link to="/" className="inline-flex items-center gap-2 bg-black text-white px-8 py-3 rounded-full font-bold">
          <ArrowLeft size={16} /> Return to Marketplace
        </Link>
      </div>
    );
  }

  const isFav = isInWishlist(product.id || product._id);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAddedMessage(true);
    setTimeout(() => setAddedMessage(false), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Back button */}
      <Link to="/" className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-950 font-semibold mb-8 group">
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Marketplace
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left: Gallery Column */}
        <div className="lg:col-span-7 space-y-6">
          <div className="aspect-[4/5] rounded-[3rem] overflow-hidden bg-white border border-black/5 shadow-sm relative">
            <img 
              src={selectedImage || 'https://picsum.photos/seed/product/800/800'} 
              alt={product.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            {product.stock <= 5 && (
              <span className="absolute top-6 left-6 bg-red-500 text-white font-bold px-4 py-2 rounded-full text-xs">
                Only {product.stock} left in stock
              </span>
            )}
          </div>

          {/* Thumbnail row */}
          {product.images && product.images.length > 1 && (
            <div className="flex gap-4 overflow-x-auto pb-2">
              {product.images.map((img: string, idx: number) => (
                <button 
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`w-24 h-24 rounded-2xl overflow-hidden bg-white border shrink-0 transition-all ${
                    selectedImage === img ? 'border-emerald-500 ring-2 ring-emerald-500/20' : 'border-black/5 hover:border-zinc-300'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Info Column */}
        <div className="lg:col-span-5 space-y-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full">
                {product.category}
              </span>
              <span className="text-xs font-bold text-zinc-500">
                by {product.vendor_name || 'Premium Vendor'}
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-950 tracking-tight leading-tight mb-4">
              {product.name}
            </h1>
            <div className="flex items-center gap-4">
              <div className="flex items-center text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill={i < 4 ? 'currentColor' : 'none'} className={i < 4 ? 'text-amber-500' : 'text-zinc-200'} />
                ))}
                <span className="text-xs font-bold text-zinc-600 ml-2">4.8 (42 reviews)</span>
              </div>
            </div>
          </div>

          <div className="py-6 border-y border-zinc-100 flex items-baseline gap-4">
            <span className="text-3xl font-extrabold text-zinc-950">{formatPrice(product.price)}</span>
            {product.oldPrice && (
              <span className="text-lg font-bold text-zinc-400 line-through">{formatPrice(product.oldPrice)}</span>
            )}
          </div>

          <p className="text-zinc-600 leading-relaxed">
            {product.description || 'No description available for this magnificent product. It features a stunning blend of aesthetics and practicality designed to cater to modern demands.'}
          </p>

          {/* Dynamic attributes (from metadata) */}
          {product.metadata?.colors && product.metadata.colors.length > 0 && (
            <div className="space-y-3">
              <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Select Color</span>
              <div className="flex flex-wrap gap-2">
                {product.metadata.colors.map((color: string) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2.5 rounded-xl text-xs font-bold border transition-all ${
                      selectedColor === color 
                        ? 'bg-zinc-950 text-white border-zinc-950 shadow-md shadow-black/10' 
                        : 'bg-white text-zinc-600 border-zinc-200 hover:border-zinc-300'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}

          {product.metadata?.sizes && product.metadata.sizes.length > 0 && (
            <div className="space-y-3">
              <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Select Size</span>
              <div className="flex flex-wrap gap-2">
                {product.metadata.sizes.map((size: string) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2.5 rounded-xl text-xs font-bold border transition-all ${
                      selectedSize === size 
                        ? 'bg-zinc-950 text-white border-zinc-950 shadow-md shadow-black/10' 
                        : 'bg-white text-zinc-600 border-zinc-200 hover:border-zinc-300'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity Selector and Action Buttons */}
          <div className="pt-4 space-y-4">
            <div className="flex gap-4 items-stretch">
              <div className="flex items-center border border-zinc-200 rounded-2xl bg-zinc-50 overflow-hidden px-1">
                <button 
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="w-10 h-10 flex items-center justify-center text-zinc-500 hover:text-zinc-950 font-bold"
                >
                  -
                </button>
                <span className="w-12 text-center text-sm font-bold text-zinc-950">{quantity}</span>
                <button 
                  onClick={() => setQuantity(q => q + 1)}
                  className="w-10 h-10 flex items-center justify-center text-zinc-500 hover:text-zinc-950 font-bold"
                >
                  +
                </button>
              </div>

              <button 
                onClick={handleAddToCart}
                className="flex-1 bg-emerald-600 text-white rounded-2xl font-bold text-sm px-8 hover:bg-emerald-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/10 active:scale-[0.98]"
              >
                <ShoppingBag size={18} /> Add to Cart
              </button>

              <button 
                onClick={() => toggleWishlist(product)}
                className={`w-14 h-14 rounded-2xl border flex items-center justify-center transition-all ${
                  isFav 
                    ? 'border-red-100 bg-red-50 text-red-500 shadow-md shadow-red-500/5' 
                    : 'border-zinc-200 text-zinc-400 hover:text-zinc-900 bg-white hover:border-zinc-300'
                }`}
              >
                <Heart size={20} fill={isFav ? 'currentColor' : 'none'} />
              </button>
            </div>

            {/* Success message popup inside details */}
            {addedMessage && (
              <div className="bg-emerald-50 text-emerald-800 rounded-xl p-3 flex items-center gap-2 text-xs font-bold animate-fade-in border border-emerald-100">
                <Check size={16} /> Successfully added to cart!
              </div>
            )}
          </div>

          {/* Delivery & Trust badges */}
          <div className="pt-8 border-t border-zinc-100 grid grid-cols-3 gap-4">
            <div className="text-center p-4 rounded-2xl bg-zinc-50">
              <Truck size={20} className="text-zinc-600 mx-auto mb-2" />
              <p className="text-[10px] font-bold text-zinc-900 leading-tight">Free Delivery</p>
              <p className="text-[9px] text-zinc-400 mt-0.5">Orders over $50</p>
            </div>
            <div className="text-center p-4 rounded-2xl bg-zinc-50">
              <RotateCcw size={20} className="text-zinc-600 mx-auto mb-2" />
              <p className="text-[10px] font-bold text-zinc-900 leading-tight">30-Day Returns</p>
              <p className="text-[9px] text-zinc-400 mt-0.5">Hassle free policy</p>
            </div>
            <div className="text-center p-4 rounded-2xl bg-zinc-50">
              <ShieldCheck size={20} className="text-zinc-600 mx-auto mb-2" />
              <p className="text-[10px] font-bold text-zinc-900 leading-tight">Secure Payment</p>
              <p className="text-[9px] text-zinc-400 mt-0.5">100% encryption</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
