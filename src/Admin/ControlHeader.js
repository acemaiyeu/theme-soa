import React from "react";

class ControlHeader extends React.Component {
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
    return (
      <header className="header-admin">
        <h3>Bảng điều khiển</h3>
        <div className="info-header">
          <p>{this.state.time}</p>
        </div>
      </header>
    );
  }
}

export default ControlHeader;
