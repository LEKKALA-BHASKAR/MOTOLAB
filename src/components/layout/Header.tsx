import { useState } from 'react';
import { ShoppingCart, User, Search, ChevronDown, Menu, X } from 'lucide-react';
import { vehicles } from '@/lib/data';
import { ThreeJSWheel } from '@/lib/3d/ThreeJSScene';
import { useIsMobile } from '@/hooks/use-mobile';
import { useEffect } from "react"
import { CartDrawer } from '@/components/cart/CartDrawer';
import { useCart } from '@/contexts/CartContext';
import { Link } from 'react-router-dom';
import { LogOut } from "lucide-react"

import axios from "axios"

const Header = () => {
  const { getCartCount, getCartTotal } = useCart();
  const [isVehicleDropdownOpen, setIsVehicleDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const [userData, setUserData] = useState({})

  const getUser = async () => {
    try {
      const res = await axios.get("http://localhost:8000/login/success",
        { withCredentials: true }
      )
      setUserData(res.data.user)
    } catch (error) {
      console.log(`Error: ${error}`)
    }
  }

  const logout = () => {
    window.open("http://localhost:8000/logout", "_self")
  }

  const isMobile = useIsMobile();

  useEffect(() => {
    getUser()
    console.log(`user_data: ${JSON.stringify(userData)}`)
  }, [])

  return (
    <header className="bg-brand-yellow py-4 px-6 shadow-md sticky top-0 z-50">

      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          {/* Logo and 3D wheel */}
          <Link to="/" className="flex items-center space-x-2 hover-scale">
            <div className="hidden sm:block">
              <ThreeJSWheel size={60} containerClass="w-14 h-14" />
            </div>
            <h1 className="text-brand-black font-bold text-2xl">MOTO LAB </h1>
          </Link>

          {/* Mobile menu toggle and Cart/Admin buttons */}
          <div className="flex items-center space-x-4">
            {/* Cart and Admin buttons (always visible on mobile) */}
            {isMobile && (
              <>
                <Link to="/admin" className="text-brand-black hover-scale">
                  <User size={24} />
                </Link>
                <button
                  className="relative text-brand-black hover-scale"
                  onClick={() => setIsCartOpen(true)}
                >
                  <ShoppingCart size={24} />
                  <span className="absolute -top-2 -right-2 bg-brand-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {getCartCount()}
                  </span>
                </button>
              </>
            )}

            {/* Mobile menu toggle button */}
            {isMobile && (
              <button
                className="p-2 text-brand-black"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            )}
          </div>

          {/* Desktop navigation */}
          {!isMobile && (
            <div className="flex items-center space-x-6">
              {/* Vehicle dropdown */}
              <div className="relative">
                <button
                  className="flex items-center space-x-1 text-brand-black hover-scale"
                  onClick={() => setIsVehicleDropdownOpen(!isVehicleDropdownOpen)}
                >
                  <span>Shop by Vehicle</span>
                  <ChevronDown size={16} className={`transform transition-transform duration-300 ${isVehicleDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {isVehicleDropdownOpen && (
                  <div className="absolute top-full left-0 mt-2 w-56 bg-white shadow-xl rounded-md py-2 z-50 animate-fade-in">
                    {vehicles.map((vehicle) => (
                      <a
                        key={vehicle.id}
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 hover:text-brand-yellow transition-colors"
                      >
                        {vehicle.name}
                      </a>
                    ))}
                  </div>
                )}
              </div>

              {/* Search bar */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for products..."
                  className="w-64 py-2 px-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-yellow"
                />
                <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              </div>

              {/* User and Cart icons */}
              <div className="flex items-center space-x-4">
                {
                  Object.keys(userData)?.length > 0 ? (<>
                    <li className="list-none" onClick={logout} ><LogOut /></li>
                  </>) : (<><Link to="/login" className="text-brand-black hover-scale">
                    <User size={24} />
                  </Link></>)
                }
                <button
                  className="relative text-brand-black hover-scale"
                  onClick={() => setIsCartOpen(true)}
                >
                  <ShoppingCart size={24} />
                  <span className="absolute -top-2 -right-2 bg-brand-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {getCartCount()}
                  </span>
                </button>
                <div className="text-xs">
                  <p>₹{getCartTotal().toLocaleString()}</p>
                  <p>{getCartCount()} items</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Mobile menu */}
        {isMobile && isMobileMenuOpen && (
          <div className="pt-4 animate-fade-in">
            <div className="relative mb-4">
              <input
                type="text"
                placeholder="Search for products..."
                className="w-full py-2 px-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-yellow"
              />
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            </div>

            <div className="mb-4">
              <button
                className="flex items-center space-x-1 text-brand-black w-full py-2 border-b border-gray-200"
                onClick={() => setIsVehicleDropdownOpen(!isVehicleDropdownOpen)}
              >
                <span>Shop by Vehicle</span>
                <ChevronDown size={16} className={`ml-1 transform transition-transform duration-300 ${isVehicleDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {isVehicleDropdownOpen && (
                <div className="py-2 pl-4 animate-fade-in">
                  {vehicles.map((vehicle) => (
                    <a
                      key={vehicle.id}
                      href="#"
                      className="block py-2 text-sm text-gray-800"
                    >
                      {vehicle.name}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />
    </header>
  );
};

export default Header;