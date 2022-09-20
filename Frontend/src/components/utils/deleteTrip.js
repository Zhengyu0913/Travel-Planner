import axios from "axios";

export const deleteTrip = async (tripId) => {
  try {
    const response = await axios.delete(`/api/trip/${tripId}`);

    return response;
  } catch (error) {
    console.log(error);
  }
};
