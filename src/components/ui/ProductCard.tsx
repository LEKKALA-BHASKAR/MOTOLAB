
import { useState } from 'react';
import { ShoppingCart, Heart } from 'lucide-react';
import { Product } from '@/lib/data';
import { toast } from "sonner";
import { useCart } from '@/contexts/CartContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState<string | null>(
    product.sizes && product.sizes.length > 0 ? product.sizes[0] : null
  );
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleAddToCart = () => {
    if (product.sizes && product.sizes.length > 0 && !selectedSize) {
      toast.error("Please select a size");
      return;
    }
    
    addToCart(product, 1, selectedSize || undefined);
  };

  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
    toast.success(isFavorite ? `Removed from favorites` : `Added to favorites`);
  };

  return (
    <div 
      className="product-card h-full flex flex-col relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="product-image-container">
        <img 
          src={product.image} 
          alt={product.name} 
          className="product-image"
          style={{ 
            transform: isHovered ? 'scale(1.1) rotateY(5deg)' : 'scale(1) rotateY(0deg)',
            transition: 'transform 0.5s ease' 
          }}
        />
        
        <button 
          onClick={toggleFavorite}
          className="absolute top-2 right-2 p-1 rounded-full bg-white bg-opacity-70 hover:bg-opacity-100 transition-all z-10"
        >
          <Heart 
            size={18} 
            className={`transition-colors ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} 
          />
        </button>
        
        {product.isOnSale && (
          <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full">
            SALE!
          </div>
        )}
        
        {product.isNew && (
          <div className="absolute top-2 left-2 bg-brand-yellow text-brand-black text-xs font-bold px-2 py-1 rounded-full">
            NEW
          </div>
        )}
      </div>
      
      <div className="p-4 flex-grow flex flex-col">
        <div className="text-sm text-gray-500 mb-1">{product.category}</div>
        <h3 className="font-medium mb-2 text-brand-black">{product.name}</h3>
        
        <div className="mb-4 flex items-center mt-auto">
          {product.originalPrice ? (
            <div className="flex items-center">
              <span className="text-gray-400 line-through mr-2">₹{product.originalPrice.toLocaleString()}</span>
              <span className="font-bold text-red-600">₹{product.price.toLocaleString()}</span>
            </div>
          ) : (
            <span className="font-bold">₹{product.price.toLocaleString()}</span>
          )}
        </div>
        
        {product.sizes && product.sizes.length > 0 && (
          <div className="mb-4">
            <div className="text-sm text-gray-600 mb-2">Size:</div>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map(size => (
                <button
                  key={size}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                    selectedSize === size 
                      ? 'bg-brand-black text-white' 
                      : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                  }`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}
        
        <button 
          className="btn-yellow w-full flex items-center justify-center"
          onClick={handleAddToCart}
        >
          <ShoppingCart size={16} className="mr-2" />
          Add to Cart
        </button>
      </div>
    </div>
  );
};
