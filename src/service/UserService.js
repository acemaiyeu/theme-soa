import { url_api_logout, url_api_register, 
  
 } from "../config";
import axios from "axios";
export const logout = () => {
  axios
    .post(
      url_api_logout,
      {},
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    )
    .then((response) => {
      localStorage.removeItem("token");
      this.getProfile();
    })
    .catch((error) => {
      console.error("Có lý khi gọi API logout:", error);
    });
};
export const register = () => {
  axios
    .post(url_api_register, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
    .then((response) => {
      localStorage.removeItem("token");
      this.getProfile();
    })
    .catch((error) => {
      console.error("Có lý khi gọi API logout:", error);
    });
};
