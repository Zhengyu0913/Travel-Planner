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
  const [isFound, setIsFound] = useState(false);
  const [childClicked, setChildClicked] = useState(null);
  const [type, setType] = useState("interesting_places");
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [rating, setRating] = useState("");
  // useEffect(() => {
  //   const filtered = places.filter(
  //     (place) => Number(place.rate.replace(/[^\d.]/g, "")) > rating
  //   );

  //   setFilteredPlaces(filtered);
  // }, [rating]);
  // useEffect(() => {
  //   const filtered = places.filter((place) => place.kinds.includes(type));

  //   setFilteredPlaces(filtered);
  // }, [type]);
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
        const filteredData = data.filter((item) => {
          return item.properties.kinds.includes(type);
        });
        const xidArr = filteredData.map((item) => item.properties.xid);

        const filteredArr = xidArr.slice(0, 20);
        console.log(filteredArr);
        if (filteredArr.length === 0) {
          setIsFound(false);
          setIsLoading(false);
        }

        for (let i = 0; i < filteredArr.length; i++) {
          const id = xidArr[i];

          getPlaceDetails(id).then((res) => {
            console.log(res);
            setPlaces((prev) => {
              return [...prev, res];
            }); //在异步请求里面，state更新时，需要用到前一个状态照片,如果直接更新，状态保持不变
            setFilteredPlaces([]);
            setRating("");
            setIsLoading(false);
            setIsFound(true);
          });
        }
      });
    }
  }, [bounds, type]);
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
          places={filteredPlaces.length ? filteredPlaces : places}
          setPlaces={setPlaces}
          availableTrips={props.curTrips}
          addTrip={props.onAddTrip}
          deleteTrip={props.onDeleteTrip}
          isLoading={isLoading}
          childClicked={childClicked}
          type={type}
          setType={setType}
          rating={rating}
          setRating={setRating}
          isFound={isFound}
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
          places={filteredPlaces.length ? filteredPlaces : places}
          setChildClicked={setChildClicked}
        />
      </Grid>
    </Grid>
  );
}
