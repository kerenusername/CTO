import React, { useState } from 'react';

const PaymentHistory = () => {
  // Sample payment history data
  const paymentData = [
    { payorName: 'John Doe', amount: 150.00, date: '10/01/2024' },
    { payorName: 'Jane Smith', amount: 200.00, date: '10/05/2024' },
    { payorName: 'Michael Lee', amount: 300.00, date: '10/10/2024' },
    { payorName: 'Sarah Brown', amount: 125.00, date: '10/12/2024' },
    { payorName: 'Emily Davis', amount: 400.00, date: '10/14/2024' },
  ];

  const [searchTerm, setSearchTerm] = useState('');

  // Filtered payment data based on search term
  const filteredPayments = paymentData.filter(payment =>
    payment.payorName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="payment-history">
      <h2>Payment History</h2>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search by Payor Name..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        className="search-bar"
      />

      <table>
        <thead>
          <tr>
            <th>Payor Name</th>
            <th>Amount</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {filteredPayments.map((payment, index) => (
            <tr key={index}>
              <td>{payment.payorName}</td>
              <td>${payment.amount.toFixed(2)}</td>
              <td>{payment.date}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <style jsx>{`
        .payment-history {
          max-width: 800px;
          margin: 20px auto;
          padding: 20px;
          border: 1px solid #ddd;
          border-radius: 8px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        h2 {
          text-align: center;
          margin-bottom: 20px;
        }

        .search-bar {
          width: 100%;
          padding: 10px;
          margin-bottom: 20px;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 16px;
        }

        table {
          width: 100%;
          border-collapse: collapse;
        }

        th,
        td {
          border: 1px solid #ddd;
          padding: 12px;
          text-align: left;
        }

        th {
          background-color: #f2f2f2;
        }

        tr:nth-child(even) {
          background-color: #f9f9f9;
        }

        tr:hover {
          background-color: #f1f1f1;
        }
      `}</style>
    </div>
  );
};

export default PaymentHistory;
