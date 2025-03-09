
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Product } from '@/lib/data';
import { ProductCard } from '@/components/ui/ProductCard';

interface ProductGridProps {
  products: Product[];
  title?: string;
}

const sortOptions = [
  { value: 'default', label: 'Default sorting' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'newest', label: 'Newest first' },
];

const ProductGrid = ({ products, title }: ProductGridProps) => {
  const [sortBy, setSortBy] = useState('default');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const getSortedProducts = () => {
    switch (sortBy) {
      case 'price-low':
        return [...products].sort((a, b) => a.price - b.price);
      case 'price-high':
        return [...products].sort((a, b) => b.price - a.price);
      case 'newest':
        return [...products].filter(p => p.isNew).concat([...products].filter(p => !p.isNew));
      default:
        return products;
    }
  };

  const sortedProducts = getSortedProducts();

  return (
    <section className="py-12">
      <div className="container mx-auto px-6">
        {title && (
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
            {title}
          </h2>
        )}

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <p className="text-gray-600 mb-3 sm:mb-0">
            Showing all {products.length} results
          </p>

          <div className="relative">
            <button
              className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-md bg-white"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <span>{sortOptions.find(option => option.value === sortBy)?.label}</span>
              <ChevronDown size={16} className={`transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-1 w-56 bg-white border border-gray-200 rounded-md shadow-lg z-10 animate-fade-in">
                {sortOptions.map(option => (
                  <button
                    key={option.value}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
                    onClick={() => {
                      setSortBy(option.value);
                      setIsDropdownOpen(false);
                    }}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {sortedProducts.map(product => (
            <div key={product.id} className="animate-fade-in">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;
