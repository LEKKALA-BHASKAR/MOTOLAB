
import { useState } from 'react';
import { X, ShoppingCart, Heart, ChevronRight, ChevronLeft } from 'lucide-react';
import { Product } from '@/lib/data';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';

interface QuickViewModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

export const QuickViewModal = ({ product, isOpen, onClose }: QuickViewModalProps) => {
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState<string | null>(
    product.sizes && product.sizes.length > 0 ? product.sizes[0] : null
  );
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  if (!isOpen) return null;

  const handleAddToCart = () => {
    if (product.sizes && product.sizes.length > 0 && !selectedSize) {
      toast.error("Please select a size");
      return;
    }
    
    addToCart(product, quantity, selectedSize || undefined);
    onClose();
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    toast.success(isFavorite ? `Removed from favorites` : `Added to favorites`);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-auto animate-fade-in">
        <div className="flex justify-end p-4">
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-black transition-colors"
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
          {/* Product Image */}
          <div className="relative">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-auto rounded-lg object-cover"
            />
            
            {product.isOnSale && (
              <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                SALE!
              </div>
            )}
            
            {product.isNew && (
              <div className="absolute top-2 right-2 bg-amber-400 text-brand-black text-xs font-bold px-2 py-1 rounded">
                NEW
              </div>
            )}
          </div>
          
          {/* Product Details */}
          <div className="flex flex-col">
            <div className="mb-2 text-gray-500">{product.category}</div>
            <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
            
            <div className="mb-4">
              {product.originalPrice ? (
                <div className="flex items-center">
                  <span className="text-gray-400 line-through mr-2 text-lg">
                    ₹{product.originalPrice.toLocaleString()}
                  </span>
                  <span className="font-bold text-red-600 text-2xl">
                    ₹{product.price.toLocaleString()}
                  </span>
                </div>
              ) : (
                <span className="font-bold text-2xl">
                  ₹{product.price.toLocaleString()}
                </span>
              )}
            </div>
            
            <p className="text-gray-600 mb-6">
              {product.description || 'No description available for this product.'}
            </p>
            
            {/* Size Selector */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mb-6">
                <div className="text-sm font-medium text-gray-700 mb-2">Size:</div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      className={`w-10 h-10 rounded-md flex items-center justify-center text-sm transition-all ${
                        selectedSize === size 
                          ? 'bg-brand-black text-white font-medium' 
                          : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                      }`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {/* Quantity Selector */}
            <div className="mb-6">
              <div className="text-sm font-medium text-gray-700 mb-2">Quantity:</div>
              <div className="flex items-center">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-l-md"
                  disabled={quantity <= 1}
                >
                  <ChevronLeft size={20} />
                </button>
                <div className="w-14 h-10 flex items-center justify-center border-t border-b border-gray-300">
                  {quantity}
                </div>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-r-md"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex space-x-4 mt-auto">
              <button 
                onClick={handleAddToCart}
                className="flex-1 bg-amber-400 text-brand-black font-medium py-3 px-6 rounded-md flex items-center justify-center hover:bg-amber-500 transition-colors"
              >
                <ShoppingCart size={20} className="mr-2" />
                Add to Cart
              </button>
              
              <button 
                onClick={toggleFavorite}
                className={`w-12 h-12 flex items-center justify-center rounded-md transition-colors ${
                  isFavorite 
                    ? 'bg-red-100 text-red-500' 
                    : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                }`}
              >
                <Heart 
                  size={20} 
                  className={isFavorite ? 'fill-red-500' : ''} 
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
