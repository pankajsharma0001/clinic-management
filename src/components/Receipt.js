// components/Receipt.js
import { useState, useEffect } from 'react';

// Function to convert numbers to words
const numberToWords = (num) => {
  const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
  const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
  const teens = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];

  const convertBelowThousand = (n) => {
    if (n === 0) return '';
    if (n < 10) return ones[n];
    if (n < 20) return teens[n - 10];
    if (n < 100) return tens[Math.floor(n / 10)] + (n % 10 !== 0 ? ' ' + ones[n % 10] : '');
    return ones[Math.floor(n / 100)] + ' Hundred' + (n % 100 !== 0 ? ' ' + convertBelowThousand(n % 100) : '');
  };

  if (num === 0) return 'Zero';
  const billions = Math.floor(num / 1000000000);
  const millions = Math.floor((num % 1000000000) / 1000000);
  const thousands = Math.floor((num % 1000000) / 1000);
  const remainder = Math.floor(num % 1000);

  let words = '';
  if (billions > 0) words += convertBelowThousand(billions) + ' Billion ';
  if (millions > 0) words += convertBelowThousand(millions) + ' Million ';
  if (thousands > 0) words += convertBelowThousand(thousands) + ' Thousand ';
  if (remainder > 0) words += convertBelowThousand(remainder);

  return words.trim();
};

