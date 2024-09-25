import React, { useState } from 'react';
import { PrinterIcon } from 'lucide-react';

export default function InvoiceGenerator() {
  const [invoiceData, setInvoiceData] = useState({
    companyName: 'Your Company',
    companyEmail: 'email@example.com',
    companyAddress: '123 Your Street, Your City, State, ZIP',
    clientName: 'Client Name',
    clientEmail: 'client@example.com',
    clientAddress: 'Client Address',
    invoiceNumber: '001',
    invoiceDate: new Date().toISOString().split('T')[0],
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    items: [{ description: '', quantity: 0, rate: 0 }],
    notes: '',
    terms: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInvoiceData({ ...invoiceData, [name]: value });
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...invoiceData.items];
    newItems[index] = { ...newItems[index], [field]: value };
    setInvoiceData({ ...invoiceData, items: newItems });
  };

  const addItem = () => {
    setInvoiceData({
      ...invoiceData,
      items: [...invoiceData.items, { description: '', quantity: 0, rate: 0 }],
    });
  };

  const removeItem = (index) => {
    const newItems = invoiceData.items.filter((_, i) => i !== index);
    setInvoiceData({ ...invoiceData, items: newItems });
  };

  const calculateTotal = () => {
    return invoiceData.items.reduce((total, item) => total + item.quantity * item.rate, 0);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white shadow-lg print:shadow-none">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-2xl font-bold text-blue-600">TAX INVOICE</h1>
          <input
            type="text"
            name="companyName"
            value={invoiceData.companyName}
            onChange={handleInputChange}
            className="font-bold mt-2"
          />
          <input
            type="email"
            name="companyEmail"
            value={invoiceData.companyEmail}
            onChange={handleInputChange}
            className="block"
          />
          <textarea
            name="companyAddress"
            value={invoiceData.companyAddress}
            onChange={handleInputChange}
            className="w-full"
          />
        </div>
        <div className="text-right">
          <div className="font-bold">Invoice #</div>
          <input
            type="text"
            name="invoiceNumber"
            value={invoiceData.invoiceNumber}
            onChange={handleInputChange}
            className="text-right"
          />
          <div className="font-bold mt-2">Invoice Date</div>
          <input
            type="date"
            name="invoiceDate"
            value={invoiceData.invoiceDate}
            onChange={handleInputChange}
            className="text-right"
          />
          <div className="font-bold mt-2">Due Date</div>
          <input
            type="date"
            name="dueDate"
            value={invoiceData.dueDate}
            onChange={handleInputChange}
            className="text-right"
          />
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-lg font-bold mb-2">Bill To:</h2>
        <input
          type="text"
          name="clientName"
          value={invoiceData.clientName}
          onChange={handleInputChange}
          className="font-bold"
        />
        <input
          type="email"
          name="clientEmail"
          value={invoiceData.clientEmail}
          onChange={handleInputChange}
          className="block"
        />
        <textarea
          name="clientAddress"
          value={invoiceData.clientAddress}
          onChange={handleInputChange}
          className="w-full"
        />
      </div>

      <table className="w-full mb-8">
        <thead>
          <tr className="border-b">
            <th className="text-left py-2">Item Description</th>
            <th className="text-right py-2">Qty</th>
            <th className="text-right py-2">Rate</th>
            <th className="text-right py-2">Amount</th>
            <th className="py-2"></th>
          </tr>
        </thead>
        <tbody>
          {invoiceData.items.map((item, index) => (
            <tr key={index} className="border-b">
              <td className="py-2">
                <input
                  type="text"
                  value={item.description}
                  onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                  className="w-full"
                />
              </td>
              <td className="py-2">
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => handleItemChange(index, 'quantity', parseFloat(e.target.value))}
                  className="w-full text-right"
                />
              </td>
              <td className="py-2">
                <input
                  type="number"
                  value={item.rate}
                  onChange={(e) => handleItemChange(index, 'rate', parseFloat(e.target.value))}
                  className="w-full text-right"
                />
              </td>
              <td className="py-2 text-right">{(item.quantity * item.rate).toFixed(2)}</td>
              <td className="py-2 text-right">
                <button onClick={() => removeItem(index)} className="text-red-500">
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={addItem} className="bg-blue-500 text-white px-4 py-2 rounded mb-4">
        Add Item
      </button>

      <div className="flex justify-end mb-8">
        <div className="w-1/2">
          <div className="flex justify-between border-b py-2">
            <span className="font-bold">Subtotal:</span>
            <span>${calculateTotal().toFixed(2)}</span>
          </div>
          <div className="flex justify-between border-b py-2">
            <span className="font-bold">Tax (10%):</span>
            <span>${(calculateTotal() * 0.1).toFixed(2)}</span>
          </div>
          <div className="flex justify-between py-2 text-xl font-bold">
            <span>Total:</span>
            <span>${(calculateTotal() * 1.1).toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="font-bold mb-2">Notes:</h3>
        <textarea
          name="notes"
          value={invoiceData.notes}
          onChange={handleInputChange}
          className="w-full h-20 border p-2"
        />
      </div>

      <div className="mb-8">
        <h3 className="font-bold mb-2">Terms and Conditions:</h3>
        <textarea
          name="terms"
          value={invoiceData.terms}
          onChange={handleInputChange}
          className="w-full h-20 border p-2"
        />
      </div>

      <div className="text-center mb-4">
        <button
          onClick={handlePrint}
          className="bg-blue-500 text-white px-4 py-2 rounded inline-flex items-center"
        >
          <PrinterIcon className="mr-2" />
          Print Invoice
        </button>
      </div>
    </div>
  );
}
