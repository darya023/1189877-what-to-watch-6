import PropTypes from 'prop-types';
import {filmProps} from '../film-screen/film-screen.prop';

export const catalogProps = {
  className: PropTypes.string,
  headerClassName: PropTypes.string,
  header: PropTypes.string,
  films: PropTypes.arrayOf(
      PropTypes.shape(filmProps)
  ),
  children: PropTypes.arrayOf(
      PropTypes.object
  )
};
