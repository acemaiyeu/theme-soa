import axios from "axios";
import { toast } from "react-toastify";
import { API_URL } from "../../config";

export const getCoupons = (params) => {
  return axios
    .get(API_URL + "/api/v1/coupons?limit=" + params, {
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
export const getCouponByLink = (link, params) => {
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

export const getDetailCoupon = (code) => {
  return axios
    .get(API_URL + "/api/v1/coupon/" + code, {
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

export const changeStatusCoupon = (coupon_id, status) => {
  return axios
    .put(
      API_URL + "/api/v1/update-coupon",
      {
        id: coupon_id,
        active: status,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("admin_token")}`,
        },
      }
    )
    .then((res) => res.data)
    .catch((err) => {
      console.log(err);
      throw err;
    });
};
export const createCoupon = (coupon) => {
  return axios
    .post(
      API_URL + "/api/v1/create-coupon",
      coupon, // truyền toàn bộ object coupon
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
export const updateCoupon = (coupon) => {
  return axios
    .put(
      API_URL + "/api/v1/update-coupon",
      coupon, // truyền toàn bộ object coupon
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
export const deleteCoupon = (code) => {
  return axios
    .delete(
      API_URL + "/api/v1/delete-coupon/" + code,

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
