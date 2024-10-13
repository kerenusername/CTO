import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ListsOfStallHolders from './pages/listVendor';
import Dashboard from './components/dashboard';
import VendorViolation from './pages/vendorviolation';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Routes>
          {/* Use Dashboard as the layout for each route */}
          <Route path="/" element={<Dashboard><div>Dashboard Content</div></Dashboard>} />
          <Route path="/dashboard" element={<Dashboard><div>Dashboard Content</div></Dashboard>} />
          <Route path="/listvendor" element={<Dashboard><ListsOfStallHolders /></Dashboard>} />
          <Route path="/vendorsviolation" element={<Dashboard><VendorViolation/></Dashboard>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
