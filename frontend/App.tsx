import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.tsx';
import ProductDetails from './pages/ProductDetails.tsx';
import Cart from './pages/Cart.tsx';
import Wishlist from './pages/Wishlist.tsx';
import Login from './pages/Login.tsx';
import VendorInfo from './pages/VendorInfo.tsx';
import Navbar from './components/Navbar.tsx';
import { AppProvider } from './lib/AppContext.tsx';

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="min-h-screen bg-[#F8F9FA]">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:slug" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/login" element={<Login />} />
            <Route path="/vendor-info" element={<VendorInfo />} />
          </Routes>
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;

