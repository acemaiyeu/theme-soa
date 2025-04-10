import React from "react";
import "./AdminHome.scss";

import RevenueChart from "./RevenueChart";
import ListOrder from "./ListOrder";
import ListNewCustomer from "./ListNewCustomer";
import ChartSixMonthOfYear from "./ChartSixMonthOfYear";
import StatisticBoxItem from "./StatisticBoxItem";

class AdminHome extends React.Component {
  state = {
    time: new Date().toLocaleTimeString(),
  };
  updateTime = () => {
    setTimeout(() => {
      this.setState({ time: this.formatDateTime(new Date()) });
      this.updateTime();
    }, 1000);
  };

  formatDateTime = (date = new Date()) => {
    const pad = (n) => n.toString().padStart(2, "0");
    const weekdays = [
      "Chủ Nhật",
      "Thứ Hai",
      "Thứ Ba",
      "Thứ Tư",
      "Thứ Năm",
      "Thứ Sáu",
      "Thứ Bảy",
    ];

    const weekday = weekdays[date.getDay()];
    const day = pad(date.getDate());
    const month = pad(date.getMonth() + 1);
    const year = date.getFullYear();
    const hour = pad(date.getHours());
    const minute = pad(date.getMinutes());
    const second = pad(date.getSeconds());

    return `${weekday}, ${day}/${month}/${year} ${hour}:${minute}:${second}`;
  };
  componentDidMount() {
    this.updateTime(); // Gọi updateTime khi component được mount
  }
  render() {
    let status_code = "PENDING";
    return (
      <div className="container-content-admin">
        <div className="contents-admin">
          <div className="content-info">
            <div className="content-info-container">
              <StatisticBoxItem />
              <ListOrder status_code={status_code} />
              <ListNewCustomer />
            </div>
          </div>
          <div className="content-chart">
            <ChartSixMonthOfYear />
            <RevenueChart />
          </div>
        </div>
      </div>
    );
  }
}

export default AdminHome;
