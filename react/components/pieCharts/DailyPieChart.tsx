import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import {
  doc,
  getDocs,
  collection,
  query,
  where,
  Timestamp,
  onSnapshot,
} from "firebase/firestore";

import "firebase/firestore";

import database from "../../util/Fbdatabase";

import React, {
  useCallback,
  useMemo,
  useRef,
  useState,
  useEffect,
} from "react";
import moment from "moment";

interface Props {
  year: number;
}

interface ChartObj {
  category: string;
  amount: number;
}

function DailyPieChart({ year }: Props) {
  const [chartLabels, setChartLabels] = useState<string[]>([]);
  const [chartSeries, setChartSeries] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);

  const expensesRef = collection(database, "expenses");

  const fetchData = async () => {
    let labels: string[] = [];
    let series: number[] = [];
    const mapObj = new Map();
    // const year = moment().year();
    //For each month query totals
    const q = query(expensesRef, where("year", "==", year));

    const querySnapshot = await getDocs(q);

    //console.log(querySnapshot);
    querySnapshot.forEach((doc) => {
      const docData = doc.data();

      const { category, amount, description } = docData;

      //Map dataObjs based on categories
      if (mapObj.has(category)) {
        let newAmount = amount;
        let currentAmount = mapObj.get(category);

        newAmount += currentAmount;

        mapObj.set(category, newAmount);
      } else {
        mapObj.set(category, amount);
      }
    });
    console.log(mapObj);
    for (const [key, value] of mapObj) {
      labels.push(key);
      series.push(value);
    }
    setChartSeries(series);
    setChartLabels(labels);
  };

  useEffect(() => {
    fetchData();
    console.log("i fire once");
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
  };

  return (
    <>
      <Chart options={options} series={chartSeries} type="donut" />
    </>
  );
}

export default DailyPieChart;
