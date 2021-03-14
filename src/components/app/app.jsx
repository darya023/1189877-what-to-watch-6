import React, {useEffect} from "react";
import PropTypes from 'prop-types';
import {Router, Route, Switch} from "react-router-dom";
import MainScreen from "../main-screen/main-screen";
import NotFoundScreen from "../not-found-screen/not-found-screen";
import MyListScreen from "../my-list-screen/my-list-screen";
import SignInScreen from "../sign-in-screen/sign-in-screen";
import PlayerScreen from "../player-screen/player-screen";
import FilmScreen from "../film-screen/film-screen";
import AddReviewScreen from "../add-review-screen/add-review-screen";
import {reviews} from "../../mocks/reviews";
import {fetchFilms, fetchPoster} from "../../store/api-actions";
import {useDispatch, useSelector} from "react-redux";
import PrivateRoute from "../private-route/private-route";
import browserHistory from "../../browser-history";
import {getCurrentFilm, getCurrentFilmID, getLoadedFilmsStatus, getLoadedPosterStatus, getPoster} from "../../store/data/selectors";
import {changeCurrentFilmID} from "../../store/action-creator";
import {userProps} from "../user/user.prop";

const App = ({users}) => {
  // const {isFilmsLoaded, isPosterLoaded, currentFilmID, poster} = useSelector((state) => state[NameSpace.DATA]);
  const currentFilm = useSelector((state) => getCurrentFilm(state));
  const isFilmsLoaded = useSelector((state) => getLoadedFilmsStatus(state));
  const currentFilmID = useSelector((state) => getCurrentFilmID(state));
  const isPosterLoaded = useSelector((state) => getLoadedPosterStatus(state));
  const poster = useSelector((state) => getPoster(state));

  const dispatch = useDispatch();

  const onLoadFilms = () => {
    dispatch(fetchFilms());
  };
  const onLoadPoster = () => {
    dispatch(fetchPoster());
  };
  const onChangeCurrentFilmID = (id) => {
    dispatch(changeCurrentFilmID(id));
  };

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
    <Router history={browserHistory}>
      <Switch>
        <Route
          path="/"
          exact
          render={
            ()=>{
              if (isPosterLoaded && currentFilmID !== poster.id) {
                onChangeCurrentFilmID(poster.id);
              }

              return <MainScreen />;
            }
          }
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

              if (currentFilmID !== id) {
                onChangeCurrentFilmID(id);
              }

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

              if (currentFilmID !== id) {
                onChangeCurrentFilmID(id);
              }

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

              if (currentFilmID !== id) {
                onChangeCurrentFilmID(id);
              }

              return currentFilm
                ? <AddReviewScreen currentFilm={currentFilm} />
                : <NotFoundScreen />;
            }
          }
        />
        <Route component={NotFoundScreen} />
      </Switch>
    </Router>
  );
};

App.propTypes = {
  match: PropTypes.object,
  users: PropTypes.arrayOf(
      PropTypes.shape(userProps)
  ).isRequired,
};

export {App};
export default App;
