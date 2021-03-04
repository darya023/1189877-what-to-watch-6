import PropTypes from 'prop-types';

export const filmProps = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  poster: PropTypes.string.isRequired,
  backgroundImage: PropTypes.string.isRequired,
  genre: PropTypes.string.isRequired,
  year: PropTypes.number.isRequired,
  video: PropTypes.string.isRequired,
  promoVideo: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  director: PropTypes.string.isRequired,
  starring: PropTypes.arrayOf(PropTypes.string).isRequired,
  duration: PropTypes.number.isRequired,
  rating: PropTypes.number.isRequired,
  reviewsCount: PropTypes.number.isRequired,
  isFavorite: PropTypes.bool.isRequired,
};
