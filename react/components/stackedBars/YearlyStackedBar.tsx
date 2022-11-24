import Chart from "react-apexcharts";
import { YEARS } from "../../constants";
import { ApexOptions } from "apexcharts";

function YearlyStackedBar() {
  const options: ApexOptions = {
    chart: {
      type: "bar",
      height: 350,
      stacked: true,
      stackType: "100%",
      foreColor: "#fff",
    },
    plotOptions: {
      bar: {
        horizontal: true,
      },
    },
    stroke: {
      width: 1,
      colors: ["#fff"],
    },
    title: {
      text: "Spending Categories",
    },
    xaxis: {
      categories: YEARS,
    },
    tooltip: {
      y: {
        formatter: function(val: any) {
          return val + "K";
        },
      },
    },
    fill: {
      opacity: 1,
    },
    legend: {
      position: "top",
      horizontalAlign: "left",
      offsetX: 40,
    },
  };

  const data = {
    series: [
      {
        name: "Marine Sprite",
        data: [44, 55, 41, 37, 22, 43, 21],
      },
      {
        name: "Striking Calf",
        data: [53, 32, 33, 52, 13, 43, 32],
      },
      {
        name: "Tank Picture",
        data: [12, 17, 11, 9, 15, 11, 20],
      },
      {
        name: "Bucket Slope",
        data: [9, 7, 5, 8, 6, 9, 4],
      },
      {
        name: "Reborn Kid",
        data: [25, 12, 19, 32, 25, 24, 10],
      },
    ],
  };
  return (
    <>
      <Chart options={options} series={data.series} type="bar" height={350} />
    </>
  );
}

export default YearlyStackedBar;
