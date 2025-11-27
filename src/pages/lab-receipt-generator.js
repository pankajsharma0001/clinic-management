// pages/lab-receipt-generator.js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Receipt from '../components/Receipt';

export default function LabReceiptGenerator() {
  const router = useRouter();

  const [tests, setTests] = useState([]);
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
    fetchTests();
  }, []);

  const fetchTests = async () => {
    try {
      const response = await fetch('/api/tests');
      const data = await response.json();

      setTests(data);
    } catch (error) {
      console.error('Error fetching tests:', error);
    }
  };

  const generateInvoiceNumber = async () => {
    try {
      const res = await fetch('/api/lab-invoice-number');
      const data = await res.json();
      setReceiptData(prev => ({ ...prev, invoiceNo: data.invoiceNo }));
    } catch (error) {
      console.error('Error generating invoice number:', error);
    }
  };

  const filteredTests = tests.filter(test =>
    test.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    test.itemCode.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addTestToReceipt = (test) => {
    setSelectedItems(prev => {
      const existing = prev.find(item => item._id === test._id);
      if (existing) return prev; // avoid duplicates for lab tests

      return [...prev, { ...test, quantity: 1 }];
    });
  };

  const removeItem = (id) => {
    setSelectedItems(prev => prev.filter(item => item._id !== id));
  };

  const generateReceipt = () => {
    generateInvoiceNumber();
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


      setSelectedItems([]);
      setPatientData({
        doctor: '',
        patientName: '',
        ageGender: '',
        address: '',
        hospitalNo: ''
      });

      generateInvoiceNumber();
      setReceiptData({});
      
    } catch (error) {
      console.error("Error saving:", error);
      alert("Error saving receipt!");
    }
  };

  const totalAmount = selectedItems.reduce(
    (total, item) => total + item.rate * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-8 bg-white rounded-lg shadow-lg p-6 flex items-center gap-4">
          <button
            onClick={() => router.push('/')}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-semibold"
          >
            ← Back
          </button>
          <div className="flex-1 text-center">
            <h1 className="text-3xl font-bold text-black mb-2">🧪 Lab Test Receipt Generator</h1>
            <p className="text-black">Generate receipts for pathology tests</p>
          </div>
        </div>

        <div className="space-y-8">
          <div className="grid lg:grid-cols-2 gap-8">
            
            {/* Patient Details */}
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

            {/* Select Lab Tests */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-green-200">
              <h2 className="text-xl font-bold text-black mb-4">🧪 Select Test</h2>

              <input
                type="text"
                placeholder="🔍 Search test by name or code..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input mb-4"
              />

              <div className="grid gap-3 max-h-80 overflow-y-auto p-2">
                {filteredTests.map(test => (
                  <button
                    key={test._id}
                    onClick={() => addTestToReceipt(test)}
                    className="p-4 border-2 rounded-lg text-left bg-white hover:border-green-500 hover:bg-green-50 transition"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold text-black">{test.name}</h3>
                        <p className="text-sm text-black">Code: {test.itemCode}</p>
                      </div>
                      <div className="text-right text-green-600 font-bold">
                        Rs. {test.rate}
                      </div>
                    </div>
                  </button>
                ))}

                {filteredTests.length === 0 && (
                  <p className="text-center text-black">No tests available</p>
                )}
              </div>
            </div>
          </div>

          {/* Selected Items */}
          {selectedItems.length > 0 && (
            <div className="bg-white rounded-xl shadow-lg p-6 border border-purple-200">
              <h3 className="text-xl text-black font-bold mb-4">📝 Selected Tests ({selectedItems.length})</h3>

              <div className="space-y-3 mb-6 max-h-60 overflow-y-auto">
                {selectedItems.map(item => (
                  <div key={item._id} className="p-3 bg-gray-50 border rounded-lg flex justify-between">
                    <div>
                      <p className="font-semibold text-black">{item.name}</p>
                    </div>

                    <div className="text-right font-bold text-green-600">Rs. {item.rate}</div>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 flex justify-between items-center">
                <span className="font-semibold text-black text-lg">Total:</span>
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
          )}

          <Receipt receiptData={receiptData} onPrint={handlePrint} />
        </div>
      </div>

      <style>{`
        .input {
            width: 100%;
            padding: 12px;
            border: 2px solid #9ca3af;
            border-radius: 8px;
            color: #000 !important;
        }

        .btn-primary {
            background: #2563eb;
            color: white;
            padding: 12px;
            border-radius: 8px;
            font-weight: bold;
        }

        .btn-success {
            background: #16a34a;
            color: white;
            padding: 12px;
            border-radius: 8px;
            font-weight: bold;
        }

        .text-dark {
            color: #000 !important;
        }
      `}</style>

    </div>
  );
}
