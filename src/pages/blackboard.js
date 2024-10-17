import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faFileInvoice, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

// Styled components
const DashboardContainer = styled.div`
  padding: 50px;
  background-color: #f9f9f9;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 20px;
  color: #333;
`;

const StatsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const StatCard = styled.div`
  flex: 1;
  margin: 0 10px;
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const StatTitle = styled.h3`
  margin: 0;
  color: #4caf50;
`;

const StatValue = styled.p`
  font-size: 24px;
  margin: 10px 0 0;
  color: #333;
`;

const TableContainer = styled.div`
  margin-top: 20px;
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

const SearchBar = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const Blackboard = () => {
  // Sample data for statistics
  const stats = {
    activeStalls: 25,
    totalInvoices: 100,
    recentViolations: 5,
  };

  // Sample data for recent transactions
  const recentTransactions = [
    { id: 1, name: 'Keren', date: '2024-10-10', amount: 200, status: 'Paid' },
    { id: 2, name: 'Daniela', date: '2024-10-11', amount: 150, status: 'Pending' },
    { id: 3, name: 'Julia', date: '2024-10-12', amount: 300, status: 'Failed' },
  ];

  return (
    <DashboardContainer>
      <Title>Dashboard</Title>
      <StatsContainer>
        <StatCard>
          <StatTitle><FontAwesomeIcon icon={faUsers} /> Active Stalls</StatTitle>
          <StatValue>{stats.activeStalls}</StatValue>
        </StatCard>
        <StatCard>
          <StatTitle><FontAwesomeIcon icon={faFileInvoice} /> Total Invoices</StatTitle>
          <StatValue>{stats.totalInvoices}</StatValue>
        </StatCard>
        <StatCard>
          <StatTitle><FontAwesomeIcon icon={faExclamationTriangle} /> Recent Violations</StatTitle>
          <StatValue>{stats.recentViolations}</StatValue>
        </StatCard>
      </StatsContainer>

      <SearchBar placeholder="Search transactions..." />

      <TableContainer>
        <Table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {recentTransactions.map(transaction => (
              <tr key={transaction.id}>
                <td>{transaction.id}</td>
                <td>{transaction.name}</td>
                <td>{transaction.date}</td>
                <td>${transaction.amount}</td>
                <td>{transaction.status}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </TableContainer>
    </DashboardContainer>
  );
};

export default Blackboard;
