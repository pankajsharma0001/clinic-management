// pages/receipt-generator.js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Receipt from '../components/Receipt';

export default function ReceiptGenerator() {
  const router = useRouter();
  const [medicines, setMedicines] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [patientData, setPatientData] = useState({
    doctor: '',
    patientName: '',
    ageGender: '',
    address: '',
    hospitalNo: ''
  });
  const [receiptData, setReceiptData] = useState({});
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchMedicines();
    generateInvoiceNumber();
  }, []);

  const fetchMedicines = async () => {
    try {
      const response = await fetch('/api/medicines');
      const data = await response.json();
      setMedicines(data);
    } catch (error) {
      console.error('Error fetching medicines:', error);
    }
  };

  const generateInvoiceNumber = () => {
    const randomNum = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
    const invoiceNo = `CS${Math.floor(Math.random() * 100000).toString().padStart(5, '0')}-${randomNum}`;
    setReceiptData(prev => ({ ...prev, invoiceNo }));
  };

  const filteredMedicines = medicines.filter(medicine =>
    (medicine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    medicine.itemCode.toLowerCase().includes(searchTerm.toLowerCase())) &&
    medicine.quantity > 0
  );

  const addItemToReceipt = (medicine) => {
    setSelectedItems(prev => {
      const existing = prev.find(item => item._id === medicine._id);
      if (existing) {
        return prev.map(item =>
          item._id === medicine._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...medicine, quantity: 1, originalQuantity: medicine.quantity }];
    });
  };

  const removeItem = (id) => {
    setSelectedItems(prev => prev.filter(item => item._id !== id));
  };

  const updateQuantity = (id, quantity) => {
    if (quantity < 1) {
      removeItem(id);
      return;
    }
    setSelectedItems(prev =>
      prev.map(item =>
        item._id === id ? { ...item, quantity: Math.min(quantity, item.originalQuantity) } : item
      )
    );
  };

  const generateReceipt = () => {
    const receipt = {
      invoiceNo: receiptData.invoiceNo,
      doctor: patientData.doctor,
      patientName: patientData.patientName,
      hospitalNo: patientData.hospitalNo,
      ageGender: patientData.ageGender,
      address: patientData.address,
      items: selectedItems
    };
    setReceiptData(receipt);
    alert('Receipt generated successfully! Scroll down to view and print.');
  };

  const handlePrint = () => {
    window.print();
  };

  const saveReceipt = async () => {
    try {
      await fetch('/api/receipts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(receiptData),
      });
      
      // Update medicine quantities - subtract sold items from stock
      for (const item of selectedItems) {
        await fetch(`/api/medicines/${item._id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            quantity: Math.max(0, item.originalQuantity - item.quantity)
          }),
        });
      }
      
      alert('✅ Receipt saved successfully! Stock updated.');
      
      // Reset form
      setSelectedItems([]);
      setPatientData({
        patientName: '',
        ageGender: '',
        address: '',
        hospitalNo: ''
      });
      generateInvoiceNumber();
      setReceiptData({});
      
    } catch (error) {
      console.error('Error saving receipt:', error);
      alert('❌ Error saving receipt. Please try again.');
    }
  };

  const totalAmount = selectedItems.reduce((total, item) => total + (item.rate * item.quantity), 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header with Back Button */}
        <div className="mb-8 bg-white rounded-lg shadow-lg p-6 flex items-center gap-4">
          <button
            onClick={() => router.push('/')}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-semibold transition duration-200 flex items-center gap-2 whitespace-nowrap"
          >
            ← Back
          </button>
          <div className="flex-1 text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">🏥 Clinic Receipt Generator</h1>
            <p className="text-gray-600">Generate professional receipts for your clinic</p>
          </div>
        </div>

        <div className="space-y-8">
          {/* Top Row - Patient Details and Medicine Selection Side by Side */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left Side - Patient Details */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-blue-200">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                👤 Patient Details
              </h2>
              <div className="grid gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Patient Name *</label>
                  <input
                    type="text"
                    placeholder="Enter patient full name"
                    value={patientData.patientName}
                    onChange={(e) => setPatientData({...patientData, patientName: e.target.value})}
                    className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition text-gray-800 placeholder-gray-500"
                  />
                </div>
                
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Ref. Doctor</label>
                    <input
                    type="text"
                    placeholder="Enter referring doctor name"
                    value={patientData.doctor}
                    onChange={(e) => setPatientData({...patientData, doctor: e.target.value})}
                    className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition text-gray-800 placeholder-gray-500"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Age/Gender</label>
                    <input
                      type="text"
                      placeholder="e.g., 30/Male"
                      value={patientData.ageGender}
                      onChange={(e) => setPatientData({...patientData, ageGender: e.target.value})}
                      className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition text-gray-800 placeholder-gray-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Hospital No.</label>
                    <input
                      type="text"
                      placeholder="Hospital number"
                      value={patientData.hospitalNo}
                      onChange={(e) => setPatientData({...patientData, hospitalNo: e.target.value})}
                      className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition text-gray-800 placeholder-gray-500"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Address</label>
                  <input
                    type="text"
                    placeholder="Patient address"
                    value={patientData.address}
                    onChange={(e) => setPatientData({...patientData, address: e.target.value})}
                    className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition text-gray-800 placeholder-gray-500"
                  />
                </div>
              </div>
            </div>

            {/* Right Side - Medicine Selection */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-green-200">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                💊 Select Medical Services
              </h2>
              
              {/* Search Bar */}
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="🔍 Search medicines by name or code..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition text-gray-800 placeholder-gray-500"
                />
              </div>

              {/* Medicines List */}
              <div className="grid gap-3 max-h-80 overflow-y-auto p-2">
                {filteredMedicines.map(medicine => (
                  <button
                    key={medicine._id}
                    onClick={() => addItemToReceipt(medicine)}
                    disabled={medicine.quantity === 0}
                    className={`p-4 border-2 rounded-lg text-left transition-all duration-200 ${
                      medicine.quantity === 0 
                        ? 'border-red-300 bg-red-50 cursor-not-allowed opacity-60' 
                        : 'border-gray-200 bg-white hover:border-green-500 hover:bg-green-50 hover:shadow-md'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800 text-lg">{medicine.name}</h3>
                        <p className="text-sm text-gray-600">Code: {medicine.itemCode}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-green-600 font-bold text-lg">Rs. {medicine.rate}</p>
                        <p className={`text-sm ${
                          medicine.quantity === 0 ? 'text-red-600' : 
                          medicine.quantity < 10 ? 'text-orange-600' : 'text-green-600'
                        } font-medium`}>
                          Stock: {medicine.quantity}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
                
                {filteredMedicines.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    No medicines found. Add some medicines first.
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Middle Row - Selected Items */}
          {selectedItems.length > 0 && (
            <div className="bg-white rounded-xl shadow-lg p-6 border border-purple-200">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                🛒 Selected Items ({selectedItems.length})
              </h3>
              
              <div className="space-y-3 mb-6 max-h-60 overflow-y-auto">
                {selectedItems.map(item => (
                  <div key={item._id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex-1">
                      <span className="font-semibold text-gray-800">{item.name}</span>
                      <span className="text-gray-600 ml-2 text-sm">(Rs. {item.rate})</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2 bg-white px-3 py-1 rounded-full border">
                        <button
                          onClick={() => updateQuantity(item._id, item.quantity - 1)}
                          className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition"
                        >
                          -
                        </button>
                        <span className="font-semibold text-gray-800 w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item._id, item.quantity + 1)}
                          className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center hover:bg-green-600 transition"
                        >
                          +
                        </button>
                      </div>
                      <span className="font-bold text-green-600 w-24 text-right">
                        Rs. {(item.rate * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Total and Actions */}
              <div className="border-t pt-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-semibold text-gray-800">Total Amount:</span>
                  <span className="text-2xl font-bold text-green-600">Rs. {totalAmount.toFixed(2)}</span>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={generateReceipt}
                    disabled={!patientData.patientName}
                    className={`p-3 rounded-lg font-semibold transition ${
                      patientData.patientName
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-gray-400 text-gray-200 cursor-not-allowed'
                    }`}
                  >
                    Generate Receipt
                  </button>
                  
                  {receiptData.items && (
                    <button
                      onClick={saveReceipt}
                      className="bg-green-600 text-white p-3 rounded-lg font-semibold hover:bg-green-700 transition"
                    >
                      💾 Save Receipt
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Bottom Row - Receipt Preview */}
          <div>
            <Receipt 
              receiptData={receiptData} 
              onPrint={handlePrint}
            />
          </div>
        </div>
      </div>
    </div>
  );
}