import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDailyPlans } from "../components/utils/getDailyPlans";
const dummyTripDetail = {};
export default function TripDetail() {
  const [tripDetail, setTripDetail] = useState(dummyTripDetail); //在useEffect里面call 后端api拿到trip detail
  const param = useParams();
  const currentTrip = param.detail;
  // useEffect(() => {
  //   getDailyPlans(currentTrip).then((data) => {
  //     console.log(data);
  //     setTripDetail(data);
  //   });
  // }, [currentTrip]);
  return <div>Trip Detail:{currentTrip}</div>;
}
