
import { ChevronDown, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Category } from '@/lib/data';
import { cn } from '@/lib/utils';

interface CategoryDropdownProps {
  category: Category;
  isExpanded: boolean;
  onToggle: () => void;
}

export const CategoryDropdown = ({ 
  category, 
  isExpanded, 
  onToggle 
}: CategoryDropdownProps) => {
  const categorySlug = category.name.toLowerCase().replace(/\s+/g, '-');
  
  return (
    <div className="mb-1">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-2 px-3 hover:bg-gray-800 rounded transition-colors"
      >
        <span className="flex items-center">
          <span className="category-text">{category.name}</span>
        </span>
        {isExpanded ? (
          <ChevronDown size={16} className="text-gray-400" />
        ) : (
          <ChevronRight size={16} className="text-gray-400" />
        )}
      </button>
      
      {isExpanded && category.subcategories && (
        <div className="pl-4 mt-1 animate-accordion-down">
          {category.subcategories.map(subcategory => (
            <Link
              key={subcategory.id}
              to={`/category/${categorySlug}?subcategory=${subcategory.name.toLowerCase().replace(/\s+/g, '-')}`}
              className="block py-1.5 px-3 text-sm text-gray-300 hover:text-amber-400 transition-colors"
            >
              {subcategory.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
