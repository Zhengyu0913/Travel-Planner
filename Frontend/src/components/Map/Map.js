import React from "react";
import GoogleMapReact from "google-map-react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Box, useMediaQuery } from "@mui/material";

const Map = (props) => {
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
        onChange={(e) => {
          props.setCoords({ lat: e.center.lat, lng: e.center.lng });
          props.setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
        }}
      >
        <div lat={props.coords.lat} lng={props.coords.lng}>
          <LocationOnIcon></LocationOnIcon>
        </div>
      </GoogleMapReact>
    </Box>
  );
};

export default Map;
