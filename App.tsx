import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { PRODUCTS, BRANDS } from './constants';
import { Product, CartItem, Category } from './types';
import { Navbar, ProductCard, AIStylist, CartDrawer } from './components/Components';
import { ArrowRight, Star, RefreshCcw, ShieldCheck } from 'lucide-react';

const App: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Navbar cartCount={cartCount} toggleCart={() => setIsCartOpen(!isCartOpen)} />
        
        <CartDrawer 
            isOpen={isCartOpen} 
            onClose={() => setIsCartOpen(false)} 
            items={cart} 
            onRemove={removeFromCart} 
        />

        <main className="pb-20">
          <Routes>
            <Route path="/" element={<HomePage addToCart={addToCart} />} />
            <Route path="/chaussures" element={<CategoryPage category={Category.SHOES} addToCart={addToCart} />} />
            <Route path="/sport" element={<CategoryPage category={Category.SPORT} addToCart={addToCart} />} />
            <Route path="/chic" element={<CategoryPage category={Category.CHIC} addToCart={addToCart} />} />
          </Routes>
        </main>

        <footer className="bg-gray-50 border-t border-gray-200 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                    <h3 className="font-display font-bold text-xl mb-4">FRIPOBLECH.</h3>
                    <p className="text-gray-500 text-sm">
                        Redonnez vie à la mode. Une sélection rigoureuse de vêtements de seconde main pour un style unique et responsable.
                    </p>
                </div>
                <div>
                    <h4 className="font-bold mb-4">Aide</h4>
                    <ul className="space-y-2 text-sm text-gray-500">
                        <li>Livraison & Retours</li>
                        <li>Guide des tailles</li>
                        <li>FAQ</li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-bold mb-4">Légal</h4>
                    <ul className="space-y-2 text-sm text-gray-500">
                        <li>CGV</li>
                        <li>Confidentialité</li>
                        <li>Mentions Légales</li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-bold mb-4">Suivez-nous</h4>
                     <div className="flex space-x-4">
                        <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                        <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                        <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                     </div>
                </div>
            </div>
        </footer>
      </div>
    </Router>
  );
};

// --- Page Components ---

const HomePage: React.FC<{ addToCart: (p: Product) => void }> = ({ addToCart }) => {
  const featuredProducts = PRODUCTS.slice(0, 4);

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" 
            alt="Hero Background" 
            className="w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 leading-tight">
            Le Luxe accessible <br/>
            <span className="text-accent">Seconde Main.</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl font-light">
            Découvrez une sélection exclusive de pièces de marques. Nike, Gucci, Dior, et plus encore à prix réduits.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/chic" className="px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-gray-100 transition-colors text-center">
              Explorer le Chic
            </Link>
            <Link to="/sport" className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-full hover:bg-white/10 transition-colors text-center">
              Voir le Sportswear
            </Link>
          </div>
        </div>
      </section>

      {/* Brands Marquee */}
      <div className="bg-black py-8 overflow-hidden whitespace-nowrap border-y border-gray-800">
        <div className="inline-flex items-center animate-marquee">
          {[...BRANDS, ...BRANDS, ...BRANDS].map((brand, i) => (
            <span key={i} className="mx-8 text-2xl font-display font-bold text-gray-500 hover:text-white transition-colors cursor-default">
              {brand}
            </span>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Value Props */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-2xl">
                <div className="p-3 bg-white rounded-full shadow-sm mb-4">
                    <ShieldCheck className="w-8 h-8 text-accent" />
                </div>
                <h3 className="font-bold text-lg mb-2">Authenticité Garantie</h3>
                <p className="text-gray-500">Chaque pièce est vérifiée par nos experts avant d'être mise en ligne.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-2xl">
                <div className="p-3 bg-white rounded-full shadow-sm mb-4">
                    <RefreshCcw className="w-8 h-8 text-accent" />
                </div>
                <h3 className="font-bold text-lg mb-2">Mode Circulaire</h3>
                <p className="text-gray-500">Donnez une seconde vie aux vêtements et réduisez votre empreinte carbone.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-2xl">
                <div className="p-3 bg-white rounded-full shadow-sm mb-4">
                    <Star className="w-8 h-8 text-accent" />
                </div>
                <h3 className="font-bold text-lg mb-2">Qualité Premium</h3>
                <p className="text-gray-500">Nous ne sélectionnons que les articles en excellent état ou neufs.</p>
            </div>
        </div>

        {/* AI Stylist Section */}
        <AIStylist />

        {/* Featured Products */}
        <div className="flex justify-between items-end mb-8">
          <h2 className="text-3xl font-display font-bold">Nouveautés</h2>
          <Link to="/chic" className="text-accent font-medium hover:underline flex items-center gap-1">
            Voir tout <ArrowRight className="w-4 h-4"/>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
          ))}
        </div>
      </div>
    </>
  );
};

const CategoryPage: React.FC<{ category: Category; addToCart: (p: Product) => void }> = ({ category, addToCart }) => {
  const products = PRODUCTS.filter(p => p.category === category);
  const title = category === Category.SHOES ? 'Chaussures' : category === Category.SPORT ? 'Sportswear' : 'Chic & Élégance';
  
  // Custom header background based on category
  const bgImage = category === Category.SHOES 
    ? "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=1600&q=80"
    : category === Category.SPORT
    ? "https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=1600&q=80"
    : "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1600&q=80";

  return (
    <div>
      <div className="relative h-64 md:h-80 overflow-hidden">
        <img src={bgImage} alt={title} className="w-full h-full object-cover"/>
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <h1 className="text-4xl md:text-6xl font-display font-bold text-white capitalize">{title}</h1>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {products.length === 0 ? (
            <div className="text-center py-20">
                <p className="text-gray-500 text-lg">Aucun produit disponible dans cette catégorie pour le moment.</p>
            </div>
        ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
                <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
            ))}
            </div>
        )}
      </div>
    </div>
  );
};

export default App;
