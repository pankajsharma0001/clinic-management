// pages/inventory.js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function InventoryPage() {
  const router = useRouter();
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingMedicine, setEditingMedicine] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [showEditButtons, setShowEditButtons] = useState(false);
  const [showAddSuccess, setShowAddSuccess] = useState(false);

  // Modal states
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [medicineToDelete, setMedicineToDelete] = useState(null);
  const [showDuplicateModal, setShowDuplicateModal] = useState(false);
  const [duplicateMedicine, setDuplicateMedicine] = useState(null);
  const [showDeleteSuccess, setShowDeleteSuccess] = useState(false);

  const [newMedicine, setNewMedicine] = useState({
    name: '',
    itemCode: '',
    rate: '',
    quantity: '',
    description: '',
    category: ''
  });

  useEffect(() => {
    fetchMedicines();
  }, []);

  const fetchMedicines = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/medicines');
      const data = await response.json();
      setMedicines(data);
    } catch (error) {
      console.error('Error fetching medicines:', error);
      alert('Error loading medicines');
    } finally {
      setLoading(false);
    }
  };

  // Get unique categories from medicines
  const categories = [...new Set(medicines.map(medicine => medicine.category).filter(Boolean))];

  const checkDuplicateMedicine = (name, itemCode) => {
    return medicines.find(med => 
      med.name.toLowerCase() === name.toLowerCase() && 
      med.itemCode.toLowerCase() === itemCode.toLowerCase()
    );
  };

  const addMedicine = async () => {
    if (!newMedicine.name || !newMedicine.itemCode || !newMedicine.rate || !newMedicine.quantity) {
      alert('Please fill in all required fields');
      return;
    }

    // Check for duplicate medicine (both name AND code must match)
    const duplicate = checkDuplicateMedicine(newMedicine.name, newMedicine.itemCode);
    if (duplicate && !editingMedicine) {
      setDuplicateMedicine(duplicate);
      setShowDuplicateModal(true);
      return;
    }

    try {
      const medicineData = {
        ...newMedicine,
        rate: parseFloat(newMedicine.rate),
        quantity: parseInt(newMedicine.quantity),
        createdAt: new Date()
      };

      await fetch('/api/medicines', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(medicineData),
      });

      setNewMedicine({
        name: '',
        itemCode: '',
        rate: '',
        quantity: '',
        description: '',
        category: ''
      });
      setShowAddForm(false);
      fetchMedicines();

      setShowAddSuccess(true);
      setTimeout(() => {
        setShowAddSuccess(false);
      }, 1000);

    } catch (error) {
      console.error('Error adding medicine:', error);
      alert('Error adding medicine');
    }
  };

  const updateMedicine = async (medicineId, updates) => {
    try {
      await fetch(`/api/medicines/${medicineId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
      fetchMedicines();
    } catch (error) {
      console.error('Error updating medicine:', error);
      alert('Error updating medicine');
    }
  };

  const updateStock = async (medicineId, newQuantity) => {
    if (newQuantity < 0) {
      alert('Quantity cannot be negative');
      return;
    }
    await updateMedicine(medicineId, { quantity: parseInt(newQuantity) });
  };

  const updatePrice = async (medicineId, newPrice) => {
    if (newPrice < 0) {
      alert('Price cannot be negative');
      return;
    }
    await updateMedicine(medicineId, { rate: parseFloat(newPrice) });
  };

  const handleDeleteClick = (medicine) => {
    setMedicineToDelete(medicine);
    setShowDeleteModal(true);
  };

  const deleteMedicine = async () => {
    if (!medicineToDelete) return;

    try {
      await fetch(`/api/medicines/${medicineToDelete._id}`, {
        method: 'DELETE',
      });
      fetchMedicines();
      setShowDeleteModal(false);
      setMedicineToDelete(null);
      setShowDeleteSuccess(true);
      setTimeout(() => {
        setShowDeleteSuccess(false);
      }, 1000);
    } catch (error) {
      console.error('Error deleting medicine:', error);
      alert('Error deleting medicine');
    }
  };

  const startEditing = (medicine) => {
    setEditingMedicine(medicine);
    setNewMedicine({
      name: medicine.name,
      itemCode: medicine.itemCode,
      rate: medicine.rate.toString(),
      quantity: medicine.quantity.toString(),
      description: medicine.description || '',
      category: medicine.category || ''
    });
    setShowAddForm(true);
  };

  const saveEdit = async () => {
    if (!editingMedicine) return;

    try {
      const updates = {
        name: newMedicine.name,
        itemCode: newMedicine.itemCode,
        rate: parseFloat(newMedicine.rate),
        quantity: parseInt(newMedicine.quantity),
        description: newMedicine.description,
        category: newMedicine.category,
        updatedAt: new Date()
      };

      await fetch(`/api/medicines/${editingMedicine._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });

      setEditingMedicine(null);
      setShowAddForm(false);
      setNewMedicine({
        name: '',
        itemCode: '',
        rate: '',
        quantity: '',
        description: '',
        category: ''
      });
      fetchMedicines();

      setShowAddSuccess(true);
      setTimeout(() => {
        setShowAddSuccess(false);
      }, 1000);
    } catch (error) {
      console.error('Error updating medicine:', error);
      alert('Error updating medicine');
    }
  };

  const cancelEdit = () => {
    setEditingMedicine(null);
    setShowAddForm(false);
    setNewMedicine({
      name: '',
      itemCode: '',
      rate: '',
      quantity: '',
      description: '',
      category: ''
    });
  };

  const handleDuplicateEdit = () => {
    if (duplicateMedicine) {
      startEditing(duplicateMedicine);
      setShowDuplicateModal(false);
      setDuplicateMedicine(null);
    }
  };

  const handleDuplicateCancel = () => {
    setShowDuplicateModal(false);
    setDuplicateMedicine(null);
  };

  // Filter medicines based on search and category filter
  const filteredMedicines = medicines.filter(medicine => {
    const matchesSearch = medicine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         medicine.itemCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (medicine.category && medicine.category.toLowerCase().includes(searchTerm.toLowerCase()));
    
    let matchesCategory = true;
    if (categoryFilter === 'Low Stock') {
      matchesCategory = medicine.quantity < 10;
    } else if (categoryFilter) {
      matchesCategory = medicine.category === categoryFilter;
    }
    
    return matchesSearch && matchesCategory;
  });

  const getStockStatus = (quantity) => {
    if (quantity === 0) return { text: 'Out of Stock', color: 'text-red-600', bg: 'bg-red-100', border: 'border-red-300' };
    if (quantity < 10) return { text: 'Low Stock', color: 'text-orange-600', bg: 'bg-orange-100', border: 'border-orange-300' };
    return { text: 'In Stock', color: 'text-green-600', bg: 'bg-green-100', border: 'border-green-300' };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading medicines...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl p-6 max-w-md mx-4">
            <div className="text-center">
              <div className="text-red-500 text-5xl mb-4">⚠️</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Delete Medicine</h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete <strong>"{medicineToDelete?.name}"</strong>? 
                This action cannot be undone.
              </p>
              <div className="flex gap-3 justify-center">
                <button
                  onClick={deleteMedicine}
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition duration-200"
                >
                  🗑️ Yes, Delete
                </button>
                <button
                  onClick={() => {
                    setShowDeleteModal(false);
                    setMedicineToDelete(null);
                  }}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold transition duration-200"
                >
                  ❌ Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Success Modal */}
      {showDeleteSuccess && (
        <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl p-6 max-w-md mx-4">
            <div className="text-center">
              <div className="text-green-500 text-5xl mb-4">✅</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Success!</h3>
              <p className="text-gray-600">Medicine deleted successfully!</p>
            </div>
          </div>
        </div>
      )}

        {/* Add/Success Modal */}
        {showAddSuccess && (
        <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-2xl p-6 max-w-md mx-4">
            <div className="text-center">
                <div className="text-green-500 text-5xl mb-4">✅</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Success!</h3>
                <p className="text-gray-600">
                {editingMedicine ? 'Medicine updated successfully!' : 'Medicine added successfully!'}
                </p>
            </div>
            </div>
        </div>
        )}

      {/* Duplicate Medicine Modal */}
      {showDuplicateModal && (
        <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl p-6 max-w-md mx-4">
            <div className="text-center">
              <div className="text-yellow-500 text-5xl mb-4">🔍</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Medicine Already Exists</h3>
              <p className="text-gray-600 mb-4">
                A medicine with the same name <strong>AND</strong> code already exists:
              </p>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                <p className="font-semibold text-gray-800">{duplicateMedicine?.name}</p>
                <p className="text-gray-600">Code: {duplicateMedicine?.itemCode}</p>
                <p className="text-gray-600">Price: Rs. {duplicateMedicine?.rate}</p>
                <p className="text-gray-600">Stock: {duplicateMedicine?.quantity}</p>
              </div>
              <p className="text-gray-600 mb-6">
                Would you like to edit the existing medicine instead?
              </p>
              <div className="flex gap-3 justify-center">
                <button
                  onClick={handleDuplicateEdit}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition duration-200"
                >
                  ✏️ Edit Existing
                </button>
                <button
                  onClick={handleDuplicateCancel}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold transition duration-200"
                >
                  ❌ Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-blue-200">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.push('/')}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-semibold transition duration-200 flex items-center gap-2"
              >
                ← Back
              </button>
              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">💊 Medicine Inventory</h1>
                <p className="text-gray-600">Manage your clinic's medicine stock and prices</p>
              </div>
            </div>
            <div className="flex gap-3 mt-4 lg:mt-0">
              <button
                onClick={() => setShowEditButtons(!showEditButtons)}
                className={`px-4 py-3 rounded-lg font-semibold transition duration-200 ${
                  showEditButtons 
                    ? 'bg-purple-600 hover:bg-purple-700 text-white' 
                    : 'bg-gray-500 hover:bg-gray-600 text-white'
                }`}
              >
                {showEditButtons ? '🔒 Hide Edit Mode' : '✏️ Show Edit Mode'}
              </button>
              <button
                onClick={() => setShowAddForm(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition duration-200"
              >
                ➕ Add New Medicine
              </button>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Search Medicines</label>
              <input
                type="text"
                placeholder="Search by name, code, or category..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition text-gray-800 placeholder-gray-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Category Filter</label>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition text-gray-800"
              >
                <option value="">All Categories</option>
                <option value="Low Stock">Low Stock (&lt; 10)</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            <div className="flex items-end">
              <button
                onClick={() => {
                  setSearchTerm('');
                  setCategoryFilter('');
                }}
                className="w-full bg-gray-500 hover:bg-gray-600 text-white px-4 py-3 rounded-lg font-semibold transition duration-200"
              >
                🔄 Clear Filters
              </button>
            </div>
          </div>
        </div>

        {/* Add/Edit Medicine Form */}
        {showAddForm && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-green-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {editingMedicine ? '✏️ Edit Medicine' : '➕ Add New Medicine'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Medicine Name *</label>
                <input
                  type="text"
                  placeholder="Enter medicine name"
                  value={newMedicine.name}
                  onChange={(e) => setNewMedicine({...newMedicine, name: e.target.value})}
                  className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition text-gray-800 placeholder-gray-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Item Code *</label>
                <input
                  type="text"
                  placeholder="Enter item code"
                  value={newMedicine.itemCode}
                  onChange={(e) => setNewMedicine({...newMedicine, itemCode: e.target.value})}
                  className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition text-gray-800 placeholder-gray-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Price (Rs.) *</label>
                <input
                  type="number"
                  placeholder="Enter price"
                  value={newMedicine.rate}
                  onChange={(e) => setNewMedicine({...newMedicine, rate: e.target.value})}
                  className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition text-gray-800 placeholder-gray-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Quantity *</label>
                <input
                  type="number"
                  placeholder="Enter quantity"
                  value={newMedicine.quantity}
                  onChange={(e) => setNewMedicine({...newMedicine, quantity: e.target.value})}
                  className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition text-gray-800 placeholder-gray-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                <input
                  type="text"
                  placeholder="e.g., Test, Medicine, Service"
                  value={newMedicine.category}
                  onChange={(e) => setNewMedicine({...newMedicine, category: e.target.value})}
                  className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition text-gray-800 placeholder-gray-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                <input
                  type="text"
                  placeholder="Enter description"
                  value={newMedicine.description}
                  onChange={(e) => setNewMedicine({...newMedicine, description: e.target.value})}
                  className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition text-gray-800 placeholder-gray-500"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={editingMedicine ? saveEdit : addMedicine}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition duration-200"
              >
                {editingMedicine ? '💾 Save Changes' : '➕ Add Medicine'}
              </button>
              <button
                onClick={cancelEdit}
                className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold transition duration-200"
              >
                ❌ Cancel
              </button>
            </div>
          </div>
        )}

        {/* Medicines List */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          {/* Header Stats */}
          <div className="bg-gray-800 text-white p-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold">{medicines.length}</div>
                <div className="text-sm text-gray-300">Total Medicines</div>
              </div>
              <div>
                <div className="text-2xl font-bold">
                  {medicines.filter(m => m.quantity === 0).length}
                </div>
                <div className="text-sm text-gray-300">Out of Stock</div>
              </div>
              <div>
                <div className="text-2xl font-bold">
                  {medicines.filter(m => m.quantity > 0 && m.quantity < 10).length}
                </div>
                <div className="text-sm text-gray-300">Low Stock</div>
              </div>
              <div>
                <div className="text-2xl font-bold">
                  Rs. {medicines.reduce((total, m) => total + (m.rate * m.quantity), 0).toFixed(2)}
                </div>
                <div className="text-sm text-gray-300">Total Inventory Value</div>
              </div>
            </div>
          </div>

          {/* Medicines Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Medicine Details
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Stock Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Price & Quantity
                    </th>
                    {showEditButtons && (
                    <th className="px-27 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Actions
                    </th>
                    )}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredMedicines.map((medicine) => {
                  const stockStatus = getStockStatus(medicine.quantity);
                  return (
                    <tr key={medicine._id} className="hover:bg-gray-50 transition duration-150">
                      <td className="px-6 py-4">
                        <div>
                          <div className="font-semibold text-gray-900 text-lg">{medicine.name}</div>
                          <div className="text-sm text-gray-600">
                            Code: <span className="font-mono bg-gray-100 px-2 py-1 rounded">{medicine.itemCode}</span>
                          </div>
                          {medicine.category && (
                            <div className="text-sm text-gray-600 mt-1">
                              Category: <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">{medicine.category}</span>
                            </div>
                          )}
                          {medicine.description && (
                            <div className="text-sm text-gray-500 mt-1">{medicine.description}</div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${stockStatus.bg} ${stockStatus.color} ${stockStatus.border}`}>
                          {stockStatus.text}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-3">
                            <span className="text-sm text-gray-600">Price:</span>
                            <span className="text-lg font-bold text-green-600">Rs. {medicine.rate}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-sm text-gray-600">Stock:</span>
                            <span className="text-lg font-bold text-blue-600">{medicine.quantity}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {showEditButtons && (
                            <td className="px-4 py-4">
                                <div className="flex gap-2 justify-start">
                                <button
                                    onClick={() => startEditing(medicine)}
                                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold transition duration-200"
                                >
                                    ✏️ Edit
                                </button>
                                <button
                                    onClick={() => handleDeleteClick(medicine)}
                                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold transition duration-200"
                                >
                                    🗑️ Delete
                                </button>
                                </div>
                            </td>
                        )}
                        </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {filteredMedicines.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">💊</div>
              <h3 className="text-lg font-semibold text-gray-600 mb-2">No medicines found</h3>
              <p className="text-gray-500 mb-4">
                {searchTerm || categoryFilter 
                  ? 'Try adjusting your search or filters' 
                  : 'Get started by adding your first medicine'
                }
              </p>
              {!searchTerm && !categoryFilter && (
                <button
                  onClick={() => setShowAddForm(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition duration-200"
                >
                  ➕ Add Your First Medicine
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}