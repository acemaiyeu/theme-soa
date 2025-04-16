import React from "react";
import { url_api_v1 } from "../config";
import axios from "axios";
import "./MyOrders.scss";
import { toast } from "react-toastify";

class MyOrders extends React.Component {
  state = {
    profile: { data: null },
    listOrders: [],
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
  getMyOrders = () => {
    if (localStorage.getItem("token") !== undefined) {
      axios
        .get(url_api_v1 + "my-orders", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        })
        .then((response) => {
          this.setState({ listOrders: response.data?.data });
        })
        .catch((error) => {
          console.error("Có lý khi gọi API get profile:", error);
        });
    }
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
    this.getMyOrders();
  }
  handleViewDetail = (code) => {
    if (code.substring(0, 5) === "DH_20") {
      this.props.history.push("/my-order/" + code);
    } else {
      toast.error("Mã đơn hàng " + code + " không hợp lệ");
    }
  };
  render() {
    let { listOrders } = this.state;
    return (
      <div className="list-orders">
        {listOrders && listOrders.length > 0 ? (
          listOrders.map((item, index) => (
            <div className="list-orders-container" key={index}>
              <h3
                className={
                  item.status.code === "PENDING"
                    ? "--order-status-pending"
                    : item.status === "COMPLETED"
                    ? "--order-status-complete"
                    : "--order-status-cancel"
                }
              >
                {item.status.name}
              </h3>
              {item.details &&
                item.details.length > 0 &&
                item.details.map((detail, detailIndex) => (
                  <div key={detailIndex}>
                    <div
                      className="list-order-item"
                      onClick={() =>
                        this.handleViewDetail("DH_20250412001410687")
                      }
                    >
                      <div className="list-order-header">
                        <div className="list-order-header-img">
                          <img
                            src="https://media.istockphoto.com/id/1177199065/photo/african-lion-and-night-in-africa-banner-savannah-landscape-theme-king-of-animals-proud.jpg?s=612x612&w=0&k=20&c=I6zG27ksq2_4rBjLCN8kQMuiBysPA_rnfurxbGsP8BE="
                            alt="img"
                          />
                        </div>
                        <div className="list-order-header-content">
                          <div className="list-order-header-content-title"></div>
                          <div className="list-order-header-content-type">
                            Framework Laravel
                          </div>
                          <div className="list-order-header-content-number">
                            x1
                          </div>
                        </div>
                        <div className="list-order-header-price">
                          {" "}
                          <span>1.000.000 ₫</span>
                          <div className="btn-box">
                            <button className="btn-default btn-bg-orange-op-5">
                              Mua lại
                            </button>
                            <button className="btn-default">Đánh giá</button>
                          </div>
                        </div>
                      </div>
                      <div className="list-order-bottom"></div>
                    </div>
                  </div>
                ))}
            </div>
          ))
        ) : (
          <div>
            <h1>Vui lòng đăng nhập</h1>
          </div>
        )}
      </div>
    );
  }
}
export default MyOrders;
