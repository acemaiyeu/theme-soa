import React from "react";
import "./LoginAndRegister.scss";
import { toast } from "react-toastify";
import axios from "axios";

const url_api_forgotPassword = process.env.REACT_APP_URL_API_FORGOT_PASSWORD;
class forGetPassword extends React.Component {
  state = {
    email: "",
    isLoading: false,
  };

  forGetPassword = () => {
    if (
      (this.state.email.trim().slice(-10) !== "@gmail.com" &&
        this.state.email.trim().slice(-10) !== "@GMAIL.COM") ||
      this.state.email.length < 15
    ) {
      toast.warning("Vui lòng nhập email với định dạng  ****@gmail.com");
      return;
    }
    this.setState({ isLoading: true });

    axios
      .post(url_api_forgotPassword, {
        email: this.state.email,
      })
      .then((response) => {
        toast.success("Mật khẩu đã được gửi vào email của bạn");
        this.setState({ isLoading: false });
      })
      .catch((error) => {
        console.error("Có lỗi khi gọi API:", error);
        toast.warning("Không tìm thấy thông tin!. Vui lòng kiểm tra lại email");
      });
  };

  render() {
    return (
      <div className="box-login">
        <div className="login-container">
          <>
            <h2>Quên mật khẩu</h2>
            <div>
              <input
                type="text"
                placeholder="Nhập email của bạn"
                name="email"
                value={this.state.email}
                onChange={(e) => this.setState({ email: e.target.value })}
                required
              />
              <button type="submit" onClick={() => this.forGetPassword()}>
                {this.state.isLoading ? (
                  <div class="spinner-border text-warning" role="status">
                    <span class="visually-hidden"></span>
                  </div>
                ) : (
                  "Submit"
                )}
              </button>
              <a
                className="forgot"
                href="/login"
                onClick={() => this.handleChangeForm()}
              >
                Đăng nhập
              </a>
            </div>
          </>
        </div>
      </div>
    );
  }
}
export default forGetPassword;
