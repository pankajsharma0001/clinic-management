import { useEffect } from "react";

export default function AddSampleTests() {
  useEffect(() => {
    addTests();
  }, []);

  const addTests = async () => {
    const tests = [
      { name: "RFT/KFT", itemCode: "RFT", rate: 850 },
      { name: "CBC", itemCode: "CBC", rate: 500 },
      { name: "UREA", itemCode: "UREA", rate: 200 },
      { name: "HB", itemCode: "HB", rate: 100 },
      { name: "CREATNINE", itemCode: "CREAT", rate: 200 },
      { name: "TC", itemCode: "TC", rate: 100 },
      { name: "NA%K (Sodium & Potassium)", itemCode: "NAK", rate: 350 },
      { name: "LFT", itemCode: "LFT", rate: 850 },
      { name: "ESR", itemCode: "ESR", rate: 100 },
      { name: "BILIRUBIN (T & D)", itemCode: "BILI", rate: 250 },
      { name: "BLOOD GROUP", itemCode: "BGRP", rate: 100 },
      { name: "SGPT", itemCode: "SGPT", rate: 250 },
      { name: "PT (INR)", itemCode: "PTINR", rate: 400 },
      { name: "SGOT", itemCode: "SGOT", rate: 250 },
      { name: "APTT", itemCode: "APTT", rate: 600 },
      { name: "ALKALINE PHOSPHATE (ALP)", itemCode: "ALP", rate: 250 },
      { name: "MALARIA PARASITE", itemCode: "MP", rate: 200 },
      { name: "LIPID PROFILE", itemCode: "LIPID", rate: 800 },
      { name: "MALARIA ANTIGEN", itemCode: "MALG", rate: 500 },
      { name: "TOTAL CHOLESTROL", itemCode: "TCHOL", rate: 250 },
      { name: "HBA1C", itemCode: "HBA1C", rate: 1000 },
      { name: "PAP SMEAR", itemCode: "PAP", rate: 1100 },
      { name: "UPT", itemCode: "UPT", rate: 100 },
      { name: "SERUM BETA-HCG", itemCode: "HCG", rate: 1500 },
      { name: "URINE R/E", itemCode: "URE", rate: 100 },
      { name: "URINE ACETONE & KETONE", itemCode: "UAK", rate: 200 },
      { name: "SUGAR F, PP, RANDOM (EACH)", itemCode: "SUGAR", rate: 50 },
      { name: "URINE ACR", itemCode: "ACR", rate: 1200 },
      { name: "SERUM CALCIUM", itemCode: "CAL", rate: 500 },
      { name: "URINE C/S", itemCode: "URCS", rate: 500 },
      { name: "SERUM PHOSPHROUS", itemCode: "PHOS", rate: 500 },
      { name: "BLOOD C/S", itemCode: "BLCS", rate: 500 },
      { name: "STOOL C/S", itemCode: "STCS", rate: 500 },
      { name: "ANA TITRE", itemCode: "ANA", rate: 1500 },
      { name: "SPUTUM C/S", itemCode: "SPCS", rate: 500 },
      { name: "H. PYLORI(BLOOD)", itemCode: "HPBL", rate: 1000 },
      { name: "H. PYLORI (AG) STOOL", itemCode: "HPAG", rate: 1200 },
      { name: "SPUTUM AFB (EACH)", itemCode: "AFB", rate: 600 },
      { name: "URIC ACID", itemCode: "URIC", rate: 250 },
      { name: "STOOL R/E", itemCode: "STRE", rate: 100 },
      { name: "RA FACTOR", itemCode: "RA", rate: 500 },
      { name: "STOOL OCCULT BLOOD (OBT)", itemCode: "OBT", rate: 250 },
      { name: "CRP TITRE", itemCode: "CRP", rate: 400 },
      { name: "SEMEN ANALYSIS", itemCode: "SEMN", rate: 500 },
      { name: "ASO TITRE", itemCode: "ASO", rate: 500 },
      { name: "IRON PROFILE", itemCode: "IRONP", rate: 2500 },
      { name: "SERUM ALBUMIN", itemCode: "ALB", rate: 300 },
      { name: "SERUM FERRITIN", itemCode: "FERR", rate: 1400 },
      { name: "TOTAL PROTEIN", itemCode: "TPRT", rate: 400 },
      { name: "SERUM IRON", itemCode: "IRON", rate: 500 },
      { name: "VDRL", itemCode: "VDRL", rate: 350 },
      { name: "HIV I & II", itemCode: "HIV", rate: 500 },
      { name: "HBSAG", itemCode: "HBS", rate: 400 },
      { name: "ANTI-HCV", itemCode: "HCV", rate: 700 },
      { name: "TPHA", itemCode: "TPHA", rate: 600 },
      { name: "WIDAL", itemCode: "WIDAL", rate: 250 },
      { name: "DENGUE (AG & AB)", itemCode: "DEN", rate: 1200 },
      { name: "SERUM AMYLASE", itemCode: "AMY", rate: 600 },
      { name: "TFT (T3, T4, TSH)", itemCode: "TFT", rate: 1000 },
      { name: "T3", itemCode: "T3", rate: 400 },
      { name: "T4", itemCode: "T4", rate: 400 },
      { name: "TSH", itemCode: "TSH", rate: 500 },
      { name: "VITAMIN D (25-OH)", itemCode: "VITD", rate: 2400 },
      { name: "VITAMIN B12", itemCode: "VITB12", rate: 2000 },
      { name: "ANTI TPO", itemCode: "ATPO", rate: 1600 },
      { name: "OGTT (3 times)", itemCode: "OGTT", rate: 300 },
      { name: "PSA", itemCode: "PSA", rate: 1500 },
      { name: "URINE MICROALBUMIN", itemCode: "UMALB", rate: 900 },
      { name: "SERUM PROLACTIN", itemCode: "PROL", rate: 1400 },
      { name: "CPK TOTAL", itemCode: "CPKT", rate: 1000 },
      { name: "CPK-MB", itemCode: "CPKMB", rate: 1200 },
      { name: "SERUM LDH", itemCode: "LDH", rate: 800 },
      { name: "GAMMA - GGT", itemCode: "GGT", rate: 700 },
      { name: "MAGNESIUM", itemCode: "MG", rate: 500 },
      { name: "SERUM A/G RATIO", itemCode: "AGRATIO", rate: 500 },
    ];

    for (const test of tests) {
      await fetch("/api/tests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(test),
      });
    }

    alert("All sample tests added!");
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Sample Tests Added</h1>
    </div>
  );
}
