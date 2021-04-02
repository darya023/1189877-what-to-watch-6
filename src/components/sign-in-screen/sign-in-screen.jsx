import React from "react";
import Footer from "../footer/footer";
import HeaderUserPage from "../header/header-user-page";
import SignInForm from "../sign-in-form/sign-in-form";

const SignInScreen = () => {
  return <div className="user-page">
    <HeaderUserPage withoutUserComponent={true}>
      <h1 className="page-title user-page__title">Sign in</h1>
    </HeaderUserPage>
    <div className="sign-in user-page__content">
      <SignInForm />
    </div>
    <Footer />
  </div>;
};

export {SignInScreen};
export default SignInScreen;
