import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

function PieChart() {
  const options: ApexOptions = {
    chart: {
      width: 200,
    },
    legend: {
      position: "bottom",
    },
  };

  const data = {
    series: [44, 55, 41, 17, 15],
  };

  return (
    <>
      <Chart options={options} series={data.series} type="donut" />
    </>
  );
}

export default PieChart;
