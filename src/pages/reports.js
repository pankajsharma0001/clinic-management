// pages/reports.js
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Reports() {
  const [reportType, setReportType] = useState('daily');
  const [dateRange, setDateRange] = useState('today');
  const [loading, setLoading] = useState(false);
  const [reportData, setReportData] = useState(null);
  const [error, setError] = useState(null);

  // Fetch report data from API
  useEffect(() => {
    const fetchReportData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/reports?type=${reportType}`);
        if (!response.ok) {
          throw new Error('Failed to fetch report data');
        }
        const data = await response.json();
        setReportData(data);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching reports:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchReportData();
  }, [reportType]);

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-blue-100">
      {/* Header */}
      <div className="bg-linear-to-r from-blue-600 to-blue-800 text-white py-8 px-6 shadow-lg">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <Link href="/">
              <span className="text-white hover:text-blue-100 cursor-pointer font-semibold">← Back to Home</span>
            </Link>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold">Sales & Analytics Reports</h1>
          <p className="text-lg text-blue-100 mt-2">View detailed sales metrics and performance analysis</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        
        {/* Report Type Selection */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Select Report Period</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <button
              onClick={() => setReportType('daily')}
              className={`p-4 rounded-lg font-semibold transition-all duration-300 ${
                reportType === 'daily'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              📅 Daily Report
            </button>
            <button
              onClick={() => setReportType('monthly')}
              className={`p-4 rounded-lg font-semibold transition-all duration-300 ${
                reportType === 'monthly'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              📊 Monthly Report
            </button>
            <button
              onClick={() => setReportType('yearly')}
              className={`p-4 rounded-lg font-semibold transition-all duration-300 ${
                reportType === 'yearly'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              📈 Yearly Report
            </button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {loading ? (
            <div className="col-span-4 text-center py-8">
              <div className="text-gray-600 font-semibold">Loading report data...</div>
            </div>
          ) : error ? (
            <div className="col-span-4 bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
              <strong>Error:</strong> {error}
            </div>
          ) : reportData ? (
            <>
              <div className="bg-linear-to-br from-blue-50 to-blue-100 rounded-xl p-6 shadow-md">
                <div className="text-sm text-gray-600 font-semibold mb-2">Total Sales</div>
                <div className="text-3xl font-bold text-blue-600">Rs. {reportData.totalSales?.toLocaleString() || '0'}</div>
                <div className="text-xs text-gray-600 mt-2">Revenue Generated</div>
              </div>
              
              <div className="bg-linear-to-br from-green-50 to-green-100 rounded-xl p-6 shadow-md">
                <div className="text-sm text-gray-600 font-semibold mb-2">Total Transactions</div>
                <div className="text-3xl font-bold text-green-600">{reportData.totalTransactions || '0'}</div>
                <div className="text-xs text-gray-600 mt-2">Receipts Generated</div>
              </div>
              
              <div className="bg-linear-to-br from-orange-50 to-orange-100 rounded-xl p-6 shadow-md">
                <div className="text-sm text-gray-600 font-semibold mb-2">Average Sale</div>
                <div className="text-3xl font-bold text-orange-600">Rs. {reportData.averageTransaction?.toFixed(2) || '0'}</div>
                <div className="text-xs text-gray-600 mt-2">Per Transaction</div>
              </div>
              
              <div className="bg-linear-to-br from-purple-50 to-purple-100 rounded-xl p-6 shadow-md">
                <div className="text-sm text-gray-600 font-semibold mb-2">Top Medicine</div>
                <div className="text-xl font-bold text-purple-600">{reportData.topMedicines?.[0]?.name || 'N/A'}</div>
                <div className="text-xs text-gray-600 mt-2">{reportData.topMedicines?.[0]?.quantity || '0'} Units Sold</div>
              </div>
            </>
          ) : null}
        </div>

        {/* Top Medicines Section */}
        <div className="bg-white rounded-xl shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Top Selling Medicines</h2>
          {loading ? (
            <div className="text-center py-8 text-gray-600">Loading medicines data...</div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
              <strong>Error:</strong> {error}
            </div>
          ) : reportData?.topMedicines && reportData.topMedicines.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100 border-b-2 border-gray-300">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">Rank</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">Medicine Name</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-800">Units Sold</th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-gray-800">Revenue</th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-gray-800">% of Total</th>
                  </tr>
                </thead>
                <tbody>
                  {reportData.topMedicines.map((medicine, index) => (
                    <tr key={index} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 text-sm font-semibold text-gray-800">#{index + 1}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{medicine.name}</td>
                      <td className="px-6 py-4 text-sm text-center text-gray-700 font-semibold">{medicine.quantity}</td>
                      <td className="px-6 py-4 text-sm text-right text-green-600 font-semibold">Rs. {medicine.revenue?.toLocaleString() || '0'}</td>
                      <td className="px-6 py-4 text-sm text-right text-gray-700">
                        {reportData.totalSales > 0 ? ((medicine.revenue / reportData.totalSales) * 100).toFixed(1) : '0'}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-600">No medicine data available for this period</div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Quick Actions</h2>
          <div className="grid md:grid-cols-4 gap-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg">
              📥 Export to PDF
            </button>
            <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg">
              📊 Export to Excel
            </button>
            <button className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg">
              📧 Email Report
            </button>
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg">
              🖨️ Print Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
