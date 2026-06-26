import React from 'react';

export default function CategoryTheme({ children, category }: { children: React.ReactNode, category: string }) {
  return (
    <div className={`min-h-screen bg-[#F8F9FA] transition-colors duration-700`}>
      {children}
    </div>
  );
}
