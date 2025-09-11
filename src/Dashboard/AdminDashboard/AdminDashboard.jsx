import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  ChevronDown, 
  ChevronRight,
  BarChart3,
  Settings
} from 'lucide-react';
import { 
  MdInventory, 
  MdOutlineDashboard 
} from 'react-icons/md';
import { 
  FaCartPlus, 
  FaUsers, 
  FaBoxOpen,
  FaSignOutAlt 
} from 'react-icons/fa';
import { 
  RiImageEditFill, 
  RiCouponLine 
} from 'react-icons/ri';
import { 
  IoImages, 
  IoStatsChart 
} from 'react-icons/io5';

function AdminDashboard() {
  const location = useLocation();
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isContentOpen, setIsContentOpen] = useState(false);

  const hello = '1'
  // Check if a link is active
  const isActiveLink = (path) => {
    return location.pathname === path;
  };

  return (
    <aside className="flex flex-col w-64 min-h-screen text-white bg-gray-900">
      {/* Header */}
      <div className="p-5 border-b border-gray-700">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-600 rounded-lg">
            <MdOutlineDashboard className="text-xl" />
          </div>
          <div>
            <h1 className="text-xl font-bold">Admin Panel</h1>
            <p className="text-xs text-gray-400">Dashboard</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 overflow-y-auto">
        <div className="space-y-1">
          {/* Dashboard Home */}
          <Link 
            to="/dashboard/adminhome" 
            className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${isActiveLink('/dashboard/adminhome') ? 'bg-blue-600 text-white' : 'hover:bg-gray-800'}`}
          >
            <Home size={20} />
            <span>Admin Home</span>
          </Link>

          {/* Products Section with dropdown */}
          <div>
            <button 
              onClick={() => setIsProductsOpen(!isProductsOpen)}
              className={`flex items-center justify-between w-full p-3 rounded-lg transition-colors ${(isActiveLink('/dashboard/allproduct') || isActiveLink('/dashboard/addproduct')) ? 'bg-gray-800' : 'hover:bg-gray-800'}`}
            >
              <div className="flex items-center gap-3">
                <MdInventory size={20} />
                <span>Products</span>
              </div>
              {isProductsOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </button>
            
            {isProductsOpen && (
              <div className="mt-1 space-y-1 pl-9">
                <Link 
                  to="/dashboard/allproduct" 
                  className={`flex items-center gap-3 p-2 rounded-lg text-sm transition-colors ${isActiveLink('/dashboard/allproduct') ? 'text-blue-400' : 'hover:text-gray-300'}`}
                >
                  <FaBoxOpen size={16} />
                  <span>All Products</span>
                </Link>
                <Link 
                  to="/dashboard/addproduct" 
                  className={`flex items-center gap-3 p-2 rounded-lg text-sm transition-colors ${isActiveLink('/dashboard/addproduct') ? 'text-blue-400' : 'hover:text-gray-300'}`}
                >
                  <FaCartPlus size={16} />
                  <span>Add Product</span>
                </Link>
              </div>
            )}
          </div>

          {/* Orders */}
          <Link 
            to="/dashboard/orders" 
            className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${isActiveLink('/dashboard/orders') ? 'bg-blue-600 text-white' : 'hover:bg-gray-800'}`}
          >
            <IoStatsChart size={20} />
            <span>Orders</span>
          </Link>

          {/* Users */}
          <Link 
            to="/dashboard/users" 
            className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${isActiveLink('/dashboard/users') ? 'bg-blue-600 text-white' : 'hover:bg-gray-800'}`}
          >
            <FaUsers size={20} />
            <span>Manage Users</span>
          </Link>

          {/* Content Section with dropdown */}
          <div>
            <button 
              onClick={() => setIsContentOpen(!isContentOpen)}
              className={`flex items-center justify-between w-full p-3 rounded-lg transition-colors ${(isActiveLink('/dashboard/addbannerimg') || isActiveLink('/dashboard/banners')) ? 'bg-gray-800' : 'hover:bg-gray-800'}`}
            >
              <div className="flex items-center gap-3">
                <IoImages size={20} />
                <span>Content</span>
              </div>
              {isContentOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </button>
            
            {isContentOpen && (
              <div className="mt-1 space-y-1 pl-9">
                <Link 
                  to="/dashboard/addbannerimg" 
                  className={`flex items-center gap-3 p-2 rounded-lg text-sm transition-colors ${isActiveLink('/dashboard/addbannerimg') ? 'text-blue-400' : 'hover:text-gray-300'}`}
                >
                  <RiImageEditFill size={16} />
                  <span>Banner Images</span>
                </Link>
                <Link 
                  to="/dashboard/promotions" 
                  className={`flex items-center gap-3 p-2 rounded-lg text-sm transition-colors ${isActiveLink('/dashboard/promotions') ? 'text-blue-400' : 'hover:text-gray-300'}`}
                >
                  <RiCouponLine size={16} />
                  <span>Promotions</span>
                </Link>
              </div>
            )}
          </div>

          {/* Reports */}
          <Link 
            to="/dashboard/reports" 
            className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${isActiveLink('/dashboard/reports') ? 'bg-blue-600 text-white' : 'hover:bg-gray-800'}`}
          >
            <BarChart3 size={20} />
            <span>Reports</span>
          </Link>

          {/* Settings */}
          <Link 
            to="/dashboard/settings" 
            className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${isActiveLink('/dashboard/settings') ? 'bg-blue-600 text-white' : 'hover:bg-gray-800'}`}
          >
            <Settings size={20} />
            <span>Settings</span>
          </Link>
        </div>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-700">
        <Link 
          to="/" 
          className="flex items-center gap-3 p-3 transition-colors rounded-lg hover:bg-gray-800"
        >
          <Home size={20} />
          <span>Go to Homepage</span>
        </Link>
        
        <button className="flex items-center w-full gap-3 p-3 text-red-400 transition-colors rounded-lg hover:bg-gray-800 hover:text-red-300">
          <FaSignOutAlt size={18} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}

export default AdminDashboard;