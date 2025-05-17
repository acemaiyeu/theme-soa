import axios from "axios";
import { toast } from "react-toastify";
import { API_URL, GET_THEME } from "../../config";

export const getThemes = (type, limit = 1000) => {
  return async (dispatch) => {
    try {
      let params = "";

      const res = await axios.get(
        API_URL + "/api/v0/themes?limit=" + limit + params
      );

      dispatch({
        type: GET_THEME,
        payload: res.data,
      });
      if (res.data?.data.length === 0) {
        toast.warning("Không tìm thấy sản phẩm phù hợp");
      }
      // ✅ Trả kết quả ra ngoài
      return res.data;
    } catch (err) {
      console.log(err);
      // Trả ra lỗi để component xử lý nếu cần
      throw err;
    }
  };
};

export const getThemesForPromotion = async (key_work = "", limit = 1000) => {
  let params = "";
  if (key_work !== "") {
    params += "&code=" + key_work + "&=title" + key_work;
  }
  let res = [];
  try {
    res = await axios.get(API_URL + "/api/v0/themes?limit=" + limit + params);
  } catch (err) {
    console.log(err);
    // Trả ra lỗi để component xử lý nếu cần
    throw err;
  }
  return res?.data?.data;
};
export function convertDateTime(input) {
  const date = new Date(input);
  const pad = (n) => n.toString().padStart(2, "0");

  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());
  const day = pad(date.getDate());
  const month = pad(date.getMonth() + 1);
  const year = date.getFullYear();

  return `${hours}:${minutes}:${seconds} ${day}-${month}-${year}`;
}
export const getThemesByLink = (link, params) => {
  return axios
    .get(link + "" + params, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("admin_token")}`,
      },
    })
    .then((res) => res.data)
    .catch((err) => {
      console.log(err);
      throw err;
    });
};
