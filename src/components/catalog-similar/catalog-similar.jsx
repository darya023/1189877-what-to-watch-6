import React from "react";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {filter} from "../../utils/filter";
import {catalogProps} from "../catalog-main/catalog.prop";
import Films from "../films/films";
import Spinner from "../spinner/spinner";

const CatalogSimilar = ({isFilmsLoaded, films}) => {
  return <>
    {
      !isFilmsLoaded
        ? <Spinner />
        : <section className={`catalog catalog--like-this`} >
          <h2 className={`catalog__title`} >More like this</h2>
          <Films films={films} />
        </section>
    }
  </>;
};

CatalogSimilar.propTypes = {
  ...catalogProps,
  currentFilmId: PropTypes.string.isRequired,
  currentFilmGenre: PropTypes.string.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  isFilmsLoaded: state.isFilmsLoaded,
  films: filter[ownProps.filterType](state, ownProps.currentFilmId, ownProps.currentFilmGenre),
});

export {CatalogSimilar};
export default connect(mapStateToProps, null)(CatalogSimilar);
