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
}

const Chart: React.FC<ChartProps> = ({ chartData }) => {
  console.log({ chartData });
  const options: ApexCharts.ApexOptions = {
    chart: {
      type: "area",
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

  return (
    <ReactApexChart
      options={options}
      series={[{ data: chartData.series }]}
      type="area"
      height={270}
    />
  );
};

export default Chart;
