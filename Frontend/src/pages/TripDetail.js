import React, {useEffect, useState} from "react";
import {useParams, useNavigate} from "react-router-dom";
import {getDailyPlans} from "../components/utils/getDailyPlans";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import IconButton from "@mui/material/IconButton";
import {Grid} from "@mui/material";
import DailyPlanTabs from "../components/DailyPlanTabs";
import TripDetailMap from "../components/Map/TripDetailMap";
import {message} from "antd"
import {deleteDailyPlan} from "../components/utils/deleteDailyPlan"

export default function TripDetail() {
    const [tripDetail, setTripDetail] = useState({}); //在useEffect里面call 后端api拿到trip detail
    const [coords, setCoords] = useState({});
    const navigate = useNavigate();
    const param = useParams();
    const currentTrip = param.detail;
    // console.log(currentTrip);

    const deleteDailyPlanHandler = (id) => {
        //发送delete请求
        if (window.confirm(`Are you sure you want to delete it?`)) {
            console.log(id);
            message.loading("Deleting daily plan...", 1);
            deleteDailyPlan(id).then((data) => {
                console.log(data);
                if (data.status >= 200 || data.status < 300) {
                    message.success("Delete Daily plan success.");
                }
            });
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
                    trip_id: prevTrips.trip_id,
                    start_date: prevTrips.start_date,
                    end_date: prevTrips.end_date,
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
        }).catch((err)=>{
            message.error("Please login first!");
            navigate("/signin");
        });
    }, [currentTrip, navigate]);
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
                    <ArrowBackIcon/>
                </IconButton>
            </>
        );
    };
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            ({coords: {latitude, longitude}}) => {
                setCoords({lat: latitude, lng: longitude});
            }
        );
    }, []);
    const startDate = tripDetail.start_date;
    const endDate = tripDetail.end_date;

    return (
        <Grid container spacing={3} style={{width: "100%"}}>
            <Grid item xs={12} md={4}>
                <div className="top">
                    <Back/>
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
                    onDelete={deleteDailyPlanHandler}
                    getCoords={getCoords}
                />
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
                <TripDetailMap coords={coords}/>
            </Grid>
        </Grid>
    );
}
