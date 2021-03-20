import React from "react";
import Films from "../films/films";
import Spinner from "../spinner/spinner";
import {getLoadedFilmsStatus, getSimilarFilms} from "../../store/data/selectors";
import {useSelector} from "react-redux";

const CatalogSimilar = () => {
  const isFilmsLoaded = useSelector(getLoadedFilmsStatus);
  const films = useSelector(getSimilarFilms);

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

export {CatalogSimilar};
export default CatalogSimilar;
