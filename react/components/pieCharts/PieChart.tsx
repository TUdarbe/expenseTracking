import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import {
  collection,
  query,
  where,
  onSnapshot,
  Query,
} from "firebase/firestore";
import "firebase/firestore";

import firestore from "firebase/app";

import database from "../../util/Fbdatabase";
import { useState, useEffect } from "react";

interface Props {
  year: number;
  uid: string;
}

function PieChart({ year, uid }: Props) {
  const [chartLabels, setChartLabels] = useState<string[]>([]);
  const [chartSeries, setChartSeries] = useState<number[]>([]);

  const expensesRef = collection(database, "expenses");

  useEffect(() => {
    const q = query(
      expensesRef,
      where("year", "==", year),
      where("uid", "==", uid)
    );

    onSnapshot(q, (querySnapshot) => {
      const documents = querySnapshot.docs.reduce((acc: any, doc) => {
        const data = doc.data();

        const category = data.category;
        const amount = data.amount;

        if (!acc[category]) {
          acc[category] = {
            name: category,
            data: amount,
          };
        } else {
          acc[category].data += amount;
        }

        return acc;
      }, {});

      const labels: string[] = (Object.values(documents) as {
        name: string;
      }[]).map(({ name }) => name);

      const data: number[] = (Object.values(documents) as {
        data: number;
      }[]).map(({ data }) => data);

      setChartLabels(labels);
      setChartSeries(data);
    });
  }, [year]);

  const options: ApexOptions = {
    labels: chartLabels,

    title: {
      text: "Distribution",
    },
    chart: {
      redrawOnParentResize: true,
      redrawOnWindowResize: true,
      width: 200,
      foreColor: "#fff",
      animations: {
        enabled: true,
        easing: "easeout",
        speed: 500,
        animateGradually: {
          enabled: true,
          delay: 200,
        },
      },
    },

    legend: {
      position: "bottom",
    },

    colors: ["#283f6b", "#581c87", "#009966", "#f59e0b", "#f53b47", "#831843"],
  };

  return (
    <>
      <Chart options={options} series={chartSeries} type="donut" />
    </>
  );
}

export default PieChart;
