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
export const deleteDailyPlanByTimeBlock = async (daily_plan_id, time_block) => {
  try {
    const response = await axios.delete(`/api/daily_plan/${daily_plan_id}/place_entry/${time_block}`);
    console.log(response)
    return response;
  } catch (error) {
    console.log(error);
  }
};
export const deleteDailyPlanByDay = async (daily_plan_id) => {
  try {
    console.log(daily_plan_id);
    const response = await axios.delete(`/api/daily_plan/${daily_plan_id}/place_entry`);
    console.log(response)
    return response;
  } catch (error) {
    console.log(error);
  }
};

