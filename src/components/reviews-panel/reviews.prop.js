import PropTypes from 'prop-types';

export const reviewsProp = {
  id: PropTypes.string.isRequired,
  autorId: PropTypes.string.isRequired,
  filmId: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  date: PropTypes.string.isRequired,
};
