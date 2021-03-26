import React from "react";
import {useSelector} from "react-redux";
import {LoadingStatus} from "../../const";
import {getFavoriteFilms, getFilmsLoadingStatus} from "../../store/data/selectors";
import Films from "../films/films";
import Spinner from "../spinner/spinner";

const CatalogFavorites = () => {
  const filmsLoadingStatus = useSelector(getFilmsLoadingStatus);
  const films = useSelector(getFavoriteFilms);

  return <>
    {
      filmsLoadingStatus === LoadingStatus.PENDING && <Spinner />
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
