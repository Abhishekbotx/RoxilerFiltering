import React from 'react';

function TransactionTable({ transactions }) {
  return (
    <table className="w-full bg-white rounded shadow-md">
      <thead className="bg-blue-600 text-white">
        <tr className=''>
          <th className="p-2">ID</th>
          <th className="p-2">Title</th>
          <th className="p-2">Description</th>
          <th className="p-2">Price</th>
          <th className="p-2">Category</th>
          <th className="p-2">Sold</th>
          <th className="p-2">Image</th>
        </tr>
      </thead>
      <tbody className='bg-yellow-50'>
        {transactions && transactions.map((transaction) => (
          <tr key={transaction._id} className="border-t">
            <td className="p-2">{transaction._id}</td>
            <td className="p-2">{transaction.title}</td>
            <td className="p-2">{transaction.description.substring(0,70)+'...'}</td>
            <td className="p-2">{transaction.price}</td>
            <td className="p-2">{transaction.category}</td>
            <td className="p-2">{transaction.sold ? 'Yes' : 'No'}</td>
             <td className="p-2"> 
              <img src={transaction.image} alt={transaction.title} className="w-16 h-16 object-cover  " />
            </td> 
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TransactionTable;
