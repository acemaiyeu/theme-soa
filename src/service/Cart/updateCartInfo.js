import { useDispatch } from "react-redux"; // Import hook useDispatch
import { fetchCart } from "../../store/actions/fetchCartAndProfile"; // Import action fetchCart
import axios from "axios";

// Hàm updateCartInfo cập nhật thông tin giỏ hàng
export const updateCartInfo = async (cart, dispatch) => {
  console.log("cart", cart);
  //   if (!fullname) {
  //     alert("Vui lòng nhập họ tên");
  //     return;
  //   }
  //   if (!user_email) {
  //     alert("Vui lòng nhập email");
  //     return;
  //   }
  //   if (!user_phone) {
  //     alert("Vui lòng nhập số điện thoại");
  //     return;
  //   }
  //   axios
  //     .put(
  //       url_api_v0 +
  //         "updateCartInfo?session_id=" +
  //         localStorage.getItem("sessionId"),
  //       this.state.cart?.data
  //     )
  //     .then((response) => {
  //       // chỗ này gọi fetchCart trong file fetchCartAndProfile
  //       dispatch(fetchCart());
  //       toast.success("Cập nhật thông tin giỏ hàng thành công");
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
};
