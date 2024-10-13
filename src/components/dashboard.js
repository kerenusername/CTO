import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {
    FaTh,
    FaBars,
    FaUserAlt,
    FaShoppingBag,
    FaThList,
    FaUserCircle,
    FaSignOutAlt
} from "react-icons/fa";

const DashboardContainer = styled.div`
  display: flex;
  height: 100vh;
  background-color: #f4f5f7;
`;

const Sidebar = styled.div`
  width: ${({ isSidebarOpen }) => (isSidebarOpen ? '230px' : '60px')};
  background-color: #f8f9fa;
  padding: 10px;
  display: flex;
  border: 1px solid #ddd;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: width 0.3s ease;
  position: fixed;
  height: 100vh;
  z-index: 100;
  overflow-y: auto;
`;

const SidebarMenu = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const SidebarItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: ${({ isSidebarOpen }) => (isSidebarOpen ? 'flex-start' : 'center')};
  padding: 10px;
  margin-bottom: 10px;
  margin-top: -10px;
  border-radius: 8px;
  font-size: 14px;
  color: ${({ active }) => (active ? 'white' : '#333')};
  background-color: ${({ active }) => (active ? '#007bff' : 'transparent')};
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${({ active }) => (active ? '#007bff' : '#f1f3f5')};
  }

  .icon {
    font-size: 1rem; 
    color: #000;
    transition: margin-left 0.2s ease;
  }

  span:last-child {
    margin-left: 10px;
    display: ${({ isSidebarOpen }) => (isSidebarOpen ? 'inline' : 'none')};
  }
`;

const SidebarFooter = styled.div`
  padding: 10px;
  margin-top: auto; 
  display: flex;
  align-items: center;
  justify-content: ${({ isSidebarOpen }) => (isSidebarOpen ? 'flex-start' : 'center')};
`;

const LogoutButton = styled(SidebarItem)`
  margin-top: 5px; 
  background-color: #dc3545; 
  color: white;
  align-items: center;
  margin-left: 20px;
  padding: 5px 15px; 
  border-radius: 5px; 
  font-weight: bold; 
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2); 
  transition: background-color 0.3s ease, transform 0.2s ease; 

  &:hover {
    background-color: #c82333; 
    transform: scale(1.05); 
  }
`;

const ToggleButton = styled.div`
  display: block;
  position: absolute;
  top: 5px;
  right: 10px;
  font-size: 1.8rem;
  color: #333;
  cursor: pointer;
`;

const MainContent = styled.div`
  margin-left: ${({ isSidebarOpen }) => (isSidebarOpen ? '230px' : '70px')};
  padding-left: 40px;
  padding-top: 60px; /* Adjust padding to accommodate the AppBar height */
  background-color: #fff;
  padding: 2rem;
  width: 100%;
  transition: margin-left 0.3s ease;
  position: relative; /* Allows positioning of child elements */
`;

const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 40px 10px;
  flex-direction: column;

  .profile-icon {
    font-size: 3rem;
    margin-bottom: 15px;
    color: #6c757d;
  }

  .profile-name {
    font-size: 1.2rem;
    font-weight: 700;
    color: black;
    display: ${({ isSidebarOpen }) => (isSidebarOpen ? 'block' : 'none')};
  }

  hr {
    width: 100%;
    border: 0.5px solid #ccc;
    margin-top: 15px;
  }

  .profile-position {
    font-size: 1rem;
    font-weight: 600;
    color: #007bff;
    display: ${({ isSidebarOpen }) => (isSidebarOpen ? 'block' : 'none')};
    margin-top: 5px;
  }
`;

const AppBar = styled.div`
  position: absolute; /* Position it at the top of the MainContent */
  top: 0;
  left: 30px;
  right: 0;
  z-index: 10; /* Ensure it appears above other content */
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 30px;
  background-color: #188423;
  color: white;
  font-size: 20px;
  font-family: 'Inter', sans-serif;
  font-weight: bold;
`;

// SidebarHead.js

const Dashboard = ({ children }) => { // <-- Destructure children here
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev); // Toggle the sidebar state
  };

  const handleLogout = () => {
    localStorage.removeItem('userData');
    navigate('/login');
  };

  return (
    <DashboardContainer>
      <Sidebar isSidebarOpen={isSidebarOpen}>
        <ToggleButton onClick={toggleSidebar}>
          <FaBars />
        </ToggleButton>
        <ProfileHeader isSidebarOpen={isSidebarOpen}>
          <FaUserCircle className="profile-icon" />
          <span className="profile-name">Guest</span>
        </ProfileHeader>
        <SidebarMenu>
          <Link to="/dashboard" style={{ textDecoration: 'none' }}>
            <SidebarItem active={window.location.pathname === '/dashboard'} isSidebarOpen={isSidebarOpen}>
              <FaTh className='icon' />
              <span>Dashboard</span>
            </SidebarItem>
          </Link>
          <Link to="/listvendor" style={{ textDecoration: 'none' }}>
            <SidebarItem active={window.location.pathname === '/listvendor'} isSidebarOpen={isSidebarOpen}>
              <FaUserAlt className='icon' />
              <span>List of Stall Vendor</span>
            </SidebarItem>
          </Link>
          <Link to="/listambulant" style={{ textDecoration: 'none' }}>
            <SidebarItem active={window.location.pathname === '/listambulant'} isSidebarOpen={isSidebarOpen}>
              <FaUserAlt className='icon' />
              <span>List of Ambulant Vendor</span>
            </SidebarItem>
          </Link>
          <Link to="/vendorsviolation" style={{ textDecoration: 'none' }}>
            <SidebarItem active={window.location.pathname === '/vendorsviolation'} isSidebarOpen={isSidebarOpen}>
              <FaShoppingBag className='icon' />
              <span>Vendors Violation</span>
            </SidebarItem>
          </Link>
          <Link to="/history" style={{ textDecoration: 'none' }}>
            <SidebarItem active={window.location.pathname === '/history'} isSidebarOpen={isSidebarOpen}>
              <FaThList className='icon' />
              <span>History of Vendors Payment</span>
            </SidebarItem>
          </Link>
        </SidebarMenu>

        <SidebarFooter isSidebarOpen={isSidebarOpen}>
          <LogoutButton isSidebarOpen={isSidebarOpen} onClick={handleLogout}>
            <span><FaSignOutAlt /></span>
            <span>Logout</span>
          </LogoutButton>
        </SidebarFooter>
      </Sidebar>

      <MainContent isSidebarOpen={isSidebarOpen}>
        <AppBar>
          <h2>City's Treasurer Office</h2>
        </AppBar>
        <main>{children}</main> {/* This will now correctly render the children passed to SidebarHead */}
      </MainContent>
    </DashboardContainer>
  );
};

export default Dashboard;
