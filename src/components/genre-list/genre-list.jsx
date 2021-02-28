import React, {useEffect} from "react";
import {connect} from "react-redux";
import {ActionCreator} from "../../store/action-creator";
import {genreListProps} from "./genre-list.prop";


const GenreList = ({activeGenre, genres, onGenreChange, resetGenre}) => {
  useEffect(() => {
    resetGenre();
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

GenreList.propTypes = genreListProps;

const mapStateToProps = (state) => ({
  activeGenre: state.activeGenre,
  genres: state.genres,
});

const mapDispatchToProps = (dispatch) => ({
  resetGenre() {
    dispatch(ActionCreator.resetGenre());
  },
  onGenreChange(activeGenre) {
    dispatch(ActionCreator.changeGenre(activeGenre));
  },
});

export {GenreList};
export default connect(mapStateToProps, mapDispatchToProps)(GenreList);
