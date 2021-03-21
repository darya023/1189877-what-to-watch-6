import React from "react";
import {useSelector} from "react-redux";
import {getFavoriteFilms, getLoadedFilmsStatus} from "../../store/data/selectors";
import Films from "../films/films";
import Spinner from "../spinner/spinner";

const CatalogFavorites = () => {
  const isFilmsLoaded = useSelector(getLoadedFilmsStatus);
  const films = useSelector(getFavoriteFilms);

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

export {CatalogFavorites};
export default CatalogFavorites;
