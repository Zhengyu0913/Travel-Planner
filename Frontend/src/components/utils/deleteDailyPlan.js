import axios from "axios";

export const deleteDailyPlan = async (tripId) => {
  try {
    const response = await axios.delete(`/api/todo`);

    return response;
  } catch (error) {
    console.log(error);
  }
};
