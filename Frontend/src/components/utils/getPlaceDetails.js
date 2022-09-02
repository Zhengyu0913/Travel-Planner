import axios from "axios";

export const getPlaceDetails = async (xid) => {
  try {
    const response = await axios.get(
      `https://opentripmap-places-v1.p.rapidapi.com/en/places/xid/${xid}`,
      {
        headers: {
          "X-RapidAPI-Key":
            "3eccf13250mshdcbf6acba8322dcp17bdd8jsnf6985f9bb63a",
          "X-RapidAPI-Host": "opentripmap-places-v1.p.rapidapi.com",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
};
