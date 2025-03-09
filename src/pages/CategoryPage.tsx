
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { categories, products as allProducts } from '@/lib/data';
import Header from '@/components/layout/Header';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import Sidebar from '@/components/layout/Sidebar';
import ProductGrid from '@/components/home/ProductGrid';
import { useIsMobile } from '@/hooks/use-mobile';

const CategoryPage = () => {
  const { categoryName } = useParams<{ categoryName: string }>();
  const isMobile = useIsMobile();
  const [filteredProducts, setFilteredProducts] = useState(allProducts);
  const [currentCategory, setCurrentCategory] = useState<any>(null);

  useEffect(() => {
    if (categoryName) {
      // Find the category object
      const category = categories.find(
        c => c.name.toLowerCase().replace(/\s+/g, '-') === categoryName.toLowerCase()
      );
      
      setCurrentCategory(category);
      
      // Filter products by category
      const filtered = allProducts.filter(
        product => product.category === (category?.name || '')
      );
      
      setFilteredProducts(filtered);
    }
  }, [categoryName]);

  if (!currentCategory) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Navigation />
      
      <div className="bg-amber-50 py-8">
        <div className="container mx-auto px-6">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-2">{currentCategory.name}</h1>
          <p className="text-gray-600 text-center max-w-2xl mx-auto">
            Explore our collection of premium {currentCategory.name.toLowerCase()} for all types of riders and motorcycles.
          </p>
        </div>
      </div>
      
      <main className="flex-grow">
        <div className="container mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar */}
            <div className={`${isMobile ? 'order-2' : 'w-1/4'}`}>
              <Sidebar />
            </div>
            
            {/* Main content */}
            <div className={`${isMobile ? 'order-1' : 'w-3/4'}`}>
              {filteredProducts.length > 0 ? (
              <ProductGrid 
                  products={filteredProducts} 
                  title={`${currentCategory.name} Collection`} 
                />
              ) : (
                <div className="text-center py-12">
                  <p className="text-xl text-gray-600">No products found in this category.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CategoryPage;
