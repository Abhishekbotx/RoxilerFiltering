import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import MonthDropdown from './MonthDropdown';
import TransactionTable from './TransactionTable';
import Pagination from './Pagination';
import axios from 'axios';
import BarChart from './BarChart';
import PieChart from './PieChart'; 
import StatisticsCard from './Statistics';

function TransactionDashboard() {
  const [transactions, setTransactions] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [pieChartData, setPieChartData] = useState([]);
  const [statistics, setStatistics] = useState({});
  const [search, setSearch] = useState('');
  const [month, setMonth] = useState('March'); 
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchTransactions();
    fetchChartData();
    fetchPieChartData();
    fetchStatistics()
  }, [search, month, page]);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/transactions', {
        params: {
          search,
          month,
          page,
          perPage: 5,
        },
      });
      console.log('transactionfetch',response.data.transactions);
      
      setTransactions(response.data.transactions);
      setTotalPages(Math.ceil(response.data.totalCount / 5));
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  const fetchChartData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/barChart', {
        params: { month },
      });
      setChartData(response.data.response);
    } catch (error) {
      console.error('Error fetching chart data:', error);
    }
  };
  const fetchStatistics = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/statistics', {
        params: { month },
      });
      console.log('statistics data:',response.data.response);
      
      setStatistics(response.data.response);
    } catch (error) {
      console.error('Error fetching chart data:', error);
    }
  };

  const fetchPieChartData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/pieChart', {
        params: { month },
      });
      console.log('pie data:',response.data.response);
      setPieChartData(response.data.response);
    } catch (error) {
      console.error('Error fetching pie chart data:', error);
    }
  };

  return (
    <div className="transaction-dashboard p-8">
      <div className="mb-4 flex justify-between gap-x-3">
        <SearchBar search={search} setSearch={setSearch} />
        <MonthDropdown month={month} setMonth={setMonth} />
      </div>
      <TransactionTable transactions={transactions} />
      <Pagination page={page} setPage={setPage} totalPages={totalPages} />
      <div className='flex'>
        <div className='w-[75%]'>

          <BarChart chartData={chartData} /> 
        </div>
        <div className='w-[25%] flex flex-col  items-center'>
          <StatisticsCard month={month}
            totalSale={ Math.floor(statistics.totalSaleAmount)}
            totalSoldItems={statistics.totalSoldItems}
            totalNotSoldItems={statistics.totalNotSoldItems} />
          <PieChart pieChartData={pieChartData} /> 
        </div>

      </div>
    </div>
  );
}

export default TransactionDashboard;
