import React, {useEffect, useRef} from "react";
import PropTypes from 'prop-types';
import {login} from "../../store/api-actions";
import {changeSendingDataStatus, redirectToRoute} from "../../store/action-creator";
import {getAuthorizationStatus} from "../../store/user/selectors";
import {getSendingDataStatus, needDisableElement, needRedirectFromSigninScreen, needResetSendingDataStatus, needSetErrorToastText} from "../../store/data/selectors/selectors";
import {connect, useDispatch, useSelector} from "react-redux";
import {AppRoute, LoadingStatus} from "../../const";
import withForm from "../hocs/with-form";

const SigninFormToastText = {
  EMAIL: `Please input correct email`,
  PASSWORD: `Please input password`,
  ERROR: `Something went wrong. Please try later.`,
};
const emailRegexp = new RegExp(`^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$`);

const SignInForm = React.forwardRef(({onSubmit, setToastText, isFormDisabled, children}, ref) => {
  SignInForm.displayName = `SignInForm`;
  const authorizationStatus = useSelector(getAuthorizationStatus);
  const sendingDataStatus = useSelector(getSendingDataStatus);
  const isSendingForm = useSelector(needDisableElement);
  const isRedirectNeeded = useSelector(needRedirectFromSigninScreen);

  const dispatch = useDispatch();

  const onSignInFormSubmit = (formData) => {
    dispatch(login(formData));
  };
  const redirect = (url) => {
    dispatch(redirectToRoute(url));
  };

  const emailRef = useRef();
  const passwordRef = useRef();
  const buttonRef = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!emailRegexp.test(emailRef.current.value)) {
      setToastText({toastText: SigninFormToastText.EMAIL});
      onSubmit(false);

      return;
    }
    if (!passwordRef.current.value) {
      setToastText({toastText: SigninFormToastText.PASSWORD});
      onSubmit(false);

      return;
    }

    onSignInFormSubmit({
      email: emailRef.current.value,
      password: passwordRef.current.value
    });
  };

  useEffect(() => {
    if (isRedirectNeeded) {
      redirect(AppRoute.MAIN);
    }
  }, [authorizationStatus, sendingDataStatus]);

  useEffect(() => {
    return () => dispatch(changeSendingDataStatus(LoadingStatus.INITIAL));
  });

  return <form ref={ref} action="#" className="sign-in__form" onSubmit={handleSubmit}>
    <div className="sign-in__fields">
      <div className="sign-in__field">
        <input
          className="sign-in__input"
          type="email"
          placeholder="Email address"
          name="user-email"
          id="user-email"
          ref={emailRef}
          onFocus={
            () => setToastText({toastText: false})
          }
          disabled={isFormDisabled}
        />
        <label className="sign-in__label visually-hidden" htmlFor="user-email">Email address</label>
      </div>
      <div className="sign-in__field">
        <input
          className="sign-in__input"
          type="password"
          placeholder="Password"
          name="user-password"
          id="user-password"
          ref={passwordRef}
          onFocus={
            () => setToastText({toastText: false})
          }
          disabled={isFormDisabled}
        />
        <label className="sign-in__label visually-hidden" htmlFor="user-password">Password</label>
      </div>
    </div>
    <div className="sign-in__submit">
      <button
        className="sign-in__btn"
        type="submit"
        ref={buttonRef}
        disabled={isFormDisabled}
      >
        {
          isSendingForm
            ? `Sending...`
            : `Sign in`
        }
      </button>
    </div>
    {children
      ? React.cloneElement(children, {className: `sign-in__message`})
      : ``
    }
  </form>;
});

SignInForm.propTypes = {
  currentFilmID: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  setToastText: PropTypes.func.isRequired,
  isFormDisabled: PropTypes.bool.isRequired,
  children: PropTypes.node,
};

const mapStateToProps = (state) => ({
  isSendingForm: needDisableElement(state),
  isErrorToastTextNeeded: needSetErrorToastText(state),
  isSendingDataStatusNotInitial: needResetSendingDataStatus(state)
});
const mapDispatchToProps = (dispatch) => ({
  onResetStatus() {
    dispatch(changeSendingDataStatus(LoadingStatus.INITIAL));
  }
});
export {SignInForm};
export default connect(mapStateToProps, mapDispatchToProps)(withForm(SignInForm));
