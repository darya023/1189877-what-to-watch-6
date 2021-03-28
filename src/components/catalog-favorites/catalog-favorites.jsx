import React from "react";
import {useSelector} from "react-redux";
import {getFavoriteFilms} from "../../store/data/selectors";
import {needShowSpinnerInsteadFilms} from "../../store/data/selectors-with-loading-status";
import Films from "../films/films";
import Spinner from "../spinner/spinner";

const CatalogFavorites = () => {
  const isSpinnerShown = useSelector(needShowSpinnerInsteadFilms);
  const films = useSelector(getFavoriteFilms);

  if (isSpinnerShown) {
    return <Spinner />;
  }
  return films.some(Boolean)
    ? <section className={`catalog`} >
      <h2 className={`catalog__title visually-hidden`} >Catalog</h2>
      <Films films={films} />
    </section>
    : ``;
};

export {CatalogFavorites};
export default CatalogFavorites;
