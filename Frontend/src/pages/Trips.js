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

    console.log(JSON.stringify({ name: tripName, date: dateArr })); //发送给后端
    setOpen(false);
  };
  return (
    <>
      <h1>Trips</h1>

      <Button onClick={openAddNewTrip}>Add new trip</Button>
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
      <ul>
        {props.curTrips?.map((item, index) => {
          return (
            <Link to={`/trips/${item.name}`} key={index}>
              <li>{item.name}</li>
            </Link>
          );
        })}
      </ul>
    </>
  );
}
