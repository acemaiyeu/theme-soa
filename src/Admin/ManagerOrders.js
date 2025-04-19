import React from "react";
import "./ManagerOrder.scss";
import axios from "axios";

const url_api_v1 = process.env.REACT_APP_URL_API_V1;
class ManagerOrders extends React.Component {
  state = {
    listOrders: [],
    currentPage: 1,
    totalPage: 1,
    params: "",
    sortCode: false,
    sortPrice: false,
    sortStatus: false,
    found_status: "local",
  };
  getOrders = () => {
    axios
      .get(
        url_api_v1 +
          "orders?limit=10&page=" +
          this.state.currentPage +
          "&code=" +
          this.state.params +
          "&fullname=" +
          this.state.params,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("admin_token"),
          },
        }
      )
      .then((res) => {
        this.setState({
          listOrders: res.data?.data,
          currentPage: res.data?.meta?.pagination?.current_page,
          totalPage: res.data?.meta?.pagination?.total_pages,
        });
      });
  };
  handleChangePage = (page) => {
    this.setState({ currentPage: page }, () => {
      this.getOrders();
    });
  };
  handleViewDetail = (id) => {
    this.props.history.push("/admin/order/detail/" + id);
  };

  componentDidMount() {
    this.getOrders();
  }
  handleSortBy = (type) => {
    if (type === "code") {
      if (this.state.sortCode) {
        this.setState({ sortCode: false });
        let temp = this.state.listOrders.sort((a, b) => {
          return b.code.localeCompare(a.code);
        });
        this.setState({ listOrders: temp });
      } else {
        this.setState({ sortCode: true });
        let temp = this.state.listOrders.sort((a, b) => {
          return a.code.localeCompare(b.code);
        });
        this.setState({ listOrders: temp });
      }
    }
    if (type === "price") {
      if (this.state.sortPrice) {
        this.setState({ sortPrice: false });
        let temp = [...this.state.listOrders].sort((a, b) => {
          return Number(a.total_price) - Number(b.total_price);
        });
        this.setState({ listOrders: temp });
      } else {
        this.setState({ sortPrice: true });
        let temp = [...this.state.listOrders].sort((a, b) => {
          return Number(b.total_price) - Number(a.total_price);
        });
        this.setState({ listOrders: temp });
      }
    }
    if (type === "status") {
      if (this.state.sortStatus) {
        this.setState({ sortStatus: false });
        let temp = this.state.listOrders.sort((a, b) => {
          return b.status.name.localeCompare(a.status.name);
        });
        this.setState({ listOrders: temp });
      } else {
        this.setState({ sortStatus: true });
        let temp = this.state.listOrders.sort((a, b) => {
          return a.status.name.localeCompare(b.status.name);
        });
        this.setState({ listOrders: temp });
      }
    }
  };
  foundOrders = () => {
    let { listOrders, found_status, params } = this.state;

    if (found_status === "local") {
      console.log(params);
      listOrders = listOrders.filter(
        (item) =>
          item.fullname.includes(params) ||
          item.code.includes(params) ||
          item.user_phone.includes(params)
      );
      this.setState({ listOrders });
    } else {
      this.getOrders();
    }
  };
  render() {
    let { listOrders } = this.state;
    return (
      <div>
        <div className="order-filter-container">
          <div className="order-filter">
            <input
              type="text"
              className="input"
              placeholder="Tìm kiếm"
              onChange={(e) => {
                this.setState({ params: e.target.value });
              }}
            />
            <select
              onChange={(e) => this.setState({ found_status: e.target.value })}
            >
              <option value="local">Đang có</option>
              <option value="server">Từ Server</option>
            </select>
            <button
              className="btn-default btn-bg-green-op-5"
              onClick={() => this.foundOrders()}
            >
              <i className="bi bi-search"></i>
            </button>
          </div>
        </div>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th className="col-1">STT</th>
              <th
                className="col-3"
                style={{ cursor: "pointer" }}
                onClick={() => this.handleSortBy("code")}
              >
                Mã đơn hàng
                {this.state.sortCode ? (
                  <i className="bi bi-sort-alpha-down"></i>
                ) : (
                  <i className="bi bi-sort-alpha-up-alt"></i>
                )}
              </th>
              <th className="col-3">Khách hàng</th>
              <th
                className="col-3"
                style={{ cursor: "pointer" }}
                onClick={() => this.handleSortBy("price")}
              >
                Tổng tiền
                {this.state.sortPrice ? (
                  <i className="bi bi-sort-alpha-down"></i>
                ) : (
                  <i className="bi bi-sort-alpha-up-alt"></i>
                )}
              </th>
              <th
                className="col-3"
                style={{ cursor: "pointer" }}
                onClick={() => this.handleSortBy("status")}
              >
                Trạng thái
                {this.state.sortStatus ? (
                  <i className="bi bi-sort-alpha-down"></i>
                ) : (
                  <i className="bi bi-sort-alpha-up-alt"></i>
                )}
              </th>
            </tr>
          </thead>
          <tbody>
            {listOrders &&
              listOrders.length > 0 &&
              listOrders.map((item, index) => {
                return (
                  <tr
                    key={item.id}
                    onClick={() => this.handleViewDetail(item.id)}
                  >
                    <td>{index + 1}</td>
                    <td>{item.code}</td>
                    <td>{item.fullname}</td>
                    <td>{item.total_price_text}</td>
                    <td
                      className={
                        item.status.code === "PENDING"
                          ? "--order-status-pending"
                          : item.status.code === "COMPLETED"
                          ? "--order-status-complete"
                          : "--order-status-cancel"
                      }
                    >
                      {item.status.name}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        <div className="listButtonContainer">
          <div className="listButton">
            <button
              className="btn-default btn-bg-green-op-5"
              disabled={this.state.currentPage === 1}
            >
              Prev
            </button>
            <span>{this.state.currentPage}</span>
            <button
              className="btn-default btn-bg-green-op-5"
              disabled={this.state.currentPage === this.state.totalPage}
              onClick={() => this.handleChangePage(this.state.currentPage + 1)}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default ManagerOrders;
