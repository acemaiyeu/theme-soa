import React from "react";
import { Link } from "react-router-dom";
import "./NavAdmin.scss";
import "./bootstrapa.css";
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";
class NavAdmin extends React.Component {
  render() {
    return (
      <>
        <div className="nav">
          <div className="info">
            <img
              src="https://cdn-icons-png.freepik.com/512/147/147144.png"
              alt="avatar"
            />
            <h3>Admin</h3>
            <h4>Quản trị viên</h4>
            <hr className="hr-w-90" />
            <i
              className="bi bi-house-door home-icon"
              onClick={() => this.props.history.push("/admin")}
            ></i>
          </div>
          <hr className="hr-w-90" />

          <div className="container-fluid">
            <div>
              <ul className="navbar-admin">
                <li className="nav-item">
                  <Link
                    to="/admin/orders"
                    className="nav-link active"
                    aria-current="page"
                  >
                    <i className="bi bi-cart-check-fill"></i> Quản lý đơn hàng
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/admin/coupons"
                    className="nav-link active"
                    aria-current="page"
                  >
                    <i className="bi bi-ticket-detailed"></i> Quản lý Mã giảm
                    giá
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/admin/category"
                    className="nav-link active"
                    aria-current="page"
                  >
                    <i className="bi bi-building"></i> Quản lý danh mục Theme
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/admin/gifts"
                    className="nav-link active"
                    aria-current="page"
                  >
                    <i className="bi bi-building"></i> Quản lý Quà
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/admin/theme"
                    className="nav-link active"
                    aria-current="page"
                  >
                    <i className="bi bi-building"></i> Quản lý Theme
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default withRouter(NavAdmin);
