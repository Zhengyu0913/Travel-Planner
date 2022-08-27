import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import ActivityDetail from "./pages/ActivityDetail";
import Home from "./pages/Home";
import Place from "./pages/Place";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Trips from "./pages/Trips";

function App() {
  const [place, setPlace] = useState("");
  const placeHandler = (value) => {
    console.log(value);
    setPlace(value);
  };
  return (
    <div className="App">
      <Layout onPlaceChange={placeHandler}></Layout>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/home" element={<Home></Home>}></Route>
        <Route path="/home/:place" element={<Place></Place>}></Route>
        <Route path="/signin" element={<Signin></Signin>}></Route>
        <Route path="/signup" element={<Signup></Signup>}></Route>
        <Route path="/trips" element={<Trips></Trips>}></Route>
        <Route
          path="/home/:place/:activity"
          element={<ActivityDetail></ActivityDetail>}
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
