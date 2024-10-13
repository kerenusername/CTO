import React, { useState, useEffect, useRef } from 'react';
import { collection, getDocs, addDoc  } from 'firebase/firestore';
import { stallholderDb } from '../config/firebase'; // Import the Firestore instance

const styles = {
  vendorViolation: {
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    maxWidth: '600px',
    margin: '0 auto',
    fontFamily: 'Arial, sans-serif',
  },
  header: {
    fontSize: '20px',
    fontWeight: 'bold',
    marginBottom: '20px',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    fontWeight: 'bold',
    marginBottom: '5px',
    fontSize: '14px',
  },
  input: {
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '14px',
  },
  select: {
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '14px',
  },
  button: {
    backgroundColor: '#28a745',
    color: '#fff',
    padding: '10px 15px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '20px',
    fontSize: '16px',
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  buttonHover: {
    backgroundColor: '#218838',
  },
  twoColumnRow: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '15px',
  },
  column: {
    flex: '1',
  },
  suggestionDropdown: {
    listStyleType: 'none',
    padding: '10px',
    margin: 0,
    border: '1px solid #ccc',
    borderRadius: '5px',
    backgroundColor: '#fff',
    position: 'absolute',
    zIndex: 1,
    width: '22%',
  },
  suggestionItem: {
    padding: '5px',
    cursor: 'pointer',
  },
  suggestionItemActive: {
    backgroundColor: '#e9e9e9',
  },
};

