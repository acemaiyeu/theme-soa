import React from "react";
import "./Theme.scss";
import FormTheme from "./FormTheme";
class Theme extends React.Component {
  state = {
    theme: {},
  };
  handleClick = (item) => {
    if (item.title == undefined) {
      item = {
        id: null,
      };
    }
    this.setState({ theme: item });
  };
  render() {
    return (
      <>
        <div className="container-theme">
          <div className="container-content-admin">
            <div className="contents-admin">
              <header className="content-theme-header">
                <div className="btn-default btn-bg-green-op-5 ">
                  <div className="btn-default-icon ">
                    <i className="bi bi-plus-lg"></i>
                  </div>
                  <div className="btn-default-text">Tạo mới theme</div>
                </div>

                <div className="btn-default btn-bg-yellow-op-5 ">
                  <div className="btn-default-icon ">
                    <i className="bi bi-printer-fill"></i>
                  </div>
                  <div className="btn-default-text">In dữ liệu</div>
                </div>

                <div className="btn-default btn-bg-green-op-4 ">
                  <div className="btn-default-icon ">
                    <i className="bi bi-file-earmark-excel"></i>
                  </div>
                  <div className="btn-default-text">Xuất Excel</div>
                </div>

                {/* <div className="btn-default btn-bg-gray-op-5 ">
                  <div className="btn-default-icon ">
                    <i className="bi bi-trash3-fill"></i>
                  </div>
                  <div className="btn-default-text">Tạo mới</div>
                </div> */}
              </header>
              <hr />
              <div className="body-content">
                <div className="content-filter">
                  <div className="show-result">
                    Hiện:{" "}
                    <select>
                      <option>10</option>
                      <option>20</option>
                      <option>30</option>
                      <option>40</option>
                      <option>50</option>
                    </select>{" "}
                    Kết quả
                  </div>
                  <div className="search">
                    <input
                      className="form-control form-control-sm"
                      type="text"
                      placeholder="Tìm kiếm"
                    />
                    <i className="bi bi-search search-icon"></i>
                  </div>
                </div>
                <div className="content-table">
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Thumbnail</th>
                        <th scope="col">Title</th>
                        <th scope="col">Framework</th>
                        <th scope="col">Loại</th>
                        <th scope="col">Giá</th>
                        <th scope="col">Hành động</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">1</th>
                        <td>
                          <img src="https://media.istockphoto.com/id/1177199065/photo/african-lion-and-night-in-africa-banner-savannah-landscape-theme-king-of-animals-proud.jpg?s=612x612&w=0&k=20&c=I6zG27ksq2_4rBjLCN8kQMuiBysPA_rnfurxbGsP8BE=" />
                        </td>
                        <td>
                          Theme Laravel điện máy, gia dụng nồi chiên không dầu
                        </td>
                        <td>Laravel Framework</td>
                        <td>Theme</td>
                        <td>1.000.000 đ</td>
                        <td className="td_button">
                          <button className="btn-default btn-bg-yellow-op-5 ">
                            <i className="bi bi-pencil"></i>
                          </button>
                          <button className="btn-default btn-bg-red-op-5 ">
                            <i className="bi bi-trash3"></i>
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="content-page">
                  <div className="content-page-title"></div>
                  <div className="content-page-button"></div>
                </div>
              </div>
            </div>
          </div>
          <FormTheme theme={this.state.theme} />
        </div>
      </>
    );
  }
}

export default Theme;
