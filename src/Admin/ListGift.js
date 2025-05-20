import React from "react";
// import "./ListGifts.scss";
import "./bootstrap4.css";
import { withRouter } from "react-router-dom";
import { getListGift, getGiftsByLink } from "../store/actions/GiftActions";

class listGift extends React.Component {
  state = {
    listGifts: [],
    param_code: "",
    param_name: "",
  };
  getGifts = async () => {
    let listGifts = await getListGift();
    this.setState({ listGifts: listGifts });
  };
  getGiftsByLink = async (link) => {
    if (link === "") {
      return;
    }
    let { param_name } = this.state;
    let params = "";

    if (param_name !== "") {
      params += "&title=" + param_name;
    }

    let themes = await getGiftsByLink(link, params);
    this.setState({ ListTheme: themes });
  };
  getDetailGift = (id) => {
    this.props.history.push("/admin/gift/create/" + id);
  };
  async componentDidMount() {
    await this.getGifts();
  }

  render() {
    let { listGifts } = this.state;
    return (
      <>
        <header className="header-function">
          <div
            className="btn-default btn-bg-green-op-5 "
            onClick={() => this.props.history.push("/admin/gift/create")}
          >
            <div className="btn-default-icon ">
              <i className="bi bi-plus-lg"></i>
            </div>
            <div className="btn-default-text">Tạo mới Loại Quà</div>
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
                <th className="col-8">Tên Quà</th>
                <th className="col-4">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {listGifts?.data &&
                listGifts?.data.length > 0 &&
                listGifts?.data.map((item, index) => {
                  return (
                    <tr key={index} onClick={() => this.getDetailGift(item.id)}>
                      <td>{index + 1}</td>
                      <td>{item.title}</td>
                      <td>
                        <button className="btn btn-bg-orange-op-5">Xóa</button>
                      </td>
                    </tr>
                  );
                })}
              {listGifts.length === 0 && (
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
                disabled={listGifts?.meta?.pagination.current_page === 1}
              >
                Trang đầu
              </button>
              <button
                className="prev-page"
                disabled={
                  listGifts?.meta?.pagination.current_page <=
                    listGifts?.meta?.pagination.total_pages &&
                  !listGifts?.meta?.pagination?.links?.previous
                }
                onClick={() =>
                  this.getGiftsByLink(
                    listGifts?.meta?.pagination?.links?.previous
                  )
                }
              >
                Trang trước
              </button>
              <button className="current-page">
                {listGifts?.meta?.pagination.current_page} {"/"}{" "}
                {listGifts?.meta?.pagination.total_pages}
              </button>
              <button
                className="next-page"
                disabled={
                  listGifts?.meta?.pagination.current_page >=
                    listGifts?.meta?.pagination.total_pages &&
                  !listGifts?.meta?.pagination?.links?.next
                }
                onClick={() =>
                  this.getGiftsByLink(listGifts?.meta?.pagination?.links?.next)
                }
              >
                Trang sau
              </button>
              <button
                className="last-page"
                disabled={
                  listGifts?.meta?.pagination.current_page ===
                  listGifts?.meta?.pagination.total_pages
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

export default withRouter(listGift);
