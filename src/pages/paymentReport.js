import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'; // Import the back arrow icon

// Your styled components
const ReportContainer = styled.div`
  padding: 50px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  color: #333;
  text-align: center; // Centering the title
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;

  th,
  td {
    padding: 12px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }

  th {
    background-color: #4caf50;
    color: white;
  }

  tr:hover {
    background-color: #f1f1f1;
  }
`;

const BackButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 16px;
  color: #4caf50; /* Change color as needed */
  margin-bottom: 20px;
  padding: 20px;
  &:hover {
    color: #388e3c; /* Change hover color as needed */
  }
`;

const PaymentReport = () => {
  const { id } = useParams(); // Get the ID from the URL
  const [payments, setPayments] = useState([]);
  const navigate = useNavigate(); // Initialize the navigate function for navigation

  useEffect(() => {
    const fetchPayments = async () => {
      // Replace with your logic to fetch payments based on the stall holder ID
      // For example, using Firestore:
      // const querySnapshot = await getDocs(collection(stallholderDb, 'payments'), where('stallId', '==', id));
      // const paymentData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      
      // Dummy data for demonstration purposes
      const paymentData = [
        { id: '1', date: new Date(), vendorName: 'Vendor A', amount: 100, status: 'Paid' },
        { id: '2', date: new Date(), vendorName: 'Vendor B', amount: 150, status: 'Pending' },
      ];

      setPayments(paymentData);
    };

    fetchPayments();
  }, [id]); // Fetch payments when the component mounts or the ID changes

  return (
    <ReportContainer>
      <BackButton onClick={() => navigate(-1)}>
        <FontAwesomeIcon icon={faArrowLeft} /> Back
      </BackButton>
      <Title>Payment Report for Stall Holder ID: {id}</Title>
      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Date</th>
            <th>Vendor Name</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => (
            <tr key={payment.id}>
              <td>{payment.id}</td>
              <td>{new Date(payment.date).toLocaleDateString()}</td>
              <td>{payment.vendorName}</td>
              <td>${payment.amount.toFixed(2)}</td>
              <td>{payment.status}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </ReportContainer>
  );
};

export default PaymentReport;
