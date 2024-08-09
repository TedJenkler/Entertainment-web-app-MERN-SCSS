import React from 'react';
import { useSelector } from 'react-redux';

function DisplaySearchResults() {
    const data = useSelector((state) => state.state.searchResults);

    return (
        <div className='search_results'>
            {data.length > 0 ? (
                data.map((item) => (
                    item.poster_path ? (
                        <div key={item.id}>
                            <img
                                src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                                alt={item.title || item.name}
                            />
                            <h3 className="card-title">
                                {item.title ? item.title : item.name}
                            </h3>
                        </div>
                    ) : null
                ))
            ) : (
                <p>No results found</p>
            )}
        </div>
    );
}

export default DisplaySearchResults;