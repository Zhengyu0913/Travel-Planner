import axios from "axios";

export const deleteDailyPlan = async (tripId) => {
  try {
    const response = await axios.delete(`/api/place/${tripId}`);
    console.log(response)
    return response;
  } catch (error) {
    console.log(error);
  }
};
