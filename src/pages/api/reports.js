// pages/api/reports.js
import clientPromise from '../../lib/mongodb';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { type = 'daily' } = req.query;
    const client = await clientPromise;
    const db = client.db('clinic-management');

    // Get receipts collection
    const receiptsCollection = db.collection('receipts');

    // Calculate date range based on report type
    let startDate = new Date();
    let endDate = new Date();

    if (type === 'daily') {
      startDate.setHours(0, 0, 0, 0);
      endDate.setHours(23, 59, 59, 999);
    } else if (type === 'monthly') {
      startDate = new Date(endDate.getFullYear(), endDate.getMonth(), 1);
      endDate = new Date(endDate.getFullYear(), endDate.getMonth() + 1, 0);
      endDate.setHours(23, 59, 59, 999);
    } else if (type === 'yearly') {
      startDate = new Date(endDate.getFullYear(), 0, 1);
      endDate = new Date(endDate.getFullYear(), 11, 31);
      endDate.setHours(23, 59, 59, 999);
    }

    // Fetch receipts within date range
    const receipts = await receiptsCollection
      .find({
        createdAt: {
          $gte: startDate,
          $lte: endDate,
        },
      })
      .toArray();

    // Calculate metrics
    let totalSales = 0;
    const medicineMap = {};

    receipts.forEach((receipt) => {
      // Sum total sales
      totalSales += receipt.finalTotal || 0;

      // Aggregate medicines
      if (receipt.items && Array.isArray(receipt.items)) {
        receipt.items.forEach((item) => {
          const medicineName = item.name || 'Unknown';
          if (!medicineMap[medicineName]) {
            medicineMap[medicineName] = {
              name: medicineName,
              quantity: 0,
              revenue: 0,
            };
          }
          medicineMap[medicineName].quantity += item.quantity || 0;
          medicineMap[medicineName].revenue += (item.rate || 0) * (item.quantity || 0);
        });
      }
    });

    // Get top medicines
    const topMedicines = Object.values(medicineMap)
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 10);

    // Calculate average transaction
    const totalTransactions = receipts.length;
    const averageTransaction = totalTransactions > 0 ? totalSales / totalTransactions : 0;

    // Return report data
    return res.status(200).json({
      totalSales: Math.round(totalSales),
      totalTransactions,
      averageTransaction: parseFloat(averageTransaction.toFixed(2)),
      topMedicines,
      dateRange: {
        start: startDate,
        end: endDate,
        type,
      },
    });
  } catch (error) {
    console.error('Error fetching reports:', error);
    return res.status(500).json({ error: 'Failed to fetch reports', details: error.message });
  }
}
