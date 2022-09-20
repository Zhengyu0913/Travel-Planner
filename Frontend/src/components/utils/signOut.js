import axios from "axios";

export const signOut = async () => {
  try {
    const response = await axios.post("/api/signout");

    return response;
  } catch (error) {
    console.log(error);
  }
};
