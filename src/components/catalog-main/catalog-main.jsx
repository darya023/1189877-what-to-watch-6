import React from "react";
import {connect} from "react-redux";
import {catalogProps} from "./catalog.prop";
import Films from "../films/films";
import Spinner from "../spinner/spinner";
import GenreList from "../genre-list/genre-list";
import {getFilmsByActiveGenre} from "../../store/selectors/films";

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
  films: getFilmsByActiveGenre(state),
});

export {CatalogMain};
export default connect(mapStateToProps, null)(CatalogMain);
