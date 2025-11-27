import React, { useState, useEffect, useRef } from 'react';
import { ShoppingBag, Menu, X, Search, Sparkles, ArrowRight, Tag } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { Product, CartItem } from '../types';
import { getFashionAdvice } from '../services/geminiService';

// --- Navbar ---
interface NavbarProps {
  cartCount: number;
  toggleCart: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ cartCount, toggleCart }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Accueil', path: '/' },
    { name: 'Chaussures', path: '/chaussures' },
    { name: 'Sport', path: '/sport' },
    { name: 'Chic', path: '/chic' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 flex items-center">
            <span className="font-display font-bold text-2xl tracking-tighter text-black">
              FRIPOBLECH<span className="text-accent">.</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-8 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-medium transition-colors duration-200 ${
                  isActive(link.path)
                    ? 'text-black border-b-2 border-accent'
                    : 'text-gray-500 hover:text-black'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-4">
            <button 
              onClick={toggleCart} 
              className="relative p-2 text-gray-600 hover:text-black transition-colors"
            >
              <ShoppingBag className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-accent rounded-full">
                  {cartCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-600"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 absolute w-full">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-black hover:bg-gray-50 rounded-md"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

// --- Product Card ---
interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <div className="group relative bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
      <div className="aspect-[4/5] w-full overflow-hidden bg-gray-200 relative">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-2 py-1 text-xs font-bold uppercase tracking-wider rounded-sm">
          {product.brand}
        </div>
        {product.condition === 'Neuf' && (
           <div className="absolute top-3 right-3 bg-accent text-white px-2 py-1 text-xs font-bold uppercase rounded-sm">
           Neuf
         </div>
        )}
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-medium text-gray-900 line-clamp-1">{product.name}</h3>
            <p className="text-sm text-gray-500 mt-1">Taille: {product.size} • {product.condition}</p>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between">
            <div className="flex flex-col">
                <span className="text-xs text-gray-400 line-through">{product.originalPrice} €</span>
                <span className="text-xl font-bold text-gray-900">{product.price} €</span>
            </div>
          <button
            onClick={() => onAddToCart(product)}
            className="px-4 py-2 bg-black text-white text-sm font-medium rounded-lg opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 hover:bg-gray-800"
          >
            Ajouter
          </button>
        </div>
        {/* Mobile helper: button always visible on touch devices via media query usually, 
            but for simplicity we keep the hover effect for desktop aesthetics 
            and add a permanent button for mobile if needed, or rely on click on card.
            Here we keep it simple. */}
      </div>
    </div>
  );
};

// --- AI Stylist ---
export const AIStylist: React.FC = () => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setResponse(null);
    const advice = await getFashionAdvice(query);
    setResponse(advice);
    setLoading(false);
  };

  return (
    <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 md:p-12 my-12 text-white relative overflow-hidden">
      {/* Decorative Circles */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-accent/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl"></div>

      <div className="relative z-10 max-w-2xl mx-auto text-center">
        <div className="inline-flex items-center space-x-2 bg-white/10 px-3 py-1 rounded-full text-sm font-medium mb-6 border border-white/20">
          <Sparkles className="w-4 h-4 text-accent" />
          <span>Styliste IA - Fripoblech</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
          Besoin d'inspiration pour votre look ?
        </h2>
        <p className="text-gray-300 mb-8">
          Demandez à notre IA styliste de vous composer une tenue parfaite avec nos pièces uniques.
        </p>

        <form onSubmit={handleSubmit} className="relative max-w-lg mx-auto">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ex: Je cherche une tenue chic pour un mariage..."
            className="w-full pl-6 pr-14 py-4 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent focus:bg-white/20 transition-all"
          />
          <button
            type="submit"
            disabled={loading}
            className="absolute right-2 top-2 p-2 bg-accent rounded-full text-white hover:bg-fuchsia-600 transition-colors disabled:opacity-50"
          >
            {loading ? (
              <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <ArrowRight className="w-6 h-6" />
            )}
          </button>
        </form>

        {response && (
          <div className="mt-8 p-6 bg-white/10 backdrop-blur rounded-xl border border-white/10 text-left animate-fade-in">
            <p className="text-lg leading-relaxed">{response}</p>
          </div>
        )}
      </div>
    </div>
  );
};

// --- Cart Drawer ---
interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemove: (id: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, items, onRemove }) => {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="absolute inset-y-0 right-0 max-w-full flex">
        <div className="w-screen max-w-md bg-white shadow-xl flex flex-col h-full animate-slide-in">
          <div className="flex items-center justify-between px-4 py-6 border-b border-gray-100">
            <h2 className="text-lg font-bold font-display">Votre Panier</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
              <X className="w-6 h-6 text-gray-500" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-gray-500 space-y-4">
                <ShoppingBag className="w-16 h-16 opacity-20" />
                <p>Votre panier est vide.</p>
                <button onClick={onClose} className="text-accent hover:underline font-medium">Commencer le shopping</button>
              </div>
            ) : (
              items.map((item) => (
                <div key={`${item.id}-${item.size}`} className="flex gap-4 p-4 bg-gray-50 rounded-xl">
                  <div className="w-20 h-24 flex-shrink-0 overflow-hidden rounded-lg bg-gray-200">
                    <img src={item.imageUrl} alt={item.name} className="h-full w-full object-cover" />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900">{item.name}</h3>
                      <p className="text-sm text-gray-500">{item.brand} • {item.size}</p>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                        <span className="font-bold">{item.price} €</span>
                        <button 
                            onClick={() => onRemove(item.id)}
                            className="text-xs text-red-500 hover:text-red-700 font-medium"
                        >
                            Retirer
                        </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {items.length > 0 && (
            <div className="border-t border-gray-100 p-6 space-y-4 bg-gray-50">
              <div className="flex justify-between text-base font-medium text-gray-900">
                <p>Total</p>
                <p>{total} €</p>
              </div>
              <p className="text-xs text-gray-500 text-center">Livraison gratuite à partir de 100€</p>
              <button className="w-full bg-black text-white py-4 rounded-xl font-bold hover:bg-gray-900 transition-colors shadow-lg shadow-black/20">
                Commander
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
