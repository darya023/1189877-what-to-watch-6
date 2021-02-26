import PropTypes from 'prop-types';

export const genreListProps = {
  activeGenre: PropTypes.string.isRequired,
  genres: PropTypes.objectOf(
      PropTypes.string
  ).isRequired,
  onGenreChange: PropTypes.func.isRequired
};
