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
import {fetchFilms, fetchPoster} from "../../store/api-actions";
import {useDispatch, useSelector} from "react-redux";
import PrivateRoute from "../private-route/private-route";
import {needLoadPoster} from "../../store/data/selectors/poster";
import {needLoadFilms} from "../../store/data/selectors/films";
import {AppRoute} from "../../const";

const App = () => {
  const isPosterNotLoaded = useSelector(needLoadPoster);
  const isFilmsNotLoaded = useSelector(needLoadFilms);

  const dispatch = useDispatch();

  const onLoadFilms = () => {
    dispatch(fetchFilms());
  };
  const onLoadPoster = () => {
    dispatch(fetchPoster());
  };

  useEffect(() => {
    if (isFilmsNotLoaded) {
      onLoadFilms();
    }
  }, [isFilmsNotLoaded]);

  useEffect(() => {
    if (isPosterNotLoaded) {
      onLoadPoster();
    }
  }, [isPosterNotLoaded]);

  return (
    <Switch>
      <Route
        path={AppRoute.MAIN}
        exact
        render={()=><MainScreen />}
      />
      <Route path={AppRoute.LOGIN} exact component={SignInScreen} />
      <PrivateRoute
        path={AppRoute.MY_LIST}
        exact
        component={()=><MyListScreen />}
      />
      <Route
        path={AppRoute.PLAYER_SCHEMA}
        exact
        render={
          (props)=>{
            const id = props.match.params.id;

            return <PlayerScreen currentFilmID={id || null} />;
          }
        }
      />
      <Route
        path={AppRoute.FILM_SCHEMA}
        exact
        render={
          (props)=>{
            const id = props.match.params.id;

            return <FilmScreen currentFilmID={id || null} />;
          }
        }
      />
      <PrivateRoute
        path={AppRoute.ADD_REVIEW_SCHEMA}
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
};

export {App};
export default App;
