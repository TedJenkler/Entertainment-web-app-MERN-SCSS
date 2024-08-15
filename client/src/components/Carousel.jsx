import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import settings from '../assets/images/settings.png';
import bookmark from '../assets/images/Bookmark.png';
import favorite from '../assets/images/like.png';
import { addBookmark } from "../features/bookmark/bookmarkSlice";
import { addFavorite } from "../features/favorite/favoriteSlice";
import useCarousel from "../hooks/useCarousel";
import useHandleClickOutside from "../hooks/useHandleClickOutside";
import RatingPopup from "./RatingPopup";

const Carousel = ({ data, h1 }) => {
    const [menu, setMenu] = useState(null);
    const dispatch = useDispatch();
    const userid = useSelector((state) => state.auth.user?.tmdbid);
    const { clickOutsideRef } = useHandleClickOutside(setMenu);

    const { carouselRef, scrollLeft, scrollRight } = useCarousel();

    const handleMenu = (id) => {
        setMenu(prevMenu => (prevMenu === id ? null : id));
    };

    const handleBookmark = (id, media_type) => {
        dispatch(addBookmark({ userid, media_id: id, media_type }));
    };

    const handleFavorite = (id, media_type) => {
        dispatch(addFavorite({ userid, media_id: id, media_type }));
    };

    return (
        <section className="carousel-section">
            <h1 className="carousel-header">{h1}</h1>
            <div className="carousel">
                <button className="carousel-button prev" onClick={scrollLeft}>
                    ‹
                </button>
                <div className="carousel-container" ref={carouselRef}>
                    {data.map((card, index) => (
                        <div className="card" key={index} ref={menu === card.id ? clickOutsideRef : null}>
                            <div className="settings">
                                <img onClick={() => handleMenu(card.id)} src={settings} alt="settings" />
                            </div>
                            {menu === card.id ? (
                                <div className="card_menu">
                                    <div onClick={() => handleBookmark(card.id, card.media_type)}>
                                        <img src={bookmark} alt="bookmark" />
                                        <p>bookmark</p>
                                    </div>
                                    <div onClick={() => handleFavorite(card.id, card.media_type)}>
                                        <img src={favorite} alt="favorite" />
                                        <p>favorite</p>
                                    </div>
                                    <RatingPopup />
                                </div>
                            ) : (
                                <img
                                    src={`https://image.tmdb.org/t/p/w500${card.poster_path}`}
                                    alt={card.title || card.name}
                                />
                            )}
                            <h3 className="card-title">{card.title || card.name}</h3>
                        </div>
                    ))}
                </div>
                <button className="carousel-button next" onClick={scrollRight}>
                    ›
                </button>
            </div>
        </section>
    );
};

export default Carousel;