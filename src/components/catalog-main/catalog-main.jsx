import React from "react";
import {connect} from "react-redux";
import {filter} from "../../utils/filter";
import {catalogProps} from "./catalog.prop";
import Films from "../films/films";
import Spinner from "../spinner/spinner";
import GenreList from "../genre-list/genre-list";
import {FilterType} from "../../const";

const CatalogMain = ({isFilmsLoaded, films}) => {
  return <>
    {
      !isFilmsLoaded && <Spinner />
    }
    {
      films.some(Boolean)
        ? <section className={`catalog`} >
          <h2 className={`catalog__title visually-hidden`} >Catalog</h2>
          <GenreList />
          <Films films={films} />
          <div className="catalog__more">
            <button className="catalog__button" type="button">Show more</button>
          </div>
        </section>
        : ``
    }
  </>;
};

CatalogMain.propTypes = catalogProps;

const mapStateToProps = (state) => ({
  isFilmsLoaded: state.isFilmsLoaded,
  films: filter[FilterType.GENRE](state),
});

export {CatalogMain};
export default connect(mapStateToProps, null)(CatalogMain);
