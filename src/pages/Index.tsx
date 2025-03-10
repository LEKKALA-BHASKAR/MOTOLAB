
import { products } from '@/lib/data';
import Header from '@/components/layout/Header';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import Sidebar from '@/components/layout/Sidebar';
import HeroSection from '@/components/home/HeroSection';
import ProductGrid from '@/components/home/ProductGrid';
import NewArrivals from '@/components/home/NewArrivals';
import CategoryGrid from '@/components/home/CategoryGrid';
import { useIsMobile } from '@/hooks/use-mobile';

const Index = () => {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
     
      
      <main>
        <HeroSection />
        
        <CategoryGrid />
        
        <div className="container mx-auto px-6 py-12">
          
            <div className={`${isMobile ? 'order-2' : 'w-1/2'}`}>
              
            </div>
            
            {/* Main content */}
            <div className={`${isMobile ? 'order-1' : 'w-1/0'}`}>
              <ProductGrid 
                products={products} 
                title="Featured Products" 
              />
          
          </div>
        </div>
        
        <NewArrivals products={products} />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
