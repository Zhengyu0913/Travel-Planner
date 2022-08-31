import axios from "axios";

export const getPlacesData = async (sw, ne) => {
  try {
    const response = await axios.get(
      "https://opentripmap-places-v1.p.rapidapi.com/en/places/bbox",
      {
        params: {
          lon_max: ne.lng,
          lat_min: sw.lat,
          lon_min: sw.lng,
          lat_max: ne.lat,
        },
        headers: {
          "X-RapidAPI-Key":
            "49f126bbc9msh190389345e39f94p169545jsn16d38e4e9344",
          "X-RapidAPI-Host": "opentripmap-places-v1.p.rapidapi.com",
        },
      }
    );

    console.log(response.data.features, "from util");
    return response.data.features;
  } catch (error) {
    console.log(error);
  }
};
