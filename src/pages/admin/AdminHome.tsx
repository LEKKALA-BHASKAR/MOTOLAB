
import { useEffect, useState, useRef } from 'react';
import { 
  ShoppingBag, Users, ArrowUp, ArrowDown, 
  DollarSign, Package, TrendingUp, BarChart
} from 'lucide-react';
import { products } from '@/lib/data';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  color: string;
}

const StatCard = ({ title, value, icon, trend, trendValue, color }: StatCardProps) => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <h3 className="text-2xl font-bold mt-1">{value}</h3>
        
        {trend && (
          <div className="flex items-center mt-2">
            {trend === 'up' && <ArrowUp size={14} className="text-green-500 mr-1" />}
            {trend === 'down' && <ArrowDown size={14} className="text-red-500 mr-1" />}
            <span className={`text-xs ${
              trend === 'up' ? 'text-green-500' : 
              trend === 'down' ? 'text-red-500' : 'text-gray-500'
            }`}>
              {trendValue}
            </span>
          </div>
        )}
      </div>
      
      <div className={`p-3 rounded-full ${color}`}>
        {icon}
      </div>
    </div>
  </div>
);

// Simple fake chart component
const SimpleChart = ({ data, color }: { data: number[], color: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const width = canvas.width;
    const height = canvas.height;
    const padding = 20;
    const dataPoints = data.length;
    const maxValue = Math.max(...data);
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Calculate point positions
    const points = data.map((value, index) => ({
      x: padding + (index * (width - padding * 2) / (dataPoints - 1)),
      y: height - padding - ((value / maxValue) * (height - padding * 2))
    }));
    
    // Draw line
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    
    for (let i = 1; i < points.length; i++) {
      ctx.lineTo(points[i].x, points[i].y);
    }
    
    ctx.strokeStyle = color;
    ctx.lineWidth = 3;
    ctx.stroke();
    
    // Draw points
    points.forEach(point => {
      ctx.beginPath();
      ctx.arc(point.x, point.y, 4, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
    });
  }, [data, color]);
  
  return (
    <canvas 
      ref={canvasRef} 
      width={400} 
      height={200} 
      className="w-full h-full"
    />
  );
};

const AdminHome = () => {
  // Demo data
  const salesData = [45, 60, 75, 90, 80, 95, 110, 120, 115, 130, 140, 135];
  const ordersData = [30, 35, 40, 50, 45, 60, 65, 70, 65, 80, 85, 90];
  
  // Calculate total sales
  const totalSales = products.reduce((total, product) => total + product.price, 0);
  
  // Best selling categories based on product count
  const categories = products.reduce((acc, product) => {
    acc[product.category] = (acc[product.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  const bestSellingCategory = Object.entries(categories)
    .sort((a, b) => b[1] - a[1])[0]?.[0] || 'None';

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      
      {/* Stats row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Sales"
          value={`₹${totalSales.toLocaleString()}`}
          icon={<DollarSign size={24} className="text-white" />}
          trend="up"
          trendValue="12% from last month"
          color="bg-blue-500"
        />
        
        <StatCard
          title="Total Orders"
          value={products.length}
          icon={<ShoppingBag size={24} className="text-white" />}
          trend="up"
          trendValue="8% from last month"
          color="bg-purple-500"
        />
        
        <StatCard
          title="Total Products"
          value={products.length}
          icon={<Package size={24} className="text-white" />}
          trend="neutral"
          trendValue="Same as last month"
          color="bg-green-500"
        />
        
        <StatCard
          title="Best Selling Category"
          value={bestSellingCategory}
          icon={<TrendingUp size={24} className="text-white" />}
          color="bg-amber-500"
        />
      </div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Sales Overview</h3>
            <select className="text-sm border rounded-md px-2 py-1">
              <option>Last 12 Months</option>
              <option>Last 30 Days</option>
              <option>Last 7 Days</option>
            </select>
          </div>
          <div className="h-80">
            <SimpleChart data={salesData} color="#3B82F6" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Orders Overview</h3>
            <select className="text-sm border rounded-md px-2 py-1">
              <option>Last 12 Months</option>
              <option>Last 30 Days</option>
              <option>Last 7 Days</option>
            </select>
          </div>
          <div className="h-80">
            <SimpleChart data={ordersData} color="#8B5CF6" />
          </div>
        </div>
      </div>
      
      {/* Recent products */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-medium mb-4">Recent Products</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.slice(0, 5).map(product => (
                <tr key={product.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <img src={product.image} alt={product.name} className="h-10 w-10 rounded-full object-cover" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{product.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{product.category}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">₹{product.price.toLocaleString()}</div>
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
