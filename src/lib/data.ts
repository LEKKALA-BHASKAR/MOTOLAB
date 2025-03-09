
export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  isNew?: boolean;
  isFeatured?: boolean;
  isOnSale?: boolean;
  sizes?: string[];
  description?: string;
}

export interface Category {
  id: number;
  name: string;
  icon: string;
  subcategories?: { id: number; name: string }[];
}

export interface Vehicle {
  id: number;
  name: string;
}

export const vehicles: Vehicle[] = [
  { id: 1, name: "Triumph Speed 400" },
  { id: 2, name: "Royal Enfield Hunter 350" },
  { id: 3, name: "Royal Enfield Classic 350" },
  { id: 4, name: "Bajaj Dominar 400" },
  { id: 5, name: "KTM Duke 390" },
  { id: 6, name: "Honda CB300F" },
];

export const categories: Category[] = [
  {
    id: 1,
    name: "Helmets",
    icon: "helmet",
    subcategories: [
      { id: 101, name: "Axor" },
      { id: 102, name: "SMK" },
      { id: 103, name: "Bilmola" },
      { id: 104, name: "MT Helmets" },
    ],
  },
  {
    id: 2,
    name: "Riding Gears",
    icon: "shirt",
    subcategories: [
      { id: 201, name: "Boots" },
      { id: 202, name: "Gloves" },
      { id: 203, name: "Jackets" },
      { id: 204, name: "Pants" },
    ],
  },
  {
    id: 3,
    name: "Luggage and Touring",
    icon: "luggage",
    subcategories: [
      { id: 301, name: "Saddlebags" },
      { id: 302, name: "Tank Bags" },
      { id: 303, name: "Tail Bags" },
      { id: 304, name: "Panniers" },
    ],
  },
  {
    id: 4,
    name: "Motorcycle Accessories",
    icon: "wrench",
    subcategories: [
      { id: 401, name: "Bike Protection" },
      { id: 402, name: "Lighting" },
      { id: 403, name: "GPS Devices" },
      { id: 404, name: "Phone Mounts" },
    ],
  },
  {
    id: 5,
    name: "Offer Sale",
    icon: "tag",
    subcategories: [
      { id: 501, name: "Clearance" },
      { id: 502, name: "End of Season" },
      { id: 503, name: "Bundle Deals" },
    ],
  },
  {
    id: 6,
    name: "Others",
    icon: "list",
    subcategories: [
      { id: 601, name: "Maintenance" },
      { id: 602, name: "Tools" },
      { id: 603, name: "Gifts" },
    ],
  },
];

export const products: Product[] = [
  {
    id: 1,
    name: "Axor Apex Hunter Helmet",
    price: 8990,
    originalPrice: 10990,
    image: "https://images.unsplash.com/photo-1599408883328-e6d0ed516204?q=80&w=800&auto=format&fit=crop",
    category: "Helmets",
    isOnSale: true,
    isFeatured: true,
    sizes: ["S", "M", "L", "XL"],
    description: "Premium quality full-face helmet with advanced ventilation and aerodynamic design."
  },
  {
    id: 2,
    name: "Riding Leather Gloves",
    price: 2499,
    image: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?q=80&w=800&auto=format&fit=crop",
    category: "Riding Gears",
    isNew: true,
    sizes: ["M", "L", "XL"],
    description: "Genuine leather riding gloves with knuckle protection and touchscreen compatibility."
  },
  {
    id: 3,
    name: "N-Gage Performance Air Filter",
    price: 1450,
    originalPrice: 1850,
    image: "https://images.unsplash.com/photo-1635073908681-b4dfb0be83e3?q=80&w=800&auto=format&fit=crop",
    category: "Motorcycle Accessories",
    isNew: true,
    isOnSale: true,
    description: "High-flow air filter for improved performance and throttle response."
  },
  {
    id: 4,
    name: "Touring Saddle Bags",
    price: 5499,
    image: "https://images.unsplash.com/photo-1577476384366-5f4d6c1ab943?q=80&w=800&auto=format&fit=crop",
    category: "Luggage and Touring",
    isFeatured: true,
    description: "Waterproof saddle bags with easy mounting system and expandable storage."
  },
  {
    id: 5,
    name: "SMK Carbon Fiber Helmet",
    price: 12999,
    originalPrice: 15999,
    image: "https://images.unsplash.com/photo-1627831784610-04a4b6352162?q=80&w=800&auto=format&fit=crop",
    category: "Helmets",
    isOnSale: true,
    sizes: ["M", "L", "XL"],
    description: "Lightweight carbon fiber helmet with premium interior and superior noise reduction."
  },
  {
    id: 6,
    name: "Riding Jacket All Season",
    price: 8999,
    image: "https://images.unsplash.com/photo-1626264146571-1b3412b869b6?q=80&w=800&auto=format&fit=crop",
    category: "Riding Gears",
    isFeatured: true,
    sizes: ["M", "L", "XL", "XXL"],
    description: "All-weather riding jacket with removable thermal liner and CE level 2 armor."
  },
  {
    id: 7,
    name: "LED Auxiliary Lights",
    price: 3999,
    originalPrice: 4999,
    image: "https://images.unsplash.com/photo-1590332926606-8b0f797b6edc?q=80&w=800&auto=format&fit=crop",
    category: "Motorcycle Accessories",
    isOnSale: true,
    isNew: true,
    description: "Bright LED auxiliary lights with aluminum housing and universal mounting brackets."
  },
  {
    id: 8,
    name: "Interceptor 650 Luggage Carrier",
    price: 2499,
    image: "https://images.unsplash.com/photo-1558981333-5b404e84db1b?q=80&w=800&auto=format&fit=crop",
    category: "Luggage and Touring",
    isNew: true,
    description: "Custom-fit luggage carrier for Royal Enfield Interceptor 650 with high load capacity."
  },
];

export const featuredCollections = [
  {
    id: 1,
    title: "N-Gage Products on Sale",
    description: "Premium performance parts at special prices",
    image: "https://images.unsplash.com/photo-1635073908681-b4dfb0be83e3?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "Built for Speed",
    description: "High-performance accessories for sport bikes",
    image: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "Accessories for Triumph Speed 400",
    description: "Custom-fit parts for your Triumph",
    image: "https://images.unsplash.com/photo-1558979159-2b18a4070a87?q=80&w=800&auto=format&fit=crop"
  }
];
