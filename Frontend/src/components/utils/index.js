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
            "3eccf13250mshdcbf6acba8322dcp17bdd8jsnf6985f9bb63a",
          "X-RapidAPI-Host": "opentripmap-places-v1.p.rapidapi.com",
        },
      }
    );

    return response.data.features;
  } catch (error) {
    console.log(error);
  }
};
