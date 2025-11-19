// pages/api/tests/[id].js
import clientPromise from '../../../lib/mongodb';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  const { id } = req.query;
  const client = await clientPromise;
  const db = client.db("clinic-management");

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid test ID" });
  }

  switch (req.method) {
    case 'GET':
      // Fetch a single test
      const test = await db.collection("tests").findOne({ _id: new ObjectId(id) });
      if (!test) return res.status(404).json({ error: "Test not found" });
      res.json(test);
      break;

    case 'PATCH':
      // Update a test
      const updates = req.body;
      await db.collection("tests").updateOne(
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
      // Delete a test
      await db.collection("tests").deleteOne({ _id: new ObjectId(id) });
      res.json({ success: true });
      break;

    default:
      res.setHeader('Allow', ['GET', 'PATCH', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
