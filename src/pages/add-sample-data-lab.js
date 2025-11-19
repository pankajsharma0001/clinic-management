import { useEffect } from "react";

export default function AddSampleTests() {
  useEffect(() => {
    addTests();
  }, []);

  const addTests = async () => {
    const tests = [
      { name: "E.C.G.", itemCode: "ECG", rate: 500 },
      { name: "HBSAG-CLIA", itemCode: "HBSAGC", rate: 840 },
      { name: "HCV-CLIA", itemCode: "HCVCLIA", rate: 1160 },
      { name: "LFT", itemCode: "LFT", rate: 1465 },
      { name: "PT (PROTHROMBIN TIME)", itemCode: "PT", rate: 400 },
      { name: "URINE R/E", itemCode: "URI", rate: 150 },
      { name: "CBC (QBC)", itemCode: "CBC", rate: 620 },
      { name: "CHEST X-RAY AP", itemCode: "CHAP", rate: 850 },
      { name: "KFT", itemCode: "KFT", rate: 1065 }
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
