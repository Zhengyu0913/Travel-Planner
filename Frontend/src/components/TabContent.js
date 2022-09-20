import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import React, { useState } from "react";

export default function TabContent(props) {
  const deleteHandler = (id) => {
    props.onDelete(id);
  };
  const getCoordsHandler = (point) => {
    props.getCoords(point);
  };
  console.log(props.plan);
  return (
    // <ul>
    //   {props.plan.map((item, index) => (
    //     <li key={index}>
    //       {item.placeId + " , " + item.placeName + " , " + item.time_block}
    //     </li>
    //   ))}
    // </ul>
    <Box>
      <Box>
        <Typography variant="h5" component="div" sx={{ mb: 1 }}>
          Breakfast
        </Typography>
        {props.plan
          .filter((item, index) => item.time_block === "BREAKFAST")
          .map((item, index) => (
            <Card
              sx={{ minWidth: 275, mb: 3, ":hover": { boxShadow: 3 } }}
              style={{ display: "flex", flexDirection: "row" }}
            >
              <CardActions>
                <IconButton
                  aria-label="location"
                  color="primary"
                  onClick={() =>
                    getCoordsHandler({ lat: item.lat, lng: item.lng })
                  }
                >
                  <AddLocationIcon />
                </IconButton>
              </CardActions>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h5">{item.place_entry_name}</Typography>
              </CardContent>
              <CardActions>
                <IconButton
                  aria-label="delete"
                  onClick={() => deleteHandler(item.place_entry_id)}
                >
                  <DeleteIcon />
                </IconButton>
              </CardActions>
            </Card>
          ))}
      </Box>
      <Box>
        <Typography variant="h5" component="div" sx={{ mb: 1 }}>
          Lunch
        </Typography>
        {props.plan
          .filter((item, index) => item.time_block === "LUNCH")
          .map((item, index) => (
            <Card
              sx={{ minWidth: 275, mb: 3, ":hover": { boxShadow: 3 } }}
              style={{ display: "flex", flexDirection: "row" }}
            >
              <CardActions>
                <IconButton
                  aria-label="location"
                  color="primary"
                  onClick={() =>
                    getCoordsHandler({ lat: item.lat, lng: item.lng })
                  }
                >
                  <AddLocationIcon />
                </IconButton>
              </CardActions>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h5">{item.place_entry_name}</Typography>
              </CardContent>
              <CardActions>
                <IconButton
                  aria-label="delete"
                  onClick={() => deleteHandler(item.place_entry_id)}
                >
                  <DeleteIcon />
                </IconButton>
              </CardActions>
            </Card>
          ))}
      </Box>
      <Box>
        <Typography variant="h5" component="div" sx={{ mb: 1 }}>
          Dinner
        </Typography>
        {props.plan
          .filter((item, index) => item.time_block === "DINNER")
          .map((item, index) => (
            <Card
              sx={{ minWidth: 275, mb: 3, ":hover": { boxShadow: 3 } }}
              style={{ display: "flex", flexDirection: "row" }}
            >
              <CardActions>
                <IconButton
                  aria-label="location"
                  color="primary"
                  onClick={() =>
                    getCoordsHandler({ lat: item.lat, lng: item.lng })
                  }
                >
                  <AddLocationIcon />
                </IconButton>
              </CardActions>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h5">{item.place_entry_name}</Typography>
              </CardContent>
              <CardActions>
                <IconButton
                  aria-label="delete"
                  onClick={() => deleteHandler(item.place_entry_id)}
                >
                  <DeleteIcon />
                </IconButton>
              </CardActions>
            </Card>
          ))}
      </Box>
    </Box>
  );
}
