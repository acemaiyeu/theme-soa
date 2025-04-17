import React from "react";
import "./Cart.scss";
import axios from "axios";
import { url_api_v0 } from "../config";
import { Fragment } from "react";
import { withRouter } from "react-router-dom";
import { toast } from "react-toastify";
import { updateCartInfo } from "../service/Cart/updateCartInfo";
import { connect } from "react-redux";
import {
  fetchCart,
  fetchCartAndProfile,
} from "../store/actions/fetchCartAndProfile";
class Cart extends React.Component {
  state = {
    checkout: [
      { title: "Tổng tiền hàng", value: 100000000 },
      {
        title:
          "Giảm giá 10% khi mua hàng trên 10 triệu, Giảm giá 10% khi mua hàng trên 10 triệu",
        value: -10000000,
      },
      { title: "Thành tiền", value: 90000000 },
    ],
    listDiscounts: [],
    isShowCondition: -1,
    isChecked: false,
  };
  handleChageCondition = (index) => {
    if (this.state.isShowCondition === index) {
      this.setState({
        isShowCondition: -1,
      });
      return;
    }
    this.setState({
      isShowCondition: index,
    });
  };

  handleChangeInputFullname = (e) => {
    this.setState((prevState) => ({
      cart: {
        ...prevState.cart,
        data: {
          ...prevState.cart.data,
          fullname: e.target.value,
        },
      },
    }));
  };

  handleChangeInputEmail = (e) => {
    this.setState((prevState) => ({
      cart: {
        ...prevState.cart,
        data: {
          ...prevState.cart.data,
          user_email: e.target.value,
        },
      },
    }));
  };

  handleChangeInputPhone = (e) => {
    this.setState((prevState) => ({
      cart: {
        ...prevState.cart,
        data: {
          ...prevState.cart.data,
          user_phone: e.target.value,
        },
      },
    }));
  };

  getCart = async () => {
    try {
      // Gọi hàm getCart và đợi nó hoàn thành
      await this.props.getCart();
      let cart = this.props.cart;

      if (cart.data) {
        this.getDiscount();
        this.setState({
          cart,
          fullname: cart?.data?.fullname ?? "",
          email: cart?.data?.user_email ?? "",
          phone: cart?.data?.user_phone ?? "",
        });
        return;
      }

      alert("Không tìm thấy giỏ hàng");
      localStorage.removeItem("cart");
      this.props.history.push("/");
    } catch (error) {
      console.error("Lỗi khi lấy giỏ hàng:", error);
      alert("Có lỗi khi lấy dữ liệu giỏ hàng");
    }
  };
  componentDidMount = () => {
    this.getCart();
  };
  componentDidUpdate(prevProps) {
    if (prevProps.cart !== this.props.cart && this.props.cart?.data) {
      const cart = this.props.cart;
      this.getDiscount();
      this.setState({
        cart,
        fullname: cart.data.fullname ?? "",
        email: cart.data.user_email ?? "",
        phone: cart.data.user_phone ?? "",
      });
    }
  }

