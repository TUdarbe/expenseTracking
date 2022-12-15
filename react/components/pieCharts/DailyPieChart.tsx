import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import {
  doc,
  getDocs,
  collection,
  query,
  where,
  Timestamp,
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
  expenses: {
    date: Date;
    category: any;
    description: string;
    amount: number;
    note: string;
  };
}

interface ChartObj {
  category: string;
  amount: number;
}

function DailyPieChart() {
  const [chartLabels, setChartLabels] = useState<string[]>([]);
  const [chartSeries, setChartSeries] = useState<number[]>([]);

  let labels: string[] = [];
  let series: number[] = [];

  const fetchData = async () => {
    const year = moment().year();
    //For each month query totals

    const expensesRef = collection(database, "expenses");

    const q = query(expensesRef, where("year", "==", year));

    const querySnapshot = await getDocs(q);

    const mapObj = new Map();

    querySnapshot.forEach((doc) => {
      const docData = doc.data();

      const { category, amount } = docData;

      //Map dataObjs based on categories
      if (mapObj.get(category) === undefined) {
        mapObj.set(category, amount);
      } else {
        let currentAmt = mapObj.get(category);
        mapObj.set(category, currentAmt + amount);
      }
    });

    for (const [key, value] of mapObj) {
      labels.push(key);
      series.push(value);
    }

    setChartLabels(labels);
    setChartSeries(series);
  };

  useEffect(() => {
    fetchData();
  }, [chartLabels, chartSeries]);

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

  const data = {
    series: chartSeries,
  };

  return (
    <>
      <Chart options={options} series={data.series} type="donut" />
    </>
  );
}

export default DailyPieChart;
