import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, Star, ShieldCheck, Truck, RotateCcw, Zap, 
  TrendingUp, Store, ChevronRight, Filter, X, Search, 
  SlidersHorizontal, Tag, Percent, Clock, Flame, Play,
  History, ShoppingCart, RefreshCcw, Heart, Monitor, Sparkles,
  ShoppingBag, Home as HomeIcon
} from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import { formatPrice } from '../lib/utils';
import ProductCard from '../components/ProductCard';
import CategoryTheme from '../components/CategoryTheme';
import OfferSticker from '../components/OfferSticker';

export default function Home() {
  const [products, setProducts] = React.useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = React.useState<any[]>([]);
  const [categories, setCategories] = React.useState<any[]>([]);
  const [sectionsData, setSectionsData] = React.useState<any[]>([]);
  const [videosData, setVideosData] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [activeCategory, setActiveCategory] = React.useState('All');
  const [priceRange, setPriceRange] = React.useState(1000);
  const [showMobileFilters, setShowMobileFilters] = React.useState(false);
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('q') || '';

  const IconMap: Record<string, any> = {
    History, Tag, RefreshCcw, Search, Flame, Sparkles, Heart, Monitor, Store, ShieldCheck, Truck, Play, ShoppingBag, Home: HomeIcon, Zap, Clock
  };

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const [prodRes, catRes, secRes, vidRes] = await Promise.all([
          fetch('/api/products'),
          fetch('/api/categories'),
          fetch('/api/sections'),
          fetch('/api/videos')
        ]);

        const [prodData, catData, secData, vidData] = await Promise.all([
          prodRes.json(),
          catRes.json(),
          secRes.json(),
          vidRes.json()
        ]);

        setProducts(Array.isArray(prodData) ? prodData : []);
        setFilteredProducts(Array.isArray(prodData) ? prodData : []);
        setCategories(Array.isArray(catData) ? catData : []);
        setSectionsData(Array.isArray(secData) ? secData : []);
        setVideosData(Array.isArray(vidData) ? vidData : []);
      } catch (err) {
        console.error('Failed to fetch data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  React.useEffect(() => {
    let filtered = products;
    
    if (activeCategory !== 'All') {
      filtered = filtered.filter(p => p.category === activeCategory);
    }
    
    if (searchQuery) {
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    filtered = filtered.filter(p => p.price <= priceRange);
    setFilteredProducts(filtered);
  }, [activeCategory, priceRange, products, searchQuery]);

  // Create a unified feed
  const feed = React.useMemo(() => {
    const items: any[] = [];
    if (loading || filteredProducts.length === 0) return items;

    // Map sections to include items and icons
    const availableSections = sectionsData.map(section => {
      let sectionItems = [];
      if (section.type === 'category') {
        sectionItems = products.filter(p => p.category === section.category).slice(0, section.limit);
      } else {
        // Just take a slice for general sections
        const start = (section.order % 4) * 12;
        sectionItems = products.slice(start, start + section.limit);
      }

      return {
        ...section,
        icon: IconMap[section.icon] ? React.createElement(IconMap[section.icon], { size: 20 }) : <Sparkles size={20} />,
        items: sectionItems
      };
    });

    // Simple shuffle
    for (let i = availableSections.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [availableSections[i], availableSections[j]] = [availableSections[j], availableSections[i]];
    }

    let sectionIdx = 0;
    let nextSectionAt = 3 + Math.floor(Math.random() * 2); 
    let nextOfferAt = 6 + Math.floor(Math.random() * 4); 

    filteredProducts.forEach((product, idx) => {
      items.push({ type: 'product', data: product });
      
      if (idx === nextOfferAt) {
        items.push({ type: 'offer-sticker' });
        nextOfferAt += 12 + Math.floor(Math.random() * 8);
      }

      if (idx === nextSectionAt && sectionIdx < availableSections.length) {
        items.push({ type: 'section', data: availableSections[sectionIdx] });
        sectionIdx++;
        nextSectionAt += 4 + Math.floor(Math.random() * 4);

        // Insert videos after a few sections
        if (sectionIdx === 2 && videosData.length > 0) {
          items.push({ type: 'videos', data: videosData });
        }
        
        // Insert Top Products section
        if (sectionIdx === 4) {
          items.push({ type: 'top-products', data: products.slice(0, 5) });
        }
      }
    });

    while (sectionIdx < availableSections.length) {
      items.push({ type: 'section', data: availableSections[sectionIdx] });
      sectionIdx++;
    }

    return items;
  }, [loading, filteredProducts, products, sectionsData, videosData]);

  const categoryList = ['All', ...categories.map(c => c.name)];

  return (
    <CategoryTheme category={activeCategory}>
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar Filters */}
          <aside className="hidden lg:block w-72 shrink-0">
            <div className="sticky top-28 space-y-6">
              <div className="bg-white p-6 rounded-3xl border border-black/5 shadow-sm">
                <div className="flex items-center gap-2 mb-6 text-zinc-900 font-bold uppercase tracking-wider text-xs">
                  <SlidersHorizontal size={16} /> Filter Products
                </div>
                <div className="space-y-8">
                  <div>
                    <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-4">Categories</h3>
                    <div className="space-y-1">
                      {categoryList.map(cat => (
                        <button
                          key={cat}
                          onClick={() => setActiveCategory(cat)}
                          className={`w-full text-left px-3 py-2 rounded-xl text-sm transition-all flex justify-between items-center ${
                            activeCategory === cat 
                              ? 'bg-emerald-50 text-emerald-700 font-bold' 
                              : 'text-zinc-500 hover:bg-zinc-50'
                          }`}
                        >
                          {cat}
                          {activeCategory === cat && <ChevronRight size={14} />}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Price Range</h3>
                      <span className="text-xs font-bold text-emerald-600">{formatPrice(priceRange)}</span>
                    </div>
                    <input 
                      type="range" 
                      min="0" 
                      max="1000" 
                      step="50"
                      value={priceRange}
                      onChange={(e) => setPriceRange(parseInt(e.target.value))}
                      className="w-full h-1.5 bg-zinc-100 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                    />
                  </div>
                </div>
              </div>

              {/* Vendor Card */}
              <div className="bg-zinc-900 p-8 rounded-[2.5rem] text-white relative overflow-hidden group shadow-xl">
                <div className="relative z-10">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center mb-4">
                    <Store size={20} />
                  </div>
                  <h3 className="text-xl font-bold mb-2 leading-tight">Grow with OmniMarket</h3>
                  <Link to="/vendor-info" className="inline-flex items-center gap-2 bg-white text-black px-5 py-2.5 rounded-full font-bold text-xs hover:bg-zinc-200 transition-all">
                    Open Store <ArrowRight size={14} />
                  </Link>
                </div>
                <div className="absolute -bottom-4 -right-4 opacity-10 rotate-12 group-hover:scale-110 transition-transform">
                  <TrendingUp size={120} />
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="flex-1 min-w-0">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-zinc-900">
                {activeCategory === 'All' ? 'Marketplace Feed' : activeCategory}
              </h2>
              <button 
                onClick={() => setShowMobileFilters(true)}
                className="lg:hidden flex items-center gap-2 px-4 py-2 bg-white border border-black/5 rounded-full text-sm font-bold"
              >
                <Filter size={16} /> Filters
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {loading ? (
                [...Array(6)].map((_, i) => (
                  <div key={i} className="animate-pulse bg-white rounded-[2.5rem] p-4 border border-black/5">
                    <div className="aspect-[4/5] bg-zinc-100 rounded-[2rem] mb-4" />
                    <div className="h-4 bg-zinc-100 rounded w-2/3 mb-2" />
                    <div className="h-4 bg-zinc-100 rounded w-1/3" />
                  </div>
                ))
              ) : (
                feed.map((item, idx) => {
                  if (item.type === 'product') {
                    return <ProductCard key={`prod-${item.data.id}-${idx}`} product={item.data} />;
                  }
                  if (item.type === 'offer-sticker') {
                    return <OfferSticker key={`offer-${idx}`} />;
                  }
                  if (item.type === 'section') {
                    return <QuadCard key={`sec-${idx}`} section={item.data} />;
                  }
                  if (item.type === 'videos') {
                    return (
                      <div key={`vid-${idx}`} className="col-span-full my-8">
                        <VideoRow videos={item.data} />
                      </div>
                    );
                  }
                  if (item.type === 'top-products') {
                    return (
                      <QuadCard 
                        key={`top-${idx}`} 
                        section={{ 
                          title: "Top Products for You", 
                          items: item.data,
                          icon: <Sparkles size={20} />
                        }} 
                      />
                    );
                  }
                  return null;
                })
              )}
            </div>

            {filteredProducts.length === 0 && !loading && (
              <div className="text-center py-32 bg-white rounded-[3rem] border border-black/5">
                <Search size={40} className="text-zinc-200 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-zinc-900 mb-2">No results found</h3>
                <button 
                  onClick={() => {setActiveCategory('All'); setPriceRange(1000);}}
                  className="mt-8 bg-black text-white px-8 py-3 rounded-full font-bold"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filters Modal */}
      <AnimatePresence>
        {showMobileFilters && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowMobileFilters(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              className="fixed inset-y-0 right-0 w-full max-w-xs bg-white z-[70] p-8 overflow-y-auto shadow-2xl"
            >
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold tracking-tight">Filters</h2>
                <button onClick={() => setShowMobileFilters(false)} className="p-2 hover:bg-zinc-100 rounded-full">
                  <X size={24} />
                </button>
              </div>
              <div className="space-y-8">
                <div>
                  <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-4">Categories</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {categoryList.map(cat => (
                      <button
                        key={cat}
                        onClick={() => {setActiveCategory(cat); setShowMobileFilters(false);}}
                        className={`px-4 py-3 rounded-xl text-xs font-bold transition-all border ${
                          activeCategory === cat 
                            ? 'bg-black text-white border-black' 
                            : 'bg-white text-zinc-500 border-zinc-200'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </CategoryTheme>
  );
}

function QuadCard(props: any) {
  const { section } = props;
  // Take first 4 items for the quad grid
  const displayItems = section.items.slice(0, 4);
  
  return (
    <div className="bg-white p-6 rounded-[2.5rem] border border-black/5 shadow-sm flex flex-col h-full">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0">
          {section.icon}
        </div>
        <h3 className="text-lg font-bold text-zinc-900 line-clamp-1">{section.title}</h3>
      </div>
      
      <div className="grid grid-cols-2 gap-4 flex-1">
        {displayItems.map((item: any) => (
          <Link 
            key={item.id} 
            to={`/product/${item.slug}`} 
            className="group flex flex-col"
          >
            <div className="aspect-square rounded-2xl bg-zinc-50 overflow-hidden mb-2 border border-black/5">
              <img 
                src={item.images[0]} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                alt={item.name} 
                referrerPolicy="no-referrer" 
              />
            </div>
            <p className="text-[10px] font-bold text-zinc-900 line-clamp-1 mb-0.5">{item.name}</p>
            <p className="text-[10px] font-bold text-emerald-600">{formatPrice(item.price)}</p>
          </Link>
        ))}
        {/* Fill empty slots if less than 4 items */}
        {[...Array(Math.max(0, 4 - displayItems.length))].map((_, i) => (
          <div key={`empty-${i}`} className="aspect-square rounded-2xl bg-zinc-50 border border-dashed border-zinc-200" />
        ))}
      </div>
      
      <Link to="/" className="mt-6 text-xs font-bold text-emerald-600 hover:underline flex items-center gap-1">
        See more <ChevronRight size={14} />
      </Link>
    </div>
  );
}

function VideoRow(props: any) {
  const { videos } = props;
  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-zinc-900 flex items-center gap-2">
          <Play size={24} className="text-emerald-600" /> Review & Unboxing Videos
        </h2>
        <button className="text-emerald-600 font-bold text-sm hover:underline">View all</button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {videos.map((video: any) => (
          <div key={video.id} className="group cursor-pointer">
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-zinc-200 mb-3">
              <img src={video.thumbnail} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={video.title} referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center text-black scale-90 group-hover:scale-100 transition-transform">
                  <Play size={20} fill="currentColor" />
                </div>
              </div>
              <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/80 text-white text-[10px] font-bold rounded">
                {video.type}
              </div>
            </div>
            <h3 className="font-bold text-sm text-zinc-900 line-clamp-2 group-hover:text-emerald-600 transition-colors">{video.title}</h3>
            <p className="text-xs text-zinc-500 mt-1">{video.views} views</p>
          </div>
        ))}
      </div>
    </section>
  );
}
