import PropTypes from 'prop-types';
import {filmProps} from '../film-screen/film-screen.prop';

export const catalogProps = {
  isFilmsLoaded: PropTypes.bool.isRequired,
  films: PropTypes.arrayOf(
      PropTypes.shape(filmProps)
  ).isRequired,
};
