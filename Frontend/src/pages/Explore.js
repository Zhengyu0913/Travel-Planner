import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import ListPlace from "../components/ListPlace";
import Map from "../components/Map/Map";
import { getPlacesData } from "../components/utils";

export default function Explore(props) {
  const [places, setPlaces] = useState([]);
  const [autocomplete, setAutocomplete] = useState(null);
  const [coords, setCoords] = useState({});
  const [bounds, setBounds] = useState(null);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoords({ lat: latitude, lng: longitude });
      }
    );
  }, []);
  useEffect(() => {
    if (bounds) {
      getPlacesData(bounds.sw, bounds.ne).then((data) => {
        setPlaces(
          data.filter(
            (place) => place.properties.name && place.properties.rate > 1
          )
        );
      });
    }
  }, [bounds]);
  const onLoad = (autoC) => setAutocomplete(autoC);
  const onPlaceChanged = () => {
    const lat = autocomplete.getPlace().geometry.location.lat();
    const lng = autocomplete.getPlace().geometry.location.lng();

    setCoords({ lat, lng });
  };

  return (
    <Grid container spacing={3} style={{ width: "100%" }}>
      <Grid item xs={12} md={4}>
        <ListPlace
          onPlaceChanged={onPlaceChanged}
          onLoad={onLoad}
          places={places}
          availableTrips={props.curTrips}
          addTrip={props.onAddTrip}
          deleteTrip={props.onDeleteTrip}
        />
      </Grid>
      <Grid
        item
        xs={12}
        md={8}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Map setBounds={setBounds} setCoords={setCoords} coords={coords} />
      </Grid>
    </Grid>
  );
}
