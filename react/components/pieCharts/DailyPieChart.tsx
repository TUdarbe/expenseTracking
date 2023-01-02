import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { getDocs, collection, query, where } from "firebase/firestore";
import "firebase/firestore";
import database from "../../util/Fbdatabase";
import { useState, useEffect } from "react";

interface Props {
  year: number;
  uid: string;
}

function DailyPieChart({ year, uid }: Props) {
  const [chartLabels, setChartLabels] = useState<string[]>([]);
  const [chartSeries, setChartSeries] = useState<number[]>([]);

  const expensesRef = collection(database, "expenses");

  const fetchData = async () => {
    let labels: string[] = [];
    let series: number[] = [];
    const mapObj = new Map();

    const q = query(
      expensesRef,
      where("year", "==", year),
      where("uid", "==", uid)
    );

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      const docData = doc.data();

      const { category, amount, description } = docData;

      if (mapObj.has(category)) {
        let newAmount = amount;
        let currentAmount = mapObj.get(category);

        newAmount += currentAmount;

        mapObj.set(category, newAmount);
      } else {
        mapObj.set(category, amount);
      }
    });

    for (const [key, value] of mapObj) {
      labels.push(key);
      series.push(value);
    }
    setChartSeries(series);
    setChartLabels(labels);
  };

  useEffect(() => {
    fetchData();
  }, [year]);

  const options: ApexOptions = {
    labels: chartLabels,
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
    colors: ["#42fcff", "#ffba42", "#89f525", "#f5e425", "#f53b47", "#bc3df2"],
  };

  return (
    <>
      <Chart options={options} series={chartSeries} type="donut" />
    </>
  );
}

export default DailyPieChart;
