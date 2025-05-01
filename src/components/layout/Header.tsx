import React from 'react';
import { Video, Layers, Film, Menu, X } from 'lucide-react';
import { useState } from 'react';

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-primary-800 text-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Film className="h-8 w-8 text-accent-400" />
            <div>
              <h1 className="text-xl font-bold">Criador de Vídeos</h1>
              <p className="text-xs text-primary-200">Powered by IA</p>
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-white focus:outline-none"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
          
          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#" className="text-white hover:text-accent-300 transition-colors flex items-center space-x-1">
              <Video size={18} />
              <span>Meus Vídeos</span>
            </a>
            <a href="#" className="text-white hover:text-accent-300 transition-colors flex items-center space-x-1">
              <Layers size={18} />
              <span>Templates</span>
            </a>
            <button className="btn-accent">Novo Vídeo</button>
          </nav>
        </div>
        
        {/* Mobile navigation */}
        {menuOpen && (
          <nav className="mt-4 pt-4 border-t border-primary-700 md:hidden">
            <ul className="space-y-4">
              <li>
                <a href="#" className="text-white hover:text-accent-300 transition-colors flex items-center space-x-2">
                  <Video size={18} />
                  <span>Meus Vídeos</span>
                </a>
              </li>
              <li>
                <a href="#" className="text-white hover:text-accent-300 transition-colors flex items-center space-x-2">
                  <Layers size={18} />
                  <span>Templates</span>
                </a>
              </li>
              <li>
                <button className="btn-accent w-full">Novo Vídeo</button>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;