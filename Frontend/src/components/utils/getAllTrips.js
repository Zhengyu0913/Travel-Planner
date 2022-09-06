import axios from "axios";

export const getAllTrips = async () => {
  try {
    const response = await axios.get("/api/alltrips");

    return response.data;
  } catch (error) {
    console.log(error);
  }
};
