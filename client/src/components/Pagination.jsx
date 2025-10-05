import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange, loading }) => {
  if (totalPages <= 1) return null;

  const pages = [];
  const maxVisible = 5;
  let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
  let endPage = Math.min(totalPages, startPage + maxVisible - 1);

  if (endPage - startPage + 1 < maxVisible) {
    startPage = Math.max(1, endPage - maxVisible + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', marginTop: '2rem' }}>
      {startPage > 1 && (
        <button
          onClick={() => onPageChange(1)}
          disabled={loading}
          style={{
            padding: '8px 12px',
            border: '1px solid #ddd',
            background: '#fff',
            cursor: loading ? 'not-allowed' : 'pointer',
            borderRadius: '4px'
          }}
        >
          &laquo;
        </button>
      )}
      {pages.map(page => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          disabled={loading || page === currentPage}
          style={{
            padding: '8px 12px',
            border: page === currentPage ? '1px solid #4a00e0' : '1px solid #ddd',
            background: page === currentPage ? '#4a00e0' : '#fff',
            color: page === currentPage ? '#fff' : '#000',
            cursor: loading || page === currentPage ? 'not-allowed' : 'pointer',
            borderRadius: '4px'
          }}
        >
          {page}
        </button>
      ))}
      {endPage < totalPages && (
        <button
          onClick={() => onPageChange(totalPages)}
          disabled={loading}
          style={{
            padding: '8px 12px',
            border: '1px solid #ddd',
            background: '#fff',
            cursor: loading ? 'not-allowed' : 'pointer',
            borderRadius: '4px'
          }}
        >
          &raquo;
        </button>
      )}
    </div>
  );
};

export default Pagination;
