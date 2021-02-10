import PropTypes from 'prop-types';

export const defaultProps = {
  match: PropTypes.object,
  location: PropTypes.object,
  history: PropTypes.object
};

export const posterProps = {
  title: PropTypes.string,
  genre: PropTypes.string,
  year: PropTypes.number,
  image: PropTypes.string
};

export const movieCardProps = {
  id: PropTypes.string,
  title: PropTypes.string,
  image: PropTypes.string,
};
