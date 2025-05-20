import axios from "axios";
import { API_URL } from "../../config";

const api_url_v1 = process.env.REACT_APP_URL_API_V0;

export const getListCategory = (params = "") => {
  return axios
    .get(api_url_v1 + "categories?limit=" + params, {
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
export const getCategoryByLink = (link, params) => {
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

export const getDetailCategory = (code) => {
  return axios
    .get(API_URL + "/api/v1/category/" + code, {
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

export const createCategory = (category) => {
  return axios
    .post(
      API_URL + "/api/v1/category",
      category, // truyền toàn bộ object coupon
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
export const updateCategory = (category) => {
  return axios
    .put(
      API_URL + "/api/v1/category",
      category, // truyền toàn bộ object coupon
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
export const deleteCategory = (id) => {
  return axios
    .delete(
      API_URL + "/api/v1/delete-category/" + id,

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
