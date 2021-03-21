import React from "react";
import PropTypes from 'prop-types';
import {humanizeDuration} from "../../utils/humanize-duration";
import DetailsPanelItem from "../details-panel-item/details-panel-item";
import {DurationView} from "../../const";

const DetailsPanel = ({
  genre,
  year,
  director,
  starring,
  duration,
}) => {
  const humanizedDuration = humanizeDuration(duration, DurationView.LETTERS);

  return <div className="movie-card__text movie-card__row">
    <div className="movie-card__text-col">
      <DetailsPanelItem name="Director" value={director} />
      <DetailsPanelItem name="Starring">
        {
          starring.map((actor)=>{
            return <React.Fragment key={actor}>
              {actor}<br />
            </ React.Fragment>;
          })
        }
      </DetailsPanelItem>
    </div>
    <div className="movie-card__text-col">
      <DetailsPanelItem name="Run Time" value={humanizedDuration} />
      <DetailsPanelItem name="Genre" value={genre} />
      <DetailsPanelItem name="Released" value={year} />
    </div>
  </div>;
};

DetailsPanel.propTypes = {
  genre: PropTypes.string.isRequired,
  year: PropTypes.number.isRequired,
  director: PropTypes.string.isRequired,
  starring: PropTypes.arrayOf(PropTypes.string).isRequired,
  duration: PropTypes.number.isRequired,
};

export default DetailsPanel;
