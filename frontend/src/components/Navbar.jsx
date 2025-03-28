import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import PixelCard from './PixelCard';

const NavLink = ({ title, id, currentPage, onClick }) => (
  <PixelCard
    variant="pink"
    gap={4}
    speed={60}
    colors="#fecdd3,#fda4af,#e11d48"
    className="relative"
  >
    <button
      onClick={() => onClick(id)}
      className={`px-4 py-2 rounded-lg transition-colors ${
        currentPage === id
          ? 'text-white'
          : 'text-gray-300 hover:text-white'
      }`}
    >
      {title}
    </button>
  </PixelCard>
);

export default function Navbar({ currentPage, setCurrentPage }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', title: 'Home' },
    { id: 'level1', title: 'Level 1' },
    { id: 'level2', title: 'Level 2' },
    { id: 'level3', title: 'Level 3' },
  ];

  return (
    <nav className="fixed w-full z-20 top-0 left-0 bg-gray-900/80 backdrop-blur-sm border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-pink-400">
              Harshvardhan
              Poredi
            </span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-2">
            {navItems.map((item) => (
              <NavLink
                key={item.id}
                {...item}
                currentPage={currentPage}
                onClick={setCurrentPage}
              />
            ))}
          </div>

          {/* Mobile Navigation Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-900/95 border-b border-white/10">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <div key={item.id} className="w-full">
                <NavLink
                  {...item}
                  currentPage={currentPage}
                  onClick={(id) => {
                    setCurrentPage(id);
                    setIsMenuOpen(false);
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}