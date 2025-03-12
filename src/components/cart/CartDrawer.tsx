import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductPage from '@/pages/ProductPage';
import { 
  ShoppingCart, X, Trash2, Plus, Minus, 
  CreditCard, ShoppingBag 
} from "lucide-react";
import { useCart, CartItem } from "@/contexts/CartContext";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CartDrawer = ({ isOpen, onClose }: CartDrawerProps) => {
  const navigate = useNavigate();
  const { 
    cartItems, 
    removeFromCart, 
    updateQuantity, 
    clearCart, 
    getCartTotal, 
    getCartCount 
  } = useCart();
  
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      clearCart();
      setIsCheckingOut(false);
      onClose();
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-60 transition-opacity duration-300">
      <div 
        className="fixed inset-y-0 right-0 flex max-w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-screen max-w-md transform transition-all ease-in-out duration-300 translate-x-0">
          <div className="flex h-full flex-col bg-gradient-to-b from-white to-gray-50 shadow-2xl rounded-l-lg">
            
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 bg-gradient-to-r from-yellow-400 to-yellow-500">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center tracking-tight">
                <ShoppingCart className="mr-3" size={28} />
                Your Cart
                <span className="ml-3 bg-gray-900 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {getCartCount()}
                </span>
              </h2>
              <button
                onClick={onClose}
                className="p-2 rounded-full bg-gray-900 text-white hover:bg-gray-700 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Cart Content */}
            <div className="flex-1 overflow-y-auto px-6 py-8">
              {cartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-64 animate-fade-in">
                  <ShoppingBag size={80} className="text-gray-300 mb-6 animate-bounce" />
                  <p className="text-xl font-medium text-gray-600">Your cart is empty</p>
                  <button
                    onClick={() => {
                      onClose(); // Close modal
                      navigate("/ProductPage"); // Navigate to Products Page
                    }}
                    className="mt-6 px-6 py-3 bg-yellow-500 text-gray-900 font-semibold rounded-full hover:bg-yellow-600 transition-all shadow-md"
                  >
                    Shop Now
                  </button>
                </div>
              ) : (
                <ul className="divide-y divide-gray-200 animate-fade-in">
                  {cartItems.map((item) => (
                    <CartItemRow 
                      key={`${item.id}-${item.size || 'default'}`} 
                      item={item} 
                      onRemove={() => removeFromCart(item.id)}
                      onUpdateQuantity={(qty) => updateQuantity(item.id, qty)}
                    />
                  ))}
                </ul>
              )}
            </div>

            {/* Footer (Checkout Section) */}
            {cartItems.length > 0 && (
              <div className="border-t border-gray-200 px-6 py-6 bg-white shadow-inner">
                <div className="flex justify-between text-lg font-semibold text-gray-900 mb-4">
                  <p>Subtotal</p>
                  <p className="text-yellow-600">₹{getCartTotal().toLocaleString()}</p>
                </div>
                <p className="text-sm text-gray-500 mb-6 italic">
                  Shipping & taxes added at checkout
                </p>
                <button
                  disabled={isCheckingOut}
                  onClick={handleCheckout}
                  className={`w-full flex items-center justify-center px-6 py-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 font-bold rounded-full shadow-lg hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 ${
                    isCheckingOut ? "opacity-60 cursor-not-allowed" : ""
                  }`}
                >
                  {isCheckingOut ? (
                    <span className="flex items-center">
                      <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    <>
                      <CreditCard size={20} className="mr-2" />
                      Checkout Now
                    </>
                  )}
                </button>
                <button
                  onClick={clearCart}
                  className="mt-4 w-full flex items-center justify-center text-sm text-red-600 hover:text-red-700 font-medium transition-colors"
                >
                  <Trash2 size={18} className="mr-2" />
                  Clear Cart
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

interface CartItemRowProps {
  item: CartItem;
  onRemove: () => void;
  onUpdateQuantity: (quantity: number) => void;
}

const CartItemRow = ({ item, onRemove, onUpdateQuantity }: CartItemRowProps) => {
  return (
    <li className="flex py-6 transition-all hover:bg-gray-50 rounded-lg px-4">
      <div className="h-28 w-28 flex-shrink-0 overflow-hidden rounded-xl border border-gray-200 shadow-sm">
        <img
          src={item.image}
          alt={item.name}
          className="h-full w-full object-cover object-center transition-transform hover:scale-105"
        />
      </div>

      <div className="ml-6 flex flex-1 flex-col">
        <div className="flex justify-between text-lg font-semibold text-gray-900">
          <h3 className="truncate max-w-[70%]">{item.name}</h3>
          <p className="text-yellow-600">₹{(item.price * item.quantity).toLocaleString()}</p>
        </div>
        <p className="mt-1 text-sm text-gray-600">
          {item.category} {item.size && <span className="ml-1 italic">- Size: {item.size}</span>}
        </p>
        
        <div className="flex flex-1 items-end justify-between text-sm mt-4">
          <div className="flex items-center bg-gray-100 rounded-full p-1 shadow-sm">
            <button 
              onClick={() => onUpdateQuantity(item.quantity - 1)}
              className="p-2 rounded-full hover:bg-gray-200 transition-colors"
            >
              <Minus size={16} className="text-gray-700" />
            </button>
            <span className="px-4 py-1 font-medium text-gray-900">{item.quantity}</span>
            <button 
              onClick={() => onUpdateQuantity(item.quantity + 1)}
              className="p-2 rounded-full hover:bg-gray-200 transition-colors"
            >
              <Plus size={16} className="text-gray-700" />
            </button>
          </div>

          <button
            className="flex items-center text-red-600 hover:text-red-700 font-medium transition-colors"
            onClick={onRemove}
          >
            <Trash2 size={16} className="mr-1" />
            Remove
          </button>
        </div>
      </div>
    </li>
  );
};
