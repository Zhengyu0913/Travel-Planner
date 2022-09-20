import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getDailyPlans } from "../components/utils/getDailyPlans";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import IconButton from "@mui/material/IconButton";
import { Grid } from "@mui/material";
import DailyPlanTabs from "../components/DailyPlanTabs";
import TripDetailMap from "../components/Map/TripDetailMap";

export default function TripDetail() {
  const [tripDetail, setTripDetail] = useState({}); //在useEffect里面call 后端api拿到trip detail
  const [coords, setCoords] = useState({});
  const [places, setPlaces] = useState([]);
  const param = useParams();
  const currentTrip = param.detail;
  // console.log(currentTrip);

  const deleteTrip = (id) => {
    //发送delete请求
    if (window.confirm(`Are you sure you want to delete it?`)) {
      setTripDetail((prevTrips) => {
        const updateTrip = [];
        for (let i = 0; i < prevTrips.daily_plans.length; i++) {
          const updateDailyPlan = [];
          for (
            let j = 0;
            j < prevTrips.daily_plans[i].placeEntryList.length;
            j++
          ) {
            if (
              prevTrips.daily_plans[i].placeEntryList[j].place_entry_id !== id
            ) {
              updateDailyPlan.push(prevTrips.daily_plans[i].placeEntryList[j]);
            }
          }
          const updateTripDetail = {
            daily_plan_date: prevTrips.daily_plans[i].daily_plan_date,
            placeEntryList: updateDailyPlan,
          };
          updateTrip.push(updateTripDetail);
        }
        const updateWholeTrip = {
          trip_name: prevTrips.trip_name,
          daily_plans: updateTrip,
        };
        console.log(updateWholeTrip);
        return updateWholeTrip;
      });
    }
  };
  const getCoords = (point) => {
    setCoords(point);
  };
  useEffect(() => {
    getDailyPlans(currentTrip).then((data) => {
      console.log(data);
      setTripDetail({
        trip_name: data.trip_name,
        trip_id: data.trip_id,
        start_date: data.start_date,
        end_date: data.end_date,
        daily_plans: data.daily_plans,
      });
    });
  }, [currentTrip]);
  const [order, setOrder] = useState(0);
  const Back = () => {
    let navigate = useNavigate();
    return (
      <>
        <IconButton
          className="icon"
          aria-label="back"
          size={"large"}
          color="primary"
          onClick={() => navigate(-1)}
        >
          <ArrowBackIcon></ArrowBackIcon>
        </IconButton>
      </>
    );
  };
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoords({ lat: latitude, lng: longitude });
      }
    );
  }, []);
  const startDate = tripDetail.start_date;
  const endDate = tripDetail.end_date;

  return (
    <Grid container spacing={3} style={{ width: "100%" }}>
      <Grid item xs={12} md={4}>
        <div className="top">
          <Back />
          <div>
            <h1 className="tripname">{tripDetail.trip_name}</h1>
            <h2>
              {startDate} - {endDate}
            </h2>
          </div>
        </div>
        <DailyPlanTabs
          daily_plans={tripDetail.daily_plans}
          days={tripDetail.daily_plans?.map((item) => item.daily_plan_date)}
          plans={tripDetail.daily_plans?.map((item) => item.placeEntryList)}
          setCoords={setCoords}
          onDelete={deleteTrip}
          getCoords={getCoords}
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
        {/*<TripDetailMap coords={coords} places={places} />*/}
        <TripDetailMap coords={coords} />
      </Grid>
    </Grid>
  );
}
