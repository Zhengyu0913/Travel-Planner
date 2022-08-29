import React from "react";
import { Link } from "react-router-dom";

export default function Trips() {
  return (
    <>
      <h1>Trips</h1>
      <Link to="/trips/details"> Trip Details</Link>
    </>
  );
}
