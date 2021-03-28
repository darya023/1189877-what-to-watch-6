import {batch} from "react-redux";
import {APIRoute, DataType, HttpCode, LoadingStatus} from "../const";
import {adaptDataToClient} from "../utils/adaptDataToClient";
import {adaptDataToServer} from "../utils/adaptDataToServer";
import {changeAuthorizationStatus, changeSendingDataStatus, loadReviews, loadFilms, loadPoster, redirectToRoute, setGenres, setUser, updateFilm, loadCurrentFilm, changeLoadingPosterStatus, changeLoadingFilmsStatus, changeLoadingFilmStatus} from "./action-creator";

export const fetchFilms = () => (dispatch, _getState, api) => {
  dispatch(changeLoadingFilmsStatus(LoadingStatus.FETCHING));
  api.get(APIRoute.FILMS)
    .then(({data}) => data.map(adaptDataToClient[DataType.FILMS]))
    .then((data) => {
      batch(() => {
        dispatch(loadFilms(data));
        dispatch(setGenres(data));
        dispatch(changeLoadingFilmsStatus(LoadingStatus.SUCCESS));
      });
    })
    .catch(() => {
      dispatch(changeLoadingFilmsStatus(LoadingStatus.FAILURE));
    });
};

export const fetchFilm = (id) => (dispatch, _getState, api) => {
  dispatch(changeLoadingFilmStatus(LoadingStatus.FETCHING));
  api.get(`${APIRoute.FILMS}/${id}`)
    .then(({data}) => adaptDataToClient[DataType.FILMS](data))
    .then((data) => {
      batch(() => {
        dispatch(loadCurrentFilm(data));
        dispatch(changeLoadingFilmStatus(LoadingStatus.SUCCESS));
      });
    })
    .catch(() => {
      dispatch(changeLoadingFilmStatus(LoadingStatus.FAILURE));
    });
};

export const fetchPoster = () => (dispatch, _getState, api) => {
  dispatch(changeLoadingPosterStatus(LoadingStatus.FETCHING));
  api.get(APIRoute.POSTER)
    .then(({data}) => adaptDataToClient[DataType.FILMS](data))
    .then((data) => dispatch(loadPoster(data)))
    .then(() => dispatch(changeLoadingPosterStatus(LoadingStatus.SUCCESS)))
    .catch(() => {
      dispatch(changeLoadingPosterStatus(LoadingStatus.FAILURE));
    });
};

export const fetchReviews = (id) => (dispatch, _getState, api) => (
  api.get(`${APIRoute.REVIEWS}/${id}`)
    .then(({data}) => data.map(adaptDataToClient[DataType.REVIEWS]))
    .then((data) => {
      dispatch(loadReviews(data));
    })
);

export const sendReview = (formData, id) => (dispatch, _getState, api) => {
  formData = adaptDataToServer[DataType.REVIEWS](formData);
  dispatch(changeSendingDataStatus(LoadingStatus.FETCHING));
  api.post(`${APIRoute.REVIEWS}/${id}`, formData)
    .then(({data}) => data.map(adaptDataToClient[DataType.REVIEWS]))
    .then((data) => {
      batch(() => {
        dispatch(loadReviews(data));
        dispatch(changeSendingDataStatus(LoadingStatus.SUCCESS));
      });
    })
    .catch(() => {
      dispatch(changeSendingDataStatus(LoadingStatus.FAILURE));
    });
};

export const checkAuthorization = () => (dispatch, _getState, api) => (
  api.get(APIRoute.LOGIN)
    .then(({data})=>adaptDataToClient[DataType.USER](data))
    .then((data) => {
      batch(() => {
        dispatch(setUser(data));
        dispatch(changeAuthorizationStatus(true));
      });
    })
);

export const login = ({email, password}) => (dispatch, _getState, api) => {
  dispatch(changeSendingDataStatus(LoadingStatus.FETCHING));
  api.post(APIRoute.LOGIN, {email, password})
    .then(({data})=>adaptDataToClient[DataType.USER](data))
    .then((data) => {
      batch(() => {
        dispatch(setUser(data));
        dispatch(changeSendingDataStatus(LoadingStatus.SUCCESS));
        dispatch(changeAuthorizationStatus(true));
        dispatch(redirectToRoute(`/`));
      });
    })
    .catch(() => {
      batch(() => {
        dispatch(changeSendingDataStatus(LoadingStatus.FAILURE));
        dispatch(changeAuthorizationStatus(false));
      });
    });
};

export const toggleIsFavoriteKey = ({id, isFavorite}) => (dispatch, _getState, api) => {
  dispatch(changeSendingDataStatus(LoadingStatus.FETCHING));
  api.post(`${APIRoute.FAVORITE}/${id}/${isFavorite ? 0 : 1}`)
    .then(({data})=>adaptDataToClient[DataType.FILMS](data))
    .then((data) => {
      batch(() => {
        dispatch(updateFilm(data));
        dispatch(changeSendingDataStatus(LoadingStatus.SUCCESS));
      });
    })
    .catch((error) => {
      dispatch(changeSendingDataStatus(LoadingStatus.FAILURE));

      if (error.response.status === HttpCode.UNAUTHORIZED) {
        dispatch(redirectToRoute(`/login`));
      }
    });
};
