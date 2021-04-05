import {changeAuthorizationStatus, changeCurrentFilmID, changeGenre, changeSendingDataStatus, loadFilms, loadPoster, redirectToRoute, resetGenre, setGenres, setUser, updateFilm} from "./action-creator";
import {ActionType} from "./actions";

describe(`Action creators work correctly`, () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it(`Action creator for changing active genre returns correct action`, () => {
    const genre = `genre`;
    const expectedAction = {
      type: ActionType.CHANGE_GENRE,
      payload: genre
    };

    expect(changeGenre(genre)).toEqual(expectedAction);
  });
  it(`Action creator for reset genre returns action with undefined payload`, () => {
    const expectedAction = {
      type: ActionType.RESET_GENRE,
    };

    expect(resetGenre()).toEqual(expectedAction);
  });
  it(`Action creator for loading films returns correct action`, () => {
    const films = [
      {
        id: `1`,
        title: `The Grand Budapest Hotel`,
        image: ``,
        poster: ``,
        backgroundImage: ``,
        genre: `Drama`,
        year: 2014,
        video: ``,
        promoVideo: ``,
        description: `Non non sunt Lorem quis sit voluptate commodo aliqua ut.`,
        director: `Wes Andreson`,
        actors: [`Bill Murray`, `Edward Norton`, `Jude Law`, `Willem Dafoe`],
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
        genre: `Fantasy`,
        year: 2018,
        video: ``,
        promoVideo: ``,
        description: `Laboris excepteur et nostrud commodo laboris anim pariatur pariatur ipsum.`,
        director: `Wes Andreson`,
        actors: [`Bill Murray`, `Edward Norton`, `Jude Law`, `Willem Dafoe`],
        starring: [`Bill Murray`, `Edward Norton`],
        duration: 120,
        rating: 7.5,
        reviewsCount: 3,
        isFavorite: true,
      },
    ];
    const expectedAction = {
      type: ActionType.LOAD_FILMS,
      payload: films
    };

    expect(loadFilms(films)).toEqual(expectedAction);
  });
  it(`Action creator for setting genres returns correct action`, () => {
    const films = [
      {
        id: `1`,
        title: `The Grand Budapest Hotel`,
        image: ``,
        poster: ``,
        backgroundImage: ``,
        genre: `Drama`,
        year: 2014,
        video: ``,
        promoVideo: ``,
        description: `Non non sunt Lorem quis sit voluptate commodo aliqua ut.`,
        director: `Wes Andreson`,
        actors: [`Bill Murray`, `Edward Norton`, `Jude Law`, `Willem Dafoe`],
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
        genre: `Fantasy`,
        year: 2018,
        video: ``,
        promoVideo: ``,
        description: `Laboris excepteur et nostrud commodo laboris anim pariatur pariatur ipsum.`,
        director: `Wes Andreson`,
        actors: [`Bill Murray`, `Edward Norton`, `Jude Law`, `Willem Dafoe`],
        starring: [`Bill Murray`, `Edward Norton`],
        duration: 120,
        rating: 7.5,
        reviewsCount: 3,
        isFavorite: true,
      }
    ];
    const expectedAction = {
      type: ActionType.SET_GENRES,
      payload: films
    };

    expect(setGenres(films)).toEqual(expectedAction);
  });
  it(`Action creator for loading poster returns correct action`, () => {
    const poster = {
      id: `1`,
      title: `The Grand Budapest Hotel`,
      image: ``,
      poster: ``,
      backgroundImage: ``,
      genre: `Drama`,
      year: 2014,
      video: ``,
      promoVideo: ``,
      description: `Non non sunt Lorem quis sit voluptate commodo aliqua ut.`,
      director: `Wes Andreson`,
      actors: [`Bill Murray`, `Edward Norton`, `Jude Law`, `Willem Dafoe`],
      starring: [`Bill Murray`, `Edward Norton`],
      duration: 120,
      rating: 7.5,
      reviewsCount: 3,
      isFavorite: false,
    };
    const expectedAction = {
      type: ActionType.LOAD_POSTER,
      payload: poster
    };

    expect(loadPoster(poster)).toEqual(expectedAction);
  });
  it(`Action creator for changing authorisation status returns correct action`, () => {
    const status = true;
    const expectedAction = {
      type: ActionType.CHANGE_AUTHORIZATION_STATUS,
      payload: status
    };

    expect(changeAuthorizationStatus(status)).toEqual(expectedAction);
  });
  it(`Action creator for changing sendingDataStatus status returns correct action`, () => {
    const status = true;
    const expectedAction = {
      type: ActionType.CHANGE_SENDING_DATA_STATUS,
      payload: status
    };

    expect(changeSendingDataStatus(status)).toEqual(expectedAction);
  });
  it(`Action creator for setting user returns correct action`, () => {
    const user = {
      id: `1`,
      name: `User`,
      image: ``,
      email: ``
    };
    const expectedAction = {
      type: ActionType.SET_USER,
      payload: user
    };

    expect(setUser(user)).toEqual(expectedAction);
  });
  it(`Action creator for redirecting to route returns correct action`, () => {
    const url = `/test`;
    const expectedAction = {
      type: ActionType.REDIRECT_TO_ROUTE,
      payload: url
    };

    expect(redirectToRoute(url)).toEqual(expectedAction);
  });
  it(`Action creator for changing current film id returns correct action`, () => {
    const id = `test`;
    const expectedAction = {
      type: ActionType.CHANGE_CURRENT_FILM_ID,
      payload: id
    };

    expect(changeCurrentFilmID(id)).toEqual(expectedAction);
  });
  it(`Action creator for updating film returns correct action`, () => {
    const film = {
      id: `1`,
      title: `The Grand Budapest Hotel`,
      image: ``,
      poster: ``,
      backgroundImage: ``,
      genre: `Drama`,
      year: 2014,
      video: ``,
      promoVideo: ``,
      description: `Non non sunt Lorem quis sit voluptate commodo aliqua ut.`,
      director: `Wes Andreson`,
      actors: [`Bill Murray`, `Edward Norton`, `Jude Law`, `Willem Dafoe`],
      starring: [`Bill Murray`, `Edward Norton`],
      duration: 120,
      rating: 7.5,
      reviewsCount: 3,
      isFavorite: false,
    };
    const expectedAction = {
      type: ActionType.UPDATE_FILM,
      payload: film
    };

    expect(updateFilm(film)).toEqual(expectedAction);
  });

});
