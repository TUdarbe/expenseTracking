import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

function MonthlyPieChart() {
  const options: ApexOptions = {
    labels: ["Apple", "Mango", "Banana", "Papaya", "Orange"],
    title: {
      text: "Distribution",
    },
    chart: {
      width: 200,
      foreColor: "#fff",
    },
    legend: {
      position: "bottom",
    },
  };

  const data = {
    series: [44, 55, 41, 17, 15],
  };

  interface Props {
    expenses: {
      date: Date;
      category: any;
      description: string;
      amount: number;
      note: string;
    };
  }

  return (
    <>
      <Chart options={options} series={data.series} type="donut" />
    </>
  );
}

export default MonthlyPieChart;
