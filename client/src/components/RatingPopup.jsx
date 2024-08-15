import React, { forwardRef, useEffect, useState } from 'react';
import Star from './Star';
import { useDispatch } from 'react-redux';
import { addRating } from '../features/movies/movieSlice';

const RatingPopup = forwardRef((props, ref) => {
  const [selectedRating, setSelectedRating] = useState(0);
  const [rated, setRated] = useState(false);
  const dispatch = useDispatch();
  
  const { session, card, rating } = props;

  useEffect(() => {
    if (rating.length && rating[0].rating !== undefined) {
      setRated(true);
      setSelectedRating(rating[0].rating * 10);
    } else {
      setRated(false);
    }
  }, [rating]);

  const handleRatingClick = (ratingValue) => {
    setSelectedRating(ratingValue);
    if (card.media_type === "movie") {
      dispatch(addRating({ session_id: session, movie_id: card.id, rating: ratingValue / 10 }));
    }
  };

  return (
    <div ref={ref} className="rating_component">
      <div className="triangle"></div>
      <div className="star_container">
        {[20, 40, 60, 80, 100].map((ratingValue) => (
          <Star
            key={ratingValue}
            filled={rated ? rating[0].rating * 10 >= ratingValue : ratingValue <= selectedRating}
            onClick={() => handleRatingClick(ratingValue)}
          />
        ))}
      </div>
    </div>
  );
});

export default RatingPopup;