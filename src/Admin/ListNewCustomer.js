import React from "react";
import "./bootstrap4.css";
import "./ListNewCustomer.scss";
class ListNewCustomer extends React.Component {
  render() {
    return (
      <div className="list-new-customer">
        <h3>Khách hàng mới</h3>
        <hr />
        <table className="table table-bordered">
          <thead>
            <tr>
              <th className="col-1">#</th>
              <th className="col-3">Tên khách hàng</th>
              <th className="col-3">Email</th>
              <th className="col-3">Ngày tạo</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Trần Cao Lầu</td>
              <td>caolautran@gmail.com</td>
              <td>09/04/2025 12:00:00</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default ListNewCustomer;
