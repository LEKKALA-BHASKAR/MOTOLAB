
import { useState } from 'react';
import { 
  Plus, Search, Edit, Trash2, X, Check, ChevronDown 
} from 'lucide-react';
import { categories, products as initialProducts, Product } from '@/lib/data';
import { toast } from 'sonner';

const ProductsAdmin = () => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [sortBy, setSortBy] = useState('name-asc');
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: '',
    price: 0,
    image: '',
    category: 'Helmets',
    isNew: false,
    isFeatured: false,
    isOnSale: false,
    sizes: [],
    description: ''
  });

  // Filter and sort products
  const filteredProducts = products
    .filter(product => 
      (categoryFilter === 'All' || product.category === categoryFilter) &&
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        default:
          return 0;
      }
    });

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.price || !newProduct.image) {
      toast.error('Please fill in all required fields');
      return;
    }

    const newProductWithId: Product = {
      id: Math.max(...products.map(p => p.id)) + 1,
      name: newProduct.name!,
      price: Number(newProduct.price),
      originalPrice: newProduct.originalPrice ? Number(newProduct.originalPrice) : undefined,
      image: newProduct.image!,
      category: newProduct.category!,
      isNew: newProduct.isNew || false,
      isFeatured: newProduct.isFeatured || false,
      isOnSale: newProduct.isOnSale || false,
      sizes: newProduct.sizes || [],
      description: newProduct.description || ''
    };

    setProducts([...products, newProductWithId]);
    setIsAddingProduct(false);
    setNewProduct({
      name: '',
      price: 0,
      image: '',
      category: 'Helmets',
      isNew: false,
      isFeatured: false,
      isOnSale: false,
      sizes: [],
      description: ''
    });
    toast.success('Product added successfully');
  };

  const handleDeleteProduct = (id: number) => {
    setProducts(products.filter(product => product.id !== id));
    toast.success('Product deleted successfully');
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Products Management</h1>
        <button
          onClick={() => setIsAddingProduct(true)}
          className="flex items-center bg-brand-yellow text-brand-black px-4 py-2 rounded-lg shadow hover:brightness-105 transition-all"
        >
          <Plus size={18} className="mr-2" />
          Add Product
        </button>
      </div>

      {/* Filters row */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search products..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-yellow"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="w-full md:w-64">
          <select
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-yellow"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="All">All Categories</option>
            {categories.map(category => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        
        <div className="w-full md:w-64">
          <select
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-yellow"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="name-asc">Name (A-Z)</option>
            <option value="name-desc">Name (Z-A)</option>
            <option value="price-asc">Price (Low to High)</option>
            <option value="price-desc">Price (High to Low)</option>
          </select>
        </div>
      </div>

      {/* Products table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredProducts.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <img src={product.image} alt={product.name} className="h-12 w-12 object-cover rounded" />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{product.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{product.category}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">₹{product.price.toLocaleString()}</div>
                  {product.originalPrice && (
                    <div className="text-xs text-gray-500 line-through">₹{product.originalPrice.toLocaleString()}</div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex space-x-1">
                    {product.isNew && (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        New
                      </span>
                    )}
                    {product.isFeatured && (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                        Featured
                      </span>
                    )}
                    {product.isOnSale && (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                        Sale
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-indigo-600 hover:text-indigo-900 mr-3">
                    <Edit size={18} />
                  </button>
                  <button 
                    className="text-red-600 hover:text-red-900"
                    onClick={() => handleDeleteProduct(product.id)}
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Product Modal */}
      {isAddingProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Add New Product</h2>
              <button 
                onClick={() => setIsAddingProduct(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="col-span-2 md:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Product Name*</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-yellow"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)*</label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-yellow"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({...newProduct, price: Number(e.target.value)})}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Original Price (₹)</label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-yellow"
                  value={newProduct.originalPrice || ''}
                  onChange={(e) => setNewProduct({...newProduct, originalPrice: Number(e.target.value)})}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category*</label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-yellow"
                  value={newProduct.category}
                  onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                  required
                >
                  {categories.map(category => (
                    <option key={category.id} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Image URL*</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-yellow"
                  value={newProduct.image}
                  onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}
                  required
                />
              </div>
              
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-yellow"
                  rows={3}
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                ></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sizes (comma separated)</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-yellow"
                  placeholder="S, M, L, XL"
                  value={newProduct.sizes?.join(', ') || ''}
                  onChange={(e) => setNewProduct({
                    ...newProduct, 
                    sizes: e.target.value.split(',').map(size => size.trim()).filter(Boolean)
                  })}
                />
              </div>
              
              <div className="flex space-x-4 items-center">
                <div className="flex items-center">
                  <input
                    id="isNew"
                    type="checkbox"
                    className="h-4 w-4 text-brand-yellow focus:ring-brand-yellow border-gray-300 rounded"
                    checked={newProduct.isNew || false}
                    onChange={(e) => setNewProduct({...newProduct, isNew: e.target.checked})}
                  />
                  <label htmlFor="isNew" className="ml-2 block text-sm text-gray-700">
                    New
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    id="isFeatured"
                    type="checkbox"
                    className="h-4 w-4 text-brand-yellow focus:ring-brand-yellow border-gray-300 rounded"
                    checked={newProduct.isFeatured || false}
                    onChange={(e) => setNewProduct({...newProduct, isFeatured: e.target.checked})}
                  />
                  <label htmlFor="isFeatured" className="ml-2 block text-sm text-gray-700">
                    Featured
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    id="isOnSale"
                    type="checkbox"
                    className="h-4 w-4 text-brand-yellow focus:ring-brand-yellow border-gray-300 rounded"
                    checked={newProduct.isOnSale || false}
                    onChange={(e) => setNewProduct({...newProduct, isOnSale: e.target.checked})}
                  />
                  <label htmlFor="isOnSale" className="ml-2 block text-sm text-gray-700">
                    On Sale
                  </label>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                onClick={() => setIsAddingProduct(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-brand-yellow text-brand-black rounded-md hover:brightness-105"
                onClick={handleAddProduct}
              >
                Add Product
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsAdmin;
