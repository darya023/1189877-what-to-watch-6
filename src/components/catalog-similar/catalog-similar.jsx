import React from "react";
import Films from "../films/films";
import Spinner from "../spinner/spinner";
import {useSelector} from "react-redux";
import {getSimilarFilms} from "../../store/data/selectors/films";
import {needShowSpinnerInsteadFilms} from "../../store/data/selectors/selectors";

const CatalogSimilar = () => {
  const isSpinnerShown = useSelector(needShowSpinnerInsteadFilms);
  const films = useSelector(getSimilarFilms);

  if (isSpinnerShown) {
    return <Spinner />;
  }
  return films.some(Boolean)
    ? <section className={`catalog catalog--like-this`} >
      <h2 className={`catalog__title`} >More like this</h2>
      <Films films={films} />
    </section>
    : ``;
};

export {CatalogSimilar};
export default CatalogSimilar;
