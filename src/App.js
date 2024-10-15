import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ListsOfStallHolders from './pages/listVendor';
import Dashboard from './components/dashboard';
import NoticeOfVendor from './pages/createnotice';
import VendorViolation from './pages/vendorviolation';
import PaymentReport from './pages/paymentReport';
import PaymentHistory from './pages/paymentHistory';
import RentDetails from './pages/rentDetails';
import DetailsVendor from './pages/detailsvendor';
import Blackboard from './pages/blackboard';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Routes>
          {/* Use Dashboard as the layout for each route */}
          <Route path="/" element={<Dashboard><Blackboard /></Dashboard>} />
          <Route path="/dashboard" element={<Dashboard><div>Dashboard Content</div></Dashboard>} />
          <Route path="/listvendor" element={<Dashboard><ListsOfStallHolders /></Dashboard>} />
          <Route path="/blackboard" element={<Dashboard><Blackboard /></Dashboard>} />
          <Route path="/createnotice" element={<Dashboard><NoticeOfVendor /></Dashboard>} />
          <Route path="/vendorsviolation" element={<Dashboard><VendorViolation/></Dashboard>} />
          {/* <Route path="/reports" element={<Dashboard><PaymentReport /></Dashboard>} /> */}
          <Route path="/paymentReport/:id" element={<Dashboard><PaymentReport /></Dashboard>} />
          <Route path="/history" element={<Dashboard><PaymentHistory/></Dashboard>} />
          <Route path="/rentDetails" element={<Dashboard><RentDetails/></Dashboard>} />
          <Route path="/detailsvendor/:id" element={<Dashboard><DetailsVendor /></Dashboard>} />

        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
