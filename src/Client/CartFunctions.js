import { toast } from "react-toastify";
import { url_api_v0 } from "../config";
import axios from "axios";

export const addToCart = async (theme_id) => {
  let token = localStorage.getItem("token");
  let result = false; // Mặc định là false

  try {
    const response = await axios.post(
      url_api_v0 + "addToCart",
      {
        session_id: localStorage.getItem("sessionId"),
        theme_id: theme_id,
        quantity: 1,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    localStorage.setItem("cart", response.data);
    toast.success("Thêm vào giỏ hàng thành công");
    result = true; // Nếu thành công, thay đổi result thành true
  } catch (error) {
    console.error("Có lỗi khi gọi API addToCart:", error);
    result = false; // Nếu có lỗi, result là false
  }

  return result; // Trả về kết quả sau khi hoàn thành async
};
