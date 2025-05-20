import axios from "axios";
import { toast } from "react-toastify";
const url_api_v0 = process.env.REACT_APP_URL_API_V0;
const url_api_v1 = process.env.REACT_APP_URL_API_V1;

// Hàm gọi API lấy thông tin người dùng
const getProfile = async () => {
  try {
    let token;
    const href = window.location.href;
    if (href.includes("/admin")) {
      token = localStorage.getItem("admin_token");
    } else {
      token = localStorage.getItem("token");
    }

    const response = await axios.get(`${url_api_v1}profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    // console.error("Lỗi khi gọi API getProfile:", error);
    return null;
  }
};

// Hàm gọi API lấy giỏ hàng
const getCart = async (retry = true) => {
  try {
    const sessionId = localStorage.getItem("sessionId");
    const response = await axios.get(
      `${url_api_v0}cart?session_id=${sessionId}`
    );

    return response.data;
  } catch (error) {
    console.error("Lỗi khi gọi API getCart:", error);
    return null;
  }
};

// Action async gọi cả cart và profile
export const fetchCartAndProfile = () => {
  return async (dispatch) => {
    try {
      const [cartData, profileData] = await Promise.all([
        getCart(),
        getProfile(),
      ]);

      if (cartData) {
        dispatch({ type: "SET_CART", payload: cartData });
      }
      if (profileData) {
        dispatch({ type: "SET_PROFILE", payload: profileData });
      }
    } catch (error) {
      console.error("Lỗi khi fetchCartAndProfile:", error);
    }
  };
};
export const fetchCart = () => {
  return async (dispatch) => {
    try {
      const cartData = await getCart();
      if (cartData) {
        dispatch({ type: "SET_CART", payload: cartData });
      }
      return cartData; // Trả về cartData sau khi fetch xong
    } catch (error) {
      console.error("Lỗi khi fetchCart:", error);
      throw error;
    }
  };
};
export const fetchProfile = () => {
  return async (dispatch) => {
    try {
      const profileData = await getProfile();
      if (profileData) {
        dispatch({ type: "SET_PROFILE", payload: profileData });
      }
    } catch (error) {
      console.error("Lỗi khi fetchProfile:", error);
    }
  };
};
export const updateProfile = (user) => {
  return async (dispatch) => {
    try {
      axios
        .put(url_api_v1 + "profile", user, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          dispatch({ type: "SET_PROFILE", payload: response.data });
          toast.success("Cập nhật thông tin người dùng thành công");
        })
        .catch((error) => {
          console.log("Lỗi khi cập nhật profile", error);
          toast.error("Lỗi khi update profile");
        });
    } catch (error) {
      console.error("Lỗi khi fetchProfile:", error);
    }
  };
};
export const changePassword = (changePassword) => {
  return async (dispatch) => {
    try {
      axios
        .put(
          url_api_v1 + "change-password",
          {
            password: changePassword.password,
            new_password: changePassword.password_new,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((response) => {
          dispatch({ type: "SET_PROFILE", payload: response.data });
          toast.success("Đổi mật khẩu thành công");
          window.location.reload();
        })
        .catch((error) => {
          // console.log(
          //   "Lỗi khi cập nhật mật khẩu",
          //   error?.response?.data?.error?.message
          // );
          toast.error(error?.response?.data?.error?.message);
        });
    } catch (error) {
      console.error("Lỗi khi fetchProfile:", error);
    }
  };
};
