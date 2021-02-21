import PropTypes from 'prop-types';
import {filmProps} from '../film-screen/film-screen.prop';

export const catalogProps = {
  className: PropTypes.string,
  headerClassName: PropTypes.string,
  header: PropTypes.string.isRequired,
  films: PropTypes.arrayOf(
      PropTypes.shape(filmProps)
  ),
  children: PropTypes.oneOf([
    PropTypes.arrayOf(
        PropTypes.object
    ),
    PropTypes.string
  ])
};
