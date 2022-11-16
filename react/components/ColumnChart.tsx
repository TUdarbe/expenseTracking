import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

const data = {
  series: [
    {
      name: "PRODUCT A",
      data: [44, 55, 41, 67, 22, 43, 21, 49],
    },
    {
      name: "PRODUCT B",
      data: [13, 23, 20, 8, 13, 27, 33, 12],
    },
    {
      name: "PRODUCT C",
      data: [11, 17, 15, 15, 21, 14, 15, 13],
    },
  ],
};

const options: ApexOptions = {
  chart: {
    type: "bar",
    height: 350,
    stacked: true,
    stackType: "100%",
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
    categories: [
      "Monday",
      "Tuesday",
      "Wedneday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
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

function ColumnChart() {
  return (
    <>
      <Chart options={options} series={data.series} type="bar" height={350} />
    </>
  );
}

export default ColumnChart;