  getDiscount = () => {
    axios
      .get(url_api_v0 + "discounts")
      .then((response) => {
        this.setState({ listDiscounts: response.data?.data || [] });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  handleApplyDiscount = (item) => {
    this.setState({
      cart: {
        ...this.state.cart,
        data: {
          ...this.state.cart.data,
          discount_code: item.code,
        },
      },
    });
  };
  handleOnChangeDiscountCart = (e) => {
    this.setState({
      cart: {
        ...this.state.cart,
        data: {
          ...this.state.cart.data,
          discount_code: e.target.value,
        },
      },
    });
  };
  appLyDiscount = () => {
    if (this.state.cart?.data?.discount_code) {
      axios
        .post(url_api_v0 + "add-discount", {
          discount_code: this.state.cart?.data?.discount_code,
          session_id: localStorage.getItem("sessionId"),
        })
        .then((response) => {
          toast.success("Áp dụng mã thành công!");
          axios
            .get(
              url_api_v0 +
                "cart?session_id=" +
                localStorage.getItem("sessionId")
            )
            .then((response) => {
              localStorage.setItem("cart", JSON.stringify(response.data));
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          console.log(error);
          toast.error("Áp dụng mã không thành công!");
        });
    }
    this.setState({
      cart: {
        ...this.state.cart,
        data: {
          ...this.state.cart.data,
          discount_code: "",
        },
      },
    });
  };
  chooseAndAppLyDiscount = (code) => {
    if (code) {
      axios
        .post(url_api_v0 + "add-discount", {
          discount_code: code,
          session_id: localStorage.getItem("sessionId"),
        })
        .then((response) => {
          toast.success("Áp dụng mã thành công!");
          axios
            .get(
              url_api_v0 +
                "cart?session_id=" +
                localStorage.getItem("sessionId")
            )
            .then((response) => {
              localStorage.setItem("cart", JSON.stringify(response.data));
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          console.log(error);
          toast.error("Áp dụng mã không thành công!");
        });
    }
    this.setState({
      cart: {
        ...this.state.cart,
        data: {
          ...this.state.cart.data,
          discount_code: "",
        },
      },
    });
  };
  checkout = () => {
    if (!this.state.cart?.data?.fullname) {
      alert("Vui lòng nhập họ và tên");
      return;
    }
    if (!this.state.cart?.data?.user_email) {
      alert("Vui lòng nhập email");
      return;
    }
    if (!this.state.cart?.data?.user_phone) {
      alert("Vui lòng nhập số điện thoại");
      return;
    }
    axios
      .post(url_api_v0 + "confirm-order", {
        session_id: localStorage.getItem("sessionId"),
        fullname: this.state.cart?.data?.fullname,
        user_email: this.state.cart?.data?.user_email,
        user_phone: this.state.cart?.data?.user_phone,
        id: this.state.cart?.data?.id,
      })
      .then(() => {
        toast.success(
          "Bạn đã đặt hàng thành công, chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất"
        );
        this.props.history.push("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  changePayment = () => {
    // this.setState({ isShowCondition: !this.state.isShowCondition });
  };
  changeTerm = () => {};
  handleUpdateCartInfo = () => {
    updateCartInfo(this.state.cart?.data);
  };
  render() {
    let { listDiscounts, isShowCondition, cart } = this.state;
    return (
      <div className="cart_container">
        <div className="cart-tile">
          <h2>Giỏ hàng</h2>
        </div>
        <div className="cart-contents">
          <div className="user-info">
            <form>
              <label>Họ và tên*: </label>
              <input
                className="input"
                type="text"
                value={this.state.cart?.data?.fullname ?? ""}
                onChange={(e) => this.handleChangeInputFullname(e)}
                placeholder="Họ và tên"
              />
            </form>
            <form>
              <label>Email*: </label>
              <input
                type="email"
                className="input"
                value={this.state.cart?.data?.user_email ?? ""}
                onChange={(e) => this.handleChangeInputEmail(e)}
                placeholder="Email"
              />
            </form>
            <form>
              <label>Số điện thoại*: </label>
              <input
                type="tel"
                className="input"
                value={this.state.cart?.data?.user_phone ?? ""}
                placeholder="Số điện thoại"
                onChange={(e) => this.handleChangeInputPhone(e)}
              />
            </form>
            <button
              className="btn-default btn-bg-orange-op-5"
              onClick={() => this.handleUpdateCartInfo()}
            >
              <i className="bi bi-arrow-repeat"></i>
            </button>
          </div>
          <div className="cart-item-list">
            <div className="cart-item-left">
              <div className="cart-item-theme">
                {/* <div className="cart-item-img">
                  <img
                    alt="img"
                    src="https://media.istockphoto.com/id/1177199065/photo/african-lion-and-night-in-africa-banner-savannah-landscape-theme-king-of-animals-proud.jpg?s=612x612&w=0&k=20&c=I6zG27ksq2_4rBjLCN8kQMuiBysPA_rnfurxbGsP8BE="
                  ></img>
                </div> */}
                <div className="cart-item-content">
                  <table className="table table-cart">
                    <thead>
                      <tr>
                        <th className="col-1">#</th>
                        <th className="col-2">Thumbnail</th>
                        <th className="title-table col-4">Tên</th>
                        <th className="title-table col-2">Số lượng</th>
                        <th className="title-table col-3">Thành tiền</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cart?.data?.details?.map((item, index) => (
                        <tr key={`${item?.id}-${index}`}>
                          <td>{index + 1}</td>
                          <td>
                            <img alt="img" src={item.theme.thumbnail_img}></img>
                          </td>
                          <td className="value-table">{item.theme.title}</td>
                          <td className="value-table">{item.quantity}</td>
                          <td className="value-table">
                            <p className="price-new">{item.total_text}</p>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="list_details">
                    {cart?.data?.details?.map((item, index) => (
                      <div className="list_details_item">
                        <div className="img">
                          <img
                            alt="img"
                            src="https://media.istockphoto.com/id/1177199065/photo/african-lion-and-night-in-africa-banner-savannah-landscape-theme-king-of-animals-proud.jpg?s=612x612&w=0&k=20&c=I6zG27ksq2_4rBjLCN8kQMuiBysPA_rnfurxbGsP8BE="
                          />
                        </div>
                        <div className="list_details_item-info">
                          <div className="list_details_item-header">
                            {item.theme.title}
                          </div>
                          <div className="list_details_item-bottom">
                            <div className="list_details_item-bottom-price">
                              <div className="price">
                                <p className="price-new">{item.total_text}</p>
                              </div>
                            </div>
                            <div className="list_details_item-bottom-number">
                              <div className="listButtonContainer">
                                <div className="listButton">
                                  <button className="btn-default btn-bg-orange-op-5">
                                    <i class="bi bi-dash"></i>
                                  </button>
                                  <span>{item.quantity}</span>
                                  <button
                                    className="btn-default btn-bg-orange-op-5"
                                    onClick={() =>
                                      this.handleChangePage(
                                        this.state.currentPage + 1
                                      )
                                    }
                                  >
                                    <i class="bi bi-plus"></i>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="cart-item-right">
              <div className="checkout-container">
                <div className="discount">
                  <h3> Mã giảm giá</h3>
                  <div className="form-discount">
                    <div>
                      <input
                        className="input"
                        defaultValue={
                          this.state?.cart?.data?.discount_code ?? ""
                        }
                        onChange={(e) => this.handleOnChangeDiscountCart(e)}
                      />
                      <button
                        className="btn-default btn-bg-orange-op-5"
                        onClick={() => this.appLyDiscount()}
                      >
                        Áp dụng
                      </button>
                    </div>
                    {/* <a className="btn btn-info ">Mã giảm giá</a> */}
                    <div className="list-discount">
                      {listDiscounts &&
                        listDiscounts.length > 0 &&
                        listDiscounts.map((item, index) => {
                          return (
                            <Fragment key={index}>
                              <div className="discount-item">
                                <div className="discount-title">
                                  {item.name}
                                  <div className="discount-time">
                                    HSD: {item.end_date}
                                  </div>
                                </div>

                                <div className="button-list">
                                  <button
                                    className="btn-default btn-bg-orange-op-5"
                                    onClick={() =>
                                      this.chooseAndAppLyDiscount(item.code)
                                    }
                                  >
                                    Sử dụng
                                  </button>
                                  <button
                                    className="btn-default btn-bg-blue-op-5"
                                    onClick={() =>
                                      this.handleChageCondition(index)
                                    }
                                  >
                                    Điều kiện
                                    {isShowCondition === index && (
                                      <div className="condition-modal">
                                        <h3>Điều kiện</h3>
                                        <p className="condition-content">
                                          {item.condition_info}
                                        </p>
                                        <i className="bi bi-x-circle"></i>
                                      </div>
                                    )}
                                  </button>
                                </div>
                              </div>
                            </Fragment>
                          );
                        })}
                    </div>
                  </div>

                  {/* <div className="list-discount">
                    <div className="discount-item">
                      <img></img>
                      <div className="discount-content">
                        <div className="discount-title">
                          <div className="button-list">
                            <button className="btn">Áp dụng</button>
                            <button className="btn btn-info">Điều kiện</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div> */}
                </div>
                <div className="checkout-list">
                  <h3>Thông tin thanh toán</h3>
                  {this.state.cart?.data?.info_payment &&
                    this.state.cart?.data?.info_payment.length > 0 &&
                    this.state.cart?.data?.info_payment.map((item, index) => {
                      return (
                        <div className="checkout-item" key={index}>
                          <div className="checkout-title">{item.name_show}</div>
                          <div className="checkout-value price">
                            <span className="price-new">
                              {item.total_price_text}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                </div>
                <div className="method-payment">
                  <h3>Phương thức thanh toán</h3>
                  <div className="payment-contents">
                    <input
                      type="radio"
                      id="check"
                      checked="checked"
                      onChange={() => this.changePayment()}
                    />

                    <img
                      src="https://cdn.haitrieu.com/wp-content/uploads/2022/10/Logo-ZaloPay-Square.png"
                      alt="momo-logo"
                    ></img>
                    <div className="payment-title">Thanh toán bằng Zalopay</div>
                  </div>
                </div>
                <div className="term">
                  <input
                    type="checkbox"
                    id="check"
                    checked="checked"
                    onChange={() => this.changeTerm()}
                  />{" "}
                  &nbsp; Đồng ý với &nbsp;
                  <p> Điều khoản</p> &nbsp; của ThemeSoa
                </div>

                <button
                  className="btn-default btn-bg-orange-op-5 btn-checkout"
                  onClick={() => this.checkout()}
                >
                  Thanh toán
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  cart: state.cart,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getCart: () => dispatch(fetchCart()), // Trả về Promise
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Cart));
