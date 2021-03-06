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
import {FilterType} from "../../const";
import PrivateRoute from "../private-route/private-route";

const App = ({
  users,
  currentFilm,
  isFilmsLoaded,
  isPosterLoaded,
  onLoadFilms,
  onLoadPoster,
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
          render={()=><MainScreen filterType={FilterType.GENRE} />}
        />
        <Route path="/login" exact component={SignInScreen} />
        <PrivateRoute
          path="/mylist"
          exact
          component={()=><MyListScreen filterType={FilterType.IS_FAVORITE} />}
        />
        <Route
          path="/player/:id"
          exact
          render={
            (props)=>{
              const id = props.match.params.id;

              return currentFilm
                ? <PlayerScreen currentFilmId={id} />
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
                ? <FilmScreen currentFilmId={id} filterType={FilterType.SIMILAR} reviews={currentFilmReviews}/>
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

              return currentFilm
                ? <AddReviewScreen currentFilmId={id} />
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
  poster: PropTypes.shape(filmProps),
  users: PropTypes.arrayOf(
      PropTypes.shape(userProps)
  ),
  user: PropTypes.shape(userProps),
  currentFilm: PropTypes.shape(filmProps),
  onLoadFilms: PropTypes.func.isRequired,
  onLoadPoster: PropTypes.func.isRequired,
  isPosterLoaded: PropTypes.bool.isRequired,
  isFilmsLoaded: PropTypes.bool.isRequired,
};


const mapStateToProps = (state) => ({
  isFilmsLoaded: state.isFilmsLoaded,
  isPosterLoaded: state.isPosterLoaded,
  currentFilm: state.currentFilm,
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
