import React from "react";
import PropTypes from 'prop-types';
import {userProps} from "../user/user.prop";
import dayjs from "dayjs";
import {reviewsProp} from "./reviews.prop";
import {Tab} from "../../utils/const";

const humanizeRating = (filmRating) => {
  filmRating = Number(filmRating);

  if (filmRating < 3) {
    return `Bad`;
  }

  if (filmRating < 5) {
    return `Normal`;
  }

  if (filmRating < 8) {
    return `Good`;
  }

  if (filmRating < 10) {
    return `Very good`;
  }

  return `Awesome`;
};

const getTime = function (timeInMinutes) {
  const MINUTES_PER_HOUR = 60;
  const hours = Math.trunc(timeInMinutes / MINUTES_PER_HOUR);
  const time = {
    hours,
    minutes: timeInMinutes - (hours * MINUTES_PER_HOUR),
  };

  return time;
};

const humanizeDuration = (filmDuration) => {
  const {hours, minutes} = getTime(filmDuration);
  const Time = {
    HOURS: `HOURS`,
    MINUTES: `MINUTES`
  };

  const time = [
    {
      name: Time.HOURS,
      value: hours,
      format: `h`
    },
    {
      name: Time.MINUTES,
      value: minutes,
      format: `m`
    },
  ];

  const durationTimeItems = [];

  for (const item of time) {
    const value = item.value;
    const format = item.format;

    if ((hours && item.name === Time.HOURS || hours && item.name === Time.MINUTES) || !hours && item.name === Time.MINUTES) {
      const formattedElem = `${value}${format}`;

      durationTimeItems.push(formattedElem);
    }
  }

  return durationTimeItems.join(` `);
};

const humanizeDate = (date, format) => {
  return dayjs(date).format(format);
};

const Panel = ({
  panelId,
  genre,
  year,
  description,
  director,
  actors,
  starring,
  duration,
  rating,
  reviewsCount,
  reviews
}) => {
  const humanizedRating = humanizeRating(rating);
  const humanizedDuration = humanizeDuration(duration);

  const getPanel = (id) => {
    switch (id) {
      case Tab.OVERVIEW:
        return <React.Fragment>
          <div className="movie-rating">
            <div className="movie-rating__score">{rating}</div>
            <p className="movie-rating__meta">
              <span className="movie-rating__level">{humanizedRating}</span>
              <span className="movie-rating__count">{reviewsCount} ratings</span>
            </p>
          </div>
          <div className="movie-card__text">
            <p>
              {description}
            </p>
            <p className="movie-card__director"><strong>Director: {director}</strong></p>
            <p className="movie-card__starring"><strong>Starring: {starring.join(`, `)} and other</strong></p>
          </div>
        </ React.Fragment>;
      case Tab.DETAILS:
        return <div className="movie-card__text movie-card__row">
          <div className="movie-card__text-col">
            <p className="movie-card__details-item">
              <strong className="movie-card__details-name">Director</strong>
              <span className="movie-card__details-value">{director}</span>
            </p>
            <p className="movie-card__details-item">
              <strong className="movie-card__details-name">Starring</strong>
              <span className="movie-card__details-value">
                {
                  actors.map((actor)=>{
                    return <React.Fragment key={actor}>
                      {actor}<br />
                    </ React.Fragment>;
                  })
                }
              </span>
            </p>
          </div>
          <div className="movie-card__text-col">
            <p className="movie-card__details-item">
              <strong className="movie-card__details-name">Run Time</strong>
              <span className="movie-card__details-value">{humanizedDuration}</span>
            </p>
            <p className="movie-card__details-item">
              <strong className="movie-card__details-name">Genre</strong>
              <span className="movie-card__details-value">{genre}</span>
            </p>
            <p className="movie-card__details-item">
              <strong className="movie-card__details-name">Released</strong>
              <span className="movie-card__details-value">{year}</span>
            </p>
          </div>
        </div>;

      case Tab.REVIEWS:
        return <>
          {reviews.some(Boolean)
            ? <div className="movie-card__reviews movie-card__row">
              <div className="movie-card__reviews-col">
                {
                  reviews.map((review)=> {
                    const {
                      id: reviewId,
                      autorName,
                      text,
                      rating: reviewRating,
                      date,
                    } = review;

                    const formattedDate = humanizeDate(date, `YYYY-MM-DD`);
                    const humanizedDate = humanizeDate(date, `MMMM D, YYYY`);

                    return <div key={reviewId} className="review">
                      <blockquote className="review__quote">
                        <p className="review__text">{text}</p>
                        <footer className="review__details">
                          <cite className="review__author">{autorName}</cite>
                          <time className="review__date" dateTime={formattedDate}>{humanizedDate}</time>
                        </footer>
                      </blockquote>
                      <div className="review__rating">{reviewRating}</div>
                    </div>;
                  })
                }
              </div>
            </div>
            : ``
          }
        </>;
    }

    return ``;
  };

  return getPanel(panelId);
};

Panel.propTypes = {
  user: PropTypes.shape(userProps),
  reviews: PropTypes.arrayOf(
      PropTypes.shape(reviewsProp)
  )
};

export default Panel;
