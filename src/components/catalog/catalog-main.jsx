import React from "react";
import PropTypes from 'prop-types';
import {filmProps} from "../film-screen/film-screen.prop";
import Catalog from "./catalog";

const CatalogMain = (props) => {
  return <Catalog headerClassName={`visually-hidden`} header={`Catalog`} {...props}>
    <ul className="catalog__genres-list">
      <li className="catalog__genres-item catalog__genres-item--active">
        <a href="#" className="catalog__genres-link">All genres</a>
      </li>
      <li className="catalog__genres-item">
        <a href="#" className="catalog__genres-link">Comedies</a>
      </li>
      <li className="catalog__genres-item">
        <a href="#" className="catalog__genres-link">Crime</a>
      </li>
      <li className="catalog__genres-item">
        <a href="#" className="catalog__genres-link">Documentary</a>
      </li>
      <li className="catalog__genres-item">
        <a href="#" className="catalog__genres-link">Dramas</a>
      </li>
      <li className="catalog__genres-item">
        <a href="#" className="catalog__genres-link">Horror</a>
      </li>
      <li className="catalog__genres-item">
        <a href="#" className="catalog__genres-link">Kids &amp; Family</a>
      </li>
      <li className="catalog__genres-item">
        <a href="#" className="catalog__genres-link">Romance</a>
      </li>
      <li className="catalog__genres-item">
        <a href="#" className="catalog__genres-link">Sci-Fi</a>
      </li>
      <li className="catalog__genres-item">
        <a href="#" className="catalog__genres-link">Thrillers</a>
      </li>
    </ul>
    <div className="catalog__more">
      <button className="catalog__button" type="button">Show more</button>
    </div>
  </Catalog>;
};

Catalog.propTypes = {
  films: PropTypes.arrayOf(
      PropTypes.shape(filmProps)
  ),
};

export default CatalogMain;
