import React, {useState} from "react";
import PropTypes from 'prop-types';
import {userProps} from "../user/user.prop";
import {reviewsProp} from "../reviews-panel/reviews.prop";
import {Tab} from "../../const";
import OverwiewPanel from "../overview-panel/overview-panel";
import DetailsPanel from "../details-panel/details-panel";
import ReviewsPanel from "../reviews-panel/reviews-panel";

const Tabs = ({
  genre,
  year,
  description,
  director,
  starring,
  duration,
  rating,
  reviewsCount,
  reviews
}) => {
  const tabs = [
    {
      id: Tab.OVERVIEW,
      name: Tab.OVERVIEW,
      isActive: true
    },
    {
      id: Tab.DETAILS,
      name: Tab.DETAILS,
      isActive: false
    },
    {
      id: Tab.REVIEWS,
      name: Tab.REVIEWS,
      isActive: false
    },
  ];

  const [activeTabId, setActiveTabId] = useState(tabs.find((tab)=>tab.isActive === true).id);

  const getPanel = (id) => {
    switch (id) {
      case Tab.OVERVIEW:
        return <OverwiewPanel
          description={description}
          director={director}
          starring={starring}
          rating={rating}
          reviewsCount={reviewsCount}
        />;
      case Tab.DETAILS:
        return <DetailsPanel
          genre={genre}
          year={year}
          director={director}
          starring={starring}
          duration={duration}
        />;
      case Tab.REVIEWS:
        return <ReviewsPanel reviews={reviews} />;
    }

    return null;
  };

  return <>
    <nav className="movie-nav movie-card__nav">
      <ul className="movie-nav__list">
        {
          tabs.map((tab)=>{
            const {
              id,
              name,
            } = tab;

            return <li key={name} className={`movie-nav__item ${activeTabId === id && `movie-nav__item--active`}`}>
              <a
                onClick={
                  (event)=>{
                    event.preventDefault();
                    setActiveTabId(id);
                  }
                }
                href="#"
                className="movie-nav__link"
              >{name}</a>
            </li>;
          })
        }
      </ul>
    </nav>
    {getPanel(activeTabId)}
  </>;
};

Tabs.propTypes = {
  user: PropTypes.shape(userProps),
  genre: PropTypes.string.isRequired,
  year: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  director: PropTypes.string.isRequired,
  starring: PropTypes.arrayOf(PropTypes.string).isRequired,
  duration: PropTypes.number.isRequired,
  rating: PropTypes.number.isRequired,
  reviewsCount: PropTypes.number.isRequired,
  reviews: PropTypes.arrayOf(
      PropTypes.shape(reviewsProp)
  )
};

export default Tabs;
