import React, { useEffect, useState } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faMagnifyingGlass, faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { collection, getDocs } from 'firebase/firestore';
import { stallholderDb } from '../config/firebase'; // Adjust path as necessary
import { Link } from 'react-router-dom'; 
import styled from 'styled-components';

// Your styled components
const ReportContainer = styled.div`
  padding: 50px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  color: #333;
`;

const SearchBar = styled.div`
  display: flex;
  margin-bottom: 20px;

  input {
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    flex: 1;
    margin-right: 10px;
  }

  button {
    background-color: #4caf50;
    border: none;
    color: white;
    padding: 10px 15px;
    border-radius: 4px;
    cursor: pointer;
    
    &:hover {
      background-color: #45a049;
    }
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  th, td {
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

// Add FontAwesome icons to the library
library.add(faMagnifyingGlass, faEye);

const RentDetails = () => {
  const [stallHolders, setStallHolders] = useState([]);
  const [filteredStallHolders, setFilteredStallHolders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(stallholderDb, 'users'));
      const data = querySnapshot.docs.map((doc) => {
        const stallInfo = doc.data().stallInfo || {};
        return {
          id: doc.id,
          stallNumber: stallInfo.stallNumber || '',
          firstName: doc.data().firstName || '',
          lastName: doc.data().lastName || '',
          location: stallInfo.location || '',
          status: stallInfo.status || '',
        };
      });
      setStallHolders(data);
      setFilteredStallHolders(data); // Initialize filtered list
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filteredData = stallHolders.filter(
      (stall) =>
        stall.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        stall.lastName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredStallHolders(filteredData);
  }, [searchTerm, stallHolders]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <ReportContainer>
      <Title>Vendor Details</Title>
      <SearchBar>
        <input
          type="text"
          placeholder="Search by Payor Name..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <button>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </SearchBar>
      <Table>
        <thead>
          <tr>
            <th>Stall No.</th>
            <th>Stall Holder</th>
            <th>Unit</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredStallHolders.map((stall) => (
            <tr key={stall.id}>
              <td>{stall.stallNumber}</td>
              <td>{stall.firstName} {stall.lastName}</td>
              <td>{stall.location}</td>
              <td>{stall.status}</td>
              <td>
                <Link to={`/detailsvendor/${stall.id}`} className="view-button">
                  <FontAwesomeIcon icon={faEye} size="s" />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </ReportContainer>
  );
};

export default RentDetails;
