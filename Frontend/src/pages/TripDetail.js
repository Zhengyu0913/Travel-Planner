import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getDailyPlans } from "../components/utils/getDailyPlans";
import Container from "@material-ui/core/Container"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/material/IconButton';
import { Grid } from "@mui/material";
import DailyPlanTabs from "../components/DailyPlanTabs";
import TripDetailMap from "../components/Map/TripDetailMap";
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
                    point: { lat: 34.06178665161133, lng: -117.82377624511719 },
                },
                {
                    placeId: "2",
                    placeName: "xxx Restaraunt",
                    timeSlot: "dinner",
                    point: { lat: 34.16178665161133, lng: -117.12377624511719 },
                },
            ],
        },
        {
            date: "09-02-2022",
            plan: [
                {
                    placeId: "3",
                    placeName: "xxx Hotel",
                    timeSlot: "dinner",
                    point: { lat: 34.26178665161133, lng: -117.22377624511719 },
                },
                {
                    placeId: "4",
                    placeName: "xxx Restaraunt",
                    timeSlot: "dinner",
                    point: { lat: 34.36178665161133, lng: -117.32377624511719 },
                },
                {
                    placeId: "5",
                    placeName: "xxx Hotel",
                    timeSlot: "lunch",
                    point: { lat: 34.26178665161133, lng: -117.22377624511719 },
                },
                {
                    placeId: "6",
                    placeName: "xxx parking",
                    timeSlot: "breakfast",
                    point: { lat: 34.26178665161133, lng: -117.22377624511719 },
                }
            ],
        },
        {
            date: "09-03-2022",
            plan: [
                {
                    placeId: "7",
                    placeName: "xxx Hotel",
                    timeSlot: "lunch",
                    point: { lat: 34.46178665161133, lng: -117.42377624511719 },
                },
                {
                    placeId: "8",
                    placeName: "xxx Restaraunt",
                    timeSlot: "dinner",
                    point: { lat: 34.56178665161133, lng: -117.52377624511719 },
                },
            ],
        },
    ],
}
export default function TripDetail() {
    const [tripDetail, setTripDetail] = useState(dummyTripDetail); //在useEffect里面call 后端api拿到trip detail
    const [coords, setCoords] = useState({});
    const [places, setPlaces] = useState([]);
    const param = useParams();
    const currentTrip = param.detail;
    const deleteTrip = (id) => {
        if (window.confirm(`Are you sure you want to delete it?`)) {
            setTripDetail((prevTrips) => {
                const updateTrip = [];
                for(let i = 0; i < prevTrips.dailyplans.length; i++){
                    const updateDailyPlan=[];
                    for(let j = 0; j < prevTrips.dailyplans[i].plan.length; j++){
                        if(prevTrips.dailyplans[i].plan[j].placeId !== id){
                            updateDailyPlan.push(prevTrips.dailyplans[i].plan[j]);
                        }
                    }
                    const updateTripDetail = {date: prevTrips.dailyplans[i].date, plan: updateDailyPlan};
                    updateTrip.push(updateTripDetail);
                }
                const updateWholeTrip = {tripname: prevTrips.tripname, dailyplans: updateTrip};
                console.log(updateWholeTrip);
                return updateWholeTrip;
            });
        }
    };
    const getCoords = (point) =>{
        setCoords(point);
    }
  // useEffect(() => {
  //   getDailyPlans(currentTrip).then((data) => {
  //     console.log(data);
  //     setTripDetail(data);
  //   });
  // }, [currentTrip]);
    const [order, setOrder] = useState(0);
    const Back = () => {
        let navigate = useNavigate();
        return (
            <>
                <IconButton className="icon" aria-label="back" size={"large"} color="primary" onClick={() => navigate(-1)}>
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
    const startDate = tripDetail.dailyplans[0].date;
    const endDate = tripDetail.dailyplans[tripDetail.dailyplans.length - 1].date;

    return (
        <Grid container spacing={3} style={{ width: "100%" }}>
            <Grid item xs={12} md={4}>
                <div className="top">
                    <Back/>
                    <div>
                        <h1 className="tripname">{tripDetail.tripname}</h1>
                        <h2>{startDate} - {endDate}</h2>
                    </div>
                </div>
                <DailyPlanTabs
                    dailyplans={tripDetail.dailyplans}
                    days={tripDetail.dailyplans.map((item) => item.date)}
                    plans={tripDetail.dailyplans.map((item) => item.plan)}
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
