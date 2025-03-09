
import { ArrowRight, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { featuredCollections } from '@/lib/data';
import { ThreeJSHelmet, ThreeJSSprocket } from '@/lib/3d/ThreeJSScene';
import { useIsMobile } from '@/hooks/use-mobile';
import { useState } from 'react';

const HeroSection = () => {
  const isMobile = useIsMobile();
  const [activeModel, setActiveModel] = useState<'helmet' | 'sprocket'>('helmet');

  return (
    <section className="py-12 relative overflow-hidden bg-white-to-r from-amber-400 to-amber-300">
      <div className="absolute inset-0 bg-[url('favicon.ico')] bg-cover bg-center opacity-1 z-0"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-brand-black mb-4 leading-tight">
            Get Your Imported Accessories
            <span className="block text-red-600">Only on #MOTO LAB</span>
          </h2>
          <p className="text-lg text-brand-black/80 mb-6">
            Premium quality motorcycle accessories for all your riding needs
          </p>
          <Link 
            to="/" 
            className="inline-flex items-center bg-brand-black text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <ShoppingBag className="mr-2" size={20} />
            Shop Now
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {featuredCollections.map((collection, index) => (
            <div 
              key={collection.id} 
              className={`bg-white/90 backdrop-blur-sm p-6 rounded-lg shadow-lg hover-scale transition-all duration-500 transform hover:-translate-y-2 ${
                index === 1 ? 'md:-mt-8' : ''
              }`}
            >
              <div className="overflow-hidden rounded-md mb-4">
                <img 
                  src={collection.image} 
                  alt={collection.title} 
                  className="w-full h-48 object-cover rounded-md transition-transform duration-700 hover:scale-110"
                />
              </div>
              <h3 className="text-xl font-bold text-brand-black mb-2">{collection.title}</h3>
              <p className="text-gray-600 mb-4">{collection.description}</p>
              <a 
                href="#" 
                className="text-brand-black font-medium flex items-center hover:text-amber-500 transition-colors"
              >
                Explore <ArrowRight size={16} className="ml-1" />
              </a>
            </div>
          ))}
        </div>

        {/* Interactive 3D Models */}
        <div className="mt-12 flex flex-col items-center">
          <div className="mb-4 bg-brand-black/90 backdrop-blur-sm rounded-full px-4 py-2 inline-flex space-x-4 shadow-lg">
            
            <button 
              onClick={() => setActiveModel('sprocket')}
              className={`text-sm font-medium px-4 py-2 rounded-full transition-all duration-300 ${
                activeModel === 'sprocket' 
                  ? 'bg-amber-400 text-brand-black shadow-md' 
                  : 'text-white hover:bg-gray-800'
              }`}
            >
              Chain Sprocket
            </button>
          </div>
          
          <div className="relative bg-white/20 backdrop-blur-sm p-8 rounded-xl shadow-xl">
            {activeModel === 'helmet' ? (
              <ThreeJSSprocket 
              size={isMobile ? 180 : 240} 
              containerClass={isMobile ? "w-44 h-44" : "w-60 h-60"} 
            />
            ) : (
              <ThreeJSSprocket 
                size={isMobile ? 180 : 240} 
                containerClass={isMobile ? "w-44 h-44" : "w-60 h-60"} 
              />
            )}
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-center w-full">
              <span className="inline-block bg-brand-black/80 backdrop-blur-sm text-white px-4 py-1 rounded-full text-sm font-medium shadow-lg">
                
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
