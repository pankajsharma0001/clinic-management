// pages/add-sample-data.js
import { useEffect } from 'react';

export default function AddSampleData() {
  useEffect(() => {
    addSampleMedicines();
  }, []);

  const addSampleMedicines = async () => {
    const sampleMedicines = [
      { name: "RFT/KFT", itemCode: "RFT", rate: 850, quantity: 50, category: "Test" },
      { name: "CBC", itemCode: "CBC", rate: 500, quantity: 50, category: "Test" },
      { name: "UREA", itemCode: "UREA", rate: 200, quantity: 50, category: "Test" },
      { name: "HB", itemCode: "HB", rate: 100, quantity: 50, category: "Test" },
      { name: "CREATNINE", itemCode: "CREAT", rate: 200, quantity: 50, category: "Test" },
      { name: "TC", itemCode: "TC", rate: 100, quantity: 50, category: "Test" },
      { name: "NA%K (Sodium & Potassium)", itemCode: "NAK", rate: 350, quantity: 50, category: "Test" },
      { name: "LFT", itemCode: "LFT", rate: 850, quantity: 50, category: "Test" },
      { name: "ESR", itemCode: "ESR", rate: 100, quantity: 50, category: "Test" },
      { name: "BILIRUBIN (T & D)", itemCode: "BILI", rate: 250, quantity: 50, category: "Test" },
      { name: "BLOOD GROUP", itemCode: "BGRP", rate: 100, quantity: 50, category: "Test" },
      { name: "SGPT", itemCode: "SGPT", rate: 250, quantity: 50, category: "Test" },
      { name: "PT (INR)", itemCode: "PTINR", rate: 400, quantity: 50, category: "Test" },
      { name: "SGOT", itemCode: "SGOT", rate: 250, quantity: 50, category: "Test" },
      { name: "APTT", itemCode: "APTT", rate: 600, quantity: 50, category: "Test" },
      { name: "ALKALINE PHOSPHATE (ALP)", itemCode: "ALP", rate: 250, quantity: 50, category: "Test" },
      { name: "MALARIA PARASITE", itemCode: "MP", rate: 200, quantity: 50, category: "Test" },
      { name: "LIPID PROFILE", itemCode: "LIPID", rate: 800, quantity: 50, category: "Test" },
      { name: "MALARIA ANTIGEN", itemCode: "MALG", rate: 500, quantity: 50, category: "Test" },
      { name: "TOTAL CHOLESTROL", itemCode: "TCHOL", rate: 250, quantity: 50, category: "Test" },
      { name: "HBA1C", itemCode: "HBA1C", rate: 1000, quantity: 50, category: "Test" },
      { name: "PAP SMEAR", itemCode: "PAP", rate: 1100, quantity: 50, category: "Test" },
      { name: "UPT", itemCode: "UPT", rate: 100, quantity: 50, category: "Test" },
      { name: "SERUM BETA-HCG", itemCode: "HCG", rate: 1500, quantity: 50, category: "Test" },
      { name: "URINE R/E", itemCode: "URE", rate: 100, quantity: 50, category: "Test" },
      { name: "URINE ACETONE & KETONE", itemCode: "UAK", rate: 200, quantity: 50, category: "Test" },
      { name: "SUGAR F, PP, RANDOM (EACH)", itemCode: "SUGAR", rate: 50, quantity: 50, category: "Test" },
      { name: "URINE ACR", itemCode: "ACR", rate: 1200, quantity: 50, category: "Test" },
      { name: "SERUM CALCIUM", itemCode: "CAL", rate: 500, quantity: 50, category: "Test" },
      { name: "URINE C/S", itemCode: "URCS", rate: 500, quantity: 50, category: "Test" },
      { name: "SERUM PHOSPHROUS", itemCode: "PHOS", rate: 500, quantity: 50, category: "Test" },
      { name: "BLOOD C/S", itemCode: "BLCS", rate: 500, quantity: 50, category: "Test" },
      { name: "STOOL C/S", itemCode: "STCS", rate: 500, quantity: 50, category: "Test" },
      { name: "ANA TITRE", itemCode: "ANA", rate: 1500, quantity: 50, category: "Test" },
      { name: "SPUTUM C/S", itemCode: "SPCS", rate: 500, quantity: 50, category: "Test" },
      { name: "H. PYLORI(BLOOD)", itemCode: "HPBL", rate: 1000, quantity: 50, category: "Test" },
      { name: "H. PYLORI (AG) STOOL", itemCode: "HPAG", rate: 1200, quantity: 50, category: "Test" },
      { name: "SPUTUM AFB (EACH)", itemCode: "AFB", rate: 600, quantity: 50, category: "Test" },
      { name: "URIC ACID", itemCode: "URIC", rate: 250, quantity: 50, category: "Test" },
      { name: "STOOL R/E", itemCode: "STRE", rate: 100, quantity: 50, category: "Test" },
      { name: "RA FACTOR", itemCode: "RA", rate: 500, quantity: 50, category: "Test" },
      { name: "STOOL OCCULT BLOOD (OBT)", itemCode: "OBT", rate: 250, quantity: 50, category: "Test" },
      { name: "CRP TITRE", itemCode: "CRP", rate: 400, quantity: 50, category: "Test" },
      { name: "SEMEN ANALYSIS", itemCode: "SEMN", rate: 500, quantity: 50, category: "Test" },
      { name: "ASO TITRE", itemCode: "ASO", rate: 500, quantity: 50, category: "Test" },
      { name: "IRON PROFILE", itemCode: "IRONP", rate: 2500, quantity: 50, category: "Test" },
      { name: "SERUM ALBUMIN", itemCode: "ALB", rate: 300, quantity: 50, category: "Test" },
      { name: "SERUM FERRITIN", itemCode: "FERR", rate: 1400, quantity: 50, category: "Test" },
      { name: "TOTAL PROTEIN", itemCode: "TPRT", rate: 400, quantity: 50, category: "Test" },
      { name: "SERUM IRON", itemCode: "IRON", rate: 500, quantity: 50, category: "Test" },
      { name: "VDRL", itemCode: "VDRL", rate: 350, quantity: 50, category: "Test" },
      { name: "HIV I & II", itemCode: "HIV", rate: 500, quantity: 50, category: "Test" },
      { name: "HBSAG", itemCode: "HBS", rate: 400, quantity: 50, category: "Test" },
      { name: "ANTI-HCV", itemCode: "HCV", rate: 700, quantity: 50, category: "Test" },
      { name: "TPHA", itemCode: "TPHA", rate: 600, quantity: 50, category: "Test" },
      { name: "WIDAL", itemCode: "WIDAL", rate: 250, quantity: 50, category: "Test" },
      { name: "DENGUE (AG & AB)", itemCode: "DEN", rate: 1200, quantity: 50, category: "Test" },
      { name: "SERUM AMYLASE", itemCode: "AMY", rate: 600, quantity: 50, category: "Test" },
      { name: "TFT (T3, T4, TSH)", itemCode: "TFT", rate: 1000, quantity: 50, category: "Test" },
      { name: "T3", itemCode: "T3", rate: 400, quantity: 50, category: "Test" },
      { name: "T4", itemCode: "T4", rate: 400, quantity: 50, category: "Test" },
      { name: "TSH", itemCode: "TSH", rate: 500, quantity: 50, category: "Test" },
      { name: "VITAMIN D (25-OH)", itemCode: "VITD", rate: 2400, quantity: 50, category: "Test" },
      { name: "VITAMIN B12", itemCode: "VITB12", rate: 2000, quantity: 50, category: "Test" },
      { name: "ANTI TPO", itemCode: "ATPO", rate: 1600, quantity: 50, category: "Test" },
      { name: "OGTT (3 times)", itemCode: "OGTT", rate: 300, quantity: 50, category: "Test" },
      { name: "PSA", itemCode: "PSA", rate: 1500, quantity: 50, category: "Test" },
      { name: "URINE MICROALBUMIN", itemCode: "UMALB", rate: 900, quantity: 50, category: "Test" },
      { name: "SERUM PROLACTIN", itemCode: "PROL", rate: 1400, quantity: 50, category: "Test" },
      { name: "CPK TOTAL", itemCode: "CPKT", rate: 1000, quantity: 50, category: "Test" },
      { name: "CPK-MB", itemCode: "CPKMB", rate: 1200, quantity: 50, category: "Test" },
      { name: "SERUM LDH", itemCode: "LDH", rate: 800, quantity: 50, category: "Test" },
      { name: "GAMMA - GGT", itemCode: "GGT", rate: 700, quantity: 50, category: "Test" },
      { name: "MAGNESIUM", itemCode: "MG", rate: 500, quantity: 50, category: "Test" },
      { name: "SERUM A/G RATIO", itemCode: "AGRATIO", rate: 500, quantity: 50, category: "Test" },
    ];

    for (const m of sampleMedicines) {
      await fetch('/api/medicines', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(m)
      });
    }

    alert('All tests added successfully!');
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Sample Data Adding…</h1>
      <p>Check MongoDB after it completes.</p>
    </div>
  );
}
