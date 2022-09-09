import { Box, Divider, IconButton, Paper, Typography } from "@mui/material";
import React from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import DeleteIcon from "@mui/icons-material/Delete";
export default function TabContent(props) {
  return (
    // <ul>
    //   {props.plan.map((item, index) => (
    //     <li key={index}>
    //       {item.placeId + " , " + item.placeName + " , " + item.timeSlot}
    //     </li>
    //   ))}
    // </ul>
    <Box sx={{ backgroundColor: "#f5f5f5" }}>
      <Box sx={{ marginY: 3 }}>
        <Paper
          sx={{ height: "50px", alignItems: "center", display: "flex" }}
          elevation={0}
        >
          <Typography>Breakfirst</Typography>
        </Paper>
        {props.plan
          .filter((item, index) => item.timeSlot === "breakfirst")
          .map((item, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                marginY: 3,
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "start",

                  alignItems: "center",
                }}
              >
                <IconButton color="primary">
                  <LocationOnIcon></LocationOnIcon>
                </IconButton>

                <Typography key={index} sx={{ marginLeft: 2 }}>
                  {item.placeName}
                </Typography>
              </Box>
              <IconButton>
                <DeleteIcon></DeleteIcon>
              </IconButton>
            </Box>
          ))}
      </Box>

      <Box sx={{ marginY: 3 }}>
        <Paper
          sx={{ height: "50px", alignItems: "center", display: "flex" }}
          elevation={0}
        >
          <Typography>Lunch</Typography>{" "}
        </Paper>
        {props.plan
          .filter((item, index) => item.timeSlot === "lunch")
          .map((item, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                marginY: 3,
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "start",

                  alignItems: "center",
                }}
              >
                <IconButton color="primary">
                  <LocationOnIcon></LocationOnIcon>
                </IconButton>
                <Typography key={index} sx={{ marginLeft: 2 }}>
                  {item.placeName}
                </Typography>
              </Box>
              <IconButton>
                <DeleteIcon></DeleteIcon>
              </IconButton>
            </Box>
          ))}
      </Box>

      <Box sx={{ marginY: 3 }}>
        <Paper
          sx={{ height: "50px", alignItems: "center", display: "flex" }}
          elevation={0}
        >
          <Typography>Dinner</Typography>
        </Paper>
        {props.plan
          .filter((item, index) => item.timeSlot === "dinner")
          .map((item, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                marginY: 3,
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "start",

                  alignItems: "center",
                }}
              >
                <IconButton color="primary">
                  <LocationOnIcon></LocationOnIcon>
                </IconButton>
                <Typography key={index} sx={{ marginLeft: 2 }}>
                  {item.placeName}
                </Typography>
              </Box>
              <IconButton>
                <DeleteIcon></DeleteIcon>
              </IconButton>
            </Box>
          ))}
      </Box>
    </Box>
  );
}
