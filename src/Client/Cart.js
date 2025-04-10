import React from "react";
import "./Cart.scss";
class Cart extends React.Component {
  state = {
    checkout: [
      { title: "Tổng tiền hàng", value: 100000000 },
      { title: "Giảm giá bất kỳ 10%", value: -10000000 },
      { title: "Thành tiền", value: 90000000 },
    ],
    listDiscounts: [
      {
        title: "Giảm giá 10% khi mua hàng trên 10 triệu",
        value: 10000000,
        condition: "Đơn hàng phải trên 10 triệu",
      },
      {
        title: "Giảm giá 20%",
        value: 20000000,
        condition: "Đơn hàng phải trên 20 triệu",
      },
      {
        title: "Giảm giá 30%",
        value: 20000000,
        condition: "Đơn hàng phải trên 30 triệu",
      },
      {
        title: "Giảm giá 40%",
        value: 20000000,
        condition: "Đơn hàng phải trên 40 triệu",
      },
    ],
    isShowCondition: -1,
  };
  handleChageCondition = (index) => {
    this.setState({
      isShowCondition: index,
    });
  };
  render() {
    let { checkout, listDiscounts, isShowCondition } = this.state;
    return (
      <div className="cart_container">
        <div className="cart-tile">
          <h2>Giỏ hàng</h2>
        </div>
        <div className="cart-contents">
          <div className="user-info">
            <form>
              <label>Họ và tên*: </label>
              <input className="input" type="text" placeholder="Họ và tên" />
            </form>
            <form>
              <label>Email*: </label>
              <input type="email" className="input" placeholder="Email" />
            </form>
            <form>
              <label>Số điện thoại*: </label>
              <input type="tel" className="input" placeholder="Số điện thoại" />
            </form>
            <button className="btn">Cập nhật</button>
          </div>
          <div className="cart-item-list">
            <div className="cart-item-left">
              <div className="cart-item-theme">
                <div className="cart-item-img">
                  <img
                    alt="img"
                    src="https://media.istockphoto.com/id/1177199065/photo/african-lion-and-night-in-africa-banner-savannah-landscape-theme-king-of-animals-proud.jpg?s=612x612&w=0&k=20&c=I6zG27ksq2_4rBjLCN8kQMuiBysPA_rnfurxbGsP8BE="
                  ></img>
                </div>
                <div className="cart-item-content">
                  <table className="table-custom">
                    <tr>
                      <td className="title-table">Tên</td>
                      <td className="title-table">Số lượng</td>
                      <td className="title-table">Thành tiền</td>
                    </tr>
                    <tr>
                      <td className="value-table">
                        Theme Laravel điện máy, gia dụng nồi chiên không dầu
                      </td>
                      <td className="value-table">1</td>
                      <td className="value-table price">
                        <p className="price-new">
                          {(100000000).toLocaleString("vi-VN")} đ
                        </p>
                      </td>
                    </tr>
                  </table>
                </div>
              </div>
            </div>
            <div className="cart-item-right">
              <div className="checkout-container">
                <div className="discount">
                  <h3> Mã giảm giá</h3>
                  <div className="form-discount">
                    <div>
                      <input className="input" />
                      <button className="btn">Áp dụng</button>
                    </div>
                    {/* <a className="btn btn-info ">Mã giảm giá</a> */}
                    <div className="list-discount">
                      {listDiscounts &&
                        listDiscounts.length > 0 &&
                        listDiscounts.map((item, index) => {
                          return (
                            <div className="discount-item">
                              <div className="discount-title">{item.title}</div>

                              <div className="button-list">
                                <button className="btn">Áp dụng</button>
                                <button
                                  className="btn btn-info btn-condition"
                                  onClick={() =>
                                    this.handleChageCondition(index)
                                  }
                                >
                                  Điều kiện
                                  {isShowCondition === index && (
                                    <div className="condition-modal">
                                      <h3>Nội dung</h3>
                                      <p className="condition-content">
                                        {item.condition}
                                      </p>
                                      <i className="bi bi-x-circle"></i>
                                    </div>
                                  )}
                                </button>
                              </div>
                            </div>
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
                  {checkout &&
                    checkout.length > 0 &&
                    checkout.map((item, index) => {
                      return (
                        <div className="checkout-item">
                          <div className="checkout-title">{item.title}</div>
                          <div className="checkout-value price">
                            <span className="price-new">
                              {item.value.toLocaleString("vi-VN")} đ
                            </span>
                          </div>
                        </div>
                      );
                    })}
                </div>
                <div className="method-payment">
                  <h3>Phương thức thanh toán</h3>
                  <div className="payment-contents">
                    <input type="radio" id="check" checked />

                    <img
                      src="https://upload.wikimedia.org/wikipedia/vi/f/fe/MoMo_Logo.png"
                      alt="momo-logo"
                    ></img>
                    <div className="payment-title">Thanh toán bằng momo</div>
                  </div>
                </div>
                <div className="term">
                  <input type="checkbox" id="check" /> Đồng ý với
                  <a> Điều khoản</a> của ThemeSoa
                </div>

                <button className="btn btn-checkout">Thanh toán</button>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="discount-cart">
          <form>
            <input
              className="discount-value input"
              type="text"
              placeholder="GIAMGIA30"
            />
            <button className="apply">Áp dụng</button>
          </form>

          <div className="discount-item">
            <div className="discount-img">
              <i class="bi bi-ticket-perforated"></i>
            </div>
            <div className="discount-item-content">
              <div className="discount-item-content-title">
                <h2>Khuyện mại 10% cho mạnh</h2>
              </div>

              <div className="button">
                <button className="apply btn">Áp dụng</button>
                <button className="condition btn btn-info">Điều kiện</button>
              </div>
            </div>
          </div>
          <div className="discount-item">
            <div className="discount-img">
              <i class="bi bi-ticket-perforated"></i>
            </div>
            <div className="discount-item-content">
              <div className="discount-item-content-title">
                <h2>Khuyện mại 10% cho mạnh</h2>
              </div>

              <div className="button">
                <button className="apply btn">Áp dụng</button>
                <button className="condition btn btn-info">Điều kiện</button>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    );
  }
}

export default Cart;
