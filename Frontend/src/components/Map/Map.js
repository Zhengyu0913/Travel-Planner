import React from "react";
import GoogleMapReact from "google-map-react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Box, Paper, Typography, useMediaQuery } from "@mui/material";
import mapStyles from "./mapStyles";

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
        options={{
          disableDefaultUI: true,
          zoomControl: true,
          styles: mapStyles,
        }}
        onChange={(e) => {
          props.setCoords({ lat: e.center.lat, lng: e.center.lng });
          props.setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
        }}
        onChildClick={(child) => props.setChildClicked(child)}
      >
        {props.places.map((place, index) => {
          return (
            <Box
              lat={Number(place.point.lat)}
              lng={Number(place.point.lon)}
              key={index}
              sx={{
                position: "absolute",
                transform: "translate(-50%, -50%)",
                zIndex: 1,
                "&:hover": { zIndex: 2 },
              }}
            >
              {!matches ? (
                <LocationOnIcon></LocationOnIcon>
              ) : (
                <Paper
                  elevation={3}
                  sx={{
                    padding: "10px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    width: "100px",
                  }}
                >
                  <Typography variant="subtitle2" gutterBottom>
                    {place.name}
                  </Typography>
                  <img
                    src={
                      place.preview
                        ? place.preview.source
                        : "https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg"
                    }
                    style={{
                      cursor: "pointer",
                    }}
                    alt="travel_planner"
                  />
                </Paper>
              )}
            </Box>
          );
        })}
      </GoogleMapReact>
    </Box>
  );
};

export default Map;
