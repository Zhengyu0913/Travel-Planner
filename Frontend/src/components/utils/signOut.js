import axios from "axios";
import {message} from "antd"

export const signOut = async () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  try {
    const response = await axios.post("/api/signout");
    if(response.status >= 200 || response.status < 300){
      message.info("Logout successful!");
    }else{
      throw Error("Logout failed! Please contact to the Administer.")
    }
    return response;
  } catch (error) {
    message.error(error.message);
  }
};
