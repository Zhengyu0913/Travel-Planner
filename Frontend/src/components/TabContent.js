import React from "react";

export default function TabContent(props) {
  return (
    <ul>
      {props.plan.map((item, index) => (
        <li key={index}>
          {item.placeId + " , " + item.placeName + " , " + item.timeSlot}
        </li>
      ))}
    </ul>
  );
}
