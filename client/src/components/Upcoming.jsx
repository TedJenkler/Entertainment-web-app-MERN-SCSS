import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUpcoming } from '../features/movies/movieSlice';

function Upcoming() {
    const data = useSelector((state) => state.movies.upcoming);
    const dispatch = useDispatch();
    const carouselRef = useRef(null);

    const scrollLeft = () => {
        carouselRef.current.scrollBy({
            left: -window.innerWidth,
            behavior: 'smooth',
        });
    };

    const scrollRight = () => {
        carouselRef.current.scrollBy({
            left: window.innerWidth,
            behavior: 'smooth',
        });
    };

    useEffect(() => {
        dispatch(getUpcoming())
    }, [])

    if (!data || data.length === 0) return <div>Loading...</div>;

    return (
        <section className="carousel-section">
            <h1 className="carousel-header">Top Rated Movies</h1>
            <div className="carousel">
                <button className="carousel-button prev" onClick={scrollLeft}>
                    ‹
                </button>
                <div className="carousel-container" ref={carouselRef}>
                    {data.map((card, index) => (
                        <div className="card" key={index}>
                            <img
                                src={`https://image.tmdb.org/t/p/w500${card.poster_path}`}
                                alt={card.title}
                            />
                            <h3 className="card-title">{card.title}</h3>
                        </div>
                    ))}
                </div>
                <button className="carousel-button next" onClick={scrollRight}>
                    ›
                </button>
            </div>
        </section>
    );
}

export default Upcoming;