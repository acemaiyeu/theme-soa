import React from "react";
import "./ChartSixMonthOfYear.scss";
import { url_api_v1 } from "../config";
import axios from "axios";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// const data = [
//   { name: "Tháng 1", uv: 40, pv: 24 },
//   { name: "Tháng 2", uv: 30, pv: 50 },
//   { name: "Tháng 3", uv: 20, pv: 90 },
//   { name: "Tháng 4", uv: 27, pv: 39 },
//   { name: "Tháng 5", uv: 78, pv: 60 },
//   { name: "Tháng 6", uv: 90, pv: 20 },
// ];
class ChartSixMonthOfYear extends React.Component {
  state = {
    data: [
      { name: "Tháng 1", new_orders: 40, new_customers: 24 },
      { name: "Tháng 2", new_orders: 30, new_customers: 50 },
      { name: "Tháng 3", new_orders: 20, new_customers: 90 },
      { name: "Tháng 4", new_orders: 27, new_customers: 39 },
      { name: "Tháng 5", new_orders: 78, new_customers: 60 },
      { name: "Tháng 6", new_orders: 90, new_customers: 20 },
    ],
  };

  componentDidMount() {
    axios
      .get(url_api_v1 + "statistics-orders", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("admin_token"),
        },
      })
      .then((res) => {
        let data = res.data.map((item) => ({
          name: item.month,
          new_orders: item.orders,
          new_customers: item.customers,
        }));
        console.log("data", data);
        this.setState({ data: data });
      })
      .catch((error) => {
        console.log("Loi goi api theme", error);
      });
  }

  render() {
    return (
      <div className="container-chart-six-month">
        <h4>Dữ liệu 6 tháng đầu vào</h4>
        <ResponsiveContainer>
          <AreaChart
            data={this.state.data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ffc658" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#ffc658" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="name" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip
              formatter={(value, name) => {
                if (name === "new_orders") return [`${value}`, "Đơn hàng mới"];
                if (name === "new_customers")
                  return [`${value}`, "Khách hàng mới"];
                return [value, name];
              }}
            />
            <Area
              type="monotone"
              dataKey="new_orders"
              stroke="#8884d8"
              fillOpacity={1}
              fill="url(#colorUv)"
            />
            <Area
              type="monotone"
              dataKey="new_customers"
              stroke="#ffc658"
              fillOpacity={1}
              fill="url(#colorPv)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    );
  }
}

export default ChartSixMonthOfYear;
