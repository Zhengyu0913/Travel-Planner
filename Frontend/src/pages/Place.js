import { Box } from "@mui/system";
import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Card from "../components/Card";
const defaultActivity = [
  { name: "eat", id: 1 },
  { name: "play", id: 2 },
  { name: "stay", id: 3 },
];
export default function Place(props) {
  const [places, setPlaces] = useState(defaultActivity); //在useEffect里面使用setPlaces
  const param = useParams();
  const currentPlace = param.place;
  return (
    <>
      <div>Place:{currentPlace}</div>
      <ul>
        {places.map((item, index) => {
          return (
            <Box key={index}>
              <Link to={`/home/${currentPlace}/${item.name}`}>Go</Link>
              <Card
                key={index}
                placeName={item.name}
                placeId={item.id}
                availableTrips={props.curTrips}
                addTrip={props.onAddTrip}
              ></Card>
            </Box>
          );
        })}
      </ul>
    </>
  );
}
