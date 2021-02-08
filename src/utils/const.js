import PropTypes from 'prop-types';

export const PropType = {
  DEFAULT_PROPS: {
    match: PropTypes.object,
    location: PropTypes.object,
    history: PropTypes.object
  },
  MOVIE_CARD: {
    id: PropTypes.string,
    title: PropTypes.string,
    image: PropTypes.string,
  },
  POSTER: {
    title: PropTypes.string,
    genre: PropTypes.string,
    year: PropTypes.number,
    image: PropTypes.string
  },
};
