import React from 'react';
import Navbar from '../components/Navbar';
import TransactionDashboard from '../components/TransactionDashBoard';

function DashboardPage() {
  return (
    <div className="dashboard-page bg-gray-100 min-h-screen">
      <Navbar />
      <TransactionDashboard />
    </div>
  );
}

export default DashboardPage;
