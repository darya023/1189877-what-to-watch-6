import React, {useEffect} from "react";
import PropTypes from 'prop-types';
import {useHistory} from "react-router-dom";
import NotFoundScreen from "../not-found-screen/not-found-screen";
import {useDispatch, useSelector} from "react-redux";
import {changeCurrentFilmID} from "../../store/action-creator";
import {getCurrentFilm} from "../../store/data/selectors";

const PlayerScreen = ({currentFilmID}) => {
  const currentFilm = useSelector((state) => getCurrentFilm(state));

  const dispatch = useDispatch();

  const onChangeCurrentFilmID = (id) => {
    dispatch(changeCurrentFilmID(id));
  };

  useEffect(() => {
    onChangeCurrentFilmID(currentFilmID);
  }, [currentFilmID]);

  const history = useHistory();
  const goBack = history.goBack;

  return currentFilm
    ? <React.Fragment>
      <div className="player">
        <video src={currentFilm.video} className="player__video" poster={currentFilm.image} />
        <button className="player__exit" onClick={goBack}>Exit</button>
        <div className="player__controls">
          <div className="player__controls-row">
            <div className="player__time">
              <progress className="player__progress" value={30} max={100} />
              <div className="player__toggler" style={{left: `30%`}}>Toggler</div>
            </div>
            <div className="player__time-value">1:30:29</div>
          </div>
          <div className="player__controls-row">
            <button type="button" className="player__play">
              <svg viewBox="0 0 19 19" width={19} height={19}>
                <use xlinkHref="#play-s" />
              </svg>
              <span>Play</span>
            </button>
            <div className="player__name">{currentFilm.title}</div>
            <button type="button" className="player__full-screen">
              <svg viewBox="0 0 27 27" width={27} height={27}>
                <use xlinkHref="#full-screen" />
              </svg>
              <span>Full screen</span>
            </button>
          </div>
        </div>
      </div>
    </React.Fragment>
    : <NotFoundScreen />;
};

PlayerScreen.propTypes = {
  currentFilmID: PropTypes.string.isRequired,
};

export default PlayerScreen;

