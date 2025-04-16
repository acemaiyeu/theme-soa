import React from "react";
import "./Details.scss";
import { addToCart } from "./CartFunctions";
import { url_api_v0 } from "../config";
import parse from "html-react-parser";
import axios from "axios";
import { toast } from "react-toastify";
// import "./Home.scss";
class Detail extends React.Component {
  state = {
    description: { type: "description" },
    theme: {},
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
      .then((response) => {
        this.setState({
          theme: response.data?.data,
        });
      })
      .catch((error) => {
        toast.error(error.data);
      });
  };
  componentDidMount() {
    this.getDetail();
  }
  render() {
    let { description, theme } = this.state;
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
                <h3>Theme Laravel điện máy, gia dụng nồi chiên không dầu</h3>
                <p>
                  Mã sản phẩm:
                  <strong>
                    <i>{theme.code}</i>
                  </strong>
                </p>

                <div className="price --price-none-space">
                  {/* <div className="price-old">{theme.price_text}</div> */}
                  <div className="price-new">{theme.price_text}</div>
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
                      onClick={() => this.handleAddToCart(theme.id)}
                    >
                      Thêm vào giỏ hàng
                    </button>
                  </div>
                </div>
                {theme.gifts && (
                  <div className="gift-container">
                    {theme.gifts &&
                      theme.gifts.details &&
                      theme.gifts.details.length > 0 &&
                      theme.gifts.details.map((item, index) => {
                        return (
                          <div className="gift-item" key={item.id}>
                            <i className="bi bi-gift"></i>
                            <span>{item.title}</span>
                            <i className="bi bi-check2"></i>
                          </div>
                        );
                      })}
                  </div>
                )}
                <div className="required-container">
                  <h3>Điều kiện: </h3>
                  {typeof theme.document === "string"
                    ? parse(theme.document)
                    : null}
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
                  {/* <div
                    className={`slider-tab-item ${
                      description.type === "used" ? "tab--active" : ""
                    }`}
                    onClick={() => this.handleDescription("used")}
                  >
                    Hướng dẫn cài đặt
                  </div> */}
                </div>
                <hr />
                <div className="slider-content">
                  {description.type === "description" && (
                    <>
                      <span>Đây là phần mô tả</span>
                      {typeof theme.long_description === "string"
                        ? parse(theme.long_description)
                        : null}
                    </>
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
                        <button className="btn ">Gửi đi</button>
                      </div>
                    </div>
                  )}
                  {/* {description.type === "used" && (
                    <p>Đây là phần hướng dẫn cài đặt</p>
                  )} */}
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
