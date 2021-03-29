import React, {useEffect, useState} from "react";
import Films from "../films/films";
import Spinner from "../spinner/spinner";
import GenresList from "../genres-list/genres-list";
import {useSelector} from "react-redux";
import ShowMoreButton from "../show-more-button/show-more-button";
import {getFilmsByActiveGenre} from "../../store/data/selectors/films";
import {needShowSpinnerInsteadFilms} from "../../store/data/selectors/selectors";

const INITIAL_SHOWN_FILMS_COUNTER = 8;

const CatalogMain = () => {
  const films = useSelector(getFilmsByActiveGenre);
  const isSpinnerShown = useSelector(needShowSpinnerInsteadFilms);

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
