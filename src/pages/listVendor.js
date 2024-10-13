import React, { useEffect, useState } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faList, faPlus, faUser, faIdBadge, faMagnifyingGlass, faHouseChimney, faUsers, faTriangleExclamation, faEye, faCircleUser, faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { collection, getDocs } from 'firebase/firestore';
import { stallholderDb } from '../config/firebase';
import { Link } from 'react-router-dom'; 
import './listVendor.css';

// Add FontAwesome icons to the library
library.add(faList, faPlus, faUser, faIdBadge, faMagnifyingGlass, faHouseChimney, faUsers, faTriangleExclamation, faEye, faCircleUser, faBars);

const ListsOfStallHolders = () => {
  const [stallHolders, setStallHolders] = useState([]);
  const [filteredStallHolders, setFilteredStallHolders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(stallholderDb, 'users'));
      const data = querySnapshot.docs.map((doc) => {
        const stallInfo = doc.data().stallInfo || {};
        const dateOfRegistration = doc.data().dateOfRegistration ? doc.data().dateOfRegistration.toDate().toLocaleDateString() : '';
        
        return {
          id: doc.id,
          stallNumber: stallInfo.stallNumber || '',
          firstName: doc.data().firstName || '',
          lastName: doc.data().lastName || '',
          location: stallInfo.location || '',
          areaMeters: stallInfo.stallSize || '',
          billing: stallInfo.ratePerMeter || '',
          date: dateOfRegistration,
          status: stallInfo.status || '',
        };
      });
      setStallHolders(data);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filteredData = stallHolders.filter(
      (stall) =>
        stall.firstName.toLowerCase().includes(searchTerm.toLowerCase()) && 
        stall.status === 'Occupied'
    );
    setFilteredStallHolders(filteredData);
  }, [searchTerm, stallHolders]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="collector-container">
      <section className="stall-holders-section">
        <div className="section-header">
          <h2>Lists of Stall Holders</h2>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search Vendor"
              className="search-input"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <button className="search-button">
              <FontAwesomeIcon icon={faMagnifyingGlass} size="xl" />
            </button>
          </div>
        </div>
        <table className="stall-holders-table">
          <thead>
            <tr>
              <th>Stall No.</th>
              <th>Stall Holder</th>
              <th>Unit</th>
              <th>Area (Meters)</th>
              <th>Rate Per Meter</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStallHolders.map((stall) => (
              <tr key={stall.id}>
                <td>{stall.stallNumber}</td>
                <td>{stall.firstName} {stall.lastName}</td>
                <td>{stall.location}</td>
                <td>{stall.areaMeters}</td>
                <td>{stall.billing}</td>
                <td>{stall.date}</td>
                <td>{stall.status}</td>
                <td>
                  <Link to={`/view-payment/${stall.id}`} className="view-button">
                    <FontAwesomeIcon icon={faEye} size="s" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default ListsOfStallHolders;
