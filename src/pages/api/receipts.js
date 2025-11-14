// pages/api/receipts.js
import clientPromise from '../../lib/mongodb';

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("clinic-management");

  if (req.method === "POST") {
    const { items, discount = 0 } = req.body;

    // BACKEND CALCULATION (same as frontend)
    const totalAmount = items.reduce((sum, item) =>
      sum + item.rate * item.quantity, 0
    );

    const discountAmount = parseFloat(discount) || 0;
    const taxableAmount = Math.max(0, totalAmount - discountAmount);
    const vat = taxableAmount * 0.13;
    const finalTotal = taxableAmount + vat;

    const receipt = {
      ...req.body,
      totalAmount,
      discountAmount,
      taxableAmount,
      vat,
      finalTotal,
      createdAt: new Date(),
    };

    const result = await db.collection("receipts").insertOne(receipt);

    res.json({ _id: result.insertedId, ...receipt });
  }
}
