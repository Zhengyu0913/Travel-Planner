import axios from "axios";

export const getDailyPlans = async (tripId) => {
  try {
    const response = await axios.get(`/api/trip/${tripId}`);

    return response.data;
  } catch (error) {
    console.log(error);
  }
};
