import React, {useState} from "react";
import PropTypes from 'prop-types';
import {useHistory} from "react-router-dom";

const ReviewForm = ({onSubmit}) => {
  const RATING_LENGTH = 10;
  const ratings = new Array(RATING_LENGTH).fill().map((item, index)=>{
    return index + 1;
  });
  const lastRating = ratings[RATING_LENGTH - 1];

  const goBack = useHistory().goBack;
  const [formData, setFormData] = useState({
    "rating": lastRating,
    "review-text": ``
  });

  const handleFieldChange = (event) => {
    const {name, value} = event.target;

    setFormData((state)=>({
      ...state,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(formData);
    goBack();
  };

  return <form onSubmit={handleSubmit} action="#" className="add-review__form">
    <div className="rating">
      <div className="rating__stars">
        {
          ratings.map((rating)=>{
            const id = `star-${rating}`;
            const isDefaultRating = rating === formData.rating;

            return <React.Fragment key={id}>
              <input
                onClick={handleFieldChange}
                className="rating__input"
                id={id}
                type="radio"
                name="rating"
                defaultValue={rating}
                defaultChecked={isDefaultRating}
              />
              <label className="rating__label" htmlFor={id}>Rating {rating}</label>
            </ React.Fragment>;
          })
        }
      </div>
    </div>
    <div className="add-review__text">
      <textarea onChange={handleFieldChange} className="add-review__textarea" name="review-text" id="review-text" placeholder="Review text" defaultValue={``} />
      <div className="add-review__submit">
        <button className="add-review__btn" type="submit">Post</button>
      </div>
      <div>
      </div>
    </div>
  </form>;
};

ReviewForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default ReviewForm;
