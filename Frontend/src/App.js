import { Box } from "@mui/material";

import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Layout from "./components/Layout";
import { addTripToBackend } from "./components/utils/addTripToBackend";
import { deleteTrip } from "./components/utils/deleteTrip";
import { getAllDate } from "./components/utils/getAllDate";

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
    //向后端发送post请求
    addTripToBackend({
      trip_id: item.trip_id,
      trip_name: item.trip_name,
      start_date: item.date[0],
      end_date: item.date[item.date.length - 1],
    })
      .then((res) => {
        if (res.ok) {
          return res;
        } else {
          return res.then((data) => {
            let errorMessage = "Add trip failed!";
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        alert(err.message);
      });
    console.log(
      JSON.stringify({
        trip_id: item.trip_id,
        trip_name: item.trip_name,
        start_date: item.date[0],
        end_date: item.date[item.date.length - 1],
      })
    ); //发送给后端
    setTrips((prevTrips) => prevTrips.concat(item));
  };
  const deleteTripHandler = (id) => {
    //向后端发送delete 请求
    deleteTrip(id).then((data) => {
      console.log(data);
      // if (data.status === "200") {
      //   alert("Delete successfull");
      // }
    });
    setTrips((prevTrips) => prevTrips.filter((item) => item.trip_id !== id));
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
                setTrips={setTrips}
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
                setTrips={setTrips}
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
