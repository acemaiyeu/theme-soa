import React from "react";
import "./ChartSixMonthOfYear.scss";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Tháng 1", uv: 40, pv: 24 },
  { name: "Tháng 2", uv: 30, pv: 50 },
  { name: "Tháng 3", uv: 20, pv: 90 },
  { name: "Tháng 4", uv: 27, pv: 39 },
  { name: "Tháng 5", uv: 78, pv: 60 },
  { name: "Tháng 6", uv: 90, pv: 20 },
];
class ChartSixMonthOfYear extends React.Component {
  render() {
    return (
      <div className="container-chart-six-month">
        <h4>Dữ liệu 6 tháng đầu vào</h4>
        <ResponsiveContainer>
          <AreaChart
            data={data}
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
            <Tooltip />
            <Area
              type="monotone"
              dataKey="uv"
              stroke="#8884d8"
              fillOpacity={1}
              fill="url(#colorUv)"
            />
            <Area
              type="monotone"
              dataKey="pv"
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
