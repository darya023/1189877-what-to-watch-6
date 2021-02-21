import React from "react";
import PropTypes from 'prop-types';
import {filmProps} from "../film-screen/film-screen.prop";
import Catalog from "./catalog";

const CatalogSmall = (props) => {
  return <Catalog className={`catalog--like-this`} header={`More like this`} {...props} />;
};

Catalog.propTypes = {
  films: PropTypes.arrayOf(
      PropTypes.shape(filmProps)
  ),
};

export default CatalogSmall;
