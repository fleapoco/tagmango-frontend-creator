import dynamic from "next/dynamic";
import React from "react";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

interface ChartProps {
  chartData: {
    series: number[];
    labels: string[];
  };
  type: "area" | "line" | "bar";
}

const Chart: React.FC<ChartProps> = ({ chartData, type }) => {
  console.log({ chartData });

  const barOptions = {
    chart: {
      id: "basic-bar",
      toolbar: {
        show: true,
      },
    },
    xaxis: {
      categories: chartData.labels,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        endingShape: "rounded",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      // colors: ["transparent"],
    },
    colors: ["#f5a442"],
    grid: {
      borderColor: "#e0e0e0",
      row: {
        colors: ["#f3f3f3", "transparent"],
        opacity: 0.5,
      },
    },
    yaxis: {},
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: function (val: number) {
          return `${val} units`;
        },
      },
    },
  };

  const options: ApexCharts.ApexOptions = {
    chart: {
      zoom: {
        enabled: true,
      },
    },
    dataLabels: {
      enabled: false,
      background: {
        enabled: true,
        foreColor: "",
      },
    },
    tooltip: {
      enabled: true,
    },
    markers: {
      size: 6,
      colors: ["#FFA500"],
      strokeWidth: 0,
      strokeColors: ["#fff"],
      hover: {
        size: 8,
      },
    },
    xaxis: {
      categories: chartData.labels,
    },
    legend: {
      horizontalAlign: "left",
    },
    stroke: {
      width: 3,
      curve: "smooth",
      colors: ["#FFA500"],
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.3,
        stops: [0, 100],
        colorStops: [
          {
            offset: 0,
            color: "#f5a442",
            opacity: 1,
          },
          {
            offset: 100,
            color: "#f5a442",
            opacity: 0,
          },
        ],
      },
    },
  };

  const series = [
    {
      name: "",
      data: chartData.series,
    },
  ];

  return (
    <>
      <ReactApexChart
        options={type === "bar" ? barOptions : options}
        series={type === "bar" ? series : [{ data: chartData.series }]}
        type={type}
        height={400}
      />
    </>
  );
};

export default Chart;
