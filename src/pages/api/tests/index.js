// pages/api/tests/index.js
import clientPromise from '../../../lib/mongodb';

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("clinic-management");

  switch (req.method) {
    case 'GET':
      const tests = await db.collection("tests").find({}).toArray();
      res.json(tests);
      break;

    case 'POST':
      const test = {
        ...req.body,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      await db.collection("tests").insertOne(test);
      res.json(test);
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
