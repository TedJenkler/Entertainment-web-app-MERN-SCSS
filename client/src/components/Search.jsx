import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { search } from '../features/state/stateSlice';
import searchicon from '../assets/images/search.png';

const Search = () => {
    const dispatch = useDispatch();
    const [input, setInput] = useState('');

    const debounce = (func, delay) => {
        let timeoutId;
        return function (...args) {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                func.apply(this, args);
            }, delay);
        };
    };

    const debouncedSearch = useCallback(
        debounce((query) => {
            dispatch(search(query));
        }, 500),
        [dispatch]
    );

    const handleChange = (event) => {
        const newValue = event.target.value;
        setInput(newValue);
        debouncedSearch(newValue);
    };

    return (
        <div className='search'>
            <img src={searchicon} alt='search' />
            <input
                type='text'
                value={input}
                onChange={handleChange}
                placeholder='Search for movies or TV series'
            />
        </div>
    );
};

export default Search;