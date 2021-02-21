import React, {useState} from "react";
import PropTypes from 'prop-types';
import {userProps} from "../user/user.prop";
import Panel from "../panel/panel";
import {reviewsProp} from "../panel/reviews.prop";
import {Tab} from "../../utils/const";

const Tabs = ({
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
    <Panel
      panelId={activeTabId}
      genre={genre}
      year={year}
      description={description}
      director={director}
      actors={actors}
      starring={starring}
      duration={duration}
      rating={rating}
      reviewsCount={reviewsCount}
      reviews={reviews}
    />

  </>;
};

Tabs.propTypes = {
  user: PropTypes.shape(userProps),
  genre: PropTypes.string.isRequired,
  year: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  director: PropTypes.string.isRequired,
  actors: PropTypes.arrayOf(PropTypes.string).isRequired,
  starring: PropTypes.arrayOf(PropTypes.string).isRequired,
  duration: PropTypes.number.isRequired,
  rating: PropTypes.number.isRequired,
  reviewsCount: PropTypes.number.isRequired,
  reviews: PropTypes.arrayOf(
      PropTypes.shape(reviewsProp)
  )
};

export default Tabs;
