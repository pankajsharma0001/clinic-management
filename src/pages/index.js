// pages/index.js
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f5f0fa]">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-[#2b124c] to-[#4b1e7c] text-white py-12 px-6 shadow-lg">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">Clinic Management System</h1>
          <p className="text-lg text-purple-100">Streamline your clinic operations with ease</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">

        {/* Features Grid */}
        <div className="grid md:grid-cols-4 gap-8 mb-12">

          {/* Receipt Generator */}
          <Link href="/receipt-generator">
            <div className="bg-white rounded-xl shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 group cursor-pointer">
              <div className="h-2 bg-gradient-to-r from-[#2b124c] to-[#4b1e7c]"></div>
              <div className="p-8">
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">📄</div>
                <h2 className="text-2xl font-bold text-[#2b124c] mb-3">Generate Receipt</h2>
                <p className="text-gray-700 mb-4">Create professional receipts and invoices for patient transactions</p>
                <div className="text-[#4b1e7c] font-semibold group-hover:translate-x-2 transition">
                  Get Started →
                </div>
              </div>
            </div>
          </Link>

          {/* Lab Receipt Generator */}
          <Link href="/lab-receipt-generator">
            <div className="bg-white rounded-xl shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 group cursor-pointer">
              <div className="h-2 bg-gradient-to-r from-[#4b1e7c] to-[#7a34c9]"></div>
              <div className="p-8">
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">🧪</div>
                <h2 className="text-2xl font-bold text-[#2b124c] mb-3">Generate Lab Receipt</h2>
                <p className="text-gray-700 mb-4">Create receipts for lab tests without stock tracking — price only</p>
                <div className="text-[#7a34c9] font-semibold group-hover:translate-x-2 transition">
                  Create Lab Receipt →
                </div>
              </div>
            </div>
          </Link>

          {/* Inventory */}
          <Link href="/inventory">
            <div className="bg-white rounded-xl shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 group cursor-pointer">
              <div className="h-2 bg-gradient-to-r from-[#d97706] to-[#f59e0b]"></div>
              <div className="p-8">
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">💊</div>
                <h2 className="text-2xl font-bold text-[#2b124c] mb-3">Medicine Inventory</h2>
                <p className="text-gray-700 mb-4">Track and manage medicine stock levels and availability</p>
                <div className="text-[#d97706] font-semibold group-hover:translate-x-2 transition">
                  Manage Stock →
                </div>
              </div>
            </div>
          </Link>

          {/* Reports */}
          <Link href="/reports">
            <div className="bg-white rounded-xl shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 group cursor-pointer">
              <div className="h-2 bg-gradient-to-r from-[#2b124c] to-[#7a34c9]"></div>
              <div className="p-8">
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">📊</div>
                <h2 className="text-2xl font-bold text-[#2b124c] mb-3">Reports & Analytics</h2>
                <p className="text-gray-700 mb-4">View detailed reports on sales, receipts, inventory, and performance</p>
                <div className="text-[#4b1e7c] font-semibold group-hover:translate-x-2 transition">
                  View Reports →
                </div>
              </div>
            </div>
          </Link>

        </div>

        {/* Stats Section */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <div className="bg-purple-100 rounded-lg p-6 text-center">
            <div className="text-3xl font-bold text-[#2b124c] mb-2">100+</div>
            <p className="text-gray-700 font-semibold">Daily Receipts</p>
          </div>
          <div className="bg-purple-100 rounded-lg p-6 text-center">
            <div className="text-3xl font-bold text-[#2b124c] mb-2">1000+</div>
            <p className="text-gray-700 font-semibold">Medicines Tracked</p>
          </div>
          <div className="bg-purple-100 rounded-lg p-6 text-center">
            <div className="text-3xl font-bold text-[#2b124c] mb-2">99%</div>
            <p className="text-gray-700 font-semibold">Uptime</p>
          </div>
          <div className="bg-purple-100 rounded-lg p-6 text-center">
            <div className="text-3xl font-bold text-[#2b124c] mb-2">24/7</div>
            <p className="text-gray-700 font-semibold">Support</p>
          </div>
        </div>

        {/* Info Section */}
        <div className="bg-white rounded-xl shadow-md p-8 mb-8">
          <h3 className="text-2xl font-bold text-[#2b124c] mb-6">Key Features</h3>

          <div className="grid md:grid-cols-2 gap-6">
            
            <Feature
              title="Quick Receipts"
              text="Generate professional invoices in seconds with automated calculations"
            />

            <Feature
              title="Real-Time Inventory"
              text="Track stock levels and get alerts for low inventory items"
            />

            <Feature
              title="Print Ready"
              text="Format receipts for direct printing on A4 pages"
            />

            <Feature
              title="Tax Compliant"
              text="Automatic tax calculations and professional invoice formatting"
            />

          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-gray-600 py-6">
          <p className="mb-2">© 2024 Rina Polyclinic Pvt. Ltd. | Clinic Management System</p>
          <p className="text-sm">Designed for efficient healthcare management</p>
        </div>

      </div>
    </div>
  );
}

// Small Feature Component
function Feature({ title, text }) {
  return (
    <div className="flex items-start">
      <div className="shrink-0">
        <div className="flex items-center justify-center h-12 w-12 rounded-md bg-[#2b124c] text-white">
          ✓
        </div>
      </div>
      <div className="ml-4">
        <h4 className="text-lg font-semibold text-[#2b124c]">{title}</h4>
        <p className="text-gray-700 mt-1">{text}</p>
      </div>
    </div>
  );
}
