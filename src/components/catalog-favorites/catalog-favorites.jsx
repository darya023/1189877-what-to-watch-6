import React from "react";
import {connect} from "react-redux";
import {filter} from "../../utils/filter";
import {catalogProps} from "../catalog-main/catalog.prop";
import Films from "../films/films";
import Spinner from "../spinner/spinner";

const CatalogFavorites = ({isFilmsLoaded, films}) => {
  return <>
    {
      !isFilmsLoaded
        ? <Spinner />
        : <section className={`catalog`} >
          <h2 className={`catalog__title visually-hidden`} >Catalog</h2>
          <Films films={films} />
        </section>
    }
  </>;
};

CatalogFavorites.propTypes = catalogProps;

const mapStateToProps = (state, ownProps) => ({
  isFilmsLoaded: state.isFilmsLoaded,
  films: filter[ownProps.filterType](state),
});

export {CatalogFavorites};
export default connect(mapStateToProps, null)(CatalogFavorites);
