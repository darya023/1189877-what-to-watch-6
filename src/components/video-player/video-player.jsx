import React, {useEffect, useRef} from "react";
import PropTypes from 'prop-types';

const VideoPlayer = ({
  image,
  video,
  isMuted,
  isPreview,
  isPlaying,
}) => {
  const videoRef = useRef();

  useEffect(()=>{
    if (isPlaying) {
      videoRef.current.play();

      return;
    }

    videoRef.current.pause();
  });

  return <video
    className={isPreview ? `small-movie-card__video` : `player__video`}
    muted={isMuted}
    src={video}
    width={`100%`}
    height={`100%`}
    poster={image}
    ref={videoRef}
  />;
};

VideoPlayer.propTypes = {
  image: PropTypes.string.isRequired,
  video: PropTypes.string.isRequired,
  isMuted: PropTypes.bool.isRequired,
  isPreview: PropTypes.bool.isRequired,
  isPlaying: PropTypes.bool.isRequired,
};

export default VideoPlayer;
