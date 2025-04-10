// src/components/RevenueChart.jsx
import React from "react";
import Chart from "react-apexcharts";

const RevenueChart = () => {
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
      data: [120, 200, 150, 300, 250, 400],
    },
  ];

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
