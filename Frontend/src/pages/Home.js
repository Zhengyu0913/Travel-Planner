import React, { useState } from "react";
import Card from "../components/Card";
const defaultActivity = [
  { name: "eat", id: 1 },
  { name: "play", id: 2 },
  { name: "stay", id: 3 },
];
export default function Home(props) {
  const [activity, setActivity] = useState(defaultActivity);
  return (
    <>
      <h1>Home</h1>
      <ul>
        {activity.map((item, index) => {
          return (
            <Card
              key={index}
              placeName={item.name}
              placeId={item.id}
              availableTrips={props.curTrips}
              addTrip={props.onAddTrip}
              deleteTrip={props.onDeleteTrip}
            ></Card>
          );
        })}
      </ul>
    </>
  );
}
