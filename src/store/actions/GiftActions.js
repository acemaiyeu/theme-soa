import axios from "axios";
import { API_URL } from "../../config";

const api_url_v1 = process.env.REACT_APP_URL_API_V1;

export const getListGift = (params = "") => {
  return axios
    .get(api_url_v1 + "gifts?limit=" + params, {
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
export const getGiftsByLink = (link, params) => {
  return axios
    .get(link + "&limit=" + params, {
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

export const getDetailGift = (id) => {
  return axios
    .get(API_URL + "/api/v1/gift/" + id, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("admin_token")}`,
      },
    })
    .then((res) => res.data?.data)
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

export const createGift = (gift) => {
  return axios
    .post(
      API_URL + "/api/v1/gift",
      gift, // truyền toàn bộ object coupon
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("admin_token")}`,
        },
      }
    )
    .then((res) => res.data)
    .catch((err) => {
      console.error(err);
      throw err;
    });
};
export const updateGift = (gift) => {
  return axios
    .put(
      API_URL + "/api/v1/gift",
      gift, // truyền toàn bộ object coupon
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("admin_token")}`,
        },
      }
    )
    .then((res) => res.data)
    .catch((err) => {
      console.error(err);
      throw err;
    });
};
export const deleteGift = (id) => {
  return axios
    .delete(
      API_URL + "/api/v1/delete-gift/" + id,

      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("admin_token")}`,
        },
      }
    )
    .then((res) => res.data)
    .catch((err) => {
      console.error(err);
      throw err;
    });
};
