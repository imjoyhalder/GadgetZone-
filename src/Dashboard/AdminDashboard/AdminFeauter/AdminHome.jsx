import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  Users, 
  ShoppingCart, 
  DollarSign, 
  Package, 
  TrendingUp, 
  Calendar,
  ArrowUp,
  ArrowDown
} from 'lucide-react';
import { FaBox, FaMoneyBillWave, FaUserCheck } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function AdminHome() {
  const [stats, setStats] = useState(null);
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('month');

  // recent data 
    useEffect(() => {
    fetch("https://gadgetzone-server.onrender.com/orders")
      .then((res) => res.json())
      .then((data) => {
        setRecentOrders(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching orders:", err);
        setLoading(false);
      });
  }, []);





  // Fetch dashboard data
  useEffect(() => {
    setLoading(true);
    fetch("https://gadgetzone-server.onrender.com/admin/stats?range=" + timeRange)
      .then((res) => res.json())
      .then((data) => {
        setStats(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [timeRange]);

  if (loading || !stats) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-12 h-12 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  // Stats cards data - using the actual stats from state
  const statCards = [
    {
      title: 'Total Revenue',
      value: `৳${(stats.totalRevenue || 0).toLocaleString()}`,
      icon: <DollarSign size={20} />,
      change: '+12.5%',
      trend: 'up',
      color: 'bg-green-500'
    },
    {
      title: 'Total Orders',
      value: (stats.totalOrders || 0).toLocaleString(),
      icon: <ShoppingCart size={20} />,
      change: '+8.2%',
      trend: 'up',
      color: 'bg-blue-500'
    },
    {
      title: 'Total Products',
      value: (stats.totalProducts || 0).toLocaleString(),
      icon: <Package size={20} />,
      change: '+3.1%',
      trend: 'up',
      color: 'bg-purple-500'
    },
    {
      title: 'Total Users',
      value: (stats.totalUsers || 0).toLocaleString(),
      icon: <Users size={20} />,
      change: '+5.7%',
      trend: 'up',
      color: 'bg-indigo-500'
    }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-12 h-12 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 bg-gray-50 sm:p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening with your store today.</p>
      </div>

      {/* Time Range Filter */}
      <div className="flex justify-end mb-6">
        <div className="inline-flex rounded-md shadow-sm" role="group">
          <button
            type="button"
            onClick={() => setTimeRange('day')}
            className={`px-4 py-2 text-sm font-medium rounded-l-lg ${
              timeRange === 'day' 
                ? 'bg-blue-600 text-white' 
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Today
          </button>
          <button
            type="button"
            onClick={() => setTimeRange('week')}
            className={`px-4 py-2 text-sm font-medium ${
              timeRange === 'week' 
                ? 'bg-blue-600 text-white' 
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            This Week
          </button>
          <button
            type="button"
            onClick={() => setTimeRange('month')}
            className={`px-4 py-2 text-sm font-medium rounded-r-lg ${
              timeRange === 'month' 
                ? 'bg-blue-600 text-white' 
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            This Month
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((card, index) => (
          <div key={index} className="p-6 bg-white rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{card.title}</p>
                <p className="mt-1 text-2xl font-bold text-gray-800">{card.value}</p>
                <div className={`flex items-center mt-2 ${card.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                  {card.trend === 'up' ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
                  <span className="ml-1 text-xs font-medium">{card.change}</span>
                  <span className="ml-2 text-xs text-gray-500">vs last period</span>
                </div>
              </div>
              <div className={`p-3 rounded-full ${card.color} bg-opacity-10`}>
                <div className={card.color.replace('bg-', 'text-')}>
                  {card.icon}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 mb-8 lg:grid-cols-2">
        {/* Order Status Overview */}
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="mb-4 text-lg font-semibold text-gray-800">Order Status</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="p-2 mr-3 bg-blue-100 rounded-full">
                  <ShoppingCart className="text-blue-600" size={18} />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending Orders</p>
                  <p className="text-xs text-gray-500">Awaiting processing</p>
                </div>
              </div>
              <span className="text-lg font-bold text-gray-800">{stats.pendingOrders}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="p-2 mr-3 bg-green-100 rounded-full">
                  <FaUserCheck className="text-green-600" size={18} />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Completed Orders</p>
                  <p className="text-xs text-gray-500">Successfully delivered</p>
                </div>
              </div>
              <span className="text-lg font-bold text-gray-800">{stats.completedOrders}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="p-2 mr-3 bg-purple-100 rounded-full">
                  <FaMoneyBillWave className="text-purple-600" size={18} />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                  <p className="text-xs text-gray-500">This {timeRange}</p>
                </div>
              </div>
              <span className="text-lg font-bold text-gray-800">৳{stats.totalRevenue.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="mb-4 text-lg font-semibold text-gray-800">Quick Stats</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 text-center rounded-lg bg-gray-50">
              <div className="inline-flex items-center justify-center p-2 mb-2 bg-blue-100 rounded-full">
                <FaBox className="text-blue-600" size={16} />
              </div>
              <p className="text-sm text-gray-600">Low Stock Items</p>
              <p className="text-xl font-bold text-gray-800">12</p>
            </div>
            
            <div className="p-4 text-center rounded-lg bg-gray-50">
              <div className="inline-flex items-center justify-center p-2 mb-2 bg-yellow-100 rounded-full">
                <Package className="text-yellow-600" size={16} />
              </div>
              <p className="text-sm text-gray-600">New Products</p>
              <p className="text-xl font-bold text-gray-800">8</p>
            </div>
            
            <div className="p-4 text-center rounded-lg bg-gray-50">
              <div className="inline-flex items-center justify-center p-2 mb-2 bg-green-100 rounded-full">
                <TrendingUp className="text-green-600" size={16} />
              </div>
              <p className="text-sm text-gray-600">Top Selling</p>
              <p className="text-xl font-bold text-gray-800">24</p>
            </div>
            
            <div className="p-4 text-center rounded-lg bg-gray-50">
              <div className="inline-flex items-center justify-center p-2 mb-2 bg-red-100 rounded-full">
                <Calendar className="text-red-600" size={16} />
              </div>
              <p className="text-sm text-gray-600">Pending Reviews</p>
              <p className="text-xl font-bold text-gray-800">5</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="overflow-hidden bg-white rounded-lg shadow-md">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">Recent Orders</h2>
          <p className="text-sm text-gray-600">Latest customer orders</p>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Order ID
                </th>
                <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Customer
                </th>
                <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Date
                </th>
                <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Amount
                </th>
                <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentOrders.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center">
                    <div className="py-8 text-gray-500">
                      No recent orders found
                    </div>
                  </td>
                </tr>
              ) : (
                recentOrders.map((order) => (
                  <tr key={order._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">#{order._id?.substring(0, 8)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{order.customerName || 'Guest Customer'}</div>
                      <div className="text-sm text-gray-500">{order.customerEmail || 'No email'}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {new Date(order.orderDate || Date.now()).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">৳{order.totalPrice || 0}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        order.status === 'completed' 
                          ? 'bg-green-100 text-green-800'
                          : order.status === 'processing'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {order.status || 'pending'}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
          <Link to="/dashboard/orders" className="text-sm font-medium text-blue-600 hover:text-blue-800">
            View all orders →
          </Link>
        </div>
      </div>

      {/* Charts Section - Placeholder for future implementation */}
      <div className="grid grid-cols-1 gap-6 mt-8 lg:grid-cols-2">
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="mb-4 text-lg font-semibold text-gray-800">Revenue Overview</h2>
          <div className="flex items-center justify-center h-64 rounded-lg bg-gray-50">
            <div className="text-center text-gray-500">
              <BarChart3 size={40} className="mx-auto mb-2" />
              <p>Revenue chart will be implemented here</p>
            </div>
          </div>
        </div>
        
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="mb-4 text-lg font-semibold text-gray-800">Sales Distribution</h2>
          <div className="flex items-center justify-center h-64 rounded-lg bg-gray-50">
            <div className="text-center text-gray-500">
              <TrendingUp size={40} className="mx-auto mb-2" />
              <p>Sales distribution chart will be implemented here</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminHome;