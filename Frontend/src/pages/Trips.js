import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {getAllDate} from "../components/utils/getAllDate";
import {Stack} from "@mui/system";
import DatePickerFrom from "../components/DatePickerFrom";
import DatePickerTo from "../components/DatePickerTo";
import TripCards from "../components/TripCards";
import Box from "@mui/material/Box";
import FlightIcon from "@mui/icons-material/Flight";
import AddIcon from "@mui/icons-material/Add";
import {CircularProgress, Grid, Typography} from "@mui/material";
import {message} from "antd"

export default function Trips({onAddTrip, curTrips, setTrips, onDeleteTrip}) {
    const [open, setOpen] = useState(false);
    const [tripName, setTripName] = React.useState("");
    const [tripFrom, setTripFrom] = React.useState("");
    const [tripTo, setTripTo] = React.useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        setLoading(true);
        fetch("/api/trips", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => {
                console.log(res);
                if (res.ok) {
                    return res.json();
                } else {
                    let errorMessage = "Get trips failed! Check your internet connection.";
                    if (res.status === 500 || res.status === 403 || res.status === 401) {
                        errorMessage = "Please login first!";
                    }
                    throw Error(errorMessage);
                }
            })
            .then((data) => {
                const newData = data.map((item) => {
                    const dateArr = getAllDate(item.start_date, item.end_date);

                    return {
                        trip_id: item.trip_id,
                        trip_name: item.trip_name,
                        date: dateArr,
                    };
                });
                console.log(newData);
                setTrips(newData);

                // navigate("/explore");
            })
            .catch((err) => {
                message.error(err.message, 3);
                navigate("/signin");
            })
            .finally(()=>{
                setLoading(false);
            });
    }, [setTrips, navigate]);
    const openAddNewTrip = () => {
        setOpen(true);
        console.log("New trip modal open!");
    };
    const handleClose = () => {
        setOpen(false);
    };
    const titleChangeHandler = (e) => {
        console.log(e.target.value);
        setTripName(e.target.value);
    };
    const DateFromChangeHandler = (v) => {
        let newM = `${String(v.$M + 1)}`;
        let newD = `${String(v.$D)}`;
        if (v.$M + 1 <= 9) {
            newM = "0" + `${String(v.$M + 1)}`;
        }
        if (v.$D <= 9) {
            newD = "0" + `${String(v.$D)}`;
        }
        setTripFrom(`${String(v.$y)}-${newM}-${newD}`);
    };
    const DateToChangeHandler = (v) => {
        let newM = `${String(v.$M + 1)}`;
        let newD = `${String(v.$D)}`;
        if (v.$M + 1 <= 9) {
            newM = "0" + `${String(v.$M + 1)}`;
        }
        if (v.$D <= 9) {
            newD = "0" + `${String(v.$D)}`;
        }
        setTripTo(`${String(v.$y)}-${newM}-${newD}`);
    };
    const delay = ms => new Promise(
        resolve => setTimeout(resolve, ms)
    );
    const confirmAddTripHandler = () => {

        console.log(tripFrom, tripTo);
        const dateArr = getAllDate(tripFrom, tripTo);
        console.log(dateArr);
        const tripId = Math.floor(Math.random() * 100000);
        onAddTrip({trip_id: tripId, trip_name: tripName, date: dateArr});
        setOpen(false);
        message.loading("Adding trip...",5);

    };
    return (
        <Box sx={{marginTop: 3}}>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Box
                    sx={{
                        display: {xs: "none", md: "flex"},
                        alignItems: "center",
                        textDecoration: "none",
                        underline: "none",
                        boxShadow: "none",
                        marginRight: 4,
                    }}
                >
                    <FlightIcon fontSize="large" color="primary"></FlightIcon>
                    <Typography variant="h4" color="primary" fontWeight="bold">
                        Trips
                    </Typography>
                </Box>
                <Button
                    onClick={openAddNewTrip}
                    variant="outlined"
                    startIcon={<AddIcon/>}
                >
                    Add New Trip
                </Button>
            </Box>
            {loading ?  (
                    <Box
                        sx={{
                            height: "600px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <CircularProgress size="5rem" />
                    </Box>
                ) : (<Box sx={{flexGrow: 1, marginTop: 5}}>
                <Grid
                    container
                    spacing={{xs: 2, md: 3}}
                    columns={{xs: 4, sm: 8, md: 12}}
                >
                    {curTrips?.map((item, index) => (
                        <Grid item xs={2} sm={4} md={4} key={index}>
                            <TripCards
                                key={index}
                                tripId={item.trip_id}
                                onDeleteTrip={onDeleteTrip}
                                curItem={item}
                            ></TripCards>
                        </Grid>
                    ))}
                </Grid>
            </Box>)}


            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>New Trip</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To add a new trip to this website, please enter your destination and
                        date
                    </DialogContentText>
                    <Stack spacing={2}>
                        <TextField
                            margin="dense"
                            id="name"
                            label="Title"
                            type="email"
                            fullWidth
                            variant="standard"
                            onChange={titleChangeHandler}
                        />
                        <Stack direction="row" spacing={2}>
                            <DatePickerFrom
                                onDateFromChange={DateFromChangeHandler}
                            ></DatePickerFrom>
                            <DatePickerTo onDateToChange={DateToChangeHandler}></DatePickerTo>
                        </Stack>
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={confirmAddTripHandler}>New</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
