import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function TripSelect(props) {
  const [trip, setTrip] = React.useState("");

  const handleChange = (event) => {
    setTrip(event.target.value);
    props.onTripChange(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Trip</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={trip}
          label="Trip"
          onChange={handleChange}
        >
          {props.curTrips?.map((item, index) => {
            console.log(item);
            return (
              <MenuItem key={index} value={item.trip_id}>
                {item.trip_name}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Box>
  );
}
