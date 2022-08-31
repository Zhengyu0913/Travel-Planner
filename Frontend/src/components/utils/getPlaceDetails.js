import axios from "axios";

export const getPlaceDetails = async (xid) => {
  try {
    const response = await axios.get(
      `https://opentripmap-places-v1.p.rapidapi.com/en/places/xid/${xid}`,
      {
        headers: {
          "X-RapidAPI-Key":
            "49f126bbc9msh190389345e39f94p169545jsn16d38e4e9344",
          "X-RapidAPI-Host": "opentripmap-places-v1.p.rapidapi.com",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
};
