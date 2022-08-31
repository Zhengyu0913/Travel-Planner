import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function DateSelect(props) {
  const trips = props.curTrips;
  let dates = [];

  for (let i = 0; i < trips.length; i++) {
    if (trips[i].name === props.curSelectedTrip) {
      dates = [...trips[i].date];
    }
  }

  const [date, setDate] = React.useState("");

  const handleChange = (event) => {
    setDate(event.target.value);
    props.onDateChange(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Date</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={date}
          label="Date"
          onChange={handleChange}
        >
          {dates.map((item, index) => {
            return (
              <MenuItem key={index} value={item}>
                {item}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Box>
  );
}
