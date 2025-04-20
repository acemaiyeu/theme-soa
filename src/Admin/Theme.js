import React from "react";
import "./Theme.scss";
import FormTheme from "./FormTheme";
import axios from "axios";
import { toast } from "react-toastify";

const url_api_v1 = process.env.REACT_APP_URL_API_V1;
class Theme extends React.Component {
  state = {
    ListTheme: [],
    limit: 10,
    search: "",
  };
  handleClick = (item) => {
    if (item === undefined) {
      item = {};
    }
    this.setState({ theme: item });
  };
  handleChangeNumberLoadding = (e) => {
    let limit = Number(e.target.value);
    this.setState({ limit });
    setTimeout(() => {
      this.getTheme();
    }, 500);
  };
  handleChangeSearch = (e) => {
    this.setState({ search: e.target.value });
  };
  getTheme = () => {
    axios
      .get(
        url_api_v1 +
          "themes?limit=" +
          this.state.limit +
          "&title=" +
          this.state.search,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("admin_token")}`,
          },
        }
      )
      .then((response) => {
        this.setState({ ListTheme: response.data?.data });
      })
      .catch((error) => {
        console.log("Loi goi api theme", error);
      });
  };
  deleteTheme = async (id) => {
    await axios
      .delete(url_api_v1 + "theme/" + id, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("admin_token")}`,
        },
      })
      .then((res) => {
        toast.success(res.data.message);
        this.getTheme();
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };
  saveTheme = (theme) => {
    let { ListTheme } = this.state;
    ListTheme.map((item) => {
      if (item.id === theme.id) {
        item = theme;
      }
      return item;
    });
    this.setState({ ListTheme });
  };
  componentDidMount() {
    this.getTheme();
  }
  // handleEdit = (item) => {
  //     this.setState({

  //     })
  // }
  render() {
    let { ListTheme } = this.state;
    return (
      <>
        <div className="container-theme">
          <div className="container-content-admin">
            <div className="contents-admin">
              <header className="content-theme-header">
                <div
                  className="btn-default btn-bg-green-op-5 "
                  onClick={() => this.handleClick(undefined)}
                >
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
                    <select
                      onChange={(e) => this.handleChangeNumberLoadding(e)}
                    >
                      <option value={10}>10</option>
                      <option value={20}>20</option>
                      <option value={30}>30</option>
                      <option value={40}>40</option>
                      <option value={50}>50</option>
                    </select>
                    Kết quả
                  </div>
                  <div className="search">
                    <input
                      className="form-control form-control-sm"
                      type="text"
                      placeholder="Tìm kiếm"
                      value={this.state.search}
                      onChange={(e) => this.handleChangeSearch(e)}
                    />
                    <i
                      className="bi bi-search search-icon"
                      onClick={() => this.getTheme()}
                    ></i>
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
                      {/* <tr>
                        <th scope="row">1</th>
                        <td>
                          <img
                            alt="img"
                            src="https://media.istockphoto.com/id/1177199065/photo/african-lion-and-night-in-africa-banner-savannah-landscape-theme-king-of-animals-proud.jpg?s=612x612&w=0&k=20&c=I6zG27ksq2_4rBjLCN8kQMuiBysPA_rnfurxbGsP8BE="
                          />
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
                      </tr> */}
                      {ListTheme &&
                        ListTheme.length > 0 &&
                        ListTheme.map((item, index) => {
                          return (
                            <tr key={item.id}>
                              <th scope="row">{index + 1}</th>
                              <td>
                                <img alt="img" src={item.thumbnail_img} />
                              </td>
                              <td>{item.title}</td>
                              <td>{item.framework}</td>
                              <td>{item.type}</td>
                              <td>{item.price_text}</td>
                              <td className="td_button">
                                <button
                                  className="btn-default btn-bg-yellow-op-5 "
                                  onClick={() => this.handleClick(item)}
                                >
                                  <i className="bi bi-pencil"></i>
                                </button>
                                <button
                                  className="btn-default btn-bg-red-op-5"
                                  onClick={() => this.deleteTheme(item.id)}
                                >
                                  <i className="bi bi-trash3"></i>
                                </button>
                              </td>
                            </tr>
                          );
                        })}
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
          <FormTheme
            theme={this.state.theme}
            saveTheme={this.saveTheme}
            handleClick={this.handleClick}
          />
        </div>
      </>
    );
  }
}

export default Theme;
