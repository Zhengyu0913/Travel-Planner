import axios from "axios";

export const addTripToBackend = async (trip) => {
  try {
    const response = await axios.post("/api/trip", trip);
    return response;
  } catch (error) {
    console.log(error);
  }
};
