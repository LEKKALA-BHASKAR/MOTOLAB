
import { useState } from 'react';
import { 
  Search, Eye, Download, ShoppingCart, CheckCircle, Clock, AlertCircle, AlertTriangle, 
  Truck, Package, Calendar, User
} from 'lucide-react';
import { toast } from 'sonner';

interface OrderItem {
  id: number;
  productName: string;
  quantity: number;
  price: number;
}

interface Order {
  id: number;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  date: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentStatus: 'paid' | 'pending' | 'failed';
  total: number;
  items: OrderItem[];
  shippingAddress: string;
}

const initialOrders: Order[] = [
  {
    id: 1,
    orderNumber: 'ORD-2023-001',
    customerName: 'Rahul Sharma',
    customerEmail: 'rahul@example.com',
    date: '2023-10-15',
    status: 'delivered',
    paymentStatus: 'paid',
    total: 12490,
    items: [
      { id: 1, productName: 'Axor Apex Hunter Helmet', quantity: 1, price: 8990 },
      { id: 2, productName: 'Riding Leather Gloves', quantity: 1, price: 2499 },
      { id: 3, productName: 'LED Auxiliary Lights', quantity: 1, price: 999 }
    ],
    shippingAddress: '123 Main St, Chennai, Tamil Nadu, 600001'
  },
  {
    id: 2,
    orderNumber: 'ORD-2023-002',
    customerName: 'Priya Patel',
    customerEmail: 'priya@example.com',
    date: '2023-10-16',
    status: 'processing',
    paymentStatus: 'paid',
    total: 5499,
    items: [
      { id: 1, productName: 'Touring Saddle Bags', quantity: 1, price: 5499 }
    ],
    shippingAddress: '456 Park Ave, Mumbai, Maharashtra, 400001'
  },
  {
    id: 3,
    orderNumber: 'ORD-2023-003',
    customerName: 'Arun Kumar',
    customerEmail: 'arun@example.com',
    date: '2023-10-17',
    status: 'pending',
    paymentStatus: 'pending',
    total: 15999,
    items: [
      { id: 1, productName: 'SMK Carbon Fiber Helmet', quantity: 1, price: 12999 },
      { id: 2, productName: 'N-Gage Performance Air Filter', quantity: 2, price: 1450 }
    ],
    shippingAddress: '789 Lake View, Bangalore, Karnataka, 560001'
  }
];

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isViewingOrder, setIsViewingOrder] = useState(false);

  // Filter orders
  const filteredOrders = orders.filter(order => 
    (order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) || 
     order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
     order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (statusFilter === 'all' || order.status === statusFilter)
  );

  const handleViewOrder = (orderId: number) => {
    const order = orders.find(o => o.id === orderId);
    if (order) {
      setSelectedOrder(order);
      setIsViewingOrder(true);
    }
  };

  const handleUpdateStatus = (orderId: number, newStatus: Order['status']) => {
    const updatedOrders = orders.map(order => {
      if (order.id === orderId) {
        return { ...order, status: newStatus };
      }
      return order;
    });
    
    setOrders(updatedOrders);
    
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder({ ...selectedOrder, status: newStatus });
    }
    
    toast.success(`Order status updated to ${newStatus}`);
  };

  const getStatusBadgeColor = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-indigo-100 text-indigo-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentStatusBadgeColor = (status: Order['paymentStatus']) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return <Clock size={16} className="mr-1" />;
      case 'processing':
        return <Package size={16} className="mr-1" />;
      case 'shipped':
        return <Truck size={16} className="mr-1" />;
      case 'delivered':
        return <CheckCircle size={16} className="mr-1" />;
      case 'cancelled':
        return <AlertCircle size={16} className="mr-1" />;
      default:
        return null;
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Orders Management</h1>
        <button
          onClick={() => {}}
          className="flex items-center bg-brand-yellow text-brand-black px-4 py-2 rounded-lg shadow hover:brightness-105 transition-all"
        >
          <Download size={18} className="mr-2" />
          Export Orders
        </button>
      </div>

      {/* Filters and search */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search orders..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-yellow"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="w-full md:w-64">
          <select
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-yellow"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Orders table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredOrders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center">
                      <ShoppingCart className="h-5 w-5 text-gray-500" />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{order.orderNumber}</div>
                      <div className="text-sm text-gray-500">{order.items.length} items</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{order.customerName}</div>
                  <div className="text-sm text-gray-500">{order.customerEmail}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {order.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex flex-col space-y-1">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full items-center ${getStatusBadgeColor(order.status)}`}>
                      {getStatusIcon(order.status)}
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getPaymentStatusBadgeColor(order.paymentStatus)}`}>
                      {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  ₹{order.total.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button 
                    className="text-indigo-600 hover:text-indigo-900 bg-indigo-50 p-2 rounded"
                    onClick={() => handleViewOrder(order.id)}
                  >
                    <Eye size={18} />
                  </button>
                </td>
              </tr>
            ))}
            {filteredOrders.length === 0 && (
              <tr>
                <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                  <div className="flex flex-col items-center py-6">
                    <AlertTriangle size={36} className="text-gray-400 mb-2" />
                    <p>No orders found matching your criteria.</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Order Details Modal */}
      {isViewingOrder && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Order Details: {selectedOrder.orderNumber}</h2>
              <button 
                onClick={() => setIsViewingOrder(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <AlertCircle size={24} />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-3 flex items-center">
                  <User size={18} className="mr-2" />
                  Customer Information
                </h3>
                <p className="text-gray-700"><span className="font-medium">Name:</span> {selectedOrder.customerName}</p>
                <p className="text-gray-700"><span className="font-medium">Email:</span> {selectedOrder.customerEmail}</p>
                <p className="text-gray-700"><span className="font-medium">Shipping Address:</span> {selectedOrder.shippingAddress}</p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-3 flex items-center">
                  <Calendar size={18} className="mr-2" />
                  Order Information
                </h3>
                <p className="text-gray-700"><span className="font-medium">Date:</span> {selectedOrder.date}</p>
                <div className="flex items-center mt-2">
                  <span className="font-medium text-gray-700 mr-2">Status:</span> 
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full items-center ${getStatusBadgeColor(selectedOrder.status)}`}>
                    {getStatusIcon(selectedOrder.status)}
                    {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
                  </span>
                </div>
                <div className="flex items-center mt-2">
                  <span className="font-medium text-gray-700 mr-2">Payment:</span> 
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getPaymentStatusBadgeColor(selectedOrder.paymentStatus)}`}>
                    {selectedOrder.paymentStatus.charAt(0).toUpperCase() + selectedOrder.paymentStatus.slice(1)}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Order Items</h3>
              <div className="bg-white border rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {selectedOrder.items.map((item) => (
                      <tr key={item.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {item.productName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                          {item.quantity}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                          ₹{item.price.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-right">
                          ₹{(item.price * item.quantity).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="bg-gray-50">
                    <tr>
                      <td colSpan={3} className="px-6 py-4 text-right text-sm font-medium text-gray-900">
                        Order Total:
                      </td>
                      <td className="px-6 py-4 text-right text-sm font-bold text-gray-900">
                        ₹{selectedOrder.total.toLocaleString()}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
            
            <div className="border-t pt-4 flex justify-between items-center">
              <div>
                <h3 className="text-sm font-medium mb-2">Update Order Status</h3>
                <div className="flex space-x-2">
                  {['pending', 'processing', 'shipped', 'delivered', 'cancelled'].map((status) => (
                    <button
                      key={status}
                      onClick={() => handleUpdateStatus(selectedOrder.id, status as Order['status'])}
                      className={`px-3 py-1 text-xs rounded-full ${
                        selectedOrder.status === status 
                          ? 'bg-gray-800 text-white' 
                          : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                      }`}
                    >
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <button
                  onClick={() => setIsViewingOrder(false)}
                  className="px-4 py-2 bg-brand-yellow text-brand-black rounded-md hover:brightness-105"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
