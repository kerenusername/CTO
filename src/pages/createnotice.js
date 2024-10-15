import React from 'react';

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
};

const NoticeOfVendor = () => {
  return (
    <div style={styles.noticeContainer}>
      {/* Header */}
      <div style={styles.header}>
        <h2>Notice of Vendor Violation</h2>
      </div>

      {/* Vendor Details */}
      <div style={styles.vendorDetails}>
        <p style={styles.vendorDetail}>
          <strong>Date of Notice:</strong> October 12, 2024
        </p>
        <p style={styles.vendorDetail}>
          <strong>Vendor Name:</strong> [Vendor Name]
        </p>
        <p style={styles.vendorDetail}>
          <strong>Stall Number:</strong> [Stall Number]
        </p>
        <p style={styles.vendorDetail}>
          <strong>Violation:</strong> [Violation Description]
        </p>
      </div>

      {/* Notice Body */}
      <div style={styles.noticeBody}>
        <p style={styles.paragraph}>
          Dear [Vendor Name],
        </p>
        <p style={styles.paragraph}>
          This notice serves to inform you that as of [Date of Violation], you have committed the following violation:
        </p>
        <p style={styles.paragraph}>
          <strong>[Violation Details]</strong>
        </p>
        <p style={styles.paragraph}>
          Please be advised that this violation must be addressed immediately to avoid further penalties. Failure to comply with the stipulated regulations may result in additional penalties or legal action as stated in the vendor agreement.
        </p>
      </div>

      {/* Signature Lines */}
      <div style={styles.signatureContainer}>
        <div style={styles.signatureLine}>
          <p style={styles.signature}>Vendor's Signature</p>
        </div>
        <div style={styles.signatureLine}>
          <p style={styles.signature}>Authorized Officer</p>
        </div>
      </div>
    </div>
  );
};

export default NoticeOfVendor;