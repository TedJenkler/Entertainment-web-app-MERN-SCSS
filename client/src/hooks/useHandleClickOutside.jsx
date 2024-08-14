import { useRef, useEffect } from 'react';

const useHandleClickOutside = (setChange) => {
    const clickOutsideRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (clickOutsideRef.current && !clickOutsideRef.current.contains(event.target)) {
                setChange(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [setChange]);

    return { clickOutsideRef };
};

export default useHandleClickOutside;