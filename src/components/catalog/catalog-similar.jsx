import React from "react";
import PropTypes from 'prop-types';
import {filmProps} from "../film-screen/film-screen.prop";
import Catalog from "./catalog";

const CatalogSimilar = (props) => {
  return <Catalog className={`catalog--like-this`} header={`More like this`} {...props} />;
};

CatalogSimilar.propTypes = {
  films: PropTypes.arrayOf(
      PropTypes.shape(filmProps)
  ),
};

export default CatalogSimilar;
