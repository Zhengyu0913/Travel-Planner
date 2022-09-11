import React from "react";
import GoogleMapReact from "google-map-react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Box, Paper, Typography, useMediaQuery } from "@mui/material";
import mapStyles from "./mapStyles";

const TripDetailMap = (props) => {
  const matches = useMediaQuery("(min-width:600px)");
  return (
    <Box
      sx={{
        height: "85vh",
        width: "100%",
      }}
    >
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyDDG5O-kpOu3yi62M1RXWdw587g0qe6wo0" }}
        center={props.coords}
        defaultZoom={14}
        margin={[50, 50, 50, 50]}
        options={{
          disableDefaultUI: true,
          zoomControl: true,
          styles: mapStyles,
        }}
      >
          <Box lat={props.coords.lat} lng={props.coords.lng}>
              <LocationOnIcon></LocationOnIcon>
          </Box>
      </GoogleMapReact>
    </Box>
  );
};

export default TripDetailMap;
