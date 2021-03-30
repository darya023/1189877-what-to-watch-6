import React, {useEffect, useRef, useState} from "react";
import PropTypes from 'prop-types';
import {useFormData} from "../../hooks/use-form-data";
import {useDispatch, useSelector} from "react-redux";
import {changeSendingDataStatus, redirectToRoute} from "../../store/action-creator";
import {useLocation} from "react-router";
import Toast from "../toast/toast";
import {sendReview} from "../../store/api-actions";
import {getSendingDataStatus, needDisableElement, needResetSendingDataStatus, needSetErrorToastText} from "../../store/data/selectors/selectors";
import {LoadingStatus} from "../../const";

const SHAKE_ANIMATION_TIMEOUT = 600;
const MIN_TEXTAREA_LENGTH = 50;
const MAX_TEXTAREA_LENGTH = 400;

const ReviewFormToastText = {
  MIN: `Review must be more than ${MIN_TEXTAREA_LENGTH} symbols.`,
  MAX: `Review must be less than ${MAX_TEXTAREA_LENGTH} symbols.`,
  ERROR: `Something went wrong. Please try later.`,
};
const RATING_LENGTH = 10;
const ratings = new Array(RATING_LENGTH).fill().map((_item, index)=>{
  return index + 1;
});
const initialRating = ratings[RATING_LENGTH - 1];

const shake = (ref, callback) => {
  ref.current.className += ` shake`;

  setTimeout(() => {
    callback();
    ref.current.className -= ` shake`;
  }, SHAKE_ANIMATION_TIMEOUT);
};

const ReviewForm = ({currentFilmID}) => {
  const sendingDataStatus = useSelector(getSendingDataStatus);
  const isElementDisabled = useSelector(needDisableElement);
  const isErrorToastTextNeeded = useSelector(needSetErrorToastText);
  const isSendingDataStatusNotInitial = useSelector(needResetSendingDataStatus);

  const dispatch = useDispatch();

  const redirect = (url) => {
    dispatch(redirectToRoute(url));
  };

  const [isFormDisabled, setIsFormDisabled] = useState(false);
  const [toastText, setToastText] = useState(false);
  const textareaRef = useRef();
  const formRef = useRef();

  const onSubmit = (data) => {
    if (data[`review-text`].length < MIN_TEXTAREA_LENGTH) {
      setToastText(ReviewFormToastText.MIN);
    }
    if (data[`review-text`].length > MAX_TEXTAREA_LENGTH) {
      setToastText(ReviewFormToastText.MAX);
    }
    if (data[`review-text`].length < MIN_TEXTAREA_LENGTH || data[`review-text`].length > MAX_TEXTAREA_LENGTH) {
      setIsFormDisabled(true);
      shake(
          formRef,
          () => {
            setIsFormDisabled(false);
          }
      );
      return;
    }

    dispatch(sendReview(data, currentFilmID));
  };
  const path = useLocation().pathname;
  const regexp = /(\/.*)\/review/;
  const [, url] = path.match(regexp);

  const initialFormData = {
    "rating": initialRating,
    "review-text": ``
  };
  const [formData, handleFieldChange, handleSubmit] = useFormData(initialFormData, onSubmit);

  useEffect(() => {
    setIsFormDisabled(isElementDisabled);

    if (isErrorToastTextNeeded) {
      setToastText(ReviewFormToastText.ERROR);
    }

    if (isSendingDataStatusNotInitial) {
      redirect(url);
      dispatch(changeSendingDataStatus(LoadingStatus.INITIAL));
    }
  }, [sendingDataStatus]);

  useEffect(() => {
    return () => dispatch(changeSendingDataStatus(LoadingStatus.INITIAL));
  });

  return <form ref={formRef} onSubmit={handleSubmit} action="#" className="add-review__form">
    <div className="rating">
      <div className="rating__stars">
        {
          ratings.map((rating)=>{
            const id = `star-${rating}`;
            const isDefaultRating = rating === formData.rating;

            return <React.Fragment key={id}>
              <input
                onClick={(event) => {
                  setIsFormDisabled(false);
                  handleFieldChange(event);
                  setToastText(false);
                }}
                className="rating__input"
                id={id}
                type="radio"
                name="rating"
                defaultValue={rating}
                defaultChecked={isDefaultRating}
                disabled={isFormDisabled}
              />
              <label className="rating__label" htmlFor={id}>Rating {rating}</label>
            </ React.Fragment>;
          })
        }
      </div>
    </div>
    <div ref={textareaRef} className="add-review__text">
      <textarea onChange={
        (event) => {
          setIsFormDisabled(false);
          handleFieldChange(event);
        }}
      onFocus={
        () => setToastText(false)
      }
      className="add-review__textarea"
      name="review-text" id="review-text"
      placeholder="Review text"
      defaultValue={``}
      disabled={isFormDisabled}
      />
      <div className="add-review__submit">
        <button disabled={isFormDisabled} className="add-review__btn" type="submit">{
          isElementDisabled
            ? `Sending...`
            : `Post`
        }</button>
      </div>
      {
        toastText
          ? <Toast text={toastText} />
          : ``
      }
      <div>
      </div>
    </div>
  </form>

  ;
};

ReviewForm.propTypes = {
  currentFilmID: PropTypes.string.isRequired,
};

export default ReviewForm;
