import React from "react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext"; // Import cart context
import { Product } from "@/lib/data";
import Header from '@/components/layout/Header';
const sampleProducts: Product[] = [
  {
      id: 1,
      name: "Smartphone",
      price: 29999,
      image: "https://via.placeholder.com/150",
      category: ""
  },
  {
      id: 2,
      name: "Laptop",
      price: 59999,
      image: "https://via.placeholder.com/150",
      category: ""
  },
  {
    id: 3,
    name: "Headphones",
    price: 1999,
    image: "https://via.placeholder.com/150",
    category: ""
  },
];

const ProductPage: React.FC = () => {
  const { addToCart, cartItems, removeFromCart } = useCart();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {sampleProducts.map((product) => (
          <div key={product.id} className="border p-4 rounded-lg shadow-lg">
            <img src={product.image} alt={product.name} className="w-full h-40 object-cover mb-4" />
            <h2 className="text-lg font-semibold">{product.name}</h2>
            <p className="text-gray-600">₹{product.price}</p>
            <Button onClick={() => addToCart(product, 1)} className="mt-2 w-full">
              Add to Cart
            </Button>
          </div>
        ))}
      </div>

     
    </div>
  );
};

export default ProductPage;
