/* import React, { useEffect } from 'react';
import usePopup from '../../hooks/usePopup';

const Popup = ({ error }) => {
    const { isVisible, showPopup, hidePopup } = usePopup();

    useEffect(() => {
        if (error) {
            showPopup();
        }
    }, [error, showPopup]);

    return (
        <div className='popup'>
          {isVisible && (
            <div className="popup">
              <p>{error ? error : "No error"}</p>
              <button onClick={hidePopup}>Close Popup</button>
            </div>
          )}
        </div>
    );
};

export default Popup; */