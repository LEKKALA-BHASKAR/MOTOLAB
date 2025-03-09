import { Link } from 'react-router-dom';
import { categories } from '@/lib/data';

// Category images (these would ideally come from your data)
const categoryImages = {
  "Helmets": "/helmet.webp",
  "Riding Gears": "riding.jpg",
  "Luggage and Touring": "bike.jpg",
  "Motorcycle Accessories": "Motorcycle Accessories.webp",
  "Offer Sale": "budget.webp",
  "Others": "favicon.ico",
};

const CategoryCard = ({ category }: { category: typeof categories[0] }) => {
  const slug = category.name.toLowerCase().replace(/\s+/g, '-');
  const image = categoryImages[category.name as keyof typeof categoryImages] || '';

  return (
    <Link to={`/category/${slug}`} className="group relative block rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500">
      <div className="aspect-[4/3] bg-gray-200">
        <img
          src={image}
          alt={category.name}
          className="w-full h-full object-cover transform group-hover:scale-110 group-hover:brightness-110 transition-all duration-700"
        />
      </div>
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent flex flex-col justify-end p-6">
        <h3 className="text-2xl font-extrabold text-white tracking-tight drop-shadow-md">
          {category.name}
        </h3>
        <p className="mt-2 text-amber-400 font-medium opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
          Explore Now →
        </p>
      </div>
      {/* Subtle Border Animation */}
      <div className="absolute inset-0 border-2 border-amber-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl pointer-events-none" />
    </Link>
  );
};

const CategoryGrid = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-extrabold text-center mb-16 text-gray-900 tracking-wide animate-fade-in">
          Shop By Category
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {categories.map((category, index) => (
            <div
              key={category.id}
              className="animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CategoryCard category={category} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;