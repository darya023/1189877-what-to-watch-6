import React, {useEffect, useRef, useState} from "react";
import PropTypes from 'prop-types';
import NotFoundScreen from "../not-found-screen/not-found-screen";
import {useDispatch, useSelector} from "react-redux";
import {changeCurrentFilmID, redirectToRoute} from "../../store/action-creator";
import {getCurrentFilm, getLoadedFilmsStatus} from "../../store/data/selectors";
import {humanizeDuration} from "../../utils/humanize-duration";
import {DurationView} from "../../const";
import VideoPlayer from "../video-player/video-player";
import {useHistory} from "react-router";
import Spinner from "../spinner/spinner";

const countRatio = (progressRef, x) => {
  const offsetX = progressRef.current.getBoundingClientRect().left;
  const progressBarWidth = progressRef.current.offsetWidth;
  const ratio = (x - offsetX) / progressBarWidth;

  return ratio;
};

const PlayerScreen = ({currentFilmID}) => {
  const currentFilm = useSelector(getCurrentFilm);
  const isFilmsLoaded = useSelector(getLoadedFilmsStatus);

  const dispatch = useDispatch();

  const onChangeCurrentFilmID = (id) => {
    dispatch(changeCurrentFilmID(id));
  };

  const redirect = (url) => {
    dispatch(redirectToRoute(url));
  };

  const prevPath = useHistory().location.state ? useHistory().location.state.prevPath : `/`;

  const progressRef = useRef();
  const videoPlayerRef = useRef();

  const initialTime = `0:00`;
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(initialTime);
  const [timeToEnd, setTimeToEnd] = useState(initialTime);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    onChangeCurrentFilmID(currentFilmID);
  }, [currentFilmID]);

  const onDurationChange = (videoDuration) => {
    setTimeToEnd(humanizeDuration((videoDuration) / 60, DurationView.COLON));
    setDuration(videoDuration);
  };

  const onTimeUpdate = (time) => {
    const currentProgress = ((time * progressRef.current.max) / duration).toFixed(2);

    if (time === duration) {
      setIsPlaying(false);
    }

    setTimeToEnd(humanizeDuration((duration - time) / 60, DurationView.COLON));
    setProgress(Number(currentProgress));
  };

  const handlePlayButtonClick = () => {
    setIsPlaying((prevIsPlaying) => !prevIsPlaying);
  };

  const handleProgressBarClick = (event) => {
    const x = event.pageX;
    const ratio = countRatio(progressRef, x);
    const newCurrentTime = (ratio * duration).toFixed(6);

    setCurrentTime(Number(newCurrentTime));
  };

  const handleFullScreenButtonClick = () => {
    if (!isFullscreen) {
      videoPlayerRef.current
        .requestFullscreen()
        .then(() => {
          setIsFullscreen(true);
        });
      return;
    }

    document.exitFullscreen();
    setIsFullscreen(false);
  };

  const handlePlayerTogglerDrag = (event) => {
    const x = event.pageX;
    const {left: offsetLeft, right: offsetRight} = progressRef.current.getBoundingClientRect();

    if (x < offsetLeft || x > offsetRight) {
      return;
    }
    const ratio = countRatio(progressRef, x);
    const newProgress = (ratio * progressRef.current.max).toFixed(2);

    setProgress(Number(newProgress));
  };

  const handlePlayerTogglerDragStart = (event) => {
    const dragImage = document.createElement(`div`);

    dragImage.className = `visually-hidden`;
    event.dataTransfer.setDragImage(dragImage, 0, 0);
  };

  if (!isFilmsLoaded) {
    return <Spinner />;
  }
  if (!currentFilm) {
    return <NotFoundScreen />;
  }
  return <div className="player" ref={videoPlayerRef}>
    <VideoPlayer
      image={currentFilm.image}
      video={currentFilm.video}
      isMuted={false}
      isPreview={false}
      isPlaying={isPlaying}
      newCurrentTime={currentTime}
      setDuration={setDuration}
      onTimeUpdate={onTimeUpdate}
      onDurationChange={onDurationChange}
    />
    <button className="player__exit" onClick={() => redirect(prevPath)}>Exit</button>
    <div className="player__controls">
      <div className="player__controls-row">
        <div className="player__time" >
          <progress ref={progressRef} onClick={handleProgressBarClick} className="player__progress" value={progress} max={100} />
          <div
            draggable="true"
            onDrag={handlePlayerTogglerDrag}
            onDragStart={handlePlayerTogglerDragStart}
            onDragEnd={handleProgressBarClick}
            className="player__toggler"
            style={{left: `${progress}%`}}
          >Toggler</div>
        </div>
        <div className="player__time-value">{timeToEnd || duration}</div>
      </div>
      <div className="player__controls-row">
        <button
          onClick={handlePlayButtonClick}
          type="button"
          className="player__play"
        >
          <svg viewBox="0 0 19 19" width={19} height={19}>
            {
              isPlaying
                ? <use xlinkHref="#pause" />
                : <use xlinkHref="#play-s" />
            }
          </svg>
          <span>Play</span>
        </button>
        <div className="player__name">{currentFilm.title}</div>
        <button
          onClick={handleFullScreenButtonClick}
          type="button"
          className="player__full-screen"
        >
          <svg viewBox="0 0 27 27" width={27} height={27}>
            {
              isFullscreen
                ? <use xlinkHref="#full-screen-exit" />
                : <use xlinkHref="#full-screen" />
            }
          </svg>
          <span>Full screen</span>
        </button>
      </div>
    </div>
  </div>;
};

PlayerScreen.propTypes = {
  currentFilmID: PropTypes.string.isRequired,
};

export default PlayerScreen;
