import React from 'react';

function StatisticsCard({ month, totalSale, totalSoldItems, totalNotSoldItems }) {
  return (
    <div className="bg-blue-50 p-8 rounded-md shadow-md w-full ">
      <h2 className="text-2xl font-semibold mb-4">
        Statistics - {month}
      </h2>
      <div className="bg-yellow-200 p-6 rounded-lg shadow-inner">
        <div className="flex gap-x-2 mb-2">
          <span className="font-medium">Total sale amount:</span>
          <span>{totalSale}</span>
        </div>
        <div className="flex gap-x-2 mb-2">
          <span className="font-medium">Total sold item:</span>
          <span>{totalSoldItems}</span>
        </div>
        <div className="flex gap-x-2 mb-2">
          <span className="font-medium">Total not sold item:</span>
          <span>{totalNotSoldItems}</span>
        </div>
      </div>
    </div>
  );
}

export default StatisticsCard;
