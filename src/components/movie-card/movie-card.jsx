import React, {useEffect, useState} from "react";
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";
import VideoPlayer from "../video-player/video-player";
import {AppRoute} from "../../const";

const PLAYING_DELAY = 1000;

const MovieCard = ({
  id,
  title,
  image,
  promoVideo,
  onMouseEnter,
  onMouseLeave,
  isActive
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(()=>{
    const timeout = setTimeout(() => {
      if (isActive) {
        setIsPlaying(true);
      }
    }, PLAYING_DELAY, isActive);

    return () => {
      clearTimeout(timeout);
      setIsPlaying(false);
    };
  }, [isActive]);

  return <article onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} className="small-movie-card catalog__movies-card">
    {
      // eslint-disable-next-line
    <Link to={AppRoute.FILM(id)} className="small-movie-card__link">
        {
          isPlaying
            ? <VideoPlayer
              image={image}
              video={promoVideo}
              isMuted={true}
              isPreview={true}
              isPlaying={isPlaying}
            />
            : <div className="small-movie-card__image">
              <img src={image} alt={title} width={280} height={175} />
            </div>
        }
        <h3 className="small-movie-card__title">
          <div>{title}</div>
        </h3>
      </Link>
    }
  </article>;
};

MovieCard.propTypes = {
  isActive: PropTypes.bool.isRequired,
  onMouseEnter: PropTypes.func.isRequired,
  onMouseLeave: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  promoVideo: PropTypes.string.isRequired,
};

export {MovieCard};
export default React.memo(MovieCard, (prevProps, nextProps) => {
  return prevProps.isActive === nextProps.isActive;
});
