import React, {useEffect} from "react";
import {connect} from "react-redux";
import {ActionCreator} from "../../store/action-creator";
import {genreListProps} from "./genre-list.prop";


const GenreList = ({activeGenre, genres, onGenreChange, resetGenre}) => {
  useEffect(() => {
    resetGenre();
  }, []);

  const getGenreList = (genreNames) => {
    const result = [];

    for (const genre of genreNames.keys()) {
      result.push(<li key={genre} className={`catalog__genres-item ${genre === activeGenre && `catalog__genres-item--active`}`}>
        <a onClick={
          (event) => {
            event.preventDefault();
            onGenreChange(genre);
          }
        }
        href="#"
        className="catalog__genres-link"
        >{genre}</a>
      </li>);
    }

    return result;
  };


  return <ul className="catalog__genres-list">
    {getGenreList(genres)}
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
    dispatch(ActionCreator.getFilms());
  },
});

export {GenreList};
export default connect(mapStateToProps, mapDispatchToProps)(GenreList);
