
import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  HardHat, Shirt, Luggage, Wrench, Tag, List, Mail, Menu, X, 
  ChevronDown, Shield, Footprints, Headphones, Umbrella, MapPin, Package, 
  Truck, Bike, Zap, Box, Gift, User
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { categories } from '@/lib/data';
import { useIsMobile } from '@/hooks/use-mobile';

interface Subcategory {
  id: number;
  name: string;
}

interface NavCategory {
  id: number;
  name: string;
  icon: React.ReactNode;
  slug: string;
  subcategories?: Subcategory[];
}

const Navigation = () => {
  const isMobile = useIsMobile();
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLUListElement>(null);
  
  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveCategory(null);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'helmet': return <HardHat />;
      case 'shirt': return <Shirt />;
      case 'luggage': return <Luggage />;
      case 'wrench': return <Wrench />;
      case 'tag': return <Tag />;
      case 'list': return <List />;
      default: return <Package />;
    }
  };

  const navCategories: NavCategory[] = categories.map(category => ({
    ...category,
    icon: getIconComponent(category.icon),
    slug: category.name.toLowerCase().replace(/\s+/g, '-')
  }));

  // Additional contact category
  const contactCategory: NavCategory = {
    id: 99,
    name: "Contact Us",
    icon: <Mail />,
    slug: "contact",
    subcategories: [
      { id: 991, name: "Phone: +91-8825978338" },
      { id: 992, name: "Email: team@MOTO LAB.in" },
      { id: 993, name: "Store Locator" }
    ]
  };

  const allCategories = [...navCategories, contactCategory];

  const toggleCategory = (categoryId: number) => {
    setActiveCategory(activeCategory === categoryId ? null : categoryId);
  };

  // Mapping of main categories to their subcategory sections
  const subcategorySections: Record<string, { title: string, items: string[] }[]> = {
    "Helmets": [
      { 
        title: "Brands", 
        items: ["Axor", "SMK", "Bilmola", "AGV", "Studds", "Vega", "Axxis", "LS2"]
      },
      {
        title: "Types",
        items: ["Full Face", "Modular", "Off-Road", "Open Face"]
      }
    ],
    "Riding Gears": [
      {
        title: "Protective Gear",
        items: ["Jackets", "Pants", "Gloves", "Boots", "Knee Guards"]
      },
      {
        title: "Weather Protection",
        items: ["Rain Layers", "Winter Liners", "Summer Mesh"]
      }
    ],
    "Luggage and Touring": [
      {
        title: "Bags",
        items: ["Tank Bags", "Saddle Bags", "Tail Bags", "Hydration Bags"]
      },
      {
        title: "Mounting",
        items: ["Luggage Carriers", "Saddle Stays", "Top Box", "Panniers"]
      }
    ],
    "Motorcycle Accessories": [
      {
        title: "Performance",
        items: ["Air Filters", "Chain & Sprocket", "Performance Parts"]
      },
      {
        title: "Protection",
        items: ["Crash Guards", "Engine Guards", "Handguards"]
      },
      {
        title: "Utility",
        items: ["Lighting", "GPS Devices", "Phone Mounts"]
      }
    ]
  };

  return (
    <nav className="bg-brand-black py-4 px-6 text-white sticky top-0 z-40">
      <div className="container mx-auto">
        {/* Mobile Navigation */}
        {isMobile && (
          <div className="flex justify-between items-center">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="flex items-center text-white"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              <span className="ml-2">Categories</span>
            </button>
            
            {isMobileMenuOpen && (
              <div className="absolute top-full left-0 w-full bg-brand-black shadow-lg z-50 animate-fade-in">
                <div className="p-4">
                  {allCategories.map((category) => (
                    <div key={category.id} className="mb-4">
                      <button
                        onClick={() => toggleCategory(category.id)}
                        className="flex items-center justify-between w-full py-2 px-4 hover:bg-gray-800 rounded transition-colors"
                      >
                        <div className="flex items-center">
                          <span className="mr-2">{category.icon}</span>
                          <span>{category.name}</span>
                        </div>
                        <ChevronDown 
                          size={16} 
                          className={`transition-transform duration-300 ${
                            activeCategory === category.id ? 'rotate-180' : ''
                          }`} 
                        />
                      </button>
                      
                      {activeCategory === category.id && category.subcategories && (
                        <div className="ml-6 mt-2 space-y-2 animate-fade-in">
                          {category.subcategories.map((subcategory) => (
                            <Link
                              key={subcategory.id}
                              to={category.slug === "contact" ? "#" : `/category/${category.slug}?subcategory=${subcategory.name.toLowerCase().replace(/\s+/g, '-')}`}
                              className="block py-2 px-4 text-gray-300 hover:text-white transition-colors"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              {subcategory.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
        
        {/* Desktop Navigation */}
        {!isMobile && (
          <div className="flex justify-center">
            <ul className="flex space-x-1" ref={dropdownRef}>
              {allCategories.map((category) => (
                <li key={category.id} className="relative group">
                  {category.slug === "contact" ? (
                    <button
                      onClick={() => toggleCategory(category.id)}
                      className={cn(
                        "flex items-center py-2 px-4 rounded-t transition-colors",
                        activeCategory === category.id
                          ? "bg-white text-brand-black"
                          : "hover:bg-gray-800"
                      )}
                    >
                      <span className="mr-2">{category.icon}</span>
                      <span>{category.name}</span>
                      {category.subcategories && (
                        <ChevronDown 
                          size={16} 
                          className={`ml-1 transition-transform duration-300 ${
                            activeCategory === category.id ? 'rotate-180' : ''
                          }`} 
                        />
                      )}
                    </button>
                  ) : (
                    <Link
                      to={`/category/${category.slug}`}
                      className={cn(
                        "flex items-center py-2 px-4 rounded-t transition-colors",
                        activeCategory === category.id
                          ? "bg-white text-brand-black"
                          : "hover:bg-gray-800"
                      )}
                      onClick={(e) => {
                        if (category.subcategories) {
                          e.preventDefault();
                          toggleCategory(category.id);
                        }
                      }}
                    >
                      <span className="mr-2">{category.icon}</span>
                      <span>{category.name}</span>
                      {category.subcategories && (
                        <ChevronDown 
                          size={16} 
                          className={`ml-1 transition-transform duration-300 ${
                            activeCategory === category.id ? 'rotate-180' : ''
                          }`} 
                        />
                      )}
                    </Link>
                  )}
                  
                  {activeCategory === category.id && category.subcategories && (
                    <div className="absolute left-0 w-max min-w-[250px] bg-white text-gray-800 shadow-xl rounded-b-lg animate-fade-in z-50">
                      {category.name === "Contact Us" ? (
                        <div className="p-6">
                          <div className="flex items-center mb-3">
                            <MapPin size={18} className="mr-2 text-gray-500" />
                            <p className="text-sm">Chennai, Tamil Nadu, India</p>
                          </div>
                          {category.subcategories.map((subcategory) => (
                            <a
                              key={subcategory.id}
                              href="#"
                              className="flex items-center py-2 hover:text-amber-500 transition-colors"
                            >
                              {subcategory.name.includes("Phone") ? (
                                <Phone subcategory={subcategory} />
                              ) : subcategory.name.includes("Email") ? (
                                <Email subcategory={subcategory} />
                              ) : (
                                <Store subcategory={subcategory} />
                              )}
                            </a>
                          ))}
                        </div>
                      ) : (
                        <div className="p-6">
                          {subcategorySections[category.name] ? (
                            <div className="grid grid-cols-2 gap-8">
                              {subcategorySections[category.name].map((section, idx) => (
                                <div key={idx}>
                                  <h4 className="font-medium text-gray-900 mb-3">{section.title}</h4>
                                  <ul className="space-y-2">
                                    {section.items.map((item, itemIdx) => (
                                      <li key={itemIdx}>
                                        <a 
                                          href="#" 
                                          className="text-gray-600 hover:text-amber-500 transition-colors"
                                        >
                                          {item}
                                        </a>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <ul className="space-y-2">
                              {category.subcategories.map((subcategory) => (
                                <li key={subcategory.id}>
                                  <a
                                    href="#"
                                    className="block py-2 text-gray-600 hover:text-amber-500 transition-colors"
                                  >
                                    {subcategory.name}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

// Helper components for contact section
const Phone = ({ subcategory }: { subcategory: Subcategory }) => (
  <>
    <Headphones size={18} className="mr-2 text-gray-500" />
    <span>{subcategory.name}</span>
  </>
);

const Email = ({ subcategory }: { subcategory: Subcategory }) => (
  <>
    <Mail size={18} className="mr-2 text-gray-500" />
    <span>{subcategory.name}</span>
  </>
);

const Store = ({ subcategory }: { subcategory: Subcategory }) => (
  <>
    <MapPin size={18} className="mr-2 text-gray-500" />
    <span>{subcategory.name}</span>
  </>
);

export default Navigation;
