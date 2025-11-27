import clientPromise from '../../lib/mongodb';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const client = await clientPromise;
    const db = client.db('clinic-management');

    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = String(now.getFullYear()).slice(-2);
    const datePrefix = `L${day}${month}${year}`; // e.g., "251127"

    const counter = await db.collection('labInvoiceCounters').findOne({ date: datePrefix });
    let serial = 1;

    if (counter) {
      serial = counter.lastSerial + 1;
      await db.collection('labInvoiceCounters').updateOne(
        { date: datePrefix },
        { $set: { lastSerial: serial } }
      );
    } else {
      await db.collection('labInvoiceCounters').insertOne({ date: datePrefix, lastSerial: serial });
    }

    const invoiceNo = `${datePrefix}-${String(serial).padStart(4, '0')}`;
    res.json({ invoiceNo });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
