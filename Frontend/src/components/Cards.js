import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DatePickerFrom from "./DatePickerFrom";
import DatePickerTo from "./DatePickerTo";
import { Stack } from "@mui/system";
import TripSelect from "./TripSelect";
import DateSelect from "./DateSelect";
import TimeSelect from "./TimeSelect";
import { getAllDate } from "./utils/getAllDate";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { AuthContext } from "../context/auth-context";
import { useNavigate } from "react-router-dom";

import { addDailyPlanToBackend } from "./utils/addDailyPlanToBackend";
import { message } from "antd";

export default function Cards({
  refProp,
  selected,
  placeName,
  placeId,
  availableTrips,
  addTrip,
  deleteTrip,
  img,
  website,
  addressRoad,
  addressState,
  addressCountry,
  addressCity,
  placeLat,
  placeLng,
}) {
  if (selected)
    refProp?.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  const [open, setOpen] = React.useState(false);
  const [openDailyPlan, setOpenDailyPlan] = React.useState(false);
  const [tripName, setTripName] = React.useState("");
  const [tripFrom, setTripFrom] = React.useState("");
  const [tripTo, setTripTo] = React.useState("");
  const [currentSelectedTrip, setCurrentSelectedTrip] = React.useState("");
  const [currentSelectedDate, setCurrentSelectedDate] = React.useState("");
  const [currentSelectedTimeSlot, setCurrentSelectedTimeSlot] =
    React.useState("");
  const authCtx = React.useContext(AuthContext);
  const navigate = useNavigate();
  const timeSlotChangeHandler = (v) => {
    setCurrentSelectedTimeSlot(v);
  };

  const dateChangeHandler = (v) => {
    setCurrentSelectedDate(v);
  };
  const tripChangeHandler = (v) => {
    console.log(v);
    setCurrentSelectedTrip(v);
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

  const titleChangeHandler = (e) => {
    console.log(e.target.value);
    setTripName(e.target.value);
  };
  const confirmAddTripHandler = () => {
    console.log(tripFrom, tripTo);
    if (tripFrom > tripTo) {
      message.error("Invalid date");
      return;
    }
    const dateArr = getAllDate(tripFrom, tripTo);
    console.log(dateArr);
    const tripId = Math.floor(Math.random() * 100000);
    addTrip({ trip_id: tripId, trip_name: tripName, date: dateArr });

    console.log(JSON.stringify({ name: tripName, date: dateArr })); //发送给后端
    setOpen(false);
    message.loading("Adding trip...", 5);
  };

  const confirmAddDailyPlanHandler = () => {
    message.loading("Adding daily plan to trip...", 3);
    const dailyPlan = {
      trip_id: currentSelectedTrip,
      place_entry_name: placeName,
      rapid_place_id: placeId,
      date: currentSelectedDate,
      time_block: currentSelectedTimeSlot,
      latitude: placeLat,
      longitude: placeLng,
    };
    addDailyPlanToBackend(dailyPlan)
      // .then((res) => {
      //   if (res.status >= 200 || res.status < 300) {
      //     message.success("Add daily plan success!",3)
      //     return res.json();
      //   } else {
      //     console.log(res);
      //     let errorMessage = "Add daily plan failed!";
      //     throw Error(errorMessage);
      //   }
      // })
      .then((data) => {
        console.log(data);
        if (data.status >= 200 || data.status < 300) {
          message.success("Add daily plan success!", 3);
        } else {
          let errorMessage = "Add daily plan failed!";
          throw Error(errorMessage);
        }
      })
      .catch((err) => {
        message.error(err.message, 3);
      });
    console.log(JSON.stringify(dailyPlan)); //发送给后端
    setOpenDailyPlan(false);
  };
  const handleClose = () => {
    setOpen(false);
    setOpenDailyPlan(false);
  };
  const openAddNewTrip = () => {
    setOpen(true);
    console.log("New trip modal open!");
  };
  const openAddDailyPlan = () => {
    console.log("Daily plan modal open!");
    setOpenDailyPlan(true);
  };
  const addTripHandler = () => {
    // if (!authCtx.isLoggedIn) {
    //   navigate("/signin");
    // } else {
    //   getAllTrips().then((trips) => {
    //     if (trips.length === 0) {
    //       console.log("Please add a new trip first");
    //       openAddNewTrip();
    //     } else {
    //       openAddDailyPlan();
    //     }
    //   });
    // }
    if (availableTrips.length === 0) {
      console.log("Please add a new trip first");
      openAddNewTrip();
    } else {
      openAddDailyPlan();
    }
  };
  return (
    <div>
      <Card elevation={6}>
        <CardMedia
          component="img"
          alt="green iguana"
          height="350"
          image={img}
        ></CardMedia>
        <CardContent>
          <Typography gutterBottom variant="h5" sx={{ marginBottom: "20px" }}>
            {placeName}
          </Typography>
          {
            <Typography
              color="textSecondary"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
              component="div"
            >
              <LocationOnIcon />
              <Typography gutterBottom variant="body2" color="textSecondary">
                {addressRoad + " , " + addressCity + " , " + addressState}
              </Typography>
            </Typography>
          }
        </CardContent>
        <CardActions>
          <Button
            size="small"
            variant="outlined"
            onClick={() => window.open(website, "_blank")}
          >
            Learn More
          </Button>
          <Button size="small" variant="outlined" onClick={addTripHandler}>
            Add to trip
          </Button>
        </CardActions>
      </Card>
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

      <Dialog open={openDailyPlan} onClose={handleClose}>
        <DialogTitle>Daily Plan</DialogTitle>
        <DialogContent>
          <Stack spacing={2}>
            <DialogContentText>
              To add daily plans to a trip, please select your trip and date
            </DialogContentText>

            <TripSelect
              curTrips={availableTrips}
              onTripChange={tripChangeHandler}
            ></TripSelect>
            <DateSelect
              curSelectedTrip={currentSelectedTrip}
              curTrips={availableTrips}
              onDateChange={dateChangeHandler}
            ></DateSelect>
            <TimeSelect onTimeSlotChange={timeSlotChangeHandler}></TimeSelect>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={confirmAddDailyPlanHandler}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
