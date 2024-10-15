import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { stallholderDb } from '../config/firebase'; // Adjust path as necessary
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'; // Import the back arrow icon

// Styled components
const RentDetailsContainer = styled.div`
  max-width: 600px;
  margin: 20px auto;
  padding: 50px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: #f9f9f9;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
`;

const Detail = styled.p`
  font-size: 16px;
  line-height: 1.5;
`;

const BackButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 16px;
  color: #4caf50; /* Change color as needed */
  margin-bottom: 20px;
  
  &:hover {
    color: #388e3c; /* Change hover color as needed */
  }
`;

const DetailsVendor = () => {
  const { id } = useParams(); // Get the ID from the URL
  const [vendorInfo, setVendorInfo] = useState(null); // State to hold vendor details
  const navigate = useNavigate(); // Initialize navigate function for navigation

  useEffect(() => {
    const fetchVendorData = async () => {
      const vendorDoc = doc(stallholderDb, 'users', id); // Get the specific document
      const docSnap = await getDoc(vendorDoc);
      
      if (docSnap.exists()) {
        const data = docSnap.data();
        setVendorInfo(data); // Set the fetched vendor data
      } else {
        console.error('No such document!');
      }
    };

    fetchVendorData();
  }, [id]);

  if (!vendorInfo) {
    return <p>Loading...</p>; // Loading state while data is being fetched
  }

  return (
    <RentDetailsContainer>
      <BackButton onClick={() => navigate(-1)}>
        <FontAwesomeIcon icon={faArrowLeft} /> Back
      </BackButton>
      <Title>Vendor Details</Title>
      <Detail><strong>Name:</strong> {vendorInfo.firstName} {vendorInfo.middleName} {vendorInfo.lastName}</Detail>
      <Detail><strong>Contact Number:</strong> {vendorInfo.contactNumber}</Detail>
      <Detail><strong>Email:</strong> {vendorInfo.email}</Detail>
      <Detail><strong>Address:</strong> {vendorInfo.stallInfo.location}, Barangay {vendorInfo.barangay}, {vendorInfo.city}</Detail>
      <Detail><strong>Stall Number:</strong> {vendorInfo.stallNumber}</Detail>
      <Detail><strong>Stall Size:</strong> {vendorInfo.stallInfo.stallSize}</Detail>
      <Detail><strong>Rate Per Meter:</strong> {vendorInfo.stallInfo.ratePerMeter}</Detail>
      <Detail><strong>Billing Cycle:</strong> {vendorInfo.billingCycle}</Detail>
      <Detail><strong>Status:</strong> {vendorInfo.status}</Detail>
      <Detail><strong>Date of Registration:</strong> {vendorInfo.dateOfRegistration.toDate().toLocaleString()}</Detail>
    </RentDetailsContainer>
  );
};

export default DetailsVendor;
