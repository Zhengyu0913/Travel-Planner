import React from "react";
import { Link, useParams } from "react-router-dom";

export default function Place() {
  const param = useParams();
  const currentPlace = param.place;
  return (
    <>
      <div>Place:{currentPlace}</div>
      <ul>
        <Link to={`/home/${currentPlace}/${1}`}>
          <li>1</li>
        </Link>
        <Link to={`/home/${currentPlace}/${2}`}>
          <li>2</li>
        </Link>
        <Link to={`/home/${currentPlace}/${3}`}>
          <li>3</li>
        </Link>
        <Link to={`/home/${currentPlace}/${4}`}>
          <li>4</li>
        </Link>
        <Link to={`/home/${currentPlace}/${5}`}>
          <li>5</li>
        </Link>
      </ul>
    </>
  );
}
