import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { stallholderDb } from '../config/firebase'; // Assuming this is the correct Firestore configuration

const styles = {
  noticeContainer: {
    fontFamily: 'Arial, sans-serif',
    padding: '50px',
    border: '1px solid #ccc',
    borderRadius: '10px',
    maxWidth: '800px',
    margin: '0 auto',
    backgroundColor: '#f9f9f9',
  },
  header: {
    textAlign: 'center',
    fontSize: '22px',
    fontWeight: 'bold',
    marginBottom: '30px',
    textTransform: 'uppercase',
    color: '#333',
  },
  vendorDetails: {
    marginBottom: '20px',
  },
  vendorDetail: {
    marginBottom: '5px',
  },
  noticeBody: {
    marginBottom: '30px',
  },
  paragraph: {
    marginBottom: '15px',
    fontSize: '16px',
    lineHeight: '1.5',
    color: '#333',
  },
  signatureContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '50px',
  },
  signatureLine: {
    textAlign: 'center',
  },
  signature: {
    borderTop: '1px solid #000',
    paddingTop: '5px',
    width: '200px',
    margin: '0 auto',
  },
  input: {
    width: '100%',
    padding: '8px',
    marginBottom: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '14px',
  },
};

const getCurrentDate = () => {
  const today = new Date();
  return today.toISOString().split('T')[0];
};

const NoticeOfVendor = () => {
  const [formData, setFormData] = useState({
    dateOfNotice: getCurrentDate(),
    vendorName: '',
    stallNumber: '',
    violation: '',
    violationDate: '',
  });
  const [vendors, setVendors] = useState([]); // Store vendors here
  const [filteredVendors, setFilteredVendors] = useState([]);

  // Fetch vendors from Firestore
  useEffect(() => {
    const fetchVendors = async () => {
      const querySnapshot = await getDocs(collection(stallholderDb, 'users'));
      const vendorData = querySnapshot.docs.map((doc) => {
        const stallInfo = doc.data().stallInfo || {};
        return {
          firstName: doc.data().firstName || '',
          lastName: doc.data().lastName || '',
          stallNumber: stallInfo.stallNumber || '',
        };
      });
      setVendors(vendorData);
    };

    fetchVendors();
  }, []);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Filter vendors for suggestions as the user types
    if (name === 'vendorName') {
      const filtered = vendors.filter(vendor => 
        `${vendor.firstName} ${vendor.lastName}`.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredVendors(filtered);
    }
  };

  // Handle selecting a vendor from the suggestions
  const handleVendorSelect = (vendor) => {
    setFormData({
      ...formData,
      vendorName: `${vendor.firstName} ${vendor.lastName}`,
      stallNumber: vendor.stallNumber,
    });
    setFilteredVendors([]); // Clear suggestions after selection
  };

  return (
    <div style={styles.noticeContainer}>
      {/* Header */}
      <div style={styles.header}>
        <h2>Notice of Vendor Violation</h2>
      </div>

      {/* Vendor Details Form */}
      <div style={styles.vendorDetails}>
        <label>
          <strong>Date of Notice:</strong>
          <input
            style={styles.input}
            type="date"
            name="dateOfNotice"
            value={formData.dateOfNotice}
            onChange={handleInputChange}
          />
        </label>

        <label>
          <strong>Vendor Name:</strong>
          <input
            style={styles.input}
            type="text"
            name="vendorName"
            value={formData.vendorName}
            onChange={handleInputChange}
            placeholder="Enter Vendor Name"
            list="vendorSuggestions"
          />
          {/* Display suggestions */}
          {filteredVendors.length > 0 && (
            <ul className="vendor-suggestions">
              {filteredVendors.map((vendor, index) => (
                <li key={index} onClick={() => handleVendorSelect(vendor)}>
                  {vendor.firstName} {vendor.lastName}
                </li>
              ))}
            </ul>
          )}
        </label>

        <label>
          <strong>Stall Number:</strong>
          <input
            style={styles.input}
            type="text"
            name="stallNumber"
            value={formData.stallNumber}
            onChange={handleInputChange}
            placeholder="Enter Stall Number"
            readOnly
          />
        </label>

        <label>
          <strong>Violation:</strong>
          <textarea
            style={styles.input}
            name="violation"
            value={formData.violation}
            onChange={handleInputChange}
            placeholder="Describe Violation"
          />
        </label>

        <label>
          <strong>Date of Violation:</strong>
          <input
            style={styles.input}
            type="date"
            name="violationDate"
            value={formData.violationDate}
            onChange={handleInputChange}
          />
        </label>
      </div>

      {/* Notice Body */}
      <div style={styles.noticeBody}>
        <p style={styles.paragraph}>
          Dear {formData.vendorName || '[Vendor Name]'},
        </p>
        <p style={styles.paragraph}>
          This notice serves to inform you that as of {formData.violationDate || '[Date of Violation]'}, you have committed the following violation:
        </p>
        <p style={styles.paragraph}>
          <strong>{formData.violation || '[Violation Details]'}</strong>
        </p>
        <p style={styles.paragraph}>
          Please be advised that this violation must be addressed immediately to avoid further penalties. Failure to comply with the stipulated regulations may result in additional penalties or legal action as stated in the vendor agreement.
        </p>
      </div>

      {/* Signature Lines */}
      <div style={styles.signatureContainer}>
        <div style={styles.signatureLine}>
          <p style={styles.signature}>CTO signature</p>
        </div>
      </div>
    </div>
  );
};

export default NoticeOfVendor;