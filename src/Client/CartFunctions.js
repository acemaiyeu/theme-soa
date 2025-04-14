import { url_api_v0 } from "../config";
import axios from "axios";

export const addToCart = (theme_id) => {
  let token = localStorage.getItem("token");
  axios
    .post(
      url_api_v0 + "addToCart",
      {
        session_id: localStorage.getItem("sessionId"),
        theme_id: theme_id,
        quantity: 1,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    )

    .then((response) => {
      this.setState({ cart: response.data });
      localStorage.setItem("cart", response.data);
    })
    .catch((error) => {
      console.error("Có lỗi khi gọi API addToCart:", error);
    });
};
