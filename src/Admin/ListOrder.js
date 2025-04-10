import React from "react";
import "./ListOrder.scss";
import "./bootstrap4.css";
class ListOrder extends React.Component {
  render() {
    const { status_code } = this.props;
    return (
      <div className="list-order">
        <h3>Danh sách đơn hàng</h3>
        <hr />
        <table className="table table-bordered">
          <thead>
            <tr>
              <th className="col-1">STT</th>
              <th className="col-3">Mã đơn hàng</th>
              <th className="col-3">Tổng tiền</th>
              <th className="col-3">Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>1234</td>
              <td>{(100002324).toLocaleString("vi-VN")} đ</td>
              <td
                className={
                  status_code === "PENDING"
                    ? "--order-status-pending"
                    : status_code === "COMPLETED"
                    ? "--order-status-complete"
                    : "--order-status-cancel"
                }
              >
                Đang xử lý
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
export default ListOrder;
