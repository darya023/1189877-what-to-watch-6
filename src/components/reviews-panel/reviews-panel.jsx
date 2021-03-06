import React from "react";
import PropTypes from 'prop-types';
import {reviewsProp} from "./reviews.prop";
import {humanizeDate} from "../../utils/humanize-date";

const ReviewsPanel = ({reviews}) => {
  return reviews.some(Boolean)
    ? <div className="movie-card__reviews movie-card__row">
      <div className="movie-card__reviews-col">
        {
          reviews.slice(0, Math.ceil(reviews.length / 2)).map((review)=> {
            const {
              id,
              authorName,
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
                  <cite className="review__author">{authorName}</cite>
                  <time className="review__date" dateTime={formattedDate}>{humanizedDate}</time>
                </footer>
              </blockquote>
              <div className="review__rating">{rating}</div>
            </div>;
          })
        }
      </div>
      <div className="movie-card__reviews-col">
        {
          reviews.slice(Math.ceil(reviews.length / 2), reviews.length).map((review)=> {
            const {
              id,
              authorName,
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
                  <cite className="review__author">{authorName}</cite>
                  <time className="review__date" dateTime={formattedDate}>{humanizedDate}</time>
                </footer>
              </blockquote>
              <div className="review__rating">{rating}</div>
            </div>;
          })
        }
      </div>
    </div>
    : <div className="movie-card__reviews movie-card__row">
      <div className="movie-card__reviews-col">
        <div className="review">
        There are no reviews yet
        </div>
      </div>
    </div>;
};

ReviewsPanel.propTypes = {
  reviews: PropTypes.arrayOf(
      PropTypes.shape(reviewsProp)
  ).isRequired
};

export default ReviewsPanel;
