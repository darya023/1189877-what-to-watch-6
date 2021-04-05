import {changeCurrentFilmID, changeLoadingFilmsStatus, changeLoadingFilmStatus, changeLoadingPosterStatus, changeSendingDataStatus, loadFilms, loadPoster, updateFilm} from "../action-creator";
import {data} from "./data";
import {LoadingStatus} from '../../const';

const fakeFilms = [
  {
    id: `1`,
    title: `The Grand Budapest Hotel`,
    image: ``,
    poster: ``,
    backgroundImage: ``,
    backgroundColor: `blue`,
    genre: `Drama`,
    year: 2014,
    video: ``,
    promoVideo: ``,
    description: `Non non sunt Lorem quis sit voluptate commodo aliqua ut.`,
    director: `Wes Andreson`,
    starring: [`Bill Murray`, `Edward Norton`],
    duration: 120,
    rating: 7.5,
    reviewsCount: 3,
    isFavorite: false,
  },
  {
    id: `2`,
    title: `Fantastic Beasts: The Crimes of Grindelwald`,
    image: ``,
    poster: ``,
    backgroundImage: ``,
    backgroundColor: `blue`,
    genre: `Fantasy`,
    year: 2018,
    video: ``,
    promoVideo: ``,
    description: `Laboris excepteur et nostrud commodo laboris anim pariatur pariatur ipsum.`,
    director: `Wes Andreson`,
    starring: [`Bill Murray`, `Edward Norton`],
    duration: 120,
    rating: 7.5,
    reviewsCount: 3,
    isFavorite: true,
  }
];
const fakeFilm = {
  id: `1`,
  title: `The Grand Budapest Hotel`,
  image: ``,
  poster: ``,
  backgroundImage: ``,
  backgroundColor: `blue`,
  genre: `Drama`,
  year: 2014,
  video: ``,
  promoVideo: ``,
  description: `Non non sunt Lorem quis sit voluptate commodo aliqua ut.`,
  director: `Wes Andreson`,
  starring: [`Bill Murray`, `Edward Norton`],
  duration: 120,
  rating: 7.5,
  reviewsCount: 3,
  isFavorite: false,
};
const initialState = {
  films: [],
  currentFilmReviews: [],
  poster: null,
  posterLoadingStatus: LoadingStatus.INITIAL,
  filmLoadingStatus: LoadingStatus.INITIAL,
  filmsLoadingStatus: LoadingStatus.INITIAL,
  sendingDataStatus: LoadingStatus.INITIAL,
  currentFilmID: null,
  currentFilm: null,
};

