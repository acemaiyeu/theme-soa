import React from "react";
import "./Cart.scss";
import axios from "axios";
import { withRouter } from "react-router-dom";

const url_api_v0 = process.env.REACT_APP_URL_API_V0;

class DetailOrder extends React.Component {
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
  getOrderByCode = () => {
    let code = this.props.match.params.code;
    axios
      .get(url_api_v0 + "my-order/" + code)
      .then((response) => {
        this.setState({
          order: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  componentDidMount = () => {
    this.getOrderByCode();
  };

  render() {
    let { order } = this.state;
    return (
      <div className="cart_container">
        <div className="cart-tile">
          <h2>Thông tin đơn hàng</h2>
        </div>
        <div className="cart-contents">
          <div className="user-info">
            <form>
              <label>Họ và tên*: </label>
              <input
                className="input"
                type="text"
                value={this.state.order?.data?.fullname ?? ""}
                readOnly
              />
            </form>
            <form>
              <label>Email*: </label>
              <input
                type="text"
                className="input"
                value={this.state.order?.data?.user_email ?? ""}
                readOnly
              />
            </form>
            <form>
              <label>Số điện thoại*: </label>
              <input
                type="text"
                className="input"
                value={this.state.order?.data?.user_phone ?? ""}
                placeholder="Số điện thoại"
                readOnly
              />
            </form>
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
                      {order?.data?.details?.map((item, index) => (
                        <tr key={`${item?.id}-${index}`}>
                          <td>{index + 1}</td>
                          <td>
                            <img alt="img" src={item.theme.thumbnail_img}></img>
                          </td>
                          <td className="value-table">{item.theme.title}</td>
                          <td className="value-table">{item.quantity}</td>
                          <td className="value-table">
                            <p className="price-new">{item.total_price_text}</p>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="list_details">
                    {order?.data?.details?.map((item, index) => (
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
                <div className="checkout-list">
                  <h3>Thông tin thanh toán</h3>
                  {this.state.order?.data?.info_payment &&
                    this.state.order?.data?.info_payment.length > 0 &&
                    this.state.order?.data?.info_payment.map((item, index) => {
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
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(DetailOrder);
