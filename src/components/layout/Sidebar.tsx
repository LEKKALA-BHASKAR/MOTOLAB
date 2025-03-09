
import { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { categories } from '@/lib/data';
import { CategoryDropdown } from '@/components/ui/CategoryDropdown';

const Sidebar = () => {
  const [expandedCategories, setExpandedCategories] = useState<number[]>([]);

  const toggleCategory = (categoryId: number) => {
    setExpandedCategories(prev => 
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  return (
    <aside className="w-full md:w-64 bg-brand-black text-white p-4 rounded-lg">
      <h2 className="text-lg font-bold mb-4 border-b border-gray-700 pb-2">Product Categories</h2>
      
      <div className="space-y-2">
        {categories.map(category => (
          <CategoryDropdown 
            key={category.id} 
            category={category} 
            isExpanded={expandedCategories.includes(category.id)}
            onToggle={() => toggleCategory(category.id)}
          />
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
