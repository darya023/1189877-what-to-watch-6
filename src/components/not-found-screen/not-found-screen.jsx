import React from "react";
import Logo from "../logo/logo";

const NotFoundScreen = () => {
  return <React.Fragment>
    <div className="user-page user-page--fill">
      <header className="page-header">
        <Logo />
      </header>
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
      <footer className="page-footer">
        <Logo />
        <div className="copyright">
          <p>© 2019 What to watch Ltd.</p>
        </div>
      </footer>
    </div>
  </React.Fragment>;

};

export default NotFoundScreen;
