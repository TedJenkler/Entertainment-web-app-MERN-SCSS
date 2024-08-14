import { useRef } from 'react';

const useCarousel = () => {
    const carouselRef = useRef(null);

    const scrollLeft = () => {
        carouselRef.current.scrollBy({
            left: -window.innerWidth,
            behavior: 'smooth'
        });
    };

    const scrollRight = () => {
        carouselRef.current.scrollBy({
            left: window.innerWidth,
            behavior: 'smooth',
        });
    };

    return { carouselRef, scrollLeft, scrollRight };
};

export default useCarousel;