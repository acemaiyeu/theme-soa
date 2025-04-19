import React from "react";
import "./Nav.scss";
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
import ModalCart from "./ModalCart";
import BoxNumber from "./BoxNumber";
import { connect } from "react-redux";
import { logout } from "../service/UserService";
import { fetchProfile } from "../store/actions/fetchCartAndProfile";

import icon_laravel from "../../src/assets/images/Laravel-Logo.wine.png";
import icon_spring from "../../src/assets/images/Spring_Boot.svg.png";
import icon_swing from "../../src/assets/images/javaSwwing.png";
import icon_smart_phone from "../../src/assets/images/smart_phone_icon.png";
import icon_food from "../../src/assets/images/food_icon.png";
import icon_noi_that from "../../src/assets/images/noi_that-icon.png";
import icon_fashion from "../../src/assets/images/fashion_icon.png";
import icon_sqlserver from "../../src/assets/images/sql-server.png";
import icon_mysql from "../../src/assets/images/MySQL-Logo.png";
import huongdan_icon from "../../src/assets/images/huongdan_icon.png";
import found_icon from "../../src/assets/images/found_icon.webp";
import question_icon from "../../src/assets/images/qyuestion_icon.png";
import q_a_icon from "../../src/assets/images/qa.png";
import icon_database from "../../src/assets/images/database.png";
import icon_rest_api from "../../src/assets/images/rest_api2.png";
import icon_help from "../../src/assets/images/help.png";
const url_api_v0 = process.env.REACT_APP_URL_API_V0;
class Nav extends React.Component {
  state = {
    isSearch: false,
    cart: { data: null },
    profile: { data: null },
    category_list: false,
  };
  handleSearch = (event) => {
    console.log(event.target.className);
    if (event.target.className === "search-input") {
      return;
    }
    this.setState({ isSearch: !this.state.isSearch });
  };
  handleCart = (e) => {
    this.props.history.push("/cart");
  };
  generateSessionId = () => {
    return crypto.randomUUID();
  };
  backtoHome = () => {
    this.props.history.push("/");
  };
  getSessionId = () => {
    axios
      .get(url_api_v0 + "sessions")
      .then((response) => {
        this.setState({ sessions: response.data });

        if (
          response.data.data.session_id === "" ||
          response.data.data.session_id === null
        ) {
          let sessionId = this.generateSessionId();
          axios
            .post(url_api_v0 + "sessions", {
              session_id: sessionId,
            })
            .then((response) => {
              this.setState({ sessions: response });
            })
            .catch((error) => {
              console.error("Có lỗi khi gọi API:", error);
            });
          localStorage.setItem("sessionId", sessionId);
          return;
        }
        localStorage.setItem("sessionId", response.data.data.session_id);
      })
      .catch((error) => {
        console.error("Có lỗi khi gọi API:", error);
      });
  };

