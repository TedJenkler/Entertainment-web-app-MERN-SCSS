import React, { forwardRef, useState } from 'react';
import Star from './Star';
import { useDispatch } from 'react-redux';
import { addRating } from '../features/movies/movieSlice';

const RatingPopup = forwardRef((props, ref) => {
  const [selectedRating, setSelectedRating] = useState(0);
  const dispatch = useDispatch();

  const { session, card } = props;

  const handleRatingClick = (rating) => {
    setSelectedRating(rating);
    if (card.media_type === "movie") {
      dispatch(addRating({ session_id: session, movie_id: card.id, rating: rating / 10 }));
    }
  };

  return (
    <div ref={ref} className="rating_component">
      <div className="triangle"></div>
      <div className="star_container">
        {[20, 40, 60, 80, 100].map((rating) => (
          <Star
            key={rating}
            filled={rating <= selectedRating}
            onClick={() => handleRatingClick(rating)}
          />
        ))}
      </div>
    </div>
  );
});

export default RatingPopup;