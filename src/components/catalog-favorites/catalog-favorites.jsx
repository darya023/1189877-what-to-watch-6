import React from "react";
import {connect} from "react-redux";
import {FilterType} from "../../const";
import {filter} from "../../utils/filter";
import {catalogProps} from "../catalog-main/catalog.prop";
import Films from "../films/films";
import Spinner from "../spinner/spinner";

const CatalogFavorites = ({isFilmsLoaded, films}) => {
  return <>
    {
      !isFilmsLoaded && <Spinner />
    }
    {
      films.some(Boolean)
        ? <section className={`catalog`} >
          <h2 className={`catalog__title visually-hidden`} >Catalog</h2>
          <Films films={films} />
        </section>
        : ``
    }
  </>;
};

CatalogFavorites.propTypes = catalogProps;

const mapStateToProps = (state) => ({
  isFilmsLoaded: state.isFilmsLoaded,
  films: filter[FilterType.IS_FAVORITE](state),
});

export {CatalogFavorites};
export default connect(mapStateToProps, null)(CatalogFavorites);
