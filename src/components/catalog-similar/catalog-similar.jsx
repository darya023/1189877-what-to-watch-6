import React from "react";
import Films from "../films/films";
import Spinner from "../spinner/spinner";
import {getFilmsLoadingStatus, getSimilarFilms} from "../../store/data/selectors";
import {useSelector} from "react-redux";
import {LoadingStatus} from "../../const";

const CatalogSimilar = () => {
  const filmsLoadingStatus = useSelector(getFilmsLoadingStatus);
  const films = useSelector(getSimilarFilms);

  return <>
    {
      filmsLoadingStatus === LoadingStatus.PENDING && <Spinner />
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
