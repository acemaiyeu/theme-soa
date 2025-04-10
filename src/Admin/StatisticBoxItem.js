import React from "react";
import "./StatisticBoxItem.scss";
class StatisticBoxItem extends React.Component {
  render() {
    return (
      <div className="statistic">
        <div className="statistic-item">
          <div className="statistic-item-icon --gb-green-opa-5">
            <i className="bi bi-file-person"></i>
          </div>
          <div className="statistic-item-content">
            <h3>Tổng khách hàng</h3>
            <h5>56 khách hàng</h5>
          </div>
        </div>
        <div className="statistic-item">
          <div className="statistic-item-icon --gb-violet-opa-5">
            <i className="bi bi-database"></i>
          </div>
          <div className="statistic-item-content">
            <h3>Tổng sản phẩm</h3>
            <h5>1234 sản phẩm</h5>
          </div>
        </div>
        <div className="statistic-item">
          <div className="statistic-item-icon --gb-orange-opa-5">
            <i className="bi bi-handbag"></i>
          </div>
          <div className="statistic-item-content ">
            <h3>Tổng đơn hàng</h3>
            <h5>532 đơn hàng</h5>
          </div>
        </div>
        <div className="statistic-item">
          <div className="statistic-item-icon --gb-red-opa-5">
            <i className="bi bi-bank"></i>
          </div>
          <div className="statistic-item-content">
            <h3>Doanh thu hôm nay</h3>
            <h5>{(100002324).toLocaleString("vi-VN")} đ</h5>
          </div>
        </div>
      </div>
    );
  }
}

export default StatisticBoxItem;
