import React, {useEffect} from "react";
import PropTypes from 'prop-types';
import {Route, Switch} from "react-router-dom";
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
import {getLoadedFilmsStatus, getLoadedPosterStatus} from "../../store/data/selectors";
import {userProps} from "../user/user.prop";

const App = ({users}) => {
  const isFilmsLoaded = useSelector(getLoadedFilmsStatus);
  const isPosterLoaded = useSelector(getLoadedPosterStatus);

  const dispatch = useDispatch();

  const onLoadFilms = () => {
    dispatch(fetchFilms());
  };
  const onLoadPoster = () => {
    dispatch(fetchPoster());
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

            return <PlayerScreen currentFilmID={id || null} />;
          }
        }
      />
      <Route
        path="/films/:id"
        exact
        render={
          (props)=>{
            const id = props.match.params.id;
            let currentFilmReviews = reviews
              .slice()
              .filter((review)=>review.filmId === id)
              .map((review)=>{
                return Object.assign(
                    {},
                    review,
                    {
                      autorName: users.find((autor)=>autor.id === review.autorId) && users.find((autor)=>autor.id === review.autorId).name
                    }
                );
              });

            return <FilmScreen currentFilmID={id || null} reviews={currentFilmReviews} />;
          }
        }
      />
      <PrivateRoute
        path="/films/:id/review"
        exact
        component={
          (props)=> {
            const id = props.match.params.id;

            return <AddReviewScreen currentFilmID={id || null} />;
          }
        }
      />
      <Route component={NotFoundScreen} />
    </Switch>
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
