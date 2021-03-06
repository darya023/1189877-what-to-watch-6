import React, {useEffect} from "react";
import PropTypes from 'prop-types';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import MainScreen from "../main-screen/main-screen";
import NotFoundScreen from "../not-found-screen/not-found-screen";
import MyListScreen from "../my-list-screen/my-list-screen";
import SignInScreen from "../sign-in-screen/sign-in-screen";
import PlayerScreen from "../player-screen/player-screen";
import FilmScreen from "../film-screen/film-screen";
import AddReviewScreen from "../add-review-screen/add-review-screen";
import {userProps} from "../user/user.prop";
import {filmProps} from "../film-screen/film-screen.prop";
import {reviews} from "../../mocks/reviews";
import {fetchFilms, fetchPoster} from "../../store/api-actions";
import {connect} from "react-redux";
import PrivateRoute from "../private-route/private-route";
import {filter} from "../../utils/filter";
import {FilterType} from "../../const";

const App = ({
  users,
  isFilmsLoaded,
  isPosterLoaded,
  onLoadFilms,
  onLoadPoster,
  films
}) => {
  useEffect(() => {
    if (!isFilmsLoaded) {
      onLoadFilms();
    }
  }, [isFilmsLoaded]);

  useEffect(() => {
    if (!isPosterLoaded) {
      onLoadPoster();
    }
  }, [isPosterLoaded]);

  return (
    <BrowserRouter>
      <Switch>
        <Route
          path="/"
          exact
          render={()=><MainScreen />}
        />
        <Route path="/login" exact component={SignInScreen} />
        <PrivateRoute
          path="/mylist"
          exact
          component={()=><MyListScreen />}
        />
        <Route
          path="/player/:id"
          exact
          render={
            (props)=>{
              const id = props.match.params.id;
              const currentFilm = filter[FilterType.ID]({films}, id);

              return currentFilm
                ? <PlayerScreen currentFilm={currentFilm} />
                : <NotFoundScreen />;
            }
          }
        />
        <Route
          path="/films/:id"
          exact
          render={
            (props)=>{
              let currentFilmReviews = [];
              const id = props.match.params.id;
              const currentFilm = filter[FilterType.ID]({films}, id);

              if (currentFilm) {
                currentFilmReviews = reviews
                    .slice()
                    .filter((review)=>review.filmId === currentFilm.id)
                    .map((review)=>{
                      return Object.assign(
                          {},
                          review,
                          {
                            autorName: users.find((autor)=>autor.id === review.autorId).name
                          }
                      );
                    });
              }

              return currentFilm
                ? <FilmScreen currentFilm={currentFilm} reviews={currentFilmReviews}/>
                : <NotFoundScreen />;
            }
          }
        />
        <PrivateRoute
          path="/films/:id/review"
          exact
          component={
            (props)=> {
              const id = props.match.params.id;
              const currentFilm = filter[FilterType.ID]({films}, id);

              return currentFilm
                ? <AddReviewScreen currentFilm={currentFilm} />
                : <NotFoundScreen />;
            }
          }
        />
        <Route component={NotFoundScreen} />
      </Switch>
    </BrowserRouter>
  );
};

App.propTypes = {
  match: PropTypes.object,
  location: PropTypes.object,
  history: PropTypes.object,
  users: PropTypes.arrayOf(
      PropTypes.shape(userProps)
  ).isRequired,
  onLoadFilms: PropTypes.func.isRequired,
  onLoadPoster: PropTypes.func.isRequired,
  isPosterLoaded: PropTypes.bool.isRequired,
  isFilmsLoaded: PropTypes.bool.isRequired,
  films: PropTypes.arrayOf(
      PropTypes.shape(filmProps)
  ).isRequired,
};


const mapStateToProps = (state) => ({
  isFilmsLoaded: state.isFilmsLoaded,
  isPosterLoaded: state.isPosterLoaded,
  films: filter[FilterType.ALL](state),
});

const mapDispatchToProps = (dispatch) => ({
  onLoadFilms() {
    dispatch(fetchFilms());
  },
  onLoadPoster() {
    dispatch(fetchPoster());
  },
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
