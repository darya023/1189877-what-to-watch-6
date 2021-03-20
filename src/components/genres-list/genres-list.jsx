import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {changeGenre, resetGenre} from "../../store/action-creator";
import {getGenres} from "../../store/genres/selectors";
import {getActiveGenre} from "../../store/genres/selectors";

const GenresList = () => {
  const activeGenre = useSelector(getActiveGenre);
  const genres = useSelector(getGenres);

  const dispatch = useDispatch();

  const onResetGenre = () => {
    dispatch(resetGenre());
  };

  const onGenreChange = (genre) => {
    dispatch(changeGenre(genre));
  };

  useEffect(() => {
    onResetGenre();
  }, []);

  return <ul className="catalog__genres-list">
    {
      genres.map((genre) => (
        <li key={genre} className={`catalog__genres-item ${genre === activeGenre && `catalog__genres-item--active`}`}>
          <a
            onClick={
              (event) => {
                event.preventDefault();
                onGenreChange(genre);
              }
            }
            href="#"
            className="catalog__genres-link"
          >{genre}</a>
        </li>
      ))
    }
  </ul>;
};

export {GenresList};
export default React.memo(GenresList);
