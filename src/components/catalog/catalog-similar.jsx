import React from "react";
import Catalog from "./catalog";

const CatalogSimilar = () => {
  return <Catalog
    isHeaderVisual={true}
    className={`catalog--like-this`}
    header={`More like this`}
  />;
};

export default CatalogSimilar;
