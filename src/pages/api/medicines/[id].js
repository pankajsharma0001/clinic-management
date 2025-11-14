// pages/api/medicines/[id].js
import clientPromise from '../../../lib/mongodb';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  const { id } = req.query;
  const client = await clientPromise;
  const db = client.db("clinic-management");

  switch (req.method) {
    case 'PATCH':
      const updates = req.body;
      await db.collection("medicines").updateOne(
        { _id: new ObjectId(id) },
        { 
          $set: {
            ...updates,
            updatedAt: new Date()
          }
        }
      );
      res.json({ success: true });
      break;

    case 'DELETE':
      await db.collection("medicines").deleteOne({ _id: new ObjectId(id) });
      res.json({ success: true });
      break;

    default:
      res.setHeader('Allow', ['PATCH', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}