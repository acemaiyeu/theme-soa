import React from "react";
import "./ListOrder.scss";
import "./bootstrap4.css";
import axios from "axios";
import { withRouter } from "react-router-dom";

const url_api_v1 = process.env.REACT_APP_URL_API_V1;

class ListOrder extends React.Component {
  state = {
    listOrder: [],
  };
  getDatas = () => {
    axios
      .get(url_api_v1 + "orders?limit=10", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("admin_token"),
        },
      })
      .then((res) => {
        this.setState({ listOrder: res.data?.data });
      })
      .catch((error) => {
        console.log("Loi goi api theme", error);
      });
  };

  componentDidMount() {
    this.getDatas();
  }

  render() {
    const { status_code } = this.props;
    let { listOrder } = this.state;

    return (
      <div className="list-order">
        <h3>Danh sách đơn hàng mới</h3>
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
            {listOrder &&
              listOrder.length > 0 &&
              listOrder.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.code}</td>
                    <td>{item.total_price_text}</td>
                    <td
                      className={
                        item.status.code === "PENDING"
                          ? "--order-status-pending"
                          : item.status === "COMPLETED"
                          ? "--order-status-complete"
                          : "--order-status-cancel"
                      }
                    >
                      {item.status.name}
                    </td>
                  </tr>
                );
              })}
            {listOrder.length === 0 && (
              <tr>
                <td colSpan={4}>Không có dữ liệu</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }
}
export default withRouter(ListOrder);
