import React, { useState, useEffect, createRef } from "react";
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  FormControl,
  Grid,
  IconButton,
  InputBase,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import PlaceDetails from "./PlaceDetails";
import { Autocomplete } from "@react-google-maps/api";
import Card from "./Card";

const List = (props) => {
  const [type, setType] = useState("hotels");
  const [rating, setRating] = useState("");

  return (
    <Box
      sx={{
        padding: "25px",
      }}
    >
      <Typography variant="h4" sx={{ marginBottom: "10px" }}>
        Food & Dining around you
      </Typography>
      <Autocomplete onPlaceChanged={props.onPlaceChanged} onLoad={props.onLoad}>
        <Paper
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: { xs: 200, md: 400 },
            border: "1px solid #ccc",
            borderRadius: 20,
          }}
        >
          <Box>
            <IconButton sx={{ p: "10px" }}>
              <SearchIcon />
            </IconButton>
          </Box>
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search place or activities"
          />
        </Paper>
      </Autocomplete>
      {/* <Stack direction="row" spacing={2} sx={{ marginTop: "10px" }}>
        <FormControl fullWidth variant="standard">
          <InputLabel id="demo-simple-select-label">Type</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={type}
            label="Date"
            onChange={(e) => setType(e.target.value)}
          >
            <MenuItem value="restaurants">Restaurants</MenuItem>
            <MenuItem value="hotels">Hotels</MenuItem>
            <MenuItem value="attractions">Attractions</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth variant="standard">
          <InputLabel id="demo-simple-select-label">Rating</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={rating}
            label="Rating"
            onChange={(e) => setRating(e.target.value)}
          >
            <MenuItem value={0}>All</MenuItem>
            <MenuItem value={3}>Above 3.0</MenuItem>
            <MenuItem value={4}>Above 4.0</MenuItem>
            <MenuItem value={4.5}>Above 4.5</MenuItem>
          </Select>
        </FormControl>
      </Stack> */}
      <Grid
        container
        spacing={3}
        sx={{
          height: "75vh",
          overflow: "auto",
        }}
      >
        {props.places?.map((place, i) => (
          <Grid key={i} item xs={12}>
            <Card
              placeName={place.name}
              placeId={place.xid}
              availableTrips={props.availableTrips}
              addTrip={props.addTrip}
              deleteTrip={props.deleteTrip}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default List;
