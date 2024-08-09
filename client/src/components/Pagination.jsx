import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { search } from '../features/state/stateSlice';

function Pagination({ totalPages, currentPage, results }) {
    const dispatch = useDispatch();
    const query = useSelector((state) => state.state.query);

    const handleNext = () => {
        if (currentPage < totalPages) {
            dispatch(search({ query, page: currentPage + 1 }));
        }
    };

    const handlePrev = () => {
        if (currentPage > 1) {
            dispatch(search({ query, page: currentPage - 1 }));
        }
    };

    return (
        <div className="pagination">
            <p>
                Showing page {currentPage} of {totalPages}, with {results} total results.
            </p>
            <ul className="pagination-list">
                <li>
                    <button onClick={handlePrev} disabled={currentPage === 1}>
                        Previous
                    </button>
                </li>
                <li>
                    Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
                </li>
                <li>
                    <button onClick={handleNext} disabled={currentPage >= totalPages}>
                        Next
                    </button>
                </li>
            </ul>
        </div>
    );
}

export default Pagination;