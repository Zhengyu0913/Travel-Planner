import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { getAllDate } from "../components/utils/getAllDate";
import { Stack } from "@mui/system";
import DatePickerFrom from "../components/DatePickerFrom";
import DatePickerTo from "../components/DatePickerTo";
import { addTripToBackend } from "../components/utils/addTripToBackend";
import TripCards from "../components/TripCards";
import Box from '@mui/material/Box';
import FlightIcon from '@mui/icons-material/Flight';
import AddIcon from '@mui/icons-material/Add';
import {grid2Classes, Typography} from "@mui/material";
export default function Trips(props) {
  const [open, setOpen] = useState(false);
  const [tripName, setTripName] = React.useState("");
  const [tripFrom, setTripFrom] = React.useState("");
  const [tripTo, setTripTo] = React.useState("");

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
    setTripFrom(`${String(v.$y)}-${String(v.$M + 1)}-${String(v.$D)}`);
  };
  const DateToChangeHandler = (v) => {
    setTripTo(`${v.$y}-${v.$M + 1}-${v.$D}`);
  };
  const confirmAddTripHandler = () => {
    const dateArr = getAllDate(tripFrom, tripTo);
    console.log(props.onAddTrip);
    props.onAddTrip({ name: tripName, date: dateArr });
    // addTripToBackend({ name: tripName, date: dateArr })
    //   .then((res) => {
    //     if (res.ok) {
    //       return res.json();
    //     } else {
    //       return res.json().then((data) => {
    //         let errorMessage = "Add trip failed!";
    //         throw new Error(errorMessage);
    //       });
    //     }
    //   })
    //   .then((data) => {
    //     console.log(data);
    //   })
    //   .catch((err) => {
    //     alert(err.message);
    //   });
    console.log(JSON.stringify({ name: tripName, date: dateArr })); //发送给后端
    setOpen(false);
  };
  return (
    <div
    >

      <Box
          sx={{
            display: { xs: "none", md: "flex" },
            alignItems: "center",
            textDecoration: "none",
            underline: "none",
            boxShadow: "none",
          }}
      >
        <FlightIcon fontSize="large" color="primary" ></FlightIcon>
        <Typography variant="h4" color="primary" fontWeight="bold"  >
          Trips
        </Typography>
      </Box>

      {/*<ul>*/}
      {/*  todo: Maybe not need this anymore?*/}
      {/*  {props.curTrips?.map((item, index) => {*/}
      {/*    return (*/}
      {/*      <Link to={`/trips/${item.id}`} key={index}>*/}
      {/*        <li>{item.name}</li>*/}
      {/*      </Link>*/}
      {/*    );*/}
      {/*  })}*/}
      {/*</ul>*/}

      <box>
        {props.curTrips?.map((item) => {
          return (

                <TripCards
                   deleteItem = {props.onDeleteTrip}
                    curItem = {item}

                />

          );
        })}
      </box>
      <div align="center">
            <Button onClick={openAddNewTrip}variant="outlined" startIcon={<AddIcon />}>
              Add New Trip
            </Button>
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
      </div>
    </div>
  );
}
