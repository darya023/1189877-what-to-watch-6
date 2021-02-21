import React from "react";
import Films from "../films/films";
import {catalogProps} from "./catalog.prop";

const Catalog = ({className, headerClassName, header, films, children}) => {
  let genres; let button;

  if (children) {
    [genres, button] = children;
  }

  return <>
    {films.some(Boolean)
      ?
      <section className={`catalog ${className || ``}`} >
        <h2 className={`catalog__title ${headerClassName || ``}`} >{header}</h2>
        {genres}
        <Films films={films}/>
        {button}
      </section>
      : ``
    }
  </>;
};

Catalog.propTypes = catalogProps;

export default Catalog;
