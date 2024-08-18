import React, { useState } from 'react';
import useCarousel from '../hooks/useCarousel';
import useHandleClickOutside from '../hooks/useHandleClickOutside';
import { useDispatch, useSelector } from 'react-redux';
import settings from '../assets/images/settings.png';
import bookmark from '../assets/images/cardbookmark.png';
import favorite from '../assets/images/like.png';
import list from '../assets/images/list.png';
import close from '../assets/images/close.png';
import rating from '../assets/images/rating.png';
import arrow from '../assets/images/arrow.png';
import { addBookmark } from '../features/bookmark/bookmarkSlice';
import { addFavorite } from '../features/favorite/favoriteSlice';
import RatingPopup from './RatingPopup';
import { toggleModal } from '../features/list/listslice';

const Carousel2 = ({ data, h1, rated }) => {
  const { carouselRef, scrollLeft, scrollRight } = useCarousel();
  const [menu, setMenu] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);

  const { clickOutsideRef } = useHandleClickOutside(() => setMenu(null));

  const dispatch = useDispatch();
  const userid = useSelector((state) => state.auth.user?.tmdbid);

  const handleMenu = (id) => {
    setMenu((prevMenu) => (prevMenu === id ? null : id));
  };

  const handleBookmark = (id, media_type) => {
    dispatch(addBookmark({ userid, media_id: id, media_type }));
  };

  const handleFavorite = (id, media_type) => {
    dispatch(addFavorite({ userid, media_id: id, media_type }));
  };

  const listModal = (card) => {
    dispatch(toggleModal(card));
  };

  const handleRatingClick = (card) => {
    setSelectedCard(card);
  };

  console.log(selectedCard);

  return (
    <div className="carousel-section-2">
      <div className="carousel-header-2">
        <h1>{h1}</h1>
        <div>
          <div>
            <button className="today">Today</button>
            <button className="week">This Week</button>
          </div>
        </div>
      </div>
      <div className="carousel-2">
        <button className="carousel-button-2 prev" onClick={scrollLeft}>
          <img src={arrow} alt="prev" />
        </button>
        <div className="carousel-container-2" ref={carouselRef}>
          {data.map((card, index) => (
            <div key={index}>
              <div className="card" ref={menu === card.id ? clickOutsideRef : null}>
                {menu !== card.id && (
                  <div
                    className={`rating ${
                      Math.round(card.vote_average * 10) < 70
                        ? 'green'
                        : Math.round(card.vote_average * 10) >= 70 &&
                          Math.round(card.vote_average * 10) < 75
                        ? 'yellow'
                        : 'red'
                    }`}
                  >
                    <p>
                      {Math.round(card.vote_average * 10)}
                      <span>%</span>
                    </p>
                  </div>
                )}
                <div className="settings">
                  {menu === card.id ? (
                    <img src={close} alt="close" onClick={() => handleMenu(card.id)} />
                  ) : (
                    <img src={settings} alt="settings" onClick={() => handleMenu(card.id)} />
                  )}
                </div>
                {menu === card.id ? (
                  <div className="card-menu">
                    <div onClick={() => handleBookmark(card.id, card.media_type)}>
                      <img src={bookmark} alt="bookmark" />
                      <p>Bookmark</p>
                    </div>
                    <div onClick={() => listModal(card)}>
                      <img src={list} alt="list" />
                      <p>Add to list</p>
                    </div>
                    <div onClick={() => handleFavorite(card.id, card.media_type)}>
                      <img src={favorite} alt="favorite" />
                      <p>Favorite</p>
                    </div>
                    <div onClick={() => handleRatingClick(card)}>
                      <img src={rating} alt="rating" />
                      <p>Add a rating</p>
                    </div>
                  </div>
                ) : (
                  <img
                    src={`https://image.tmdb.org/t/p/w500${card.poster_path}`}
                    alt={card.title || card.name}
                  />
                )}
                {selectedCard?.id === card.id && menu === card.id ? (
                  <RatingPopup
                    session={localStorage.getItem('session')}
                    ref={clickOutsideRef}
                    card={selectedCard}
                    onClose={() => setSelectedCard(null)}
                    rating={rated.filter((item) => item.id === card.id)}
                  />
                ) : null } 
              </div>
            </div>
          ))}
        </div>
        <button className="carousel-button-2 next" onClick={scrollRight}>
          <img src={arrow} alt="next" />
        </button>
      </div>
    </div>
  );
};

export default Carousel2;