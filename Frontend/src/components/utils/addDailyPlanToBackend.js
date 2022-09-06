import axios from "axios";

export const addDailyPlanToBackend = async (plan) => {
  try {
    const response = await axios.post("/api/addplan", {
      params: plan,
    });

    return response;
  } catch (error) {
    console.log(error);
  }
};
