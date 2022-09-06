import { BorderStyleTwoTone } from "@mui/icons-material";
import { Box } from "@mui/material";

import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Layout from "./components/Layout";
import { getAllTrips } from "./components/utils/getAllTrips";
import ActivityDetail from "./pages/ActivityDetail";
import Explore from "./pages/Explore";
import Home from "./pages/Home";
import LandingPage from "./pages/LandingPage";
import Place from "./pages/Place";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import TripDetail from "./pages/TripDetail";
import Trips from "./pages/Trips";

function App(props) {
  const [place, setPlace] = useState("");
  const [trips, setTrips] = useState([
    { id: 1, name: "Boston", date: ["2022-09-06", "2022-09-07", "2022-09-08"] },
    {
      id: 2,
      name: "Chicago",
      date: ["2022-09-12", "2022-09-13", "2022-09-14"],
    },
  ]);
  // const navigate = useNavigate();
  // useEffect(() => {
  //   fetch("/api/getalltrips", {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   })
  //     .then((res) => {
  //       console.log(res);
  //       if (res.ok) {
  //         return res.json();
  //       } else {
  //         return res.json().then((data) => {
  //           let errorMessage = "Get trips failed!";
  //           if (data && data.error && data.error.message) {
  //             errorMessage = data.error.message;
  //           }
  //           throw new Error(errorMessage);
  //         });
  //       }
  //     })
  //     .then((data) => {
  //       setTrips(data);
  //       navigate("/explore");
  //     })
  //     .catch((err) => {
  //       alert(err.message);
  //       console.log(err);
  //       navigate("/signin");
  //     });
  // }, []);
  const addTripHandler = (item) => {
    setTrips((prevTrips) => prevTrips.concat(item));
  };
  const deleteTripHandler = (name) => {
    setTrips((prevTrips) => prevTrips.filter((item) => item.name !== name));
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
          <Route
            path="/home"
            element={
              <Home
                curTrips={trips}
                onAddTrip={addTripHandler}
                onDeleteTrip={deleteTripHandler}
              ></Home>
            }
          ></Route>
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
