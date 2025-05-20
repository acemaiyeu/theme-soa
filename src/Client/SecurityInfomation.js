import React from "react";
import "./Footer.scss";
import { withRouter } from "react-router-dom";
import "./InfoWarranty.scss";
class SecurityInfomation extends React.Component {
  render() {
    return (
      <>
        <div className="warranty-container">
          <h3 className="warranty-title"> Bảo mật thông tin</h3>
          <ul className="info-list">
            <li>
              Vì một số chức năng cần thông tin người dùng nên chúng tôi xin
              phép được lưu giữ lại thông tin của bạn.
            </li>
            <li>Thông tin này chỉ được lưu trong nội bộ.</li>
            <li>
              Những thông tin này giúp chúng tôi có thể liên lạc với bạn trong
              trường hợp cần thiết như hỗ trợ chăm sóc khách hàng,..
            </li>
          </ul>
          <ul className="info-list">
            <h3>Thông tin được lưu trữ gồm:</h3>
            <li>Họ và tên.</li>
            <li>Số điện thoại.</li>
            <li>Địa chỉ email</li>
          </ul>
        </div>
      </>
    );
  }
}

export default withRouter(SecurityInfomation);
