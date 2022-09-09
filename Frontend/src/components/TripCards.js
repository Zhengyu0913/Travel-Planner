import * as React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

export default function TripCards(props) {
  const deleteTrip = () => {
    props.onDeleteTrip(props.tripId);
  };

  return (
    <Paper
      sx={{
        p: 2,
        margin: "auto",
        maxWidth: 500,
        flexGrow: 1,
        backgroundColor: (theme) =>
          theme.palette.mode === "dark" ? "#1A2027" : "#fff",
      }}
    >
      <Grid container spacing={2}>
        <Box
          key={props.curItem.id}
          sx={{
            textDecoration: "none",
            underline: "none",
            boxShadow: "none",
          }}
          component={Link}
          to={`/trips/${props.tripId}`}
        >
          <Grid item>
            <ButtonBase sx={{ width: 128, height: 128 }}>
              <Img
                alt="complex"
                src="https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg"
              />
            </ButtonBase>
          </Grid>
        </Box>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography gutterBottom variant="subtitle1" component="div">
                {props.curItem.name}
              </Typography>
              <Typography variant="body2" gutterBottom>
                {props.curItem.date[0] +
                  " To " +
                  props.curItem.date[props.curItem.date.length - 1]}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                ID: {props.curItem.id}
              </Typography>
            </Grid>
            <Grid item>
              {/*<Typography sx={{ cursor: 'pointer' }} variant="body2">*/}
              {/*   Remove*/}
              {/*  todo: add eventListener*/}
              {/*</Typography>*/}
              <Button onClick={deleteTrip}>Remove</Button>
            </Grid>
          </Grid>
          <Grid item>
            <Typography variant="subtitle1" component="div">
              Todo: getPriceHere
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}
