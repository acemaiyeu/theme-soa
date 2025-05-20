import React from "react";
import "./Footer.scss";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
class Footer extends React.Component {
  render() {
    return (
      <>
        <div className="footer">
          <div className="footer-container">
            <div className="footer-item">
              <h3 className="footer-item-title">Chăm sóc khách hàng</h3>
              <Link to="/introduce">Hướng dẫn mua hàng</Link>
              <Link to="/introduce">Hướng dẫn thanh toán</Link>
              <Link to="/info-refund">Hoàn tiền</Link>
            </div>
            <div className="footer-item">
              <h3 className="footer-item-title">Chính sách</h3>
              <Link to="/info-warranty">Chính sách bảo hành</Link>

              <Link to="/info-security-infomation">Bảo mật thông tin</Link>
              <Link to="/info-terms">Điều khoản và điều kiện</Link>
            </div>
            <div className="footer-item">
              <h3 className="footer-item-title">Về chúng tôi</h3>
              <Link to="/introduce">Giới thiệu</Link>
              <img src="https://dangkywebvoibocongthuong.com/wp-content/uploads/2021/11/logo-da-thong-bao-bo-cong-thuong.png" />
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default withRouter(Footer);
