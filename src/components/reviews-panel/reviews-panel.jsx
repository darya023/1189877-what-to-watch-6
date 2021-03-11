import React from "react";
import PropTypes from 'prop-types';
import {reviewsProp} from "./reviews.prop";
import {humanizeDate} from "../../utils/humanize-date";

const ReviewsPanel = ({reviews}) => {
  return <>
    {reviews.some(Boolean)
      ? <div className="movie-card__reviews movie-card__row">
        <div className="movie-card__reviews-col">
          {
            reviews.map((review)=> {
              const {
                id,
                autorName,
                text,
                rating,
                date,
              } = review;

              const formattedDate = humanizeDate(date, `YYYY-MM-DD`);
              const humanizedDate = humanizeDate(date, `MMMM D, YYYY`);

              return <div key={id} className="review">
                <blockquote className="review__quote">
                  <p className="review__text">{text}</p>
                  <footer className="review__details">
                    <cite className="review__author">{autorName}</cite>
                    <time className="review__date" dateTime={formattedDate}>{humanizedDate}</time>
                  </footer>
                </blockquote>
                <div className="review__rating">{rating}</div>
              </div>;
            })
          }
        </div>
      </div>
      : ``
    }
  </>;

};

ReviewsPanel.propTypes = {
  reviews: PropTypes.arrayOf(
      PropTypes.shape(reviewsProp)
  ).isRequired
};

export default ReviewsPanel;
