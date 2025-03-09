
import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Product } from '@/lib/data';
import { ProductCard } from '@/components/ui/ProductCard';
import { useIsMobile } from '@/hooks/use-mobile';

interface NewArrivalsProps {
  products: Product[];
}

const NewArrivals = ({ products }: NewArrivalsProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  
  const newProducts = products.filter(product => product.isNew);
  const itemsPerView = isMobile ? 1 : 3;
  const maxIndex = Math.max(0, newProducts.length - itemsPerView);

  const scrollToIndex = (index: number) => {
    if (carouselRef.current) {
      const newIndex = Math.min(Math.max(0, index), maxIndex);
      setCurrentIndex(newIndex);
      
      const itemWidth = carouselRef.current.scrollWidth / newProducts.length;
      carouselRef.current.scrollTo({
        left: newIndex * itemWidth,
        behavior: 'smooth'
      });
    }
  };

  const handlePrev = () => scrollToIndex(currentIndex - 1);
  const handleNext = () => scrollToIndex(currentIndex + 1);

  useEffect(() => {
    const handleResize = () => {
      // Reset to first item when resizing
      scrollToIndex(0);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (newProducts.length === 0) return null;

  return (
    <section className="py-12 bg-brand-gray">
      <div className="container mx-auto px-6">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
          New Arrivals
        </h2>

        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 p-2 rounded-full shadow-md disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronLeft size={24} />
          </button>

          {/* Carousel Container */}
          <div 
            ref={carouselRef}
            className="overflow-x-auto hide-scrollbar flex snap-x snap-mandatory space-x-6"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {newProducts.map((product, index) => (
              <div
                key={product.id}
                className="min-w-[300px] sm:min-w-[320px] snap-start transform transition-transform duration-500"
                style={{
                  transform: `perspective(1000px) rotateY(${(index - currentIndex) * 5}deg)`,
                  zIndex: index === currentIndex ? 10 : 5,
                  opacity: Math.abs(index - currentIndex) > 2 ? 0.5 : 1
                }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          <button
            onClick={handleNext}
            disabled={currentIndex >= maxIndex}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 p-2 rounded-full shadow-md disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Dots Navigation */}
        <div className="flex justify-center mt-6 space-x-2">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToIndex(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                index === currentIndex ? 'bg-brand-yellow w-5' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewArrivals;
