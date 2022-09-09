import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import DailyPlanTabs from "../components/DailyPlanTabs";

import TripDetailMap from "../components/Map/TripDetailMap";

import { getDailyPlans } from "../components/utils/getDailyPlans";
const dummyTripDetail = {
  tripname: "Boston",
  dailyplans: [
    {
      date: "09-01-2022",
      plan: [
        {
          placeId: "1",
          placeName: "xxx Hotel",
          timeSlot: "lunch",
          point: { lat: "34.06178665161133", lon: "-117.82377624511719" },
        },
        {
          placeId: "2",
          placeName: "xxx Restaraunt",
          timeSlot: "dinner",
          point: { lat: "34.16178665161133", lon: "-117.12377624511719" },
        },
        {
          placeId: "7",
          placeName: "yyy Restaraunt",
          timeSlot: "dinner",
          point: { lat: "34.16178665161133", lon: "-117.12377624511719" },
        },
        {
          placeId: "8",
          placeName: "yyy Restaraunt",
          timeSlot: "breakfirst",
          point: { lat: "34.16178665161133", lon: "-117.12377624511719" },
        },
      ],
    },
    {
      date: "09-02-2022",
      plan: [
        {
          placeId: "3",
          placeName: "xxx Hotel",
          timeSlot: "lunch",
          point: { lat: "34.26178665161133", lon: "-117.22377624511719" },
        },
        {
          placeId: "4",
          placeName: "xxx Restaraunt",
          timeSlot: "dinner",
          point: { lat: "34.36178665161133", lon: "-117.32377624511719" },
        },
      ],
    },
    {
      date: "09-03-2022",
      plan: [
        {
          placeId: "5",
          placeName: "xxx Hotel",
          timeSlot: "lunch",
          point: { lat: "34.46178665161133", lon: "-117.42377624511719" },
        },
        {
          placeId: "6",
          placeName: "xxx Restaraunt",
          timeSlot: "dinner",
          point: { lat: "34.56178665161133", lon: "-117.52377624511719" },
        },
      ],
    },
  ],
};
export default function TripDetail() {
  const [tripDetail, setTripDetail] = useState(dummyTripDetail.dailyplans); //在useEffect里面call 后端api拿到trip detail
  const [coords, setCoords] = useState({});
  const [places, setPlaces] = useState([]);
  const param = useParams();
  const currentTrip = param.detail;
  // useEffect(() => {
  //   getDailyPlans(currentTrip).then((data) => {
  //     console.log(data);
  //     setTripDetail(data);
  //   });
  // }, [currentTrip]);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoords({ lat: latitude, lng: longitude });
      }
    );
  }, []);

  return (
    <Grid container spacing={3} style={{ width: "100%" }}>
      <Grid item xs={12} md={4}>
        <DailyPlanTabs
          dailyplans={tripDetail}
          days={tripDetail.map((item) => item.date)}
          plans={tripDetail.map((item) => item.plan)}
        ></DailyPlanTabs>
      </Grid>
      <Grid
        item
        xs={12}
        md={8}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TripDetailMap coords={coords} places={places} />
      </Grid>
    </Grid>
  );
}
