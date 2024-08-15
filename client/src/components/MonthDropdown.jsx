import React from 'react';

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

function MonthDropdown({ month, setMonth }) {
  return (
    <select
      value={month}
      onChange={(e) => setMonth(e.target.value)}
      className="border rounded p-2 bg-yellow-200 py-3 ">
      {months.map((m) => (
        <option key={m} value={m} className='bg-blue-300 py-2 '>
          {m}
        </option>
      ))}
    </select>
  );
}

export default MonthDropdown;