describe(`Date reducers work correctly`, () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(data(undefined, {})).toEqual(initialState);
  });
  it(`Reducer should set loaded films`, () => {
    const expectedState = {
      ...initialState,
      films: fakeFilms,
    };

    expect(data(initialState, loadFilms(fakeFilms))).toEqual(expectedState);
  });
  it(`Reducer should set loaded poster`, () => {
    const expectedState = {
      ...initialState,
      poster: fakeFilm,
    };

    expect(data(initialState, loadPoster(fakeFilm))).toEqual(expectedState);
  });
  it(`Reducer should change sendingDataStatus`, () => {
    const expectedState = {
      ...initialState,
      sendingDataStatus: LoadingStatus.SUCCESS,
    };

    expect(data(initialState, changeSendingDataStatus(LoadingStatus.SUCCESS))).toEqual(expectedState);

    const expectedStateAsInitialState = {
      ...initialState,
      sendingDataStatus: LoadingStatus.INITIAL,
    };

    expect(data(initialState, changeSendingDataStatus(LoadingStatus.INITIAL))).toEqual(expectedStateAsInitialState);
  });
  it(`Reducer should change filmsLoadingStatus`, () => {
    const expectedState = {
      ...initialState,
      filmsLoadingStatus: LoadingStatus.SUCCESS,
    };

    expect(data(initialState, changeLoadingFilmsStatus(LoadingStatus.SUCCESS))).toEqual(expectedState);

    const expectedStateAsInitialState = {
      ...initialState,
      filmsLoadingStatus: LoadingStatus.INITIAL,
    };

    expect(data(initialState, changeLoadingFilmsStatus(LoadingStatus.INITIAL))).toEqual(expectedStateAsInitialState);
  });
  it(`Reducer should change filmLoadingStatus`, () => {
    const expectedState = {
      ...initialState,
      filmLoadingStatus: LoadingStatus.SUCCESS,
    };

    expect(data(initialState, changeLoadingFilmStatus(LoadingStatus.SUCCESS))).toEqual(expectedState);

    const expectedStateAsInitialState = {
      ...initialState,
      filmLoadingStatus: LoadingStatus.INITIAL,
    };

    expect(data(initialState, changeLoadingFilmsStatus(LoadingStatus.INITIAL))).toEqual(expectedStateAsInitialState);
  });
  it(`Reducer should change posterLoadingStatus`, () => {
    const expectedState = {
      ...initialState,
      posterLoadingStatus: LoadingStatus.SUCCESS,
    };

    expect(data(initialState, changeLoadingPosterStatus(LoadingStatus.SUCCESS))).toEqual(expectedState);

    const expectedStateAsInitialState = {
      ...initialState,
      posterLoadingStatus: LoadingStatus.INITIAL,
    };

    expect(data(initialState, changeLoadingPosterStatus(LoadingStatus.INITIAL))).toEqual(expectedStateAsInitialState);
  });
  it(`Reducer should change current film id`, () => {
    const id = `1`;
    const expectedState = {
      ...initialState,
      currentFilmID: id,
    };

    expect(data(initialState, changeCurrentFilmID(id))).toEqual(expectedState);

    const initialStateForSameID = {
      ...initialState,
      currentFilmID: id,
    };

    expect(data(initialStateForSameID, changeCurrentFilmID(id))).toEqual(expectedState);
  });
  it(`Reducer should update film`, () => {
    const updatedFilm = {
      id: `1`,
      title: `The Grand Budapest Hotel`,
      image: ``,
      poster: ``,
      backgroundImage: ``,
      backgroundColor: `blue`,
      genre: `Drama`,
      year: 2014,
      video: ``,
      promoVideo: ``,
      description: `Non non sunt Lorem quis sit voluptate commodo aliqua ut.`,
      director: `Wes Andreson`,
      starring: [`Bill Murray`, `Edward Norton`],
      duration: 120,
      rating: 7.5,
      reviewsCount: 3,
      isFavorite: true,
    };
    const expectedFilms = [
      {
        id: `1`,
        title: `The Grand Budapest Hotel`,
        image: ``,
        poster: ``,
        backgroundImage: ``,
        backgroundColor: `blue`,
        genre: `Drama`,
        year: 2014,
        video: ``,
        promoVideo: ``,
        description: `Non non sunt Lorem quis sit voluptate commodo aliqua ut.`,
        director: `Wes Andreson`,
        starring: [`Bill Murray`, `Edward Norton`],
        duration: 120,
        rating: 7.5,
        reviewsCount: 3,
        isFavorite: true,
      },
      {
        id: `2`,
        title: `Fantastic Beasts: The Crimes of Grindelwald`,
        image: ``,
        poster: ``,
        backgroundImage: ``,
        backgroundColor: `blue`,
        genre: `Fantasy`,
        year: 2018,
        video: ``,
        promoVideo: ``,
        description: `Laboris excepteur et nostrud commodo laboris anim pariatur pariatur ipsum.`,
        director: `Wes Andreson`,
        starring: [`Bill Murray`, `Edward Norton`],
        duration: 120,
        rating: 7.5,
        reviewsCount: 3,
        isFavorite: true,
      }
    ];
    const expectedState = {
      ...initialState,
      films: expectedFilms,
      currentFilm: updatedFilm
    };
    const testInitialState = {
      ...initialState,
      films: fakeFilms,
      currentFilm: {},
    };

    expect(data(testInitialState, updateFilm(updatedFilm))).toEqual(expectedState);
    const expectedStateForPoster = {
      ...initialState,
      films: expectedFilms,
      poster: updatedFilm,
      currentFilm: updatedFilm,
    };
    const initialStateForPoster = {
      ...initialState,
      films: fakeFilms,
      poster: fakeFilm,
    };

    expect(data(initialStateForPoster, updateFilm(updatedFilm))).toEqual(expectedStateForPoster);
    expect(data(testInitialState, updateFilm({}))).toEqual(testInitialState);
  });
});
