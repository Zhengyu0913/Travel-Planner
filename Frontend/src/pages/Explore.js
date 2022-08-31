import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import ListPlace from "../components/ListPlace";
import Map from "../components/Map/Map";
import { getPlacesData } from "../components/utils";
import { getPlaceDetails } from "../components/utils/getPlaceDetails";

export default function Explore(props) {
  const [places, setPlaces] = useState([]);
  const [autocomplete, setAutocomplete] = useState(null);
  const [coords, setCoords] = useState({});
  const [bounds, setBounds] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [childClicked, setChildClicked] = useState(null);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoords({ lat: latitude, lng: longitude });
      }
    );
  }, []);
  useEffect(() => {
    if (bounds) {
      setIsLoading(true);
      setPlaces([]); //每次刷新地图时，清空places
      getPlacesData(bounds.sw, bounds.ne).then((data) => {
        const xidArr = data.map((item) => item.properties.xid);
        console.log(xidArr);
        const filteredArr = xidArr.slice(0, 20);
        console.log(filteredArr);

        for (let i = 0; i < filteredArr.length; i++) {
          const id = xidArr[i];

          getPlaceDetails(id).then((res) => {
            console.log(res);
            setPlaces((prev) => {
              return [...prev, res];
            }); //在异步请求里面，state更新时，需要用到前一个状态照片,如果直接更新，状态保持不变
            setIsLoading(false);
          });
        }
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
          isLoading={isLoading}
          childClicked={childClicked}
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
        <Map
          setBounds={setBounds}
          setCoords={setCoords}
          coords={coords}
          places={places}
          setChildClicked={setChildClicked}
        />
      </Grid>
    </Grid>
  );
}
