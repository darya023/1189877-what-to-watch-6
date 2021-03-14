import React from "react";
import {useSelector} from "react-redux";
import {getFavoriteFilms, getLoadedFilmsStatus} from "../../store/data/selectors";
import Films from "../films/films";
import Spinner from "../spinner/spinner";

const CatalogFavorites = () => {
  const isFilmsLoaded = useSelector((state) => getLoadedFilmsStatus(state));
  const films = useSelector((state) => getFavoriteFilms(state));

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
