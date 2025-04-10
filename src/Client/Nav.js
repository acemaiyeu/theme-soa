import React from "react";
import logo from "../../src/assets/images/logo.png";
import "./Nav.scss";
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";

class Nav extends React.Component {
  state = {
    isSearch: false,
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
  render() {
    let { isSearch } = this.state;
    return (
      <>
        <div className="container">
          <div className="container-item">
            <nav className="navbar">
              <div className="logo">
                <img src={logo} alt="" />
              </div>
              {/* <div className="nav-category">
                <i className="bi bi-justify"></i> Danh mục sản phẩm
                <ul className="navbar-list">
                  <li className="navbar-item">
                    <span className="navbar-item-new-theme">Theme mới</span>
                    <i className="bi bi-chevron-down"></i>
                    <div className="theme-new-box">
                      <ul className="theme-new-list">
                        <li className="theme-new-item --header ">
                          THEME BÁN HÀNG
                        </li>
                        <li className="theme-new-item --laravel">
                          Theme Laravel
                          <div className="theme-new-box-laravel">
                            <ul className="theme-new-list">
                              <li className="theme-new-item">
                                Theme Laravel thời trang
                              </li>
                              <li className="theme-new-item">
                                Theme Laravel nội thất
                              </li>
                              <li className="theme-new-item">
                                Theme Laravel thực phẩm
                              </li>
                              <li className="theme-new-item">
                                Theme Laravel công nghệ
                              </li>
                            </ul>
                          </div>
                        </li>
                        <li className="theme-new-item --spring">
                          Theme SpringBoot
                          <div className="theme-new-box-spring">
                            <ul className="theme-new-list">
                              <li className="theme-new-item">
                                Theme Spring thời trang
                              </li>
                              <li className="theme-new-item">
                                Theme Spring nội thất
                              </li>
                              <li className="theme-new-item">
                                Theme Spring thực phẩm
                              </li>
                              <li className="theme-new-item">
                                Theme Spring công nghệ
                              </li>
                            </ul>
                          </div>
                        </li>
                        <li className="theme-new-item --swing">
                          Theme JavaSwing
                          <div className="theme-new-box-swing">
                            <ul className="theme-new-list">
                              <li className="theme-new-item">
                                Theme JavaSwing thời trang
                              </li>
                              <li className="theme-new-item">
                                Theme JavaSwing nội thất
                              </li>
                              <li className="theme-new-item">
                                Theme JavaSwing công nghệ
                              </li>
                              <li className="theme-new-item">
                                Theme JavaSwing thực phẩm
                              </li>
                            </ul>
                          </div>
                        </li>
                      </ul>
                      <ul className="theme-new-list">
                        <li className="theme-new-item --header ">
                          THEME GIỚI THIỆU
                        </li>
                        <li className="theme-new-item --laravel">
                          Theme Laravel
                          <div className="theme-new-box-laravel">
                            <ul className="theme-new-list">
                              <li className="theme-new-item">
                                Theme Laravel thời trang
                              </li>
                              <li className="theme-new-item">
                                Theme Laravel nội thất
                              </li>
                              <li className="theme-new-item">
                                Theme Laravel thực phẩm
                              </li>
                              <li className="theme-new-item">
                                Theme Laravel công nghệ
                              </li>
                            </ul>
                          </div>
                        </li>
                        <li className="theme-new-item --spring">
                          Theme SpringBoot
                          <div className="theme-new-box-spring">
                            <ul className="theme-new-list">
                              <li className="theme-new-item">
                                Theme Spring thời trang
                              </li>
                              <li className="theme-new-item">
                                Theme Spring nội thất
                              </li>
                              <li className="theme-new-item">
                                Theme Spring thực phẩm
                              </li>
                              <li className="theme-new-item">
                                Theme Spring công nghệ
                              </li>
                            </ul>
                          </div>
                        </li>
                        <li className="theme-new-item --swing">
                          Theme JavaSwing
                          <div className="theme-new-box-swing">
                            <ul className="theme-new-list">
                              <li className="theme-new-item">
                                Theme JavaSwing thời trang
                              </li>
                              <li className="theme-new-item">
                                Theme JavaSwing nội thất
                              </li>
                              <li className="theme-new-item">
                                Theme JavaSwing công nghệ
                              </li>
                              <li className="theme-new-item">
                                Theme JavaSwing thực phẩm
                              </li>
                            </ul>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li className="navbar-item">
                    <span className="navbar-item-new-theme">Theme giá rẻ</span>
                    <i className="bi bi-chevron-down"></i>
                    <div className="theme-new-box">
                      <ul className="theme-new-list">
                        <li className="theme-new-item --header ">
                          THEME BÁN HÀNG
                        </li>
                        <li className="theme-new-item --laravel">
                          Theme Laravel
                          <div className="theme-new-box-laravel">
                            <ul className="theme-new-list">
                              <li className="theme-new-item">
                                Theme Laravel thời trang
                              </li>
                              <li className="theme-new-item">
                                Theme Laravel nội thất
                              </li>
                              <li className="theme-new-item">
                                Theme Laravel thực phẩm
                              </li>
                              <li className="theme-new-item">
                                Theme Laravel công nghệ
                              </li>
                            </ul>
                          </div>
                        </li>
                        <li className="theme-new-item --spring">
                          Theme SpringBoot
                          <div className="theme-new-box-spring">
                            <ul className="theme-new-list">
                              <li className="theme-new-item">
                                Theme Spring thời trang
                              </li>
                              <li className="theme-new-item">
                                Theme Spring nội thất
                              </li>
                              <li className="theme-new-item">
                                Theme Spring thực phẩm
                              </li>
                              <li className="theme-new-item">
                                Theme Spring công nghệ
                              </li>
                            </ul>
                          </div>
                        </li>
                        <li className="theme-new-item --swing">
                          Theme JavaSwing
                          <div className="theme-new-box-swing">
                            <ul className="theme-new-list">
                              <li className="theme-new-item">
                                Theme JavaSwing thời trang
                              </li>
                              <li className="theme-new-item">
                                Theme JavaSwing nội thất
                              </li>
                              <li className="theme-new-item">
                                Theme JavaSwing công nghệ
                              </li>
                              <li className="theme-new-item">
                                Theme JavaSwing thực phẩm
                              </li>
                            </ul>
                          </div>
                        </li>
                      </ul>
                      <ul className="theme-new-list">
                        <li className="theme-new-item --header ">
                          THEME GIỚI THIỆU
                        </li>
                        <li className="theme-new-item --laravel">
                          Theme Laravel
                          <div className="theme-new-box-laravel">
                            <ul className="theme-new-list">
                              <li className="theme-new-item">
                                Theme Laravel thời trang
                              </li>
                              <li className="theme-new-item">
                                Theme Laravel nội thất
                              </li>
                              <li className="theme-new-item">
                                Theme Laravel thực phẩm
                              </li>
                              <li className="theme-new-item">
                                Theme Laravel công nghệ
                              </li>
                            </ul>
                          </div>
                        </li>
                        <li className="theme-new-item --spring">
                          Theme SpringBoot
                          <div className="theme-new-box-spring">
                            <ul className="theme-new-list">
                              <li className="theme-new-item">
                                Theme Spring thời trang
                              </li>
                              <li className="theme-new-item">
                                Theme Spring nội thất
                              </li>
                              <li className="theme-new-item">
                                Theme Spring thực phẩm
                              </li>
                              <li className="theme-new-item">
                                Theme Spring công nghệ
                              </li>
                            </ul>
                          </div>
                        </li>
                        <li className="theme-new-item --swing">
                          Theme JavaSwing
                          <div className="theme-new-box-swing">
                            <ul className="theme-new-list">
                              <li className="theme-new-item">
                                Theme JavaSwing thời trang
                              </li>
                              <li className="theme-new-item">
                                Theme JavaSwing nội thất
                              </li>
                              <li className="theme-new-item">
                                Theme JavaSwing công nghệ
                              </li>
                              <li className="theme-new-item">
                                Theme JavaSwing thực phẩm
                              </li>
                            </ul>
                          </div>
                        </li>
                      </ul>
                      <ul className="theme-new-list">
                        <li className="theme-new-item --header ">
                          THEME BÁN HÀNG
                        </li>
                        <li className="theme-new-item --laravel">
                          Theme Laravel
                          <div className="theme-new-box-laravel">
                            <ul className="theme-new-list">
                              <li className="theme-new-item">
                                Theme Laravel thời trang
                              </li>
                              <li className="theme-new-item">
                                Theme Laravel nội thất
                              </li>
                              <li className="theme-new-item">
                                Theme Laravel thực phẩm
                              </li>
                              <li className="theme-new-item">
                                Theme Laravel công nghệ
                              </li>
                            </ul>
                          </div>
                        </li>
                        <li className="theme-new-item --spring">
                          Theme SpringBoot
                          <div className="theme-new-box-spring">
                            <ul className="theme-new-list">
                              <li className="theme-new-item">
                                Theme Spring thời trang
                              </li>
                              <li className="theme-new-item">
                                Theme Spring nội thất
                              </li>
                              <li className="theme-new-item">
                                Theme Spring thực phẩm
                              </li>
                              <li className="theme-new-item">
                                Theme Spring công nghệ
                              </li>
                            </ul>
                          </div>
                        </li>
                        <li className="theme-new-item --swing">
                          Theme JavaSwing
                          <div className="theme-new-box-swing">
                            <ul className="theme-new-list">
                              <li className="theme-new-item">
                                Theme JavaSwing thời trang
                              </li>
                              <li className="theme-new-item">
                                Theme JavaSwing nội thất
                              </li>
                              <li className="theme-new-item">
                                Theme JavaSwing công nghệ
                              </li>
                              <li className="theme-new-item">
                                Theme JavaSwing thực phẩm
                              </li>
                            </ul>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li className="navbar-item">
                    <span className="navbar-item-new-theme">Dịch vụ khác</span>
                    <i className="bi bi-chevron-down"></i>
                    <div className="theme-new-box">
                      <ul className="theme-new-list">
                        <li className="theme-new-item --header ">API</li>
                        <li className="theme-new-item --laravel">
                          Theme Laravel
                          <div className="theme-new-box-laravel">
                            <ul className="theme-new-list">
                              <li className="theme-new-item">
                                Project API thời trang
                              </li>
                              <li className="theme-new-item">
                                Project API nội thất
                              </li>
                              <li className="theme-new-item">
                                Project API thực phẩm
                              </li>
                              <li className="theme-new-item">
                                Project API công nghệ
                              </li>
                            </ul>
                          </div>
                        </li>
                      </ul>
                      <ul className="theme-new-list">
                        <li className="theme-new-item --header ">
                          CẤU TRÚC DATABASE
                        </li>
                        <li className="theme-new-item --laravel">
                          MYSQL
                          <div className="theme-new-box-laravel">
                            <ul className="theme-new-list">
                              <li className="theme-new-item">
                                Cấu trúc mysql thời trang
                              </li>
                              <li className="theme-new-item">
                                Cấu trúc mysql nội thất
                              </li>
                              <li className="theme-new-item">
                                Cấu trúc mysql thực phẩm
                              </li>
                              <li className="theme-new-item">
                                Cấu trúc mysql công nghệ
                              </li>
                            </ul>
                          </div>
                        </li>
                        <li className="theme-new-item --spring">
                          SQL Server
                          <div className="theme-new-box-spring">
                            <ul className="theme-new-list">
                              <li className="theme-new-item">
                                Cấu trúc SQL Server thời trang
                              </li>
                              <li className="theme-new-item">
                                Cấu trúc SQL Server nội thất
                              </li>
                              <li className="theme-new-item">
                                Theme Spring thực phẩm
                              </li>
                              <li className="theme-new-item">
                                Cấu trúc SQL Server công nghệ
                              </li>
                            </ul>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li className="navbar-item">
                    <span className="navbar-item-new-theme">Hỗ trợ</span>
                    <i className="bi bi-chevron-down"></i>
                    <div className="theme-new-box">
                      <ul className="theme-new-list">
                        <li className="theme-new-item ">
                          Hướng dẫn đặt hàng và thanh toán
                        </li>
                        <li className="theme-new-item --laravel">
                          Câu hỏi thường gặp
                        </li>
                        <li className="theme-new-item --spring">
                          Tra cứu vận đơn
                        </li>
                      </ul>
                    </div>
                  </li>
                </ul>
              </div> */}
              <div className="nav-category">
                <ul className="nav-left">
                  <li>
                    Theme mới
                    {/* <div className="theme-new-box">
                      <ul className="theme-new-list">
                        <li className="theme-new-item --header ">
                          THEME BÁN HÀNG
                        </li>
                        <li className="theme-new-item --laravel">
                          Theme Laravel
                          <div className="theme-new-box-laravel">
                            <ul className="theme-new-list">
                              <li className="theme-new-item">
                                Theme Laravel thời trang
                              </li>
                              <li className="theme-new-item">
                                Theme Laravel nội thất
                              </li>
                              <li className="theme-new-item">
                                Theme Laravel thực phẩm
                              </li>
                              <li className="theme-new-item">
                                Theme Laravel công nghệ
                              </li>
                            </ul>
                          </div>
                        </li>
                        <li className="theme-new-item --spring">
                          Theme SpringBoot
                          <div className="theme-new-box-spring">
                            <ul className="theme-new-list">
                              <li className="theme-new-item">
                                Theme Spring thời trang
                              </li>
                              <li className="theme-new-item">
                                Theme Spring nội thất
                              </li>
                              <li className="theme-new-item">
                                Theme Spring thực phẩm
                              </li>
                              <li className="theme-new-item">
                                Theme Spring công nghệ
                              </li>
                            </ul>
                          </div>
                        </li>
                        <li className="theme-new-item --swing">
                          Theme JavaSwing
                          <div className="theme-new-box-swing">
                            <ul className="theme-new-list">
                              <li className="theme-new-item">
                                Theme JavaSwing thời trang
                              </li>
                              <li className="theme-new-item">
                                Theme JavaSwing nội thất
                              </li>
                              <li className="theme-new-item">
                                Theme JavaSwing công nghệ
                              </li>
                              <li className="theme-new-item">
                                Theme JavaSwing thực phẩm
                              </li>
                            </ul>
                          </div>
                        </li>
                      </ul>
                      <ul className="theme-new-list">
                        <li className="theme-new-item --header ">
                          THEME GIỚI THIỆU
                        </li>
                        <li className="theme-new-item --laravel">
                          Theme Laravel
                          <div className="theme-new-box-laravel">
                            <ul className="theme-new-list">
                              <li className="theme-new-item">
                                Theme Laravel thời trang
                              </li>
                              <li className="theme-new-item">
                                Theme Laravel nội thất
                              </li>
                              <li className="theme-new-item">
                                Theme Laravel thực phẩm
                              </li>
                              <li className="theme-new-item">
                                Theme Laravel công nghệ
                              </li>
                            </ul>
                          </div>
                        </li>
                        <li className="theme-new-item --spring">
                          Theme SpringBoot
                          <div className="theme-new-box-spring">
                            <ul className="theme-new-list">
                              <li className="theme-new-item">
                                Theme Spring thời trang
                              </li>
                              <li className="theme-new-item">
                                Theme Spring nội thất
                              </li>
                              <li className="theme-new-item">
                                Theme Spring thực phẩm
                              </li>
                              <li className="theme-new-item">
                                Theme Spring công nghệ
                              </li>
                            </ul>
                          </div>
                        </li>
                        <li className="theme-new-item --swing">
                          Theme JavaSwing
                          <div className="theme-new-box-swing">
                            <ul className="theme-new-list">
                              <li className="theme-new-item">
                                Theme JavaSwing thời trang
                              </li>
                              <li className="theme-new-item">
                                Theme JavaSwing nội thất
                              </li>
                              <li className="theme-new-item">
                                Theme JavaSwing công nghệ
                              </li>
                              <li className="theme-new-item">
                                Theme JavaSwing thực phẩm
                              </li>
                            </ul>
                          </div>
                        </li>
                      </ul>
                    </div> */}
                    <div className="theme-new-box">
                      <ul className="theme-new-list">
                        <li className="theme-new-item --header ">
                          THEME BÁN HÀNG
                        </li>
                        <li className="theme-new-item --laravel">
                          Theme Laravel
                          <div className="theme-new-box-laravel">
                            <ul className="theme-new-list">
                              <li className="theme-new-item">
                                Theme Laravel thời trang
                              </li>
                              <li className="theme-new-item">
                                Theme Laravel nội thất
                              </li>
                              <li className="theme-new-item">
                                Theme Laravel thực phẩm
                              </li>
                              <li className="theme-new-item">
                                Theme Laravel công nghệ
                              </li>
                            </ul>
                          </div>
                        </li>
                        <li className="theme-new-item --spring">
                          Theme SpringBoot
                          <div className="theme-new-box-spring">
                            <ul className="theme-new-list">
                              <li className="theme-new-item">
                                Theme Spring thời trang
                              </li>
                              <li className="theme-new-item">
                                Theme Spring nội thất
                              </li>
                              <li className="theme-new-item">
                                Theme Spring thực phẩm
                              </li>
                              <li className="theme-new-item">
                                Theme Spring công nghệ
                              </li>
                            </ul>
                          </div>
                        </li>
                        <li className="theme-new-item --swing">
                          Theme JavaSwing
                          <div className="theme-new-box-swing">
                            <ul className="theme-new-list">
                              <li className="theme-new-item">
                                Theme JavaSwing thời trang
                              </li>
                              <li className="theme-new-item">
                                Theme JavaSwing nội thất
                              </li>
                              <li className="theme-new-item">
                                Theme JavaSwing công nghệ
                              </li>
                              <li className="theme-new-item">
                                Theme JavaSwing thực phẩm
                              </li>
                            </ul>
                          </div>
                        </li>
                      </ul>
                      <ul className="theme-new-list">
                        <li className="theme-new-item --header ">
                          THEME GIỚI THIỆU
                        </li>
                        <li className="theme-new-item --laravel">
                          Theme Laravel
                          <div className="theme-new-box-laravel">
                            <ul className="theme-new-list">
                              <li className="theme-new-item">
                                Theme Laravel thời trang
                              </li>
                              <li className="theme-new-item">
                                Theme Laravel nội thất
                              </li>
                              <li className="theme-new-item">
                                Theme Laravel thực phẩm
                              </li>
                              <li className="theme-new-item">
                                Theme Laravel công nghệ
                              </li>
                            </ul>
                          </div>
                        </li>
                        <li className="theme-new-item --spring">
                          Theme SpringBoot
                          <div className="theme-new-box-spring">
                            <ul className="theme-new-list">
                              <li className="theme-new-item">
                                Theme Spring thời trang
                              </li>
                              <li className="theme-new-item">
                                Theme Spring nội thất
                              </li>
                              <li className="theme-new-item">
                                Theme Spring thực phẩm
                              </li>
                              <li className="theme-new-item">
                                Theme Spring công nghệ
                              </li>
                            </ul>
                          </div>
                        </li>
                        <li className="theme-new-item --swing">
                          Theme JavaSwing
                          <div className="theme-new-box-swing">
                            <ul className="theme-new-list">
                              <li className="theme-new-item">
                                Theme JavaSwing thời trang
                              </li>
                              <li className="theme-new-item">
                                Theme JavaSwing nội thất
                              </li>
                              <li className="theme-new-item">
                                Theme JavaSwing công nghệ
                              </li>
                              <li className="theme-new-item">
                                Theme JavaSwing thực phẩm
                              </li>
                            </ul>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li>
                    Theme giá rẻ
                    <div className="theme-new-box">
                      <ul className="theme-new-list">
                        <li className="theme-new-item --header ">
                          THEME BÁN HÀNG
                        </li>
                        <li className="theme-new-item --laravel">
                          Theme Laravel
                          <div className="theme-new-box-laravel">
                            <ul className="theme-new-list">
                              <li className="theme-new-item">
                                Theme Laravel thời trang
                              </li>
                              <li className="theme-new-item">
                                Theme Laravel nội thất
                              </li>
                              <li className="theme-new-item">
                                Theme Laravel thực phẩm
                              </li>
                              <li className="theme-new-item">
                                Theme Laravel công nghệ
                              </li>
                            </ul>
                          </div>
                        </li>
                        <li className="theme-new-item --spring">
                          Theme SpringBoot
                          <div className="theme-new-box-spring">
                            <ul className="theme-new-list">
                              <li className="theme-new-item">
                                Theme Spring thời trang
                              </li>
                              <li className="theme-new-item">
                                Theme Spring nội thất
                              </li>
                              <li className="theme-new-item">
                                Theme Spring thực phẩm
                              </li>
                              <li className="theme-new-item">
                                Theme Spring công nghệ
                              </li>
                            </ul>
                          </div>
                        </li>
                        <li className="theme-new-item --swing">
                          Theme JavaSwing
                          <div className="theme-new-box-swing">
                            <ul className="theme-new-list">
                              <li className="theme-new-item">
                                Theme JavaSwing thời trang
                              </li>
                              <li className="theme-new-item">
                                Theme JavaSwing nội thất
                              </li>
                              <li className="theme-new-item">
                                Theme JavaSwing công nghệ
                              </li>
                              <li className="theme-new-item">
                                Theme JavaSwing thực phẩm
                              </li>
                            </ul>
                          </div>
                        </li>
                      </ul>
                      <ul className="theme-new-list">
                        <li className="theme-new-item --header ">
                          THEME GIỚI THIỆU
                        </li>
                        <li className="theme-new-item --laravel">
                          Theme Laravel
                          <div className="theme-new-box-laravel">
                            <ul className="theme-new-list">
                              <li className="theme-new-item">
                                Theme Laravel thời trang
                              </li>
                              <li className="theme-new-item">
                                Theme Laravel nội thất
                              </li>
                              <li className="theme-new-item">
                                Theme Laravel thực phẩm
                              </li>
                              <li className="theme-new-item">
                                Theme Laravel công nghệ
                              </li>
                            </ul>
                          </div>
                        </li>
                        <li className="theme-new-item --spring">
                          Theme SpringBoot
                          <div className="theme-new-box-spring">
                            <ul className="theme-new-list">
                              <li className="theme-new-item">
                                Theme Spring thời trang
                              </li>
                              <li className="theme-new-item">
                                Theme Spring nội thất
                              </li>
                              <li className="theme-new-item">
                                Theme Spring thực phẩm
                              </li>
                              <li className="theme-new-item">
                                Theme Spring công nghệ
                              </li>
                            </ul>
                          </div>
                        </li>
                        <li className="theme-new-item --swing">
                          Theme JavaSwing
                          <div className="theme-new-box-swing">
                            <ul className="theme-new-list">
                              <li className="theme-new-item">
                                Theme JavaSwing thời trang
                              </li>
                              <li className="theme-new-item">
                                Theme JavaSwing nội thất
                              </li>
                              <li className="theme-new-item">
                                Theme JavaSwing công nghệ
                              </li>
                              <li className="theme-new-item">
                                Theme JavaSwing thực phẩm
                              </li>
                            </ul>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li>
                    Database
                    <div className="theme-new-box">
                      <ul className="theme-new-list">
                        <li className="theme-new-item --header ">
                          THEME BÁN HÀNG
                        </li>
                        <li className="theme-new-item --laravel">
                          Theme Laravel
                          <div className="theme-new-box-laravel">
                            <ul className="theme-new-list">
                              <li className="theme-new-item">
                                Theme Laravel thời trang
                              </li>
                              <li className="theme-new-item">
                                Theme Laravel nội thất
                              </li>
                              <li className="theme-new-item">
                                Theme Laravel thực phẩm
                              </li>
                              <li className="theme-new-item">
                                Theme Laravel công nghệ
                              </li>
                            </ul>
                          </div>
                        </li>
                        <li className="theme-new-item --spring">
                          Theme SpringBoot
                          <div className="theme-new-box-spring">
                            <ul className="theme-new-list">
                              <li className="theme-new-item">
                                Theme Spring thời trang
                              </li>
                              <li className="theme-new-item">
                                Theme Spring nội thất
                              </li>
                              <li className="theme-new-item">
                                Theme Spring thực phẩm
                              </li>
                              <li className="theme-new-item">
                                Theme Spring công nghệ
                              </li>
                            </ul>
                          </div>
                        </li>
                        <li className="theme-new-item --swing">
                          Theme JavaSwing
                          <div className="theme-new-box-swing">
                            <ul className="theme-new-list">
                              <li className="theme-new-item">
                                Theme JavaSwing thời trang
                              </li>
                              <li className="theme-new-item">
                                Theme JavaSwing nội thất
                              </li>
                              <li className="theme-new-item">
                                Theme JavaSwing công nghệ
                              </li>
                              <li className="theme-new-item">
                                Theme JavaSwing thực phẩm
                              </li>
                            </ul>
                          </div>
                        </li>
                      </ul>
                      <ul className="theme-new-list">
                        <li className="theme-new-item --header ">
                          THEME GIỚI THIỆU
                        </li>
                        <li className="theme-new-item --laravel">
                          Theme Laravel
                          <div className="theme-new-box-laravel">
                            <ul className="theme-new-list">
                              <li className="theme-new-item">
                                Theme Laravel thời trang
                              </li>
                              <li className="theme-new-item">
                                Theme Laravel nội thất
                              </li>
                              <li className="theme-new-item">
                                Theme Laravel thực phẩm
                              </li>
                              <li className="theme-new-item">
                                Theme Laravel công nghệ
                              </li>
                            </ul>
                          </div>
                        </li>
                        <li className="theme-new-item --spring">
                          Theme SpringBoot
                          <div className="theme-new-box-spring">
                            <ul className="theme-new-list">
                              <li className="theme-new-item">
                                Theme Spring thời trang
                              </li>
                              <li className="theme-new-item">
                                Theme Spring nội thất
                              </li>
                              <li className="theme-new-item">
                                Theme Spring thực phẩm
                              </li>
                              <li className="theme-new-item">
                                Theme Spring công nghệ
                              </li>
                            </ul>
                          </div>
                        </li>
                        <li className="theme-new-item --swing">
                          Theme JavaSwing
                          <div className="theme-new-box-swing">
                            <ul className="theme-new-list">
                              <li className="theme-new-item">
                                Theme JavaSwing thời trang
                              </li>
                              <li className="theme-new-item">
                                Theme JavaSwing nội thất
                              </li>
                              <li className="theme-new-item">
                                Theme JavaSwing công nghệ
                              </li>
                              <li className="theme-new-item">
                                Theme JavaSwing thực phẩm
                              </li>
                            </ul>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li>
                    Api backend
                    <div className="theme-new-box">
                      <ul className="theme-new-list">
                        <li className="theme-new-item --header ">
                          THEME BÁN HÀNG
                        </li>
                        <li className="theme-new-item --laravel">
                          Theme Laravel
                          <div className="theme-new-box-laravel">
                            <ul className="theme-new-list">
                              <li className="theme-new-item">
                                Theme Laravel thời trang
                              </li>
                              <li className="theme-new-item">
                                Theme Laravel nội thất
                              </li>
                              <li className="theme-new-item">
                                Theme Laravel thực phẩm
                              </li>
                              <li className="theme-new-item">
                                Theme Laravel công nghệ
                              </li>
                            </ul>
                          </div>
                        </li>
                        <li className="theme-new-item --spring">
                          Theme SpringBoot
                          <div className="theme-new-box-spring">
                            <ul className="theme-new-list">
                              <li className="theme-new-item">
                                Theme Spring thời trang
                              </li>
                              <li className="theme-new-item">
                                Theme Spring nội thất
                              </li>
                              <li className="theme-new-item">
                                Theme Spring thực phẩm
                              </li>
                              <li className="theme-new-item">
                                Theme Spring công nghệ
                              </li>
                            </ul>
                          </div>
                        </li>
                        <li className="theme-new-item --swing">
                          Theme JavaSwing
                          <div className="theme-new-box-swing">
                            <ul className="theme-new-list">
                              <li className="theme-new-item">
                                Theme JavaSwing thời trang
                              </li>
                              <li className="theme-new-item">
                                Theme JavaSwing nội thất
                              </li>
                              <li className="theme-new-item">
                                Theme JavaSwing công nghệ
                              </li>
                              <li className="theme-new-item">
                                Theme JavaSwing thực phẩm
                              </li>
                            </ul>
                          </div>
                        </li>
                      </ul>
                      <ul className="theme-new-list">
                        <li className="theme-new-item --header ">
                          THEME GIỚI THIỆU
                        </li>
                        <li className="theme-new-item --laravel">
                          Theme Laravel
                          <div className="theme-new-box-laravel">
                            <ul className="theme-new-list">
                              <li className="theme-new-item">
                                Theme Laravel thời trang
                              </li>
                              <li className="theme-new-item">
                                Theme Laravel nội thất
                              </li>
                              <li className="theme-new-item">
                                Theme Laravel thực phẩm
                              </li>
                              <li className="theme-new-item">
                                Theme Laravel công nghệ
                              </li>
                            </ul>
                          </div>
                        </li>
                        <li className="theme-new-item --spring">
                          Theme SpringBoot
                          <div className="theme-new-box-spring">
                            <ul className="theme-new-list">
                              <li className="theme-new-item">
                                Theme Spring thời trang
                              </li>
                              <li className="theme-new-item">
                                Theme Spring nội thất
                              </li>
                              <li className="theme-new-item">
                                Theme Spring thực phẩm
                              </li>
                              <li className="theme-new-item">
                                Theme Spring công nghệ
                              </li>
                            </ul>
                          </div>
                        </li>
                        <li className="theme-new-item --swing">
                          Theme JavaSwing
                          <div className="theme-new-box-swing">
                            <ul className="theme-new-list">
                              <li className="theme-new-item">
                                Theme JavaSwing thời trang
                              </li>
                              <li className="theme-new-item">
                                Theme JavaSwing nội thất
                              </li>
                              <li className="theme-new-item">
                                Theme JavaSwing công nghệ
                              </li>
                              <li className="theme-new-item">
                                Theme JavaSwing thực phẩm
                              </li>
                            </ul>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li>Bài viết</li>
                  <li>
                    Hỗ trợ
                    <div className="theme-new-box">
                      <ul className="theme-new-list">
                        <li className="theme-new-item --header ">
                          THEME BÁN HÀNG
                        </li>
                        <li className="theme-new-item --laravel">
                          Theme Laravel
                          <div className="theme-new-box-laravel">
                            <ul className="theme-new-list">
                              <li className="theme-new-item">
                                Theme Laravel thời trang
                              </li>
                              <li className="theme-new-item">
                                Theme Laravel nội thất
                              </li>
                              <li className="theme-new-item">
                                Theme Laravel thực phẩm
                              </li>
                              <li className="theme-new-item">
                                Theme Laravel công nghệ
                              </li>
                            </ul>
                          </div>
                        </li>
                        <li className="theme-new-item --spring">
                          Theme SpringBoot
                          <div className="theme-new-box-spring">
                            <ul className="theme-new-list">
                              <li className="theme-new-item">
                                Theme Spring thời trang
                              </li>
                              <li className="theme-new-item">
                                Theme Spring nội thất
                              </li>
                              <li className="theme-new-item">
                                Theme Spring thực phẩm
                              </li>
                              <li className="theme-new-item">
                                Theme Spring công nghệ
                              </li>
                            </ul>
                          </div>
                        </li>
                        <li className="theme-new-item --swing">
                          Theme JavaSwing
                          <div className="theme-new-box-swing">
                            <ul className="theme-new-list">
                              <li className="theme-new-item">
                                Theme JavaSwing thời trang
                              </li>
                              <li className="theme-new-item">
                                Theme JavaSwing nội thất
                              </li>
                              <li className="theme-new-item">
                                Theme JavaSwing công nghệ
                              </li>
                              <li className="theme-new-item">
                                Theme JavaSwing thực phẩm
                              </li>
                            </ul>
                          </div>
                        </li>
                      </ul>
                      <ul className="theme-new-list">
                        <li className="theme-new-item --header ">
                          THEME GIỚI THIỆU
                        </li>
                        <li className="theme-new-item --laravel">
                          Theme Laravel
                          <div className="theme-new-box-laravel">
                            <ul className="theme-new-list">
                              <li className="theme-new-item">
                                Theme Laravel thời trang
                              </li>
                              <li className="theme-new-item">
                                Theme Laravel nội thất
                              </li>
                              <li className="theme-new-item">
                                Theme Laravel thực phẩm
                              </li>
                              <li className="theme-new-item">
                                Theme Laravel công nghệ
                              </li>
                            </ul>
                          </div>
                        </li>
                        <li className="theme-new-item --spring">
                          Theme SpringBoot
                          <div className="theme-new-box-spring">
                            <ul className="theme-new-list">
                              <li className="theme-new-item">
                                Theme Spring thời trang
                              </li>
                              <li className="theme-new-item">
                                Theme Spring nội thất
                              </li>
                              <li className="theme-new-item">
                                Theme Spring thực phẩm
                              </li>
                              <li className="theme-new-item">
                                Theme Spring công nghệ
                              </li>
                            </ul>
                          </div>
                        </li>
                        <li className="theme-new-item --swing">
                          Theme JavaSwing
                          <div className="theme-new-box-swing">
                            <ul className="theme-new-list">
                              <li className="theme-new-item">
                                Theme JavaSwing thời trang
                              </li>
                              <li className="theme-new-item">
                                Theme JavaSwing nội thất
                              </li>
                              <li className="theme-new-item">
                                Theme JavaSwing công nghệ
                              </li>
                              <li className="theme-new-item">
                                Theme JavaSwing thực phẩm
                              </li>
                            </ul>
                          </div>
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
                  {/* <li className="login">
                    <div>Đăng ký</div>
                    <div>Đăng nhập</div>
                  </li> */}
                  <li className="cart" onClick={(e) => this.handleCart(e)}>
                    <i className="bi bi-cart"></i>
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
              <button type="button" className="btn">
                <i className="bi bi-search modal"></i>
              </button>
            </div>
          </div>
        )}
      </>
    );
  }
}
export default withRouter(Nav);
