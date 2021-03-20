import React from "react";
import Films from "../films/films";
import Spinner from "../spinner/spinner";
import GenresList from "../genres-list/genres-list";
import {getFilmsByActiveGenre, getLoadedFilmsStatus} from "../../store/data/selectors";
import {useSelector} from "react-redux";

const CatalogMain = () => {
  const isFilmsLoaded = useSelector(getLoadedFilmsStatus);
  const films = useSelector(getFilmsByActiveGenre);

  return <>
    {
      !isFilmsLoaded && <Spinner />
    }
    {
      films.some(Boolean)
        ? <section className={`catalog`} >
          <h2 className={`catalog__title visually-hidden`} >Catalog</h2>
          <GenresList />
          <Films films={films} />
          <div className="catalog__more">
            <button className="catalog__button" type="button">Show more</button>
          </div>
        </section>
        : ``
    }
  </>;
};

export {CatalogMain};
export default CatalogMain;
