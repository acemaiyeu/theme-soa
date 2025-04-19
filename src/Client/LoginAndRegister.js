import React from "react";
import "./LoginAndRegister.scss";
import logo from "../assets/images/logo2.png";
import { toast } from "react-toastify";
import axios from "axios";
import { register } from "../service/UserService";

const url_api_login = process.env.REACT_APP_URL_API_LOGIN;
class LoginAndRegister extends React.Component {
  state = {
    status: "login",
    password: "",
    confirm_password: "",
    fullname: "",
    email: "@gmail.com",
    phone: "",
  };
  handleChangeForm = () => {
    if (this.state.status === "login") {
      this.setState({ status: "register" });
    } else {
      this.setState({ status: "login" });
    }
  };
  register = () => {
    let { fullname, email, phone, password, confirm_password } = this.state;
    if (
      (email.trim().slice(-10) !== "@gmail.com" &&
        email.trim().slice(-10) !== "@GMAIL.COM") ||
      email.length < 15
    ) {
      toast.warning(
        "Vui lòng nhập email với định dạng  ****@gmail.com. Tối thiểu 15 ký tự"
      );
      return;
    }
    if (fullname.length < 8) {
      toast.warning("Họ và tên tối thiểu phải 8 ký tự");
      return;
    }
    if (phone.length != 10 || phone.slice(0, 1) != "0") {
      toast.warning("Số điện thoại không hợp lệ");
      return;
    }
    if (!this.isValidPassword(password)) {
      toast.warning(
        "Mật khẩu tối thiểu phải 8 ký tự, có ít nhất 1 chữ thường, 1 chữ hoa, 1 số, 1 ký tự đặc biệt"
      );
      return;
    }
    if (password !== confirm_password) {
      toast.warning("Nhập lại mật khẩu không trùng khớp");
      return;
    }
    if (fullname.length < 8) {
      toast.warning("Họ và tên tối thiểu phải 8 ký tự");
      return;
    }
    register({
      fullname: fullname,
      email: email,
      phone: phone,
      password: password,
    });
  };
  isValidPassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    return regex.test(password);
  };

  login = () => {
    if (this.state.username === "" || this.state.password === "") {
      toast.warning("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    axios
      .post(url_api_login, {
        email: this.state.username,
        password: this.state.password,
      })
      .then((response) => {
        localStorage.setItem("token", response.data.access_token);
        localStorage.setItem("expires_in", response.data.expires_in);
        this.props.history.push("/");
        //   .get(url_api_v1 + "profile", {
        //     headers: { Authorization: `Bearer ${response.data.access_token}` },
        //   })
        //   .then((res) => {
        //     if (res.data?.data?.role?.code !== "ADMIN") {
        //       toast.warning("Vui lòng đăng nhập bằng tài khoản admin");
        //       return;
        //     }
        //     this.setState({ data: response.data });
        //     localStorage.setItem("admin_token", response.data.access_token);
        //     localStorage.setItem("expires_in", response.data.expires_in);
        //     this.props.history.push("/admin");
        //   })
        //   .catch((error) => {
        //     console.log(error);
        //     toast.warning("Vui lòng đăng nhập bằng tài khoản admin");
        //   });
        // console.log(response);
      })
      .catch((error) => {
        console.error("Có lỗi khi gọi API:", error);
        toast.warning("Tài khoản và mật khẩu không đúng");
      });
  };

  render() {
    const { status } = this.state;
    return (
      <div className="box-login">
        <div className="login-container">
          {status == "login" ? (
            <>
              <h2>ĐĂNG NHẬP</h2>
              <div>
                <input
                  type="text"
                  placeholder="Tên đăng nhập"
                  name="username"
                  value={this.state.username}
                  onChange={(e) => this.setState({ username: e.target.value })}
                  required
                />
                <input
                  type="password"
                  placeholder="Mật khẩu"
                  name="password"
                  value={this.state.password}
                  onChange={(e) => this.setState({ password: e.target.value })}
                  required
                />
                <button type="submit" onClick={() => this.login()}>
                  Đăng nhập
                </button>
                <a className="forgot" onClick={() => this.handleChangeForm()}>
                  Đăng ký
                </a>
                <a className="forgot" href="/forgot">
                  Quên mật khẩu?
                </a>
              </div>
            </>
          ) : (
            <>
              <h2>ĐĂNG KÝ</h2>
              <div>
                <input
                  type="text"
                  placeholder="Email đăng nhập"
                  name="email"
                  value={this.state.email}
                  onChange={(e) => this.setState({ email: e.target.value })}
                  required
                />
                <input
                  type="text"
                  placeholder="Họ và tên"
                  name="fullname"
                  value={this.state.fullname}
                  onChange={(e) => this.setState({ fullname: e.target.value })}
                  required
                />
                <input
                  type="text"
                  placeholder="Số điện thoại"
                  name="phone"
                  value={this.state.phone}
                  onChange={(e) => this.setState({ phone: e.target.value })}
                  required
                />
                <input
                  type="password"
                  placeholder="Mật khẩu"
                  name="password"
                  value={this.state.password}
                  onChange={(e) => this.setState({ password: e.target.value })}
                  required
                />
                <input
                  type="password"
                  placeholder="Nhập lại mật khẩu"
                  name="password"
                  value={this.state.confirm_password}
                  onChange={(e) =>
                    this.setState({ confirm_password: e.target.value })
                  }
                  required
                />
                <button type="submit" onClick={() => this.register()}>
                  Đăng ký
                </button>
                <a className="forgot" onClick={() => this.handleChangeForm()}>
                  Đăng nhập
                </a>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }
}
export default LoginAndRegister;
