import { Box } from "@mui/material";
import { Container } from "@mui/system";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import ActivityDetail from "./pages/ActivityDetail";
import Explore from "./pages/Explore";
import Home from "./pages/Home";
import Place from "./pages/Place";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import TripDetail from "./pages/TripDetail";
import Trips from "./pages/Trips";

function App(props) {
  const [place, setPlace] = useState("");
  const [trips, setTrips] = useState([]);
  const addTripHandler = (item) => {
    setTrips((prevTrips) => prevTrips.concat(item));
  };
  const deleteTripHandler = (name) => {
    setTrips((prevTrips) => prevTrips.filter((item) => item.name != name));
  };
  const placeHandler = (value) => {
    console.log(value);
    setPlace(value);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      <Box>
        <Layout onPlaceChange={placeHandler}></Layout>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          height: 100,
          overflowY: "scroll",
        }}
      >
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route
            path="/explore"
            element={
              <Explore
                curTrips={trips}
                onAddTrip={addTripHandler}
                onDeleteTrip={deleteTripHandler}
              ></Explore>
            }
          ></Route>
          {/*<Route*/}
          {/*  path="/home"*/}
          {/*  element={*/}
          {/*    <Home*/}
          {/*      curTrips={trips}*/}
          {/*      onAddTrip={addTripHandler}*/}
          {/*      onDeleteTrip={deleteTripHandler}*/}
          {/*    ></Home>*/}
          {/*  }*/}
          {/*></Route>*/}
          <Route path="/home/:place" element={<Place></Place>}></Route>
          <Route path="/signin" element={<Signin></Signin>}></Route>
          <Route path="/signup" element={<Signup></Signup>}></Route>
          <Route
            path="/trips"
            element={
              <Trips
                curTrips={trips}
                onAddTrip={addTripHandler}
                onDeleteTrip={deleteTripHandler}
              ></Trips>
            }
          ></Route>
          <Route
            path="/home/:place/:activity"
            element={<ActivityDetail></ActivityDetail>}
          ></Route>
          <Route
            path="/trips/:detail"
            element={<TripDetail></TripDetail>}
          ></Route>
        </Routes>
      </Box>
    </Box>
  );
}

export default App;
