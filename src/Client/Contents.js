import React from "react";
import "./contents.scss";
import { withRouter } from "react-router-dom";
class Contents extends React.Component {
  state = {
    description: { type: "description" },
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
    console.log(item);
    this.props.history.push(`/detail/${item.title}`);
  };
  render() {
    let { listThemes } = this.props;
    // console.log(listThemes);
    let { description } = this.state;
    let isExistObject = this.isEmpty(description);

    return (
      <>
        <div className="contents">
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
                        <p>{item.content}</p>
                        <span className="price">
                          <p className="price-old">
                            {item.price_old.toLocaleString("vi-VN")} đ
                          </p>
                          <p className="price-new">
                            {item.price.toLocaleString("vi-VN")} đ
                          </p>
                        </span>
                      </div>
                      <div className="content-item-info">
                        <span>Framework: {item.framework}</span>
                        <span>Thư viện: {item.dependencies}</span>
                      </div>
                      <div className="content-item-btn">
                        <button
                          className="btn btn-minium"
                          onClick={() => this.handleDetail(item)}
                        >
                          Xem chi tiết
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

export default withRouter(Contents);
