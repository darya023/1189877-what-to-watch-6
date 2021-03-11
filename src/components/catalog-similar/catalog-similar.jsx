import React from "react";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {filter} from "../../utils/filter";
import {catalogProps} from "../catalog-main/catalog.prop";
import Films from "../films/films";
import Spinner from "../spinner/spinner";
import {FilterType} from "../../const";
import {filmProps} from "../film-screen/film-screen.prop";

const CatalogSimilar = ({isFilmsLoaded, films}) => {
  return <>
    {
      !isFilmsLoaded && <Spinner />
    }
    {
      films.some(Boolean)
        ? <section className={`catalog catalog--like-this`} >
          <h2 className={`catalog__title`} >More like this</h2>
          <Films films={films} />
        </section>
        : ``
    }
  </>;
};

CatalogSimilar.propTypes = {
  ...catalogProps,
  currentFilm: PropTypes.shape(filmProps).isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  isFilmsLoaded: state.isFilmsLoaded,
  films: filter[FilterType.SIMILAR](state, ownProps.currentFilm.id, ownProps.currentFilm.genre),
});

export {CatalogSimilar};
export default connect(mapStateToProps, null)(CatalogSimilar);
