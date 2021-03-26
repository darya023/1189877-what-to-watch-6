import React from "react";
import Films from "../films/films";
import Spinner from "../spinner/spinner";
import GenresList from "../genres-list/genres-list";
import {getFilmsByActiveGenre, getFilmsLoadingStatus} from "../../store/data/selectors";
import {useSelector} from "react-redux";
import {LoadingStatus} from "../../const";

const CatalogMain = () => {
  const filmsLoadingStatus = useSelector(getFilmsLoadingStatus);
  const films = useSelector(getFilmsByActiveGenre);

  return <>
    {
      filmsLoadingStatus === LoadingStatus.PENDING && <Spinner />
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
