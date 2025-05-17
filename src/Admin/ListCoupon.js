import React from "react";
import "./ListCoupon.scss";
import {
  getCoupons,
  getCouponByLink,
  changeStatusCoupon,
} from "../store/actions/CouponActions";
import { withRouter } from "react-router-dom";
class ListCoupon extends React.Component {
  state = {
    ListCoupons: [],
    param_code: "",
    param_name: "",
    param_status: "",
    param_start_date: "",
    param_end_date: "",
  };

  componentDidUpdate(prevProps) {
    if (prevProps.ListCoupons !== this.props.ListCoupons) {
      this.setState({ ListCoupons: this.props.ListCoupons });
    }
  }
  changeStatusCoupon = async (event, id, status) => {
    event.stopPropagation();
    let { ListCoupons } = this.state;

    let item = await changeStatusCoupon(id, status); // nếu muốn gọi API thật
    if (item !== undefined) {
      let ListCoupons_temp = ListCoupons?.data.map((item) => {
        if (item.id === id) {
          return { ...item, active: status };
        }
        return item;
      });

      ListCoupons = { ...ListCoupons, data: ListCoupons_temp };

      this.setState({ ListCoupons });
    }
  };

  getCoupons = async () => {
    let {
      param_code,
      param_name,
      param_status,
      param_start_date,
      param_end_date,
    } = this.state;
    let params = "";
    if (param_code !== "") {
      params += "&code=" + param_code;
    }
    if (param_name !== "") {
      params += "&name=" + param_name;
    }
    if (param_status !== "") {
      params += "&status=" + param_status;
    }
    if (param_start_date !== "") {
      params += "&start_date=" + param_start_date;
    }
    if (param_end_date !== "") {
      params += "&end_date=" + param_end_date;
    }
    let coupons = await getCoupons(params);
    this.setState({ ListCoupons: coupons });
  };
  getCouponByLink = async (link) => {
    if (link === "") {
      return;
    }
    let {
      param_code,
      param_name,
      param_status,
      param_start_date,
      param_end_date,
    } = this.state;
    let params = "";
    if (param_code !== "") {
      params += "&code=" + param_code;
    }
    if (param_name !== "") {
      params += "&name=" + param_name;
    }
    if (param_status !== "") {
      params += "&status=" + param_status;
    }
    if (param_start_date !== "") {
      params += "&start_date=" + param_start_date;
    }
    if (param_end_date !== "") {
      params += "&end_date=" + param_end_date;
    }
    let coupons = await getCouponByLink(link, params);
    this.setState({ ListCoupons: coupons });
  };
  getDetailCoupon = (code) => {
    this.props.history.push("/admin/coupon/" + code);
  };
  componentDidMount = async () => {
    this.getCoupons();
  };
  render() {
    let {
      ListCoupons,
      param_code,
      param_name,
      param_status,
      param_start_date,
      param_end_date,
    } = this.state;

    return (
      <>
        <header className="header-function">
          <div
            className="btn-default btn-bg-green-op-5 "
            onClick={() => this.props.history.push("/admin/create-coupon")}
          >
            <div className="btn-default-icon ">
              <i className="bi bi-plus-lg"></i>
            </div>
            <div
              className="btn-default-text"
              onClick={() => this.props.history.push("/admin/create-coupon")}
            >
              Tạo mới Mã giảm giá
            </div>
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
        <div className="filter">
          <div className="form-container">
            <label>Mã: </label>
            <input
              className="input"
              defaultValue={param_code}
              onChange={(e) => this.setState({ param_code: e.target.value })}
            />
          </div>
          <div className="form-container">
            <label>Tên: </label>
            <input
              className="input"
              defaultValue={param_name}
              onChange={(e) => this.setState({ param_name: e.target.value })}
            />
          </div>
          <div className="form-container">
            <label>Trạng thái: </label>
            <select
              onChange={(e) => this.setState({ param_status: e.target.value })}
            >
              <option selected={param_status === "all"} value="all">
                Tất cả
              </option>
              <option selected={param_status === "active"} value="active">
                Đang hoạt
              </option>
              <option selected={param_status === "inactive"} value="inactive">
                Không hoạt
              </option>
            </select>
          </div>
          <div className="form-container">
            <label>Thời gian bắt đầu: </label>
            <input
              className="input"
              type="date"
              defaultValue={param_start_date}
              onChange={(e) =>
                this.setState({ param_start_date: e.target.value })
              }
            />
          </div>
          <div className="form-container">
            <label>Thời gian kết thúc: </label>
            <input
              className="input"
              type="date"
              defaultValue={param_end_date}
              onChange={(e) =>
                this.setState({ param_end_date: e.target.value })
              }
            />
          </div>
          <div className="form-container">
            <button
              className="btn btn-bg-orange-op-5"
              onClick={() => this.getCoupons()}
            >
              Tìm kiếm
            </button>
          </div>
        </div>
        <div className="list-discount">
          <table className="table">
            <tr>
              <th>#</th>
              <th className="tbl-th-200">Mã</th>
              <th className="tbl-th-200">Title</th>
              <th>Ngày bắt đầu</th>
              <th>Ngày kết thúc</th>
              <th className="tbl-th-100">Trạng thái</th>
              <th>Hành động</th>
            </tr>
            {ListCoupons &&
              ListCoupons?.data &&
              ListCoupons?.data?.length > 0 &&
              ListCoupons.data.map((item, index) => {
                return (
                  <tr
                    key={item.id}
                    onClick={() => this.getDetailCoupon(item.code)}
                  >
                    <td>{index + 1}</td>
                    <td>{item.code}</td>
                    <td>{item.name}</td>

                    <td>{item.start_date}</td>
                    <td>{item.end_date}</td>
                    <td>
                      {item.active ? (
                        <i
                          class="icon-status-active bi bi-toggle-on"
                          onClick={(e) =>
                            this.changeStatusCoupon(e, item.id, !item.active)
                          }
                        ></i>
                      ) : (
                        <i
                          class="icon-status-inactive bi bi-toggle-off"
                          onClick={(e) =>
                            this.changeStatusCoupon(e, item.id, !item.active)
                          }
                        ></i>
                      )}
                    </td>
                    <td>
                      <button className="btn-td btn-bg-red-op-5">Xóa</button>
                      <button className="btn-td btn-bg-orange-op-5">
                        Chỉnh sửa
                      </button>
                    </td>
                  </tr>
                );
              })}
          </table>
          <div className="list-paginate">
            <div className="list-paginate-container">
              <button
                className="first-page"
                disabled={ListCoupons?.meta?.pagination.current_page === 1}
              >
                Trang đầu
              </button>
              <button
                className="prev-page"
                disabled={
                  ListCoupons?.meta?.pagination.current_page <=
                    ListCoupons?.meta?.pagination.total_pages &&
                  !ListCoupons?.meta?.pagination?.links?.previous
                }
                onClick={() =>
                  this.getCouponByLink(
                    ListCoupons?.meta?.pagination?.links?.previous
                  )
                }
              >
                Trang trước
              </button>
              <button className="current-page">
                {ListCoupons?.meta?.pagination.current_page} {"/"}{" "}
                {ListCoupons?.meta?.pagination.total_pages}
              </button>
              <button
                className="next-page"
                disabled={
                  ListCoupons?.meta?.pagination.current_page >=
                    ListCoupons?.meta?.pagination.total_pages &&
                  !ListCoupons?.meta?.pagination?.links?.next
                }
                onClick={() =>
                  this.getCouponByLink(
                    ListCoupons?.meta?.pagination?.links?.next
                  )
                }
              >
                Trang sau
              </button>
              <button
                className="last-page"
                disabled={
                  ListCoupons?.meta?.pagination.current_page ===
                  ListCoupons?.meta?.pagination.total_pages
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

export default withRouter(ListCoupon);
