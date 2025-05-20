import React from "react";
import "./ListCategories.scss";
import "./bootstrap4.css";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
  getListCategory,
  getCategoryByLink,
} from "../store/actions/CategoryActions";

class listCategory extends React.Component {
  state = {
    listCategories: [],
    param_code: "",
    param_name: "",
  };
  getCategories = async () => {
    let listCategories = await getListCategory();
    this.setState({ listCategories: listCategories });
  };
  getCategoryByLink = async (link) => {
    if (link === "") {
      return;
    }
    let { param_code, param_name } = this.state;
    let params = "";
    if (param_code !== "") {
      params += "&code=" + param_code;
    }
    if (param_name !== "") {
      params += "&name=" + param_name;
    }

    let themes = await getCategoryByLink(link, params);
    this.setState({ ListTheme: themes });
  };
  getDetailCategory = (code) => {
    this.props.history.push("/admin/category/create/" + code);
  };
  async componentDidMount() {
    await this.getCategories();
  }

  render() {
    let { listCategories } = this.state;
    return (
      <>
        <header className="header-function">
          <div
            className="btn-default btn-bg-green-op-5 "
            onClick={() => this.props.history.push("/admin/category/create")}
          >
            <div className="btn-default-icon ">
              <i className="bi bi-plus-lg"></i>
            </div>
            <div className="btn-default-text">Tạo mới Loại Theme</div>
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

        <div className="list-order">
          <h3>Danh sách đơn hàng mới</h3>
          <hr />
          <table className="table table-bordered">
            <thead>
              <tr>
                <th className="col-1">STT</th>
                <th className="col-3">Mã Loại sản phẩm</th>
                <th className="col-3">Tên loại sản phẩm</th>
                <th className="col-3">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {listCategories?.data &&
                listCategories?.data.length > 0 &&
                listCategories?.data.map((item, index) => {
                  return (
                    <tr
                      key={index}
                      onClick={() => this.getDetailCategory(item.code)}
                    >
                      <td>{index + 1}</td>
                      <td>{item.code}</td>
                      <td>{item.name}</td>
                      <td>
                        <button className="btn btn-bg-orange-op-5">Xóa</button>
                      </td>
                    </tr>
                  );
                })}
              {listCategories.length === 0 && (
                <tr>
                  <td colSpan={4}>Không có dữ liệu</td>
                </tr>
              )}
            </tbody>
          </table>
          <div className="list-paginate">
            <div className="list-paginate-container">
              <button
                className="first-page"
                disabled={listCategories?.meta?.pagination.current_page === 1}
              >
                Trang đầu
              </button>
              <button
                className="prev-page"
                disabled={
                  listCategories?.meta?.pagination.current_page <=
                    listCategories?.meta?.pagination.total_pages &&
                  !listCategories?.meta?.pagination?.links?.previous
                }
                onClick={() =>
                  this.getCategoryByLink(
                    listCategories?.meta?.pagination?.links?.previous
                  )
                }
              >
                Trang trước
              </button>
              <button className="current-page">
                {listCategories?.meta?.pagination.current_page} {"/"}{" "}
                {listCategories?.meta?.pagination.total_pages}
              </button>
              <button
                className="next-page"
                disabled={
                  listCategories?.meta?.pagination.current_page >=
                    listCategories?.meta?.pagination.total_pages &&
                  !listCategories?.meta?.pagination?.links?.next
                }
                onClick={() =>
                  this.getCategoryByLink(
                    listCategories?.meta?.pagination?.links?.next
                  )
                }
              >
                Trang sau
              </button>
              <button
                className="last-page"
                disabled={
                  listCategories?.meta?.pagination.current_page ===
                  listCategories?.meta?.pagination.total_pages
                }
              >
                Trang cuối
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    listCategories: state.listCategories,
  };
};

export default connect(mapStateToProps)(withRouter(listCategory));
