// pages/api/medicines.js
import clientPromise from '../../lib/mongodb';

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("clinic-management");

  switch (req.method) {
    case 'GET':
      const medicines = await db.collection("medicines").find({}).sort({ name: 1 }).toArray();
      res.json(medicines);
      break;

    case 'POST':
      const medicine = {
        ...req.body,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      const result = await db.collection("medicines").insertOne(medicine);
      res.json({ _id: result.insertedId, ...medicine });
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}