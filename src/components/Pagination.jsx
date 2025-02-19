import React from 'react';

const Pagination = ({ showsPerPage, totalShows, paginate, currentPage }) => {
    const pageNumbers = [];
    const totalPages = Math.ceil(totalShows / showsPerPage);

    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    const renderPageNumbers = () => {
        const maxPageNumbersToShow = 5;
        const pageNumbersToShow = [];

        if (totalPages <= maxPageNumbersToShow) {
            return pageNumbers;
        }

        if (currentPage <= 3) {
            pageNumbersToShow.push(...pageNumbers.slice(0, maxPageNumbersToShow), '...', totalPages);
        } else if (currentPage >= totalPages - 2) {
            pageNumbersToShow.push(1, '...', ...pageNumbers.slice(totalPages - maxPageNumbersToShow));
        } else {
            pageNumbersToShow.push(1, '...', ...pageNumbers.slice(currentPage - 2, currentPage + 2), '...', totalPages);
        }

        return pageNumbersToShow;
    };

    return (
        <nav className='pagination'>
            <ul>
                {renderPageNumbers().map((number, index) => (
                    <li key={index} className='page-item'>
                        {number === '...' ? (
                            <span>...</span>
                        ) : (
                            <button onClick={() => paginate(number)}>{number}</button>
                        )}
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Pagination;