import React from "react";
import "./ModelCart.scss";

class ModalCart extends React.Component {
  state = {
    isValue: true,
  };

  render() {
    let { cart_details = [] } = this.props;

    // Nếu cart không có hoặc cart_details rỗng
    const isEmptyCart = !cart_details.length;

    return (
      <div className="modal-cart-container">
        {isEmptyCart ? (
          <div className="modal-none-cart">
            <div className="img">
              <img
                src="https://bizweb.dktcdn.net/100/355/181/themes/720156/assets/empty-cart.png?1694577088849"
                alt="cart"
              />
            </div>
          </div>
        ) : (
          <div className="modal-cart">
            <h3>Sản phẩm trong giỏ hàng</h3>
            <div className="modal-cart-body">
              {cart_details.map((item, index) =>
                index < 5 ? (
                  <div key={index} className="modal-cart-item">
                    <div className="img-container">
                      <img alt="img" src={item.theme.thumbnail_img} />
                    </div>
                    <div className="title">
                      {item.theme.title || "Tên sản phẩm"}
                    </div>
                    <div className="price">
                      <div className="price-new">
                        {item.price ? `${item.total_text}` : "Chưa có giá"}
                      </div>
                    </div>
                  </div>
                ) : null
              )}
            </div>
            <div className="modal-cart-bottom">
              <div className="total_cart">
                Có {cart_details.length} sản phẩm trong giỏ hàng
              </div>
              <div className="btn-default btn-bg-orange-op-5 btn-modal">
                Xem giỏ hàng
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default ModalCart;
