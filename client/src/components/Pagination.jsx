import React from 'react';

function Pagination({ page, setPage, totalPages }) {
    console.log('totalpages:',totalPages);
    
  const handlePrev = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNext = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  return (
    <div className="pagination flex justify-between items-center py-6">
      <button onClick={handlePrev} disabled={page === 1} className='bg-slate-400 p-2 rounded-md text-white'>
        Previous
      </button>
      <span>
        Page {page} of {totalPages}
      </span>
      <button onClick={handleNext} disabled={page === totalPages} className='bg-slate-400 p-2 rounded-md text-white w-20'>
        Next
      </button>
    </div>
  );
}

export default Pagination;