const VendorViolation = () => {
  const currentDate = new Date().toISOString().split('T')[0]; // Get the current date in YYYY-MM-DD format

  const [formData, setFormData] = useState({
    dateOfPayment: currentDate,
    payor: '',
    rentOption: '',
    unit: '',
    penaltyPercentage: '',
    amount: '',
    totalPenaltyPercentage: '',
    paymentMethod: '',
    expectedPaymentDate: '',
    dateOfRegistration: '', 
    imageUrl: '', // New state to store image URL
  });

  const [suggestions, setSuggestions] = useState([]);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [users, setUsers] = useState([]);
  const [imagePreview, setImagePreview] = useState(null); // For image preview

  const suggestionRef = useRef();

  useEffect(() => {
    const fetchUsers = async () => {
      const usersCollection = collection(stallholderDb, 'users');
      const userSnapshot = await getDocs(usersCollection);
      const usersList = userSnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
      }));
      setUsers(usersList);
    };

    fetchUsers();
  }, []);
  

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (suggestionRef.current && !suggestionRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []); 
  

  const calculateExpectedPaymentDate = (dateOfRegistration, billingCycle) => {
    let expectedDate = new Date(dateOfRegistration);

    if (isNaN(expectedDate.getTime())) {
      console.error('Invalid registrationDate:', dateOfRegistration);
      return '';
    }

    switch (billingCycle) {
      case 'Daily':
        expectedDate.setDate(expectedDate.getDate() + 1);
        break;
      case 'Weekly':
        expectedDate.setDate(expectedDate.getDate() + 7);
        break;
      case 'Monthly':
        expectedDate.setMonth(expectedDate.getMonth() + 1);
        break;
      default:
        break;
    }

    return expectedDate.toISOString().split('T')[0];
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'payor') {
      const matchingUsers = users.filter(user =>
        (`${user.firstName} ${user.lastName}`.toLowerCase().startsWith(value.toLowerCase()))
      );
      setSuggestions(matchingUsers);
      setShowSuggestions(true);
      setActiveSuggestionIndex(-1);
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const timestampToDate = (timestamp) => {
    return timestamp.toDate().toISOString().split('T')[0];
  };


const handlePayorSelect = async (payorName, unit, billingCycle, dateOfRegistration) => {
  const userDoc = users.find(user => `${user.firstName} ${user.lastName}` === payorName);

  if (userDoc) {
    const dateOfRegistrationStr = timestampToDate(userDoc.dateOfRegistration);
    const expectedPaymentDate = calculateExpectedPaymentDate(dateOfRegistrationStr, billingCycle);

    const ratePerMeter = userDoc.ratePerMeter; 
    const stallSize = userDoc.stallInfo?.stallSize; 
    const amount = ratePerMeter * stallSize;

    setFormData((prevData) => ({
      ...prevData,
      payor: payorName,
      unit: unit,
      rentOption: billingCycle,
      expectedPaymentDate: expectedPaymentDate,
      amount: amount.toFixed(2),
    }));
  } else {
    console.error('User not found:', payorName);
  }

  setSuggestions([]);
  setShowSuggestions(false);
};
  

  const handleKeyDown = (e) => {
    if (showSuggestions) {
      if (e.key === 'ArrowDown') {
        setActiveSuggestionIndex((prevIndex) =>
          prevIndex === suggestions.length - 1 ? 0 : prevIndex + 1
        );
        e.preventDefault(); // Prevent the cursor from moving inside the input
      } else if (e.key === 'ArrowUp') {
        setActiveSuggestionIndex((prevIndex) =>
          prevIndex <= 0 ? suggestions.length - 1 : prevIndex - 1
        );
        e.preventDefault();
      } else if (e.key === 'Enter' && activeSuggestionIndex !== -1) {
        e.preventDefault(); // Prevent form submission when selecting a suggestion
        const selectedUser = suggestions[activeSuggestionIndex];
        handlePayorSelect(
          `${selectedUser.firstName} ${selectedUser.lastName}`,
          selectedUser.stallInfo.location,
          selectedUser.billingCycle,
          selectedUser.dateOfRegistration
        );
        setActiveSuggestionIndex(-1);
      }
    }
  };

  // New function to handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result); // Preview image
        setFormData((prevData) => ({
          ...prevData,
          imageUrl: reader.result, // Save the base64 image data
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validate that all required fields are filled before submitting
    const { dateOfPayment, payor, rentOption, unit, penaltyPercentage, amount, paymentMethod } = formData;
  
    if (!dateOfPayment || !payor || !rentOption || !unit || !penaltyPercentage || !amount || !paymentMethod) {
      alert('Please fill in all required fields.');
      return; // Stop submission if validation fails
    }
  
    try {
      // Add the form data to the vendorViolation collection in Firestore
      const vendorViolationCollection = collection(stallholderDb, 'vendorViolation');
      await addDoc(vendorViolationCollection, formData);
  
      // Display success message (optional)
      alert('Vendor Violation record added successfully!');
      
      // Reset form after submission (optional)
      setFormData({
        dateOfPayment: currentDate,
        payor: '',
        rentOption: '',
        unit: '',
        penaltyPercentage: '',
        amount: '',
        totalPenaltyPercentage: '',
        paymentMethod: '',
        expectedPaymentDate: '',
        dateOfRegistration: '',
        imageUrl: '',
      });
      setImagePreview(null);
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };


  return (
    <div style={styles.vendorViolation}>
      <div style={styles.header}>
        <p>Vendor Violations</p>
      </div>
      <form style={styles.content} onSubmit={handleSubmit}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Date of Payment</label>
          <input
            type="date"
            name="dateOfPayment"
            value={formData.dateOfPayment}
            onChange={handleChange}
            style={styles.input}
          />
        </div>

        <div style={styles.twoColumnRow}>
          <div style={styles.column} ref={suggestionRef}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Payor</label>
              <input
                type="text"
                name="payor"
                value={formData.payor}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                style={styles.input}
                placeholder="Enter Payor"
              />
              {showSuggestions && suggestions.length > 0 && (
                <ul style={styles.suggestionDropdown}>
                  {suggestions.map((suggestion, index) => (
                    <li
                      key={index}
                      style={{
                        ...styles.suggestionItem,
                        ...(index === activeSuggestionIndex && styles.suggestionItemActive),
                      }}
                      onClick={() =>
                        handlePayorSelect(
                          `${suggestion.firstName} ${suggestion.lastName}`,
                          suggestion.stallInfo.location,
                          suggestion.billingCycle,
                          suggestion.dateOfRegistration
                        )
                      }
                    >
                      {suggestion.firstName} {suggestion.lastName} - {suggestion.stallInfo.location}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          <div style={styles.column}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Rent Option</label>
              <input
                type="text"
                name="rentOption"
                value={formData.rentOption}
                onChange={handleChange}
                style={styles.input}
                disabled
              />
            </div>
          </div>
        </div>

        <div style={styles.twoColumnRow}>
          <div style={styles.column}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Unit</label>
              <input
                type="text"
                name="unit"
                value={formData.unit}
                onChange={handleChange}
                style={styles.input}
                disabled
              />
            </div>
          </div>

          <div style={styles.column}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Penalty %</label>
              <input
                type="text"
                name="penaltyPercentage"
                value={formData.penaltyPercentage}
                onChange={handleChange}
                style={styles.input}
              />
            </div>
          </div>
        </div>

        <div style={styles.twoColumnRow}>
          <div style={styles.column}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Amount</label>
              <input
                type="text"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                style={styles.input}
                disabled
              />
            </div>
          </div>

          <div style={styles.column}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Upload Evidence</label>
              <input 
              type="file" 
              onChange={handleImageUpload} 
              accept="image/*" />
            </div>
          </div>
        </div>

        {imagePreview && (
          <div style={{ marginBottom: '15px' }}>
            <img src={imagePreview} alt="Uploaded Preview" style={{ maxWidth: '100%', borderRadius: '5px' }} />
          </div>
        )}

        <div style={styles.formGroup}>
          <label style={styles.label}>Payment Method</label>
          <select
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChange}
            style={styles.select}
          >
            <option value="">Select Payment Method</option>
            <option value="Cash">Cash</option>
            <option value="Bank">Bank</option>
            <option value="Gcash">Gcash</option>
          </select>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Expected Payment Date</label>
          <input
            type="date"
            name="expectedPaymentDate"
            value={formData.expectedPaymentDate}
            onChange={handleChange}
            style={styles.input}
            disabled
          />
        </div>

        <button
          type="submit"
          style={{
            ...styles.button,
            ':hover': styles.buttonHover,
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default VendorViolation;