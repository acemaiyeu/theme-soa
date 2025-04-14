import React from "react";
import "./LoginAdmin.scss";
import axios from "axios";
import { url_api_login, url_api_v1 } from "../config";
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";
import { toast } from "react-toastify";
class LoginAdmin extends React.Component {
  state = {
    username: "",
    password: "",
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
        axios
          .get(url_api_v1 + "profile", {
            headers: { Authorization: `Bearer ${response.data.access_token}` },
          })
          .then((res) => {
            if (res.data?.data?.role?.code !== "ADMIN") {
              toast.warning("Vui lòng đăng nhập bằng tài khoản admin");
              return;
            }
            this.setState({ data: response.data });
            localStorage.setItem("admin_token", response.data.access_token);
            localStorage.setItem("expires_in", response.data.expires_in);

            this.props.history.push("/admin");
          })
          .catch((error) => {
            console.log(error);
            toast.warning("Vui lòng đăng nhập bằng tài khoản admin");
          });

        // console.log(response);
      })
      .catch((error) => {
        console.error("Có lỗi khi gọi API:", error);
        toast.warning("Tài khoản và mật khẩu không đúng");
      });
  };
  render() {
    return (
      <div className="box-login">
        <div class="login-container">
          <h2>Đăng nhập Admin</h2>
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
            {/* <a class="forgot" href="#">
              Quên mật khẩu?
            </a> */}
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(LoginAdmin);
