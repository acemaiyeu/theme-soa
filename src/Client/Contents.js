import React from "react";
import "./contents.scss";
import { withRouter } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";

const url_api_v0 = process.env.REACT_APP_URL_API_V0;
class Contents extends React.Component {
  state = {
    description: { type: "description" },
    listThemes: [],
  };
  isEmpty = (obj) => {
    for (var prop in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, prop)) {
        return false;
      }
    }
    return true;
  };
  handleDetail = (item) => {
    this.props.history.push(`/detail/${item.title} - ${item.code}`);
  };
  componentDidMount = () => {
    console.log("CHECK URL CONTENT: ", url_api_v0);
    axios
      .get(url_api_v0 + "themes")
      .then((response) => {
        this.setState({ listThemes: response.data });
      })
      .catch((error) => {
        console.error("Có lỗi khi gọi API:", error);
      });
  };
  handleDeleteUser = (user) => {
    this.props.deleteUserRedux(user);
  };
  render() {
    let listThemes = this.state.listThemes.data;
    let listUsers = this.props.dataRedux;

    return (
      <>
        <div className="contents">
          {listUsers &&
            listUsers.length > 0 &&
            listUsers.map((item, index) => {
              return (
                <div key={item.id}>
                  {" "}
                  {index + 1} - {item.name}{" "}
                  <span onClick={() => this.handleDeleteUser(item)}>x</span>
                </div>
              );
            })}
          <div className="header-filter">
            <div className="header-filter-box">
              <div className="header-filter-item">
                {listThemes?.length > 0 && (
                  <p>Tìm thấy {listThemes?.length} kết quả</p>
                )}
              </div>
              <div className="header-filter-item">
                <div className="sort-box">
                  <div className="sort-box-label">Sắp xếp theo: </div>
                  <select>
                    <option>Nổi bật</option>
                    <option>Giá giảm dần</option>
                    <option>Giá tăng dần</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="content">
            {listThemes &&
              listThemes.length > 0 &&
              listThemes.map((item, index) => {
                return (
                  <React.Fragment key={index}>
                    <div className="content-item" key={index}>
                      <div className="content-item-img">
                        <img
                          src="https://media.istockphoto.com/id/1177199065/photo/african-lion-and-night-in-africa-banner-savannah-landscape-theme-king-of-animals-proud.jpg?s=612x612&w=0&k=20&c=I6zG27ksq2_4rBjLCN8kQMuiBysPA_rnfurxbGsP8BE="
                          alt="2"
                        />
                      </div>
                      <div className="content-item-text">
                        <h3>{item.title}</h3>

                        <span className="price">
                          {/* {item.price_old = 1 && item.price_old > 0 && ( */}
                          {/* <p className="price-old">{item.price_text} </p> */}
                          {/* )} */}

                          <p className="price-new">{item.price_text}</p>
                        </span>
                      </div>
                      <div className="content-item-info">
                        <span>Framework: {item.framework}</span>
                        <span>Thư viện: {item.short_description}</span>
                      </div>
                      {/* <div className="content-item-btn">
                        <button
                          className="btn-default --btn-custom btn-bg-orange-op-5"
                          onClick={() => this.handleDetail(item)}
                        >
                          #123456 <i className="bi bi-arrow-right-short"></i>{" "}
                          Chi tiết
                        </button>
                      </div> */}
                      <div className="content-item-modal">
                        <div className="content-item-modal-header">
                          <p>- Responsive: {item.responsive}</p>
                          {item.gifts &&
                            item.gifts.details &&
                            item.gifts.details.length > 0 &&
                            item.gifts.details.map((gift, index) => {
                              return <p key={gift.id}> - {gift.title}</p>;
                            })}
                        </div>
                        <button
                          className="btn-default --btn-custom btn-bg-orange-op-5"
                          onClick={() => this.handleDetail(item)}
                        >
                          <span className="content-item-code">
                            #123456 <i className="bi bi-arrow-right-short"></i>
                          </span>
                          XEM CHI TIẾT
                        </button>
                      </div>
                    </div>
                  </React.Fragment>
                );
              })}
          </div>
        </div>
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    dataRedux: state.users,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    deleteUserRedux: (userDelete) =>
      dispatch({ type: "DELETE_USER", payload: userDelete }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Contents));
