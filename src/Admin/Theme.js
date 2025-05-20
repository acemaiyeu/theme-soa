import React from "react";
import "./Theme.scss";
import FormTheme from "./FormTheme";
import axios from "axios";
import { toast } from "react-toastify";
import { getThemesByLink } from "../store/actions/ThemeActions";

const url_api_v1 = process.env.REACT_APP_URL_API_V1;
class Theme extends React.Component {
  state = {
    ListTheme: [],
    limit: 10,
    search: "",
    param_title: "",
    param_framework: "",
    param_limit: 10,
  };
  handleClick = (item) => {
    if (item === undefined) {
      item = {};
    }
    this.setState({ theme: item });
  };
  getThemesByLink = async (link) => {
    if (link === "") {
      return;
    }
    let { param_title, param_framework } = this.state;
    let params = "";
    if (param_title !== "") {
      params += "&title=" + param_title;
    }
    if (param_framework !== "") {
      params += "&framework=" + param_framework;
    }
    params += "&limit=" + this.state.param_limit;

    let themes = await getThemesByLink(link, params);
    this.setState({ ListTheme: themes });
  };
  handleChangeNumberLoadding = (e) => {
    let limit = Number(e.target.value);
    this.setState({ param_limit: limit });
    setTimeout(() => {
      this.getTheme();
    }, 500);
  };
  handleChangeSearch = (e) => {
    this.setState({ search: e.target.value });
  };
  getTheme = () => {
    let { param_title, param_framework, param_limit } = this.state;
    let params = "";
    if (param_title !== "") {
      params += "&title=" + param_title;
    }
    if (param_framework !== "") {
      params += "&framework=" + param_framework;
    }
    axios
      .get(
        url_api_v1 +
          "themes?limit=" +
          this.state.param_limit +
          params +
          "&title=" +
          this.state.search,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("admin_token")}`,
          },
        }
      )
      .then((response) => {
        this.setState({ ListTheme: response.data });
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
    if (ListTheme && ListTheme.length > 0) {
      ListTheme.map((item) => {
        if (item.id === theme.id) {
          item = theme;
        }
        return item;
      });
      this.setState({ ListTheme });
    }
  };
  componentDidMount() {
    this.getTheme();
  }
  // handleEdit = (item) => {
  //     this.setState({

  //     })
  // }
  render() {
    let { ListTheme, param_title, param_framework } = this.state;
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
                <div className="filter">
                  <div className="form-container">
                    <label>Title: </label>
                    <input
                      className="input"
                      defaultValue={param_title}
                      onChange={(e) =>
                        this.setState({ param_title: e.target.value })
                      }
                    />
                  </div>
                  <div className="form-container">
                    <label>Framework: </label>
                    <input
                      className="input"
                      defaultValue={param_framework}
                      onChange={(e) =>
                        this.setState({ param_framework: e.target.value })
                      }
                    />
                  </div>

                  <div className="form-container">
                    <button
                      className="btn btn-bg-orange-op-5"
                      onClick={() => this.getTheme()}
                    >
                      Tìm kiếm
                    </button>
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
                      {ListTheme?.data &&
                        ListTheme?.data.length > 0 &&
                        ListTheme?.data.map((item, index) => {
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
                <div className="list-paginate">
                  <div className="list-paginate-container">
                    <button
                      className="first-page"
                      disabled={ListTheme?.meta?.pagination.current_page === 1}
                    >
                      Trang đầu
                    </button>
                    <button
                      className="prev-page"
                      disabled={
                        ListTheme?.meta?.pagination.current_page <=
                          ListTheme?.meta?.pagination.total_pages &&
                        !ListTheme?.meta?.pagination?.links?.previous
                      }
                      onClick={() =>
                        this.getThemesByLink(
                          ListTheme?.meta?.pagination?.links?.previous
                        )
                      }
                    >
                      Trang trước
                    </button>
                    <button className="current-page">
                      {ListTheme?.meta?.pagination.current_page} {"/"}{" "}
                      {ListTheme?.meta?.pagination.total_pages}
                    </button>
                    <button
                      className="next-page"
                      disabled={
                        ListTheme?.meta?.pagination.current_page >=
                          ListTheme?.meta?.pagination.total_pages &&
                        !ListTheme?.meta?.pagination?.links?.next
                      }
                      onClick={() =>
                        this.getThemesByLink(
                          ListTheme?.meta?.pagination?.links?.next
                        )
                      }
                    >
                      Trang sau
                    </button>
                    <button
                      className="last-page"
                      disabled={
                        ListTheme?.meta?.pagination.current_page ===
                        ListTheme?.meta?.pagination.total_pages
                      }
                    >
                      Trang cuối
                    </button>
                  </div>
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
