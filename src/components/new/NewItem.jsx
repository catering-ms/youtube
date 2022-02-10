import React from 'react';
import { Link } from "react-router-dom";

import "./NewItem.css";

export default function NewItem({reqPath, title}) {
  return (
    <div className="productTitleContainer">
        <h1 className="productTitle">{title}</h1>
        <Link to={reqPath}>
          <button className="productAddButton">Create</button>
        </Link>
      </div>
  );
}
