// src/components/RevenueChart.jsx
import axios from "axios";
import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";

const url_api_v1 = process.env.REACT_APP_URL_API_V1;
const RevenueChart = () => {
  const [state, setState] = useState({
    data: [400, 400, 400, 400, 400, 500],
  });
  const chartOptions = {
    chart: {
      type: "bar",
      toolbar: { show: false },
      background: "#fff",
    },
    colors: ["#FFA500"], // Cam
    plotOptions: {
      bar: {
        borderRadius: 5,
        columnWidth: "50%",
      },
    },
    dataLabels: { enabled: false },
    xaxis: {
      categories: [
        "Tháng 1",
        "Tháng 2",
        "Tháng 3",
        "Tháng 4",
        "Tháng 5",
        "Tháng 6",
      ],
    },
    yaxis: {
      title: {
        text: "Doanh thu (triệu VNĐ)",
      },
    },
    grid: {
      strokeDashArray: 5,
    },
  };

  const chartSeries = [
    {
      name: "Doanh thu",
      data: state.data,
    },
  ];

  const getData = async () => {
    try {
      const response = await axios.get(url_api_v1 + "statistics-orders-fits", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("admin_token"),
        },
      });
      const orderDataTemp = response.data;
      const chartData = orderDataTemp.map((item) =>
        parseInt(item.replace(/,/g, ""), 10)
      );
      for (let i = 0; i < chartData.length; i++) {
        chartSeries[0].data[i] = chartData[i];
      }

      chartSeries[0].data = chartData;

      console.log("chartSeries", chartSeries);
    } catch (error) {
      console.log("Loi goi api theme", error);
    }
  };
  useEffect(() => {
    // Code ở đây chạy đúng 1 lần như componentDidMount

    getData();
  }, []); // <-- Quan trọng: [] trống!

  return (
    <div
      style={{
        backgroundColor: "#fff",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
        marginTop: "100px",
      }}
    >
      <h3 style={{ color: "#FFA500", marginBottom: "10px" }}>
        Tổng Doanh Thu 6 Tháng Đầu Năm
      </h3>
      <Chart
        options={chartOptions}
        series={chartSeries}
        type="bar"
        height={350}
      />
    </div>
  );
};

export default RevenueChart;
