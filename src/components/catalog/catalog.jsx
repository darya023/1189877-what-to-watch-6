import React from "react";
import {connect} from "react-redux";
import Films from "../films/films";
import Spinner from "../spinner/spinner";
import {catalogProps} from "./catalog.prop";

const Catalog = ({
  className = ``,
  isHeaderVisual = ``,
  header,
  children,
  isFilmsLoaded
}) => {
  let genres; let button;

  if (children) {
    [genres, button] = children;
  }

  return <>
    {
      !isFilmsLoaded
        ? <Spinner />
        : <section className={`catalog ${className || ``}`} >
          <h2 className={`catalog__title ${isHeaderVisual || `visually-hidden`}`} >{header || `Catalog`}</h2>
          {genres}
          <Films />
          {button}
        </section>
    }
  </>;
};

Catalog.propTypes = catalogProps;

const mapStateToProps = (state) => ({
  isFilmsLoaded: state.isFilmsLoaded,
});

export {Catalog};
export default connect(mapStateToProps, null)(Catalog);
