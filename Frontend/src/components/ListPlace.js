import React, { useState, useEffect, createRef } from "react";
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  CircularProgress,
  Divider,
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

import { Autocomplete } from "@react-google-maps/api";

import Cards from "./Cards";
import MenuIcon from "@mui/icons-material/Menu";

import DirectionsIcon from "@mui/icons-material/Directions";
import NotFound from "../pages/NotFound";
const List = ({
  type,
  places,
  onPlaceChanged,
  onLoad,
  setPlaces,
  availableTrips,
  addTrip,
  deleteTrip,
  isLoading,
  childClicked,
  setType,
  isFound,
  rating,
  setRating,
}) => {
  const [elRefs, setElRefs] = useState([]);

  useEffect(() => {
    setElRefs((refs) =>
      Array(places.length)
        .fill()
        .map((_, i) => refs[i] || createRef())
    );
  }, [places]);

  return (
    <Box
      sx={{
        padding: "25px",
      }}
    >
      <Typography variant="h4" sx={{ marginBottom: "10px" }}>
        Food & Dining around you
      </Typography>
      <Box
        sx={{
          marginY: "30px",
        }}
      >
        <Autocomplete onPlaceChanged={onPlaceChanged} onLoad={onLoad}>
          <Paper
            component="form"
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <IconButton sx={{ p: "10px" }} aria-label="menu">
              <MenuIcon />
            </IconButton>
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search Google Maps"
              inputProps={{ "aria-label": "search google maps" }}
            />
            <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
              <SearchIcon />
            </IconButton>
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <IconButton
              color="primary"
              sx={{ p: "10px" }}
              aria-label="directions"
            >
              <DirectionsIcon />
            </IconButton>
          </Paper>
        </Autocomplete>
      </Box>
      {isLoading ? (
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
      ) : (
        <>
          <Stack direction="row" spacing={2} sx={{ marginY: "30px" }}>
            <FormControl fullWidth variant="standard">
              <InputLabel id="demo-simple-select-label">Type</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={type}
                label="Date"
                onChange={(e) => setType(e.target.value)}
              >
                <MenuItem value="foods">Restaurants</MenuItem>
                <MenuItem value="accomodations">Hotels</MenuItem>
                <MenuItem value="interesting_places">Attractions</MenuItem>
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
                <MenuItem value="">All</MenuItem>
                <MenuItem value="3">Above 3.0</MenuItem>
                <MenuItem value="4">Above 4.0</MenuItem>
                <MenuItem value="4.5">Above 4.5</MenuItem>
              </Select>
            </FormControl>
          </Stack>

          <Grid
            container
            spacing={3}
            sx={{
              height: "75vh",
              overflow: "auto",
            }}
          >
            {places?.map((place, i) => (
              <Grid ref={elRefs[i]} key={i} item xs={12}>
                <Cards
                  refProp={elRefs[i]}
                  selected={Number(childClicked) === i}
                  placeName={place.name}
                  placeId={place.xid}
                  placeLat={place.point.lat}
                  placeLng={place.point.lon}
                  availableTrips={availableTrips}
                  addTrip={addTrip}
                  deleteTrip={deleteTrip}
                  img={
                    place.preview
                      ? place.preview.source
                      : "https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg"
                  }
                  website={place.url ? place.url : "/"}
                  addressRoad={
                    place.address.road ? place.address.road : "Street Not found"
                  }
                  addressState={
                    place.address.state
                      ? place.address.state
                      : "State Not found"
                  }
                  addressCountry={
                    place.address.country
                      ? place.address.country
                      : "Country Not found"
                  }
                  addressCity={
                    place.address.city ? place.address.city : "City Not found"
                  }
                />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </Box>
  );
};

export default List;
