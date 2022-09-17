import React, { useState } from "react";

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
import Box from "@mui/material/Box";
import FlightIcon from "@mui/icons-material/Flight";
import AddIcon from "@mui/icons-material/Add";
import { Grid, Typography } from "@mui/material";
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
    const tripId = Math.floor(Math.random() * 100000);
    props.onAddTrip({ id: tripId, name: tripName, date: dateArr });
    // addTripToBackend({
    //   id: tripId,
    //   name: tripName,
    //   start: tripFrom,
    //   end: tripTo,
    // })
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
    console.log(
      JSON.stringify({
        id: tripId,
        name: tripName,
        start: tripFrom,
        end: tripTo,
      })
    ); //发送给后端
    setOpen(false);
  };
  return (
    <Box sx={{ marginTop: 3 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
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
          startIcon={<AddIcon />}
        >
          Add New Trip
        </Button>
      </Box>

      <Box sx={{ flexGrow: 1, marginTop: 5 }}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {props.curTrips?.map((item, index) => (
            <Grid item xs={2} sm={4} md={4} key={index}>
              <TripCards
                key={index}
                tripId={item.id}
                onDeleteTrip={props.onDeleteTrip}
                curItem={item}
              ></TripCards>
            </Grid>
          ))}
        </Grid>
      </Box>

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
