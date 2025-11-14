// pages/add-sample-data.js
import { useEffect } from 'react';

export default function AddSampleData() {
  useEffect(() => {
    addSampleMedicines();
  }, []);

  const addSampleMedicines = async () => {
    const sampleMedicines = [
      { name: "E.C.G.", itemCode: "ECG", rate: 500.00, quantity: 100, category: "Test" },
      { name: "HBSAG-CLIA", itemCode: "HBSAGC", rate: 840.00, quantity: 50, category: "Test" },
      { name: "JJCYCLIA", itemCode: "HCVCLIA", rate: 1160.00, quantity: 50, category: "Test" },
      { name: "JJVCCLIA", itemCode: "HVCLIA", rate: 1160.00, quantity: 50, category: "Test" },
      { name: "LFT", itemCode: "LFT", rate: 1465.00, quantity: 50, category: "Test" },
      { name: "FY(FROTHROMBIN TIME)", itemCode: "PT", rate: 400.00, quantity: 50, category: "Test" },
      { name: "JURINE R/E (ROUTINE)", itemCode: "URI", rate: 150.00, quantity: 50, category: "Test" },
      { name: "QBC", itemCode: "CBC", rate: 620.00, quantity: 50, category: "Test" },
      { name: "CHEST AP", itemCode: "CHAP", rate: 850.00, quantity: 50, category: "Test" },
      { name: "KET", itemCode: "KFT", rate: 1065.00, quantity: 50, category: "Test" }
    ];

    for (const medicine of sampleMedicines) {
      await fetch('/api/medicines', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(medicine),
      });
    }
    
    alert('Sample data added!');
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Sample Data Added</h1>
      <p>Check your MongoDB database for the sample medicines.</p>
    </div>
  );
}