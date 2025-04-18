import { toast } from "react-toastify";
import { url_api_logout, url_api_register, url_api_login } from "../config";
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
export const register = ({ fullname, email, phone, password }) => {
  axios
    .post(url_api_register, {
      fullname: fullname,
      email: email,
      phone: phone,
      password: password,
    })
    .then((response) => {
      localStorage.setItem("token", response.data.access_token);
      localStorage.setItem("expires_in", response.data.expires_in);
      toast.success("Đăng ký tài khoảng thành công");
      window.location.href = "/";
      window.location.reload();
    })
    .catch((error) => {
      console.error("Có lý khi gọi API logout:", error);
    });
};
