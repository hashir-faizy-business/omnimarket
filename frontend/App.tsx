import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.tsx';
import Navbar from './components/Navbar.tsx';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#F8F9FA]">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
