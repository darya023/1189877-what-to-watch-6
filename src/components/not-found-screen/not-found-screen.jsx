import React from "react";
import {Link} from "react-router-dom";

const NotFoundScreen = () => {
  return <React.Fragment>
    <div className="user-page user-page--fill">
      <header className="page-header">
        <div className="logo">
          <Link to="/" className="logo__link">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </Link>
        </div>
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
        <div className="logo">
          <Link to="/" className="logo__link">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </Link>
        </div>
        <div className="copyright">
          <p>© 2019 What to watch Ltd.</p>
        </div>
      </footer>
    </div>
  </React.Fragment>;

};

export default NotFoundScreen;
