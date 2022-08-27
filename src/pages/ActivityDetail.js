import React from "react";
import { useParams } from "react-router-dom";

export default function ActivityDetail() {
  const param = useParams();
  return <div>Details:{param.activity}</div>;
}
