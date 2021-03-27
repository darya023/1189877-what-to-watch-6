import React, {useEffect, useState} from "react";
import Films from "../films/films";
import Spinner from "../spinner/spinner";
import GenresList from "../genres-list/genres-list";
import {getFilmsByActiveGenre} from "../../store/data/selectors";
import {useSelector} from "react-redux";
import {needShowSpinnerInsteadFilms} from "../../store/data/selectors-with-loading-status";
import ShowMoreButton from "../show-more-button/show-more-button";

const INITIAL_SHOWN_FILMS_COUNTER = 8;

const CatalogMain = () => {
  const isSpinnerShown = useSelector(needShowSpinnerInsteadFilms);
  const films = useSelector(getFilmsByActiveGenre);

  const [isShowMoreButtonShown, setIsShowMoreButtonShown] = useState(true);
  const [shownFilmsCounter, setShownFilmsCounter] = useState(INITIAL_SHOWN_FILMS_COUNTER);

  const onShowMoreButtonClick = () => {
    if (shownFilmsCounter + INITIAL_SHOWN_FILMS_COUNTER < films.length) {
      setShownFilmsCounter(shownFilmsCounter + INITIAL_SHOWN_FILMS_COUNTER);

      return;
    }

    setShownFilmsCounter(films.length);
    setIsShowMoreButtonShown(false);
  };

  useEffect(() => {
    setShownFilmsCounter(INITIAL_SHOWN_FILMS_COUNTER);

    if (shownFilmsCounter >= films.length) {
      setIsShowMoreButtonShown(false);

      return;
    }

    setIsShowMoreButtonShown(true);
  }, [films]);

  if (isSpinnerShown) {
    return <Spinner />;
  }
  return films.some(Boolean)
    ? <section className={`catalog`} >
      <h2 className={`catalog__title visually-hidden`} >Catalog</h2>
      <GenresList />
      <Films films={films.slice(0, shownFilmsCounter)} />
      {
        isShowMoreButtonShown && <ShowMoreButton onShowMoreButtonClick={onShowMoreButtonClick}/>
      }
    </section>
    : ``;
};

export {CatalogMain};
export default CatalogMain;
