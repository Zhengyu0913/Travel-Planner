import React, { useState } from "react";
import { useParams } from "react-router-dom";
const dummyTripDetail = {};
export default function TripDetail() {
  const [tripDetail, setTripDetail] = useState(dummyTripDetail); //在useEffect里面call 后端api拿到trip detail
  const param = useParams();
  const currentTrip = param.detail;
  return <div>Trip Detail:{currentTrip}</div>;
}