  handleChangeCategoryList = () => {
    this.setState({ category_list: !this.state.category_list });
  };
  componentDidMount = () => {
    // this.getSessionId();
    // if (this.state.cart !== null) {
    // this.getCart();
    // this.getProfile();
    // }
  };
  componentDidUpdate(prevProps) {
    // Chỉ cập nhật state nếu profile thay đổi
    if (prevProps.profile !== this.props.profile) {
      this.setState({ profile: this.props.profile });
    }
  }
  handleLogout = () => {
    logout();
    this.props.getProfile();
  };
  render() {
    let { isSearch, category_list } = this.state;

    return (
      <>
        <div className="container">
          <div className="container-item">
            <nav className="navbar">
              <div
                className="category_nav-container"
                onClick={() => this.handleChangeCategoryList()}
              >
                <i className="bi bi-justify category-icon">
                  {category_list && (
                    <div
                      className="category_nav-modal"
                      onClick={() => this.handleChangeCategoryList()}
                    >
                      <div className="category_nav-box">
                        <ul className="category_nav-list">
                          <h3>
                            {" "}
                            <img alt src={icon_laravel} /> LARAVEL
                          </h3>
                          <li className="category_nav-item">
                            <img src={icon_fashion} alt="icon_fashion" /> Theme
                            Laravel Thời trang
                          </li>

                          <li className="category_nav-item">
                            <img src={icon_noi_that} alt="icon_noi_that" />{" "}
                            Theme Laravel Nội Thất
                          </li>
                          <li className="category_nav-item">
                            <img src={icon_food} alt="icon_food" /> Theme
                            Laravel Thực phẩm
                          </li>
                          <li className="category_nav-item">
                            <img src={icon_smart_phone} alt="icon_technology" />{" "}
                            Theme Laravel Công nghệ
                          </li>
                        </ul>
                        <ul className="category_nav-list">
                          <h3>
                            {" "}
                            <img alt="icon-springboot" src={icon_spring} />{" "}
                            SPRINGBOOT
                          </h3>
                          <li className="category_nav-item">
                            <img src={icon_fashion} alt="icon_fashion" /> Theme
                            Laravel Thời trang
                          </li>

                          <li className="category_nav-item">
                            <img src={icon_noi_that} alt="icon_noi_that" />{" "}
                            Theme Laravel Nội Thất
                          </li>
                          <li className="category_nav-item">
                            <img src={icon_food} alt="icon_food" /> Theme
                            Laravel Thực phẩm
                          </li>
                          <li className="category_nav-item">
                            <img src={icon_smart_phone} alt="icon_technology" />{" "}
                            Theme Laravel Công nghệ
                          </li>
                        </ul>
                        <ul className="category_nav-list">
                          <h3>
                            {" "}
                            <img alt="icon-springboot" src={icon_swing} /> JAVA
                            SWING
                          </h3>
                          <li className="category_nav-item">
                            <img src={icon_fashion} alt="icon_fashion" /> Theme
                            Laravel Thời trang
                          </li>

                          <li className="category_nav-item">
                            <img src={icon_noi_that} alt="icon_noi_that" />{" "}
                            Theme Laravel Nội Thất
                          </li>
                          <li className="category_nav-item">
                            <img src={icon_food} alt="icon_food" /> Theme
                            Laravel Thực phẩm
                          </li>
                          <li className="category_nav-item">
                            <img src={icon_smart_phone} alt="icon_technology" />{" "}
                            Theme Laravel Công nghệ
                          </li>
                        </ul>
                        <ul className="category_nav-list">
                          <h3>
                            {" "}
                            <img alt="icon-laravel" src={icon_database} />{" "}
                            DATABASE
                          </h3>
                          <li className="category_nav-item">
                            <img src={icon_mysql} alt="icon_fashion" /> MYSQL
                          </li>
                          <li className="category_nav-item">
                            <img src={icon_sqlserver} alt="icon_fashion" /> SQL
                            SERVER
                          </li>
                        </ul>

                        <ul className="category_nav-list">
                          <h3>
                            {" "}
                            <img alt="icon-rest-api" src={icon_rest_api} />{" "}
                            PROJECT API
                          </h3>
                          <li className="category_nav-item">
                            <img src={icon_laravel} alt="icon_laravel" />{" "}
                            Project Laravel Api (Bán hàng)
                          </li>
                        </ul>
                        <ul className="category_nav-list">
                          <h3>
                            {" "}
                            <img alt="icon-help" src={icon_help} /> Hỗ trợ
                          </h3>
                          <li className="category_nav-item">
                            <img src={huongdan_icon} alt="huongdan_icon" />
                            Đặt hàng và thanh toán
                          </li>
                          <li className="category_nav-item">
                            <img src={question_icon} alt="question_icon" /> Câu
                            hỏi thường gặp
                          </li>
                          <li className="category_nav-item">
                            <img src={found_icon} alt="found_icon" /> Tra cứu
                            vận đơn
                          </li>
                          <li className="category_nav-item">
                            <img src={question_icon} alt="found_icon" /> Đặt câu
                            hỏi
                          </li>
                        </ul>
                      </div>
                    </div>
                  )}
                </i>
              </div>
              <div className="logo" onClick={() => this.backtoHome()}>
                {/* <img src={logo} alt="" /> */}
                <i className="bi bi-house-door"></i>
              </div>

              <div className="nav-category">
                <ul className="nav-left">
                  <li>
                    THEME MỚI
                    <div className="theme-new-box">
                      <ul className="theme-new-list">
                        <li className="theme-new-item --header ">
                          <div className="icon-item">
                            <img
                              src={icon_laravel}
                              className="icon-img"
                              alt="Laravel"
                            />
                          </div>
                          LARAVEL
                        </li>
                        <li className="theme-new-item">
                          <div className="icon-item">
                            <img
                              src={icon_fashion}
                              className="icon-img"
                              alt="icon-fashion"
                            />
                          </div>
                          Theme Laravel thời trang
                        </li>
                        <li className="theme-new-item">
                          <div className="icon-item">
                            <img
                              src={icon_noi_that}
                              className="icon-img"
                              alt="icon-furniture"
                            />
                          </div>
                          Theme Laravel nội thất
                        </li>
                        <li className="theme-new-item">
                          <div className="icon-item">
                            <img
                              src={icon_food}
                              className="icon-img"
                              alt="icon-food"
                            />
                          </div>
                          Theme Laravel thực phẩm
                        </li>
                        <li className="theme-new-item">
                          <div className="icon-item">
                            <img
                              src={icon_smart_phone}
                              className="icon-img"
                              alt="icon-teachnology"
                            />
                          </div>
                          Theme Laravel công nghệ
                        </li>
                      </ul>
                      <ul className="theme-new-list">
                        <li className="theme-new-item --header ">
                          <div className="icon-item">
                            <img
                              className="icon-img"
                              src={icon_spring}
                              alt="springboot"
                            />
                          </div>
                          SPRINGBOOT
                        </li>
                        <li className="theme-new-item">
                          <div className="icon-item">
                            <img
                              className="icon-img"
                              src={icon_fashion}
                              alt="icon-fashion"
                            />
                          </div>
                          Theme Laravel thời trang
                        </li>
                        <li className="theme-new-item">
                          <div className="icon-item">
                            <img
                              className="icon-img"
                              src={icon_noi_that}
                              alt="icon-furniture"
                            />
                          </div>
                          Theme Laravel nội thất
                        </li>
                        <li className="theme-new-item">
                          <div className="icon-item">
                            <img
                              src={icon_food}
                              className="icon-img"
                              alt="icon-food"
                            />
                          </div>
                          Theme Laravel thực phẩm
                        </li>
                        <li className="theme-new-item">
                          <div className="icon-item">
                            <img
                              src={icon_smart_phone}
                              className="icon-img"
                              alt="icon-teachnology"
                            />
                          </div>
                          Theme Laravel công nghệ
                        </li>
                      </ul>
                      <ul className="theme-new-list">
                        <li className="theme-new-item --header ">
                          <div className="icon-item">
                            <img
                              src={icon_swing}
                              className="icon-img"
                              alt="java-swing"
                            />
                          </div>
                          JAVA SWING
                        </li>
                        <li className="theme-new-item">
                          <div className="icon-item">
                            <img
                              src={icon_fashion}
                              className="icon-img"
                              alt="icon-fashion"
                            />
                          </div>
                          Theme Laravel thời trang
                        </li>
                        <li className="theme-new-item">
                          <div className="icon-item">
                            <img
                              src={icon_noi_that}
                              className="icon-img"
                              alt="icon-furniture"
                            />
                          </div>
                          Theme Laravel nội thất
                        </li>
                        <li className="theme-new-item">
                          <div className="icon-item">
                            <img
                              src={icon_food}
                              className="icon-img"
                              alt="icon-food"
                            />
                          </div>
                          Theme Laravel thực phẩm
                        </li>
                        <li className="theme-new-item">
                          <div className="icon-item">
                            <img
                              src={icon_smart_phone}
                              className="icon-img"
                              alt="icon-teachnology"
                            />
                          </div>
                          Theme Laravel công nghệ
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li>
                    THEME GIÁ RẺ
                    <div className="theme-new-box">
                      <ul className="theme-new-list">
                        <li className="theme-new-item --header ">
                          <div className="icon-item">
                            <img
                              src={icon_laravel}
                              className="icon-img"
                              alt="Laravel"
                            />
                          </div>
                          LARAVEL
                        </li>
                        <li className="theme-new-item">
                          <div className="icon-item">
                            <img
                              src={icon_fashion}
                              className="icon-img"
                              alt="icon-fashion"
                            />
                          </div>
                          Theme Laravel thời trang
                        </li>
                        <li className="theme-new-item">
                          <div className="icon-item">
                            <img
                              src={icon_noi_that}
                              className="icon-img"
                              alt="icon-furniture"
                            />
                          </div>
                          Theme Laravel nội thất
                        </li>
                        <li className="theme-new-item">
                          <div className="icon-item">
                            <img
                              src={icon_food}
                              className="icon-img"
                              alt="icon-food"
                            />
                          </div>
                          Theme Laravel thực phẩm
                        </li>
                        <li className="theme-new-item">
                          <div className="icon-item">
                            <img
                              src={icon_smart_phone}
                              className="icon-img"
                              alt="icon-teachnology"
                            />
                          </div>
                          Theme Laravel công nghệ
                        </li>
                      </ul>
                      <ul className="theme-new-list">
                        <li className="theme-new-item --header ">
                          <div className="icon-item">
                            <img
                              src={icon_spring}
                              className="icon-img"
                              alt="springboot"
                            />
                          </div>
                          SPRINGBOOT
                        </li>
                        <li className="theme-new-item">
                          <div className="icon-item">
                            <img
                              src={icon_fashion}
                              className="icon-img"
                              alt="icon-fashion"
                            />
                          </div>
                          Theme Laravel thời trang
                        </li>
                        <li className="theme-new-item">
                          <div className="icon-item">
                            <img
                              src={icon_noi_that}
                              className="icon-img"
                              alt="icon-furniture"
                            />
                          </div>
                          Theme Laravel nội thất
                        </li>
                        <li className="theme-new-item">
                          <div className="icon-item">
                            <img
                              src={icon_food}
                              className="icon-img"
                              alt="icon-food"
                            />
                          </div>
                          Theme Laravel thực phẩm
                        </li>
                        <li className="theme-new-item">
                          <div className="icon-item">
                            <img
                              src={icon_smart_phone}
                              className="icon-img"
                              alt="icon-teachnology"
                            />
                          </div>
                          Theme Laravel công nghệ
                        </li>
                      </ul>
                      <ul className="theme-new-list">
                        <li className="theme-new-item --header ">
                          <div className="icon-item">
                            <img
                              src={icon_swing}
                              className="icon-img"
                              alt="java-swing"
                            />
                          </div>
                          JAVA SWING
                        </li>
                        <li className="theme-new-item">
                          <div className="icon-item">
                            <img
                              src={icon_fashion}
                              className="icon-img"
                              alt="icon-fashion"
                            />
                          </div>
                          Theme Laravel thời trang
                        </li>
                        <li className="theme-new-item">
                          <div className="icon-item">
                            <img
                              src={icon_noi_that}
                              className="icon-img"
                              alt="icon-furniture"
                            />
                          </div>
                          Theme Laravel nội thất
                        </li>
                        <li className="theme-new-item">
                          <div className="icon-item">
                            <img
                              src={icon_food}
                              className="icon-img"
                              alt="icon-food"
                            />
                          </div>
                          Theme Laravel thực phẩm
                        </li>
                        <li className="theme-new-item">
                          <div className="icon-item">
                            <img
                              src={icon_smart_phone}
                              className="icon-img"
                              alt="icon-teachnology"
                            />
                          </div>
                          Theme Laravel công nghệ
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li style={{ position: "relative" }}>
                    DATABASE
                    <div className="container-modal-customer">
                      <ul className="modal-list-customer">
                        <li className="modal-item-customer">
                          <img
                            src={icon_mysql}
                            alt="mysql-icon"
                            className="icon-img"
                          />
                          <a href="#">MYSQL</a>
                        </li>
                        <li className="modal-item-customer">
                          <img
                            src={icon_sqlserver}
                            className="icon-img"
                            alt="sql-server-icon"
                          />
                          <a href="#">SQL SERVER</a>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li style={{ position: "relative" }}>
                    BACKEND API
                    <div className="container-modal-customer">
                      <ul className="modal-list-customer">
                        <li className="modal-item-customer">
                          <img
                            src={icon_laravel}
                            className="icon-img"
                            alt="laravel-icon"
                          />
                          <a href="#">LARAVEL PROJECT API</a>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li>BÀI VIẾT</li>
                  <li style={{ position: "relative" }}>
                    HỖ TRỢ
                    {/* <div className="theme-new-box">
                      <ul className="theme-new-list">
                        <li className="theme-new-item">
                          Hướng dẫn đặt hàng và thanh toán
                        </li>
                        <li className="theme-new-item ">Cài demo</li>
                        <li className="theme-new-item">Câu hỏi thường gặp</li>
                        <li className="theme-new-item">Tra cứu vận đơn</li>
                      </ul>
                    </div> */}
                    <div className="container-modal-customer">
                      <ul className="modal-list-customer">
                        <li className="modal-item-customer">
                          <div className="img">
                            <img
                              src={huongdan_icon}
                              className="icon-img"
                              alt="huongdan-icon"
                            />
                          </div>
                          <a href="#">Hướng dẫn đặt hàng và thanh toán</a>
                        </li>
                        <li className="modal-item-customer">
                          <div className="img">
                            <img
                              src={question_icon}
                              className="icon-img"
                              alt="question-icon"
                            />
                          </div>
                          <a href="#">Câu hỏi thường gặp</a>
                        </li>
                        <li className="modal-item-customer">
                          <div className="img">
                            <img
                              src={found_icon}
                              className="icon-img"
                              alt="found-icon"
                            />
                          </div>
                          <a href="#">Tra cứu vận đơn</a>
                        </li>
                        <li className="modal-item-customer">
                          <div className="img">
                            <img
                              src={q_a_icon}
                              className="icon-img"
                              alt="q_a_icon"
                            />
                          </div>
                          <a
                            href="#"
                            title="Thông tin trả lời sẽ được cập nhật vào thông báo của bạn"
                          >
                            Đặt câu hỏi
                          </a>
                        </li>
                      </ul>
                    </div>
                  </li>
                </ul>
                <ul className="nav-right">
                  <li>
                    <i
                      className="bi bi-search"
                      onClick={(e) => this.handleSearch(e)}
                    ></i>
                  </li>
                  <li>
                    <i className="bi bi-bell"></i>
                    <div className="container-modal-customer --notification-custom">
                      <ul className="modal-list-customer">
                        <li className="modal-item-customer">
                          <div className="modal-customer-icon">
                            <i className="bi bi-bell"></i>
                          </div>
                          <a className="modal-customer-title">
                            Giảm tưng bừng ngày 30/4/2025 ngày giải phóng hoàn
                            toàn miền Nam
                          </a>
                        </li>
                        <li className="modal-item-customer unread">
                          <div className="modal-customer-icon">
                            <i className="bi bi-patch-question"></i>
                          </div>
                          <a className="modal-customer-title">
                            Trả lời câu hỏi ngày 29/4/2025
                          </a>
                        </li>
                      </ul>
                    </div>
                  </li>

                  {/* <li className="login">
                    <div>Đăng ký</div>
                    <div>Đăng nhập</div>
                  </li> */}
                  <li className="cart" onClick={(e) => this.handleCart(e)}>
                    <i className="bi bi-cart"></i>
                    <ModalCart
                      cart={this.props.cart.data}
                      cart_details={this.props.cart.data?.details ?? []}
                    />
                    <BoxNumber
                      number={this.props.cart.data?.details?.length ?? 0}
                    />
                  </li>

                  <li>
                    <i className="bi bi-person"></i>
                    <div className="container-modal-customer --person-custom">
                      <ul className="modal-list-customer">
                        {!this.state.profile?.data ? (
                          <li className="modal-item-customer">
                            <a href="/login">Đăng nhập</a>
                          </li>
                        ) : (
                          <>
                            <li className="modal-item-customer">
                              <a href="/profile">Thông tin tài khoản</a>
                            </li>
                            <li className="modal-item-customer">
                              <a href="/my-orders">Quản lý đơn hàng</a>
                            </li>
                            <li
                              className="modal-item-customer"
                              onClick={() => this.handleLogout()}
                            >
                              <a>Đăng xuất</a>
                            </li>
                          </>
                        )}
                      </ul>
                    </div>
                  </li>
                </ul>
              </div>
              {/* <div className="search-box">
                <input type="text" placeholder="Tìm kiếm" />
                <button type="button" className="btn">
                  <i className="bi bi-search"></i>
                </button>
              </div>

              <div className="cart">
                <i className="bi bi-cart"></i>
              </div> */}
            </nav>
          </div>
        </div>
        {isSearch && (
          <div className="modal-search" onClick={(e) => this.handleSearch(e)}>
            <i
              className="bi bi-x-circle"
              onClick={(e) => this.handleSearch(e)}
            ></i>
            <div className="search-box">
              <input
                type="text"
                className="search-input"
                placeholder="Tìm kiếm"
              />
              <button
                type="button"
                className="btn-default btn-bg-orange-op-5 btn-pad-30"
              >
                <i className="bi bi-search"></i>
              </button>
            </div>
          </div>
        )}
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  profile: state.profile,
  cart: state.cart,
});
const mapDispatchToProps = (dispatch) => {
  return {
    getProfile: () => dispatch(fetchProfile()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Nav));
