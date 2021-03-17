import React from "react";
import CatalogFavorites from "../catalog-favorites/catalog-favorites";
import Footer from "../footer/footer";
import HeaderUserPage from "../header/header-user-page";

const MyListScreen = () => {
  return <React.Fragment>
    <div className="user-page">
      <HeaderUserPage>
        <h1 className="page-title user-page__title">My list</h1>
      </HeaderUserPage>
      <CatalogFavorites />
      <Footer />
    </div>
  </React.Fragment>;
};

export default MyListScreen;
