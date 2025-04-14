import React from "react";
import "./Details.scss";
import { addToCart } from "./CartFunctions";
import { url_api_v0 } from "../config";
import parse from "html-react-parser";
import axios from "axios";
// import "./Home.scss";
class Detail extends React.Component {
  state = {
    description: { type: "description" },
  };
  handleDescription = (type) => {
    this.setState({ description: { type } });
  };
  handleAddToCart = (theme_id) => {
    addToCart(theme_id);
    this.getCart();
  };
  getCart = () => {
    axios
      .get(url_api_v0 + "cart?session_id=" + localStorage.getItem("sessionId"))

      .then((response) => {
        this.setState({
          cart: response.data,
        });

        localStorage.setItem("cart", JSON.stringify(response.data));
        if (Array.isArray(response.data?.data)) {
          this.setState({
            cart: null,
          });
          localStorage.removeItem("cart");
          this.props.history.push("/");
        }
      })
      .catch((error) => {
        console.error("Có lỗi khi gọi API get Cart:", error);
      });
  };
  getDetail = () => {
    let { path } = this.props.match.params;
    let theme_code = path.replace("-", "           ").slice(-15).trim();

    axios
      .get(url_api_v0 + "theme/" + theme_code)
      .then((response) => {})
      .catch((error) => {});
  };
  componentDidMount() {
    // this.getDetail();
  }
  render() {
    let { description } = this.state;
    return (
      <>
        <div className="container-detail">
          <div className="content">
            <div className="content__item">
              <div className="left">
                <div className="img">
                  <img
                    alt="img"
                    src="https://media.istockphoto.com/id/1177199065/photo/african-lion-and-night-in-africa-banner-savannah-landscape-theme-king-of-animals-proud.jpg?s=612x612&w=0&k=20&c=I6zG27ksq2_4rBjLCN8kQMuiBysPA_rnfurxbGsP8BE="
                  ></img>
                </div>
                <div className="text"></div>
              </div>
              <div className="right">
                <p>
                  Mã sản phẩm:{" "}
                  <strong>
                    <i>NFHFD01</i>
                  </strong>{" "}
                </p>
                <h3>Theme Laravel điện máy, gia dụng nồi chiên không dầu</h3>
                <p>Sử dụng framework laravel</p>
                <hr />
                <p>Danh mục: Thiết kế web, thiết kế </p>
                <hr />
                <div className="price">
                  <div className="price-old">
                    {(10000000).toLocaleString("vi-VN")} đ
                  </div>
                  <div className="price-new">
                    {(9000000).toLocaleString("vi-VN")} đ
                  </div>
                </div>
                <div className="button">
                  <div className="btn-add-to-cart">
                    <div className="icon">
                      <i className="bi bi-display"></i>
                    </div>
                    <button className="button-add-to-cart">Xem demo</button>
                  </div>
                  <div className="btn-add-to-cart">
                    <div className="icon">
                      <i className="bi bi-cart-plus"></i>
                    </div>
                    <button
                      className="button-add-to-cart"
                      onClick={() => this.handleAddToCart(1)}
                    >
                      Thêm vào giỏ hàng
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="info">
              <hr />
              <div className="slider">
                <div className="slider-tab">
                  <div
                    className={`slider-tab-item ${
                      description.type === "description" ? "tab--active" : ""
                    }`}
                    onClick={() => this.handleDescription("description")}
                  >
                    Mô tả
                  </div>
                  <div
                    className={`slider-tab-item ${
                      description.type === "rating" ? "tab--active" : ""
                    }`}
                    onClick={() => this.handleDescription("rating")}
                  >
                    Đánh giá
                  </div>
                  <div
                    className={`slider-tab-item ${
                      description.type === "used" ? "tab--active" : ""
                    }`}
                    onClick={() => this.handleDescription("used")}
                  >
                    Hướng dẫn cài đặt
                  </div>
                </div>
                <div className="slider-content">
                  {description.type === "description" && (
                    <span>Đây là phần mô tả</span>
                  )}
                  {description.type === "rating" && (
                    <div className="container-rating">
                      <h5>Hãy là người đầu tiên nhận xét </h5>
                      <div className="rating">
                        <div className="stars">
                          <div className="title">Đánh giá của bạn:</div>
                          <div className="list-star">
                            <span className="star">
                              <i className="bi bi-star-fill"></i>
                            </span>
                            <span className="star">
                              <i className="bi bi-star-fill"></i>
                              <i className="bi bi-star-fill"></i>
                            </span>
                            <span className="star">
                              <i className="bi bi-star-fill"></i>
                              <i className="bi bi-star-fill"></i>
                              <i className="bi bi-star-fill"></i>
                            </span>
                            <span className="star">
                              <i className="bi bi-star-fill"></i>
                              <i className="bi bi-star-fill"></i>
                              <i className="bi bi-star-fill"></i>
                              <i className="bi bi-star-fill"></i>
                            </span>
                            <span className="star">
                              <i className="bi bi-star-fill"></i>
                              <i className="bi bi-star-fill"></i>
                              <i className="bi bi-star-fill"></i>
                              <i className="bi bi-star-fill"></i>
                              <i className="bi bi-star-fill"></i>
                            </span>
                          </div>
                        </div>
                        <div className="comment">
                          <div className="title">Nhận xét của bạn *</div>
                          <textarea
                            className="comment"
                            rows="5"
                            cols="50"
                            placeholder="Theme này dễ sử dụng. Hỗ trợ nhiệt tình"
                          ></textarea>
                        </div>
                        <div className="info-user">
                          <div className="username">
                            <label className="label">Tên*</label>
                            <input className="inp-username input"></input>
                          </div>
                          <div className="email">
                            <label className="label">Email*</label>
                            <input className="inp-email input"></input>
                          </div>
                        </div>
                        <button className="btn">Gửi đi</button>
                      </div>
                    </div>
                  )}
                  {description.type === "used" && (
                    <p>Đây là phần hướng dẫn cài đặt</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Detail;
