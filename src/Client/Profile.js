import React from "react";
import "./Profile.scss";
import { connect } from "react-redux";
import {
  fetchProfile,
  updateProfile,
  changePassword,
} from "../store/actions/fetchCartAndProfile";
import { toast } from "react-toastify";

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
    this.setState({ profile: this.props.profile });
  };
  handleChange = (e) => {
    if (e.target.name === "fullname") {
      this.setState({
        profile: {
          data: {
            ...this.state.profile.data,
            fullname: e.target.value,
          },
        },
      });
    }
    if (e.target.name === "email") {
      this.setState({
        profile: {
          data: {
            ...this.state.profile.data,
            email: e.target.value,
          },
        },
      });
    }
    if (e.target.name === "phone") {
      this.setState({
        profile: {
          data: {
            ...this.state.profile.data,
            phone: e.target.value,
          },
        },
      });
    }
    if (e.target.name === "password") {
      this.setState({
        changePassword: {
          ...this.state.changePassword,
          password: e.target.value,
        },
      });
    }
    if (e.target.name === "password_new") {
      this.setState({
        changePassword: {
          ...this.state.changePassword,
          password_new: e.target.value,
        },
      });
    }
    if (e.target.name === "confirm_password_new") {
      this.setState({
        changePassword: {
          ...this.state.changePassword,
          confirm_password_new: e.target.value,
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
  componentDidUpdate(prevProps) {
    if (prevProps.profile !== this.props.profile && this.props.profile?.data) {
      const profile = this.props.profile;
      this.setState({
        profile,
      });
    }
  }
  handleUpdateProfile = () => {
    this.props.updateProfile(this.state.profile.data);
  };
  changePassword = () => {
    let { changePassword } = this.state;

    if (!this.isValidPassword(changePassword.password_new)) {
      toast.warning(
        "Mật khẩu tối thiểu phải 8 ký tự, có ít nhất 1 chữ thường, 1 chữ hoa, 1 số, 1 ký tự đặc biệt"
      );
      return;
    }
    if (changePassword.password_new !== changePassword.confirm_password_new) {
      toast.warning("Nhập lại mật khẩu không trùng khớp");
      return;
    }
    this.props.changePassword(changePassword);
  };
  isValidPassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    return regex.test(password);
  };
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
                    <button
                      className="btn-default btn-bg-orange-op-5"
                      onClick={() => this.handleUpdateProfile()}
                    >
                      Lưu
                    </button>
                    <a href onClick={() => this.handleChangePassword()}>
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
                    <button
                      className="btn-default btn-bg-orange-op-5"
                      onClick={() => this.changePassword()}
                    >
                      Đổi mật khẩu
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
const mapStateToProps = (state) => ({
  profile: state.profile,
});
const mapDispatchToProps = (dispatch) => ({
  getProfile: () => dispatch(fetchProfile()),
  updateProfile: (user) => dispatch(updateProfile(user)),
  changePassword: (changePassword_data) =>
    dispatch(changePassword(changePassword_data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
