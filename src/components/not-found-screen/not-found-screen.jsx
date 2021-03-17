import React from "react";
import Footer from "../footer/footer";
import HeaderUserPage from "../header/header-user-page";

const NotFoundScreen = () => {
  return <React.Fragment>
    <div className="user-page user-page--fill">
      <HeaderUserPage withoutUserComponent={true}/>
      <main className="user-page__content">
        <div className="page">
          <div className="page__text">
            <h1>404</h1>
            <p>Page not found</p>
          </div>
          <div className="page__btn">
            <a className="page-btn" href="/">Go to homepage</a>
          </div>
        </div>

      </main>
      <Footer />
    </div>
  </React.Fragment>;

};

export default NotFoundScreen;
