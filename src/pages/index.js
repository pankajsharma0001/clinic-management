// pages/index.js
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-blue-100">
      {/* Header */}
      <div className="bg-linear-to-r from-blue-600 to-blue-800 text-white py-12 px-6 shadow-lg">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">Clinic Management System</h1>
          <p className="text-lg text-blue-100">Streamline your clinic operations with ease</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        
        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          
          {/* Receipt Generator Card */}
          <Link href="/receipt-generator">
            <div className="bg-white rounded-xl shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 overflow-hidden cursor-pointer group">
              <div className="h-2 bg-linear-to-r from-green-400 to-green-600"></div>
              <div className="p-8">
                <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">📄</div>
                <h2 className="text-2xl font-bold text-gray-800 mb-3">Generate Receipt</h2>
                <p className="text-gray-600 mb-4">Create professional receipts and invoices for patient transactions with detailed breakdowns</p>
                <div className="text-green-600 font-semibold group-hover:translate-x-2 transition-transform duration-300">
                  Get Started →
                </div>
              </div>
            </div>
          </Link>

          {/* Inventory Card */}
          <Link href="/inventory">
            <div className="bg-white rounded-xl shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 overflow-hidden cursor-pointer group">
              <div className="h-2 bg-linear-to-r from-orange-400 to-orange-600"></div>
              <div className="p-8">
                <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">💊</div>
                <h2 className="text-2xl font-bold text-gray-800 mb-3">Medicine Inventory</h2>
                <p className="text-gray-600 mb-4">Track and manage your medicine stock levels, expiry dates, and availability in real-time</p>
                <div className="text-orange-600 font-semibold group-hover:translate-x-2 transition-transform duration-300">
                  Manage Stock →
                </div>
              </div>
            </div>
          </Link>

          {/* Sample Data Card */}
          <Link href="/reports">
            <div className="bg-white rounded-xl shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 overflow-hidden cursor-pointer group">
              <div className="h-2 bg-linear-to-r from-blue-400 to-blue-600"></div>
              <div className="p-8">
                <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">📊</div>
                <h2 className="text-2xl font-bold text-gray-800 mb-3">Reports & Analytics</h2>
                <p className="text-gray-600 mb-4">View detailed reports on sales, inventory trends, and clinic performance metrics</p>
                <div className="text-blue-600 font-semibold group-hover:translate-x-2 transition-transform duration-300">
                  View Reports →
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Stats Section */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <div className="bg-linear-to-br from-blue-50 to-blue-100 rounded-lg p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">100+</div>
            <p className="text-gray-700 font-semibold">Daily Receipts</p>
          </div>
          <div className="bg-linear-to-br from-green-50 to-green-100 rounded-lg p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">1000+</div>
            <p className="text-gray-700 font-semibold">Medicines Tracked</p>
          </div>
          <div className="bg-linear-to-br from-orange-50 to-orange-100 rounded-lg p-6 text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">99%</div>
            <p className="text-gray-700 font-semibold">Uptime</p>
          </div>
          <div className="bg-linear-to-br from-purple-50 to-purple-100 rounded-lg p-6 text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">24/7</div>
            <p className="text-gray-700 font-semibold">Support</p>
          </div>
        </div>

        {/* Info Section */}
        <div className="bg-white rounded-xl shadow-md p-8 mb-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Key Features</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-start">
              <div className="shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-green-500 text-white">
                  ✓
                </div>
              </div>
              <div className="ml-4">
                <h4 className="text-lg font-semibold text-gray-800">Quick Receipts</h4>
                <p className="text-gray-600 mt-1">Generate professional invoices in seconds with automated calculations</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-green-500 text-white">
                  ✓
                </div>
              </div>
              <div className="ml-4">
                <h4 className="text-lg font-semibold text-gray-800">Real-Time Inventory</h4>
                <p className="text-gray-600 mt-1">Track stock levels and get alerts for low inventory items</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                  ✓
                </div>
              </div>
              <div className="ml-4">
                <h4 className="text-lg font-semibold text-gray-800">Print Ready</h4>
                <p className="text-gray-600 mt-1">Format receipts for direct printing on standard A4 pages</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                  ✓
                </div>
              </div>
              <div className="ml-4">
                <h4 className="text-lg font-semibold text-gray-800">Tax Compliant</h4>
                <p className="text-gray-600 mt-1">Automatic tax calculations and professional invoice formatting</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Info */}
        <div className="text-center text-gray-600 py-6">
          <p className="mb-2">© 2024 Rina Polyclinic Pvt. Ltd. | Clinic Management System</p>
          <p className="text-sm">Designed for efficient healthcare management</p>
        </div>
      </div>
    </div>
  );
}