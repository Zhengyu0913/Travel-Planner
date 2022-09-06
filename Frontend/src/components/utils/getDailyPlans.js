import axios from "axios";

export const getDailyPlans = async (tripId) => {
  try {
    const response = await axios.get("/api/alldailyplans", {
      params: {
        tripId: tripId,
      },
    });

    return response.data;
  } catch (error) {
    console.log(error);
  }
};
