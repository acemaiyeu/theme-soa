import React from "react";
import { url_api_v1 } from "../config";
import axios from "axios";
import "./Profile.scss";

class Profile extends React.Component {
  state = {
    profile: { data: null },
    changePassword: {
      password: "",
      password_new: "",
      confirm_password_new: "",
    },
    isChangePassword: false,
  };
  getProfile = () => {
    axios
      .get(url_api_v1 + "profile", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        this.setState({ profile: response.data });
      })
      .catch((error) => {
        console.error("Có lý khi gọi API get profile:", error);
      });
  };
  handleChange = (e) => {
    if (e.target.name === "fullname") {
      this.setState({
        profile: {
          data: {
            fullname: e.target.value,
          },
        },
      });
    }
    if (e.target.name === "email") {
      this.setState({
        profile: {
          data: {
            email: e.target.value,
          },
        },
      });
    }
    if (e.target.name === "phone") {
      this.setState({
        profile: {
          data: {
            phone: e.target.value,
          },
        },
      });
    }
  };
  handleChangePassword = () => {
    this.setState({
      isChangePassword: !this.state.isChangePassword,
    });
  };
  componentDidMount() {
    this.getProfile();
  }

  render() {
    return (
      <>
        {this.state.profile.data ? (
          <>
            {!this.state.isChangePassword ? (
              <div className="profile-container">
                <div className="profile-box">
                  <div className="form-control-profile">
                    <label>Họ và tên</label>
                    <input
                      type="text"
                      value={this.state.profile.data.fullname ?? ""}
                      placeholder="Nhập họ và tên"
                      name="fullname"
                      onChange={(e) => this.handleChange(e)}
                    />
                  </div>
                  <div className="form-control-profile">
                    <label>Email</label>
                    <input
                      name="email"
                      type="email"
                      value={this.state.profile.data.email ?? ""}
                      placeholder="Nhập email (dùng để đăng nhập vào hệ thống)"
                      onChange={(e) => this.handleChange(e)}
                    />
                  </div>
                  <div className="form-control-profile">
                    <label>Số điện thoại: </label>
                    <input
                      name="phone"
                      type="tel"
                      value={this.state.profile.data.phone ?? ""}
                      onChange={(e) => this.handleChange(e)}
                      placeholder="Nhập số điện thoại"
                    />
                  </div>
                  {/* <div className="form-control-profile">
                <label>Giới tính</label>
                <div className="radio-box">
                  <input type="radio" name="gender" value={true} /> &nbsp; Nam
                  <input type="radio" name="gender" value={false} /> &nbsp; Nữ
                </div>
              </div> */}
                  <div className="form-control-profile">
                    <button className="btn-default btn-bg-orange-op-5">
                      Lưu
                    </button>
                    <a onClick={() => this.handleChangePassword()}>
                      Đổi mật khẩu
                    </a>
                  </div>
                </div>
              </div>
            ) : (
              <div className="profile-container">
                <div className="profile-box">
                  <i
                    class="bi bi-arrow-left-square"
                    onClick={() => this.handleChangePassword()}
                  ></i>
                  <h1>ĐỔI MẬT KHẨU</h1>
                  <div className="form-control-profile">
                    <label>Mật khẩu cũ:</label>
                    <input
                      type="password"
                      value={this.state.changePassword.password ?? ""}
                      placeholder="Nhập mật khẩu cũ"
                      name="password"
                      onChange={(e) => this.handleChange(e)}
                    />
                  </div>
                  <div className="form-control-profile">
                    <label>Mật khẩu mới:</label>
                    <input
                      name="password_new"
                      type="password"
                      value={this.state.changePassword.password_new ?? ""}
                      placeholder="Nhập mật khẩu mới"
                      onChange={(e) => this.handleChange(e)}
                    />
                  </div>
                  <div className="form-control-profile">
                    <label>Nhập lại mật khẩu: </label>
                    <input
                      name="confirm_password_new"
                      type="password"
                      value={
                        this.state.changePassword.confirm_password_new ?? ""
                      }
                      onChange={(e) => this.handleChange(e)}
                      placeholder="Nhập lại mật khẩu mới"
                    />
                  </div>
                  {/* <div className="form-control-profile">
              <label>Giới tính</label>
              <div className="radio-box">
                <input type="radio" name="gender" value={true} /> &nbsp; Nam
                <input type="radio" name="gender" value={false} /> &nbsp; Nữ
              </div>
            </div> */}
                  <div className="form-control-profile">
                    <button className="btn-default btn-bg-orange-op-5">
                      Lưu
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          <div>
            <h1>Vui lòng đăng nhập</h1>
          </div>
        )}
      </>
    );
  }
}
export default Profile;
