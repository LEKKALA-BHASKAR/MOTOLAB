
import { useState } from 'react';
import { 
  HardHat, Shirt, Luggage, Wrench, Tag, List, Mail, 
  PlusCircle, PackageOpen, LayoutDashboard, Users, Settings, LogOut, LockKeyhole,
  ShoppingCart, Layers, BarChart
} from 'lucide-react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'sonner';

const sidebarItems = [
  { name: 'Dashboard', icon: LayoutDashboard, path: '/admin/dashboard' },
  { name: 'Products', icon: PackageOpen, path: '/admin/products' },
  { name: 'Categories', icon: Layers, path: '/admin/categories' },
  { name: 'Users', icon: Users, path: '/admin/users' },
  { name: 'Orders', icon: ShoppingCart, path: '/admin/orders' },
  { name: 'Settings', icon: Settings, path: '/admin/settings' },
];

const categoryIcons: Record<string, any> = {
  'Helmets': HardHat,
  'Riding Gears': Shirt,
  'Luggage and Touring': Luggage,
  'Motorcycle Accessories': Wrench,
  'Offer Sale': Tag,
  'Others': List,
};

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleLogout = () => {
    toast.success('Logged out successfully');
    navigate('/admin');
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`bg-brand-black text-white ${isCollapsed ? 'w-20' : 'w-64'} transition-all duration-300 shadow-lg`}>
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center justify-center">
            {!isCollapsed && <h1 className="text-xl font-bold">Admin Panel</h1>}
            {isCollapsed && <LockKeyhole className="h-8 w-8 text-amber-400" />}
          </div>
        </div>

        <nav className="mt-6">
          {sidebarItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center py-3 px-4 ${
                isActive(item.path) 
                  ? 'bg-amber-400 text-brand-black' 
                  : 'text-gray-300 hover:bg-gray-800'
              } transition-colors duration-200`}
            >
              <item.icon size={isCollapsed ? 24 : 20} className="mr-3" />
              {!isCollapsed && <span>{item.name}</span>}
            </Link>
          ))}
          
          <button
            onClick={handleLogout}
            className="flex items-center py-3 px-4 w-full text-gray-300 hover:bg-gray-800 transition-colors duration-200"
          >
            <LogOut size={isCollapsed ? 24 : 20} className="mr-3" />
            {!isCollapsed && <span>Logout</span>}
          </button>
        </nav>
        
        <div className="absolute bottom-4 left-0 w-full px-4">
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="w-full bg-gray-800 text-gray-300 py-2 rounded-lg hover:bg-gray-700 transition-colors"
          >
            {isCollapsed ? '>>' : '<<'}
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
