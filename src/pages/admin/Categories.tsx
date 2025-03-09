
import { useState } from 'react';
import { 
  Plus, Search, Edit, Trash2, X, Check, ChevronDown, Layers, AlertTriangle
} from 'lucide-react';
import { categories as initialCategories, Category } from '@/lib/data';
import { toast } from 'sonner';

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingCategoryId, setEditingCategoryId] = useState<number | null>(null);
  const [newCategory, setNewCategory] = useState<Partial<Category>>({
    name: '',
    icon: 'list',
    subcategories: []
  });
  const [newSubcategoryName, setNewSubcategoryName] = useState('');

  // Filter categories
  const filteredCategories = categories.filter(category => 
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddCategory = () => {
    if (!newCategory.name) {
      toast.error('Please enter a category name');
      return;
    }

    const newCategoryWithId: Category = {
      id: Math.max(...categories.map(c => c.id)) + 1,
      name: newCategory.name,
      icon: newCategory.icon || 'list',
      subcategories: newCategory.subcategories || []
    };

    setCategories([...categories, newCategoryWithId]);
    setIsAddingCategory(false);
    setNewCategory({
      name: '',
      icon: 'list',
      subcategories: []
    });
    toast.success('Category added successfully');
  };

  const handleEditCategory = (categoryId: number) => {
    setEditingCategoryId(categoryId);
    const categoryToEdit = categories.find(c => c.id === categoryId);
    if (categoryToEdit) {
      setNewCategory({
        name: categoryToEdit.name,
        icon: categoryToEdit.icon,
        subcategories: categoryToEdit.subcategories || []
      });
    }
  };

  const handleSaveEdit = () => {
    if (editingCategoryId === null) return;
    
    if (!newCategory.name) {
      toast.error('Please enter a category name');
      return;
    }

    const updatedCategories = categories.map(category => {
      if (category.id === editingCategoryId) {
        return {
          ...category,
          name: newCategory.name!,
          icon: newCategory.icon || 'list',
          subcategories: newCategory.subcategories || []
        };
      }
      return category;
    });

    setCategories(updatedCategories);
    setEditingCategoryId(null);
    setNewCategory({
      name: '',
      icon: 'list',
      subcategories: []
    });
    toast.success('Category updated successfully');
  };

  const handleCancelEdit = () => {
    setEditingCategoryId(null);
    setNewCategory({
      name: '',
      icon: 'list',
      subcategories: []
    });
  };

  const handleDeleteCategory = (id: number) => {
    setCategories(categories.filter(category => category.id !== id));
    toast.success('Category deleted successfully');
  };

  const handleAddSubcategory = () => {
    if (!newSubcategoryName) {
      toast.error('Please enter a subcategory name');
      return;
    }

    const newSubId = Math.max(...categories.flatMap(c => c.subcategories || []).map(s => s.id), 0) + 1;
    const newSubcategory = { id: newSubId, name: newSubcategoryName };
    
    setNewCategory({
      ...newCategory,
      subcategories: [...(newCategory.subcategories || []), newSubcategory]
    });
    
    setNewSubcategoryName('');
  };

  const handleRemoveSubcategory = (subId: number) => {
    setNewCategory({
      ...newCategory,
      subcategories: newCategory.subcategories?.filter(sub => sub.id !== subId) || []
    });
  };

  const availableIcons = [
    { name: 'Helmet', value: 'helmet' },
    { name: 'Shirt', value: 'shirt' },
    { name: 'Luggage', value: 'luggage' },
    { name: 'Wrench', value: 'wrench' },
    { name: 'Tag', value: 'tag' },
    { name: 'List', value: 'list' }
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Categories Management</h1>
        <button
          onClick={() => setIsAddingCategory(true)}
          className="flex items-center bg-brand-yellow text-brand-black px-4 py-2 rounded-lg shadow hover:brightness-105 transition-all"
        >
          <Plus size={18} className="mr-2" />
          Add Category
        </button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search categories..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-yellow"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Categories table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Icon</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subcategories</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredCategories.map((category) => (
              <tr key={category.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-gray-500">
                    <Layers size={24} />
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{category.name}</div>
                  <div className="text-xs text-gray-500">Icon: {category.icon}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-1">
                    {category.subcategories && category.subcategories.length > 0 ? (
                      category.subcategories.map(sub => (
                        <span key={sub.id} className="px-2 py-1 bg-gray-100 text-xs rounded-full">
                          {sub.name}
                        </span>
                      ))
                    ) : (
                      <span className="text-gray-400 text-sm">No subcategories</span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button 
                    className="text-indigo-600 hover:text-indigo-900 mr-3"
                    onClick={() => handleEditCategory(category.id)}
                  >
                    <Edit size={18} />
                  </button>
                  <button 
                    className="text-red-600 hover:text-red-900"
                    onClick={() => handleDeleteCategory(category.id)}
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
            {filteredCategories.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                  <div className="flex flex-col items-center py-6">
                    <AlertTriangle size={36} className="text-gray-400 mb-2" />
                    <p>No categories found matching your search.</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Category Modal */}
      {(isAddingCategory || editingCategoryId !== null) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">
                {editingCategoryId !== null ? 'Edit Category' : 'Add New Category'}
              </h2>
              <button 
                onClick={() => editingCategoryId !== null ? handleCancelEdit() : setIsAddingCategory(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category Name*</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-yellow"
                  value={newCategory.name}
                  onChange={(e) => setNewCategory({...newCategory, name: e.target.value})}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Icon</label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-yellow"
                  value={newCategory.icon}
                  onChange={(e) => setNewCategory({...newCategory, icon: e.target.value})}
                >
                  {availableIcons.map(icon => (
                    <option key={icon.value} value={icon.value}>
                      {icon.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subcategories</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {newCategory.subcategories && newCategory.subcategories.length > 0 ? (
                    newCategory.subcategories.map(sub => (
                      <div key={sub.id} className="flex items-center bg-gray-100 px-2 py-1 rounded-full text-sm">
                        <span>{sub.name}</span>
                        <button 
                          onClick={() => handleRemoveSubcategory(sub.id)}
                          className="ml-1 text-gray-500 hover:text-red-500"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))
                  ) : (
                    <div className="text-gray-400 text-sm">No subcategories added</div>
                  )}
                </div>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="Add subcategory"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-yellow"
                    value={newSubcategoryName}
                    onChange={(e) => setNewSubcategoryName(e.target.value)}
                  />
                  <button
                    onClick={handleAddSubcategory}
                    className="px-3 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
                  >
                    <Plus size={18} />
                  </button>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <button
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                onClick={() => editingCategoryId !== null ? handleCancelEdit() : setIsAddingCategory(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-brand-yellow text-brand-black rounded-md hover:brightness-105"
                onClick={editingCategoryId !== null ? handleSaveEdit : handleAddCategory}
              >
                {editingCategoryId !== null ? 'Save Changes' : 'Add Category'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Categories;
