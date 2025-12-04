// pages/add-sample-data.js
import { useEffect } from 'react';

export default function AddSampleData() {
  useEffect(() => {
    addSampleMedicines();
  }, []);

  const addSampleMedicines = async () => {
    const sampleMedicines = [

      // ============================
      // 📌 TABLETS
      // ============================
      { name: "Paracetamol 500mg", itemCode: "PCM500", rate: 20, quantity: 300, category: "Tablet" },
      { name: "Cetirizine 10mg", itemCode: "CET10", rate: 15, quantity: 250, category: "Tablet" },
      { name: "Azithromycin 500mg", itemCode: "AZI500", rate: 120, quantity: 150, category: "Tablet" },
      { name: "Amoxicillin 500mg", itemCode: "AMOX500", rate: 80, quantity: 180, category: "Tablet" },
      { name: "Montelukast 10mg", itemCode: "MON10", rate: 45, quantity: 200, category: "Tablet" },
      { name: "Losartan 50mg", itemCode: "LOS50", rate: 35, quantity: 170, category: "Tablet" },
      { name: "Atorvastatin 10mg", itemCode: "ATOR10", rate: 50, quantity: 140, category: "Tablet" },
      { name: "Metformin 500mg", itemCode: "MET500", rate: 35, quantity: 160, category: "Tablet" },
      { name: "Ibuprofen 400mg", itemCode: "IBU400", rate: 25, quantity: 180, category: "Tablet" },
      { name: "Ranitidine 150mg", itemCode: "RAN150", rate: 12, quantity: 200, category: "Tablet" },
      { name: "Telmisartan 40mg", itemCode: "TEL40", rate: 40, quantity: 180, category: "Tablet" },
      { name: "Diclofenac 50mg", itemCode: "DICLO50", rate: 15, quantity: 250, category: "Tablet" },
      { name: "Fexofenadine 120mg", itemCode: "FEX120", rate: 55, quantity: 160, category: "Tablet" },
      { name: "Levocetirizine 5mg", itemCode: "LEVC5", rate: 18, quantity: 200, category: "Tablet" },
      { name: "Dexamethasone 4mg", itemCode: "DEX4", rate: 12, quantity: 140, category: "Tablet" },
    
      // ============================
      // 📌 CAPSULES
      // ============================
      { name: "Amoxiclav 625mg", itemCode: "AMOCLAV", rate: 150, quantity: 100, category: "Capsule" },
      { name: "Doxycycline 100mg", itemCode: "DOXY100", rate: 40, quantity: 120, category: "Capsule" },
      { name: "Omeprazole 20mg", itemCode: "OME20", rate: 25, quantity: 200, category: "Capsule" },
      { name: "Pantoprazole 40mg", itemCode: "PANTO40", rate: 30, quantity: 175, category: "Capsule" },
      { name: "Rabeprazole 20mg", itemCode: "RABE20", rate: 30, quantity: 150, category: "Capsule" },
      { name: "Cabergoline 0.25mg", itemCode: "CAB25", rate: 180, quantity: 60, category: "Capsule" },
    
      // ============================
      // 📌 SYRUPS
      // ============================
      { name: "Cough Syrup 100ml", itemCode: "CS100", rate: 80, quantity: 120, category: "Syrup" },
      { name: "Paracetamol Syrup 60ml", itemCode: "PCS60", rate: 40, quantity: 150, category: "Syrup" },
      { name: "B-Complex Syrup", itemCode: "BCS100", rate: 85, quantity: 90, category: "Syrup" },
      { name: "ORS Liquid 200ml", itemCode: "ORSLIQ", rate: 30, quantity: 100, category: "Syrup" },
      { name: "Iron Syrup 100ml", itemCode: "IRS100", rate: 60, quantity: 80, category: "Syrup" },
      { name: "Calcium Syrup 200ml", itemCode: "CAL200", rate: 90, quantity: 70, category: "Syrup" },
    
      // ============================
      // 📌 INJECTIONS
      // ============================
      { name: "Ceftriaxone Injection 1g", itemCode: "CEF1G", rate: 120, quantity: 60, category: "Injection" },
      { name: "Dexamethasone Injection 2ml", itemCode: "DEX2", rate: 20, quantity: 100, category: "Injection" },
      { name: "Ondansetron Injection", itemCode: "ONDINJ", rate: 25, quantity: 80, category: "Injection" },
      { name: "Pantoprazole Injection", itemCode: "PANTOINJ", rate: 50, quantity: 70, category: "Injection" },
      { name: "Vitamin B-Complex Injection", itemCode: "BCINJ", rate: 40, quantity: 90, category: "Injection" },
    
      // ============================
      // 📌 DROPS
      // ============================
      { name: "Eye Drops Ciprofloxacin", itemCode: "ECPD", rate: 60, quantity: 90, category: "Drops" },
      { name: "Ear Drops Sofradex", itemCode: "ESF", rate: 45, quantity: 80, category: "Drops" },
      { name: "Nasal Drops Saline", itemCode: "NSD", rate: 25, quantity: 150, category: "Drops" },
    
      // ============================
      // 📌 OINTMENTS / CREAMS
      // ============================
      { name: "Burnol Ointment", itemCode: "BURNOL", rate: 35, quantity: 60, category: "Ointment" },
      { name: "Betnovate Cream", itemCode: "BETNO", rate: 40, quantity: 50, category: "Ointment" },
      { name: "Clotrimazole Cream", itemCode: "CLOT", rate: 25, quantity: 100, category: "Ointment" },
      { name: "Hydrocortisone Cream", itemCode: "HYDROC", rate: 30, quantity: 80, category: "Ointment" },
    
      // ============================
      // 📌 SUPPLEMENTS / VITAMINS
      // ============================
      { name: "Vitamin C 500mg", itemCode: "VITC500", rate: 25, quantity: 200, category: "Supplement" },
      { name: "Vitamin D3 60k", itemCode: "VITD3", rate: 120, quantity: 150, category: "Supplement" },
      { name: "Calcium + Vitamin D3", itemCode: "CALD3", rate: 80, quantity: 200, category: "Supplement" },
      { name: "Zinc Tablets 20mg", itemCode: "ZINC20", rate: 18, quantity: 250, category: "Supplement" },
      { name: "Multivitamin Capsule", itemCode: "MVT", rate: 60, quantity: 180, category: "Supplement" },
    
      // ============================
      // 📌 OTC / GENERAL
      // ============================
      { name: "ORS Packet", itemCode: "ORS", rate: 20, quantity: 300, category: "OTC" },
      { name: "Bandage Roll", itemCode: "BANDAGE", rate: 15, quantity: 200, category: "OTC" },
      { name: "Cotton 50g", itemCode: "COT50", rate: 25, quantity: 150, category: "OTC" },
      { name: "Dettol 100ml", itemCode: "DETTOL100", rate: 40, quantity: 100, category: "OTC" },
      { name: "Hand Sanitizer 100ml", itemCode: "SAN100", rate: 50, quantity: 120, category: "OTC" },
      { name: "Thermometer Digital", itemCode: "THERMO", rate: 250, quantity: 40, category: "OTC" },
      { name: "Gauze Pack", itemCode: "GAUZE", rate: 10, quantity: 250, category: "OTC" },
      { name: "Pain Relief Spray", itemCode: "PAINSPR", rate: 130, quantity: 90, category: "OTC" },
    
    ];

    for (const m of sampleMedicines) {
      await fetch('/api/medicines', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(m)
      });
    }

    alert('All medicines added successfully!');
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Adding Sample Medicines…</h1>
      <p>Check MongoDB after it completes.</p>
    </div>
  );
}
