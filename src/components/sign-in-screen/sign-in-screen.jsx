import React, {useEffect, useRef} from "react";
import {login} from "../../store/api-actions";
import {changeSendingDataStatus, redirectToRoute} from "../../store/action-creator";
import {getAuthorizationStatus} from "../../store/user/selectors";
import {getSendingDataStatus} from "../../store/data/selectors";
import {useDispatch, useSelector} from "react-redux";
import Footer from "../footer/footer";
import HeaderUserPage from "../header/header-user-page";
import {LoadingStatus} from "../../const";
import {needDisableElement, needRedirectFromSigninScreen, needResetSendingDataStatus} from "../../store/data/selectors-with-loading-status";

const SignInScreen = () => {
  const authorizationStatus = useSelector(getAuthorizationStatus);
  const sendingDataStatus = useSelector(getSendingDataStatus);
  const isSendingDataStatusNotInitial = useSelector(needResetSendingDataStatus);
  const isElementDisabled = useSelector(needDisableElement);
  const isRedirectNeeded = useSelector(needRedirectFromSigninScreen);

  const dispatch = useDispatch();

  const onSubmit = (formData) => {
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
    onSubmit({
      email: emailRef.current.value,
      password: passwordRef.current.value
    });
  };

  useEffect(() => {
    if (isRedirectNeeded) {
      redirect(`/`);
    }
  }, [authorizationStatus, sendingDataStatus]);

  useEffect(() => {
    if (isSendingDataStatusNotInitial) {
      dispatch(changeSendingDataStatus(LoadingStatus.INITIAL));
    }
  }, [sendingDataStatus]);

  useEffect(() => {
    return () => dispatch(changeSendingDataStatus(LoadingStatus.INITIAL));
  });

  return <div className="user-page">
    <HeaderUserPage withoutUserComponent={true}>
      <h1 className="page-title user-page__title">Sign in</h1>
    </HeaderUserPage>
    <div className="sign-in user-page__content">
      <form action="#" className="sign-in__form" onSubmit={handleSubmit}>
        <div className="sign-in__fields">
          <div className="sign-in__field">
            <input
              className="sign-in__input"
              type="email"
              placeholder="Email address"
              name="user-email"
              id="user-email"
              ref={emailRef}
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
            />
            <label className="sign-in__label visually-hidden" htmlFor="user-password">Password</label>
          </div>
        </div>
        <div className="sign-in__submit">
          <button
            className="sign-in__btn"
            type="submit"
            ref={buttonRef}
            disabled={isElementDisabled}
          >
            {
              isElementDisabled
                ? `Sending...`
                : `Sign in`
            }
          </button>
        </div>
      </form>
    </div>
    <Footer />
  </div>;
};

export {SignInScreen};
export default SignInScreen;
