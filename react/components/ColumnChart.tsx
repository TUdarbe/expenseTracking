import Chart from "react-apexcharts";
import { DAYS, CATEGORIES } from "../constants";
import { ApexOptions } from "apexcharts";

const data = {
  series: [
    {
      name: "PRODUCT A",
      data: [44, 55, 41, 67, 22, 43, 21],
    },
    {
      name: "PRODUCT B",
      data: [13, 23, 20, 8, 13, 27, 33],
    },
    {
      name: "PRODUCT C",
      data: [11, 17, 15, 15, 21, 14, 15],
    },
  ],
};

const options: ApexOptions = {
  title: {
    text: "Total",
  },
  chart: {
    type: "bar",
    height: 350,
    stacked: true,
    stackType: "100%",
    foreColor: "#fff",
  },
  responsive: [
    {
      breakpoint: 480,
      options: {
        legend: {
          position: "bottom",
          offsetX: -10,
          offsetY: 0,
        },
      },
    },
  ],
  xaxis: {
    categories: DAYS,
  },
  fill: {
    opacity: 1,
  },
  legend: {
    position: "right",
    offsetX: 0,
    offsetY: 50,
  },
};

function ColumnChart({}) {
  return (
    <>
      <Chart options={options} series={data.series} type="bar" height={350} />
    </>
  );
}

export default ColumnChart;