export default function Receipt({ receiptData = {}, onPrint }) {
  const [currentDate, setCurrentDate] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0);

  useEffect(() => {
    const now = new Date();
    const formattedDate = `${now.getFullYear()}/${String(now.getMonth() + 1).padStart(2, '0')}/${String(now.getDate()).padStart(2, '0')}-${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
    setCurrentDate(formattedDate);
  }, []);

  const calculateTotal = (items) => {
    return (items || []).reduce((total, item) => total + (item.rate * item.quantity), 0);
  };

  const items = receiptData.items || [];
  const totalAmount = calculateTotal(items);
  const discount = parseFloat(discountAmount) || 0;
  const taxableAmount = Math.max(0, totalAmount - discount);
  const vat = taxableAmount * 0.13;
  const finalTotal = taxableAmount + vat;
  const totalInWords = numberToWords(Math.floor(finalTotal));

  return (
    <div className="receipt-container bg-white w-full max-w-2xl mx-auto border-2 border-gray-300 shadow-sm">
      {/* Print button (hidden in print) */}
      <div className="no-print p-4 text-center">
        <button
          onClick={onPrint}
          className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 font-semibold"
        >
          🖨️ Print Receipt
        </button>
      </div>

      {/* Receipt Content */}
      <div className="receipt-content p-4">
        
        {/* CLINIC HEADER - This will repeat on every page */}
        <header className="print-header py-1 px-3 border-b border-gray-300">
          <div className="flex items-center justify-between gap-2">
            {/* Logo on left */}
            <div className="w-12 h-12 bg-blue-500 text-white flex items-center justify-center rounded-md font-bold text-xs shrink-0">LOGO</div>
            
            {/* Title in center */}
            <div className="text-center grow">
              <h1 className="text-sm font-bold uppercase text-gray-800 leading-tight">Rina Polyclinic Pvt. Ltd.</h1>
              <p className="text-xs text-gray-600 leading-tight">Tikathali, Lalitpur, Nepal</p>
            </div>
            
            {/* Phone and PAN on right */}
            <div className="text-right text-xs text-gray-600 shrink-0">
              <div className="text-gray-500 font-semibold text-xs">Phone: +977-987654321</div>
              <div className="text-gray-500 font-semibold text-xs">PAN: 987654321</div>
            </div>
          </div>
        </header>

        {/* TAX-INVOICE TITLE (CENTERED) */}
        <div className="text-center py-1">
          <div className="text-sm font-bold uppercase border-b-2 border-gray-800 inline-block px-4 pb-0.5 text-gray-800">TAX-INVOICE</div>
        </div>

        {/* BILL AND PATIENT DETAILS */}
        <div className="p-2 bill-details border-b-2 border-gray-800">
          <div className="grid grid-cols-4 gap-1">
            {/* Bill Details */}
            <div className="col-span-2 p-1 border border-gray-300 rounded bg-gray-50">
              <div className="text-xs space-y-0.5">
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-800">Bill No:</span>
                  <span className="text-gray-700 text-xs">{receiptData.invoiceNo || '_______________'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-800">Date:</span>
                  <span className="text-gray-700 text-xs">{currentDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-800">Ref Dr:</span>
                  <span className="text-gray-700 text-xs">{receiptData.doctor || '_______________'}</span>
                </div>
              </div>
            </div>

            {/* Patient Details */}
            <div className="col-span-2 p-1 border border-blue-300 rounded bg-blue-50 patient-details">
              <div className="text-xs space-y-0.5">
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-800">Hos. No:</span>
                  <span className="text-gray-700 text-xs">{receiptData.hospitalNo || '_______________'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-800">Patient Name:</span>
                  <span className="text-gray-700 text-xs">{receiptData.patientName || '_______________'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-800">Age/Gender:</span>
                  <span className="text-gray-700 text-xs">{receiptData.ageGender || '_______________'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-800">Address:</span>
                  <span className="text-gray-700 text-xs">{receiptData.address || 'KATHMANDU'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* MAIN TABLE */}
        <div className="p-2">
          <table className="receipt-table w-full border-collapse text-xs">
            <thead>
              {/* Services table header (repeats on each page) */}
              <tr className="bg-gray-800">
                <th className="p-1 border border-gray-600 text-center w-10 font-semibold text-white text-xs">S. No.</th>
                <th className="p-1 border border-gray-600 text-center w-16 font-semibold text-white text-xs">H.S. Code</th>
                <th className="p-1 border border-gray-600 text-left font-semibold text-white text-xs">Services</th>
                <th className="p-1 border border-gray-600 text-center w-20 font-semibold text-white text-xs">Item Code</th>
                <th className="p-1 border border-gray-600 text-right w-16 font-semibold text-white text-xs">Rate</th>
                <th className="p-1 border border-gray-600 text-center w-12 font-semibold text-white text-xs">Qty</th>
                <th className="p-1 border border-gray-600 text-right w-20 font-semibold text-white text-xs">Amount</th>
              </tr>
            </thead>

            <tbody>
              {/* Service rows */}
              {items && items.length > 0 ? (
                items.map((item, index) => (
                  <tr key={index} className="text-gray-700 text-xs border-b border-gray-300 page-break-inside-avoid">
                    <td className="p-1 border border-gray-300 text-center text-gray-700">{index + 1}</td>
                    <td className="p-1 border border-gray-300 text-center text-gray-700">{item.hsCode || ''}</td>
                    <td className="p-1 border border-gray-300 text-gray-700">{item.name}</td>
                    <td className="p-1 border border-gray-300 text-center text-gray-700">{item.itemCode}</td>
                    <td className="p-1 border border-gray-300 text-right text-gray-700">{item.rate.toFixed(2)}</td>
                    <td className="p-1 border border-gray-300 text-center text-gray-700">{item.quantity}</td>
                    <td className="p-1 border border-gray-300 text-right text-green-600 font-semibold">{(item.rate * item.quantity).toFixed(2)}</td>
                  </tr>
                ))
              ) : (
                <tr className="text-gray-700 text-xs border-b border-gray-300 page-break-inside-avoid">
                  <td className="p-1 border border-gray-300 text-center">1</td>
                  <td className="p-1 border border-gray-300 text-center"></td>
                  <td className="p-1 border border-gray-300">E.C.G.</td>
                  <td className="p-1 border border-gray-300 text-center">ECG</td>
                  <td className="p-1 border border-gray-300 text-right">500.00</td>
                  <td className="p-1 border border-gray-300 text-center">1</td>
                  <td className="p-1 border border-gray-300 text-right text-green-600 font-semibold">500.00</td>
                </tr>
              )}

              {/* Amount Summary */}
              <tr className="page-break-inside-avoid">
                <td colSpan={7} className="p-1">
                  <div className="grid grid-cols-2 gap-2 float-right w-1/2">
                    <div className="text-right text-xs font-semibold text-gray-700">Total Amount:</div>
                    <div className="text-right text-xs text-gray-800 whitespace-nowrap">Rs. {totalAmount.toFixed(2)}</div>
                    <div className="text-right text-xs font-semibold text-gray-700">Discount:</div>
                    <div className="text-right text-xs text-gray-800 whitespace-nowrap">
                      <input
                        type="number"
                        value={discountAmount}
                        onChange={(e) => setDiscountAmount(e.target.value)}
                        placeholder="0"
                        className="w-16 p-0.5 border border-gray-300 rounded text-right text-xs no-print text-gray-700"
                      />
                    </div>
                    <div className="text-right text-xs font-semibold text-gray-700">Taxable Amount:</div>
                    <div className="text-right text-xs text-gray-800 whitespace-nowrap">Rs. {taxableAmount.toFixed(2)}</div>
                    <div className="text-right text-xs font-semibold text-gray-700">13% VAT:</div>
                    <div className="text-right text-xs text-gray-800 whitespace-nowrap">Rs. {vat.toFixed(2)}</div>
                    <div className="text-right text-xs font-bold text-gray-800 bg-yellow-100 p-0.5">TOTAL:</div>
                    <div className="text-right text-xs font-bold text-green-600 bg-yellow-100 p-0.5 whitespace-nowrap">Rs. {finalTotal.toFixed(2)}</div>
                  </div>
                </td>
              </tr>

              {/* Total in Words */}
              <tr className="page-break-inside-avoid">
                <td colSpan={7} className="p-1 text-gray-700">
                  <div className="text-xs p-1 border border-gray-300 rounded bg-blue-50 text-gray-700">
                    <strong className="text-gray-800">Total in Words:</strong> {totalInWords} Rupees Only
                  </div>
                </td>
              </tr>

              {/* Spacer before signature */}
              <tr className="page-break-inside-avoid">
                <td colSpan={7} className="h-20"></td>
              </tr>

              {/* Signature rows */}
              <tr className="page-break-inside-avoid">
                <td colSpan={7} className="p-2 text-right">
                  <div className="inline-block text-right w-48">
                    <div className="h-16 border-t-2 border-gray-800 pt-1 text-center text-xs font-semibold text-gray-800">
                      Authorized By
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* FOOTER - This will appear at the bottom of each page */}
        <footer className="p-2 text-center text-xs text-gray-700 border-t border-gray-300">
          <p className="font-semibold text-gray-800 text-xs">Thank you for Rina Polyclinic Pvt. Ltd.</p>
          <p className="text-gray-700 text-xs">For any queries, contact: +977-987654321 | info@rinapolyclinic.com</p>
          <p className="text-xs text-gray-600">This is a computer generated receipt</p>
        </footer>
      </div>

      <style jsx>{`
        /* SCREEN STYLES */
        .receipt-container {
          background: white !important;
          color: #1f2937 !important;
        }

        .receipt-table {
          color: #1f2937 !important;
        }

        .receipt-table th,
        .receipt-table td {
          word-wrap: break-word;
          color: #1f2937 !important;
        }

        .receipt-table tbody tr td {
          color: #1f2937 !important;
        }

        /* Table header text - white */
        .receipt-table thead tr th {
          color: #1f2937 !important;
        }

        .receipt-table thead tr.bg-gray-800 th {
          color: white !important;
          background: #1f2937 !important;
        }

        /* Ensure bill/patient details are visible */
        .bill-details,
        .patient-details {
          color: #1f2937 !important;
          background: white !important;
        }

        .bill-details *,
        .patient-details * {
          color: #1f2937 !important;
        }

        @media print {
          /* Hide everything except the receipt container */
          body * {
            visibility: hidden;
            margin: 0 !important;
            padding: 0 !important;
          }

          .receipt-container,
          .receipt-container * {
            visibility: visible;
          }

          .receipt-container {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            margin: 0 !important;
            padding: 0 !important;
            border: none !important;
            box-shadow: none !important;
            background: white !important;
          }

          /* Page setup */
          @page {
            margin: 0.5in 0.5in 0.5in 0.5in;
            size: auto;
          }

          /* Ensure table header repeats on every page */
          .receipt-table thead {
            display: table-header-group;
          }

          .receipt-table tbody {
            display: table-row-group;
          }

          /* Avoid breaking important rows */
          .page-break-inside-avoid {
            page-break-inside: avoid;
            break-inside: avoid;
          }

          /* Table styling for print */
          .receipt-table {
            width: 100% !important;
            border-collapse: collapse !important;
            table-layout: fixed !important;
            font-size: 11px !important;
            color: #1f2937 !important;
          }

          /* Ensure all table cells have proper color in print */
          .receipt-table th,
          .receipt-table td {
            color: #1f2937 !important;
            background: white !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }

          /* Table header with proper background color for print */
          .receipt-table thead tr.bg-gray-800 {
            background: #1f2937 !important;
            color: white !important;
          }

          .receipt-table thead tr.bg-gray-800 th {
            background: #1f2937 !important;
            color: white !important;
            border-color: #4b5563 !important;
            font-weight: bold !important;
          }

          /* Make header and footer repeat on each page */
          .print-header {
            position: running(header);
          }

          .receipt-table thead {
            position: running(tableHeader);
          }

          footer {
            position: running(footer);
          }

          /* Define page margins with header and footer areas */
          @page {
            @top-left {
              content: element(header);
            }
            @top-center {
              content: element(tableHeader);
            }
            @bottom-center {
              content: element(footer);
            }
          }

          /* Hide print-only controls */
          .no-print {
            display: none !important;
          }

          /* Ensure proper page breaks in table */
          .receipt-table tr {
            page-break-inside: avoid;
          }

          /* Allow the table to break naturally */
          .receipt-table {
            page-break-inside: auto;
          }

          /* Force a page break before signature section if needed */
          .receipt-table tbody tr:last-child {
            page-break-before: avoid;
          }
        }
      `}</style>
    </div>
  );
}