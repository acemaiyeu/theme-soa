import React from "react";
import "./Footer.scss";
import { withRouter } from "react-router-dom";
import "./InfoWarranty.scss";
class InfoRefund extends React.Component {
  render() {
    return (
      <>
        <div className="warranty-container">
          <h3 className="warranty-title"> Chính sách hoàn tiền</h3>
          <ul className="info-list">
            <li>ThemeForStudents chỉ hoàn tiền khi website chưa gửi theme</li>
            <li>Số tiền được hoàn sẽ bị trừ phí giao dịch</li>
          </ul>
        </div>
      </>
    );
  }
}

export default withRouter(InfoRefund);
