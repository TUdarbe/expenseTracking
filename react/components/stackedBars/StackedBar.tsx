import Chart from "react-apexcharts";
import { MONTHS } from "../../constants";
import { ApexOptions } from "apexcharts";
import {
  getDocs,
  collection,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import "firebase/firestore";
import database from "../../util/Fbdatabase";
import moment from "moment";

import { useState, useEffect } from "react";

interface ISeries {
  name: string;
  data: (number | null)[];
}

interface Props {
  year: number;
  uid: string;
}

interface IData {
  x: string;
  y: { [key: string]: number };
}

function StackedBar({ year, uid }: Props) {
  const [chartSeries, setChartSeries] = useState<ISeries[]>([]);
  const [xAxis, setXAxis] = useState<string[]>([]);

  const expensesRef = collection(database, "expenses");

  useEffect(() => {
    const q = query(
      expensesRef,
      where("year", "==", year),
      where("uid", "==", uid)
    );

    onSnapshot(q, (querySnapshot) => {
      const chartData = querySnapshot.docs.reduce((acc: any, doc) => {
        const data = doc.data();
        const month = data.month;

        const monthStr = moment()
          .month(month)
          .format("MMM")
          .toUpperCase();

        const category = data.category;

        if (!acc[month]) {
          acc[month] = {
            x: monthStr,
            y: {
              [category]: data.amount,
            },
          };
        } else {
          if (!acc[month].y[category]) {
            acc[month].y[category] = data.amount;
          } else {
            acc[month].y[category] += data.amount;
          }
        }
        return acc;
      }, {});

      const monthLabels: string[] = (Object.values(chartData) as {
        x: string;
      }[]).map(({ x }) => x);

      const yValues: IData[] = Object.values(chartData) as IData[];

      const categories = new Set();
      yValues.forEach((val) =>
        Object.keys(val.y).forEach((category) => categories.add(category))
      );

      const seriesData: ISeries[] = Array.from(categories).map((category) => {
        return {
          name: category as string,
          data: yValues.map((month) => month.y[category as string] || null),
        };
      });

      setXAxis(monthLabels);
      setChartSeries(seriesData);
    });
  }, [year]);

  const options: ApexOptions = {
    chart: {
      type: "bar",
      height: 350,
      stacked: true,
      toolbar: {
        show: true,
      },
      zoom: {
        enabled: true,
      },
    },

    colors: ["#283f6b", "#662222", "#009966", "#63632a", "#f53b47", "#7b0e5c"],
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            position: "bottom",
            offsetX: -10,
            offsetY: 0,
            style: {
              color: "white",
            },
          },
        },
      },
    ],

    stroke: {
      width: 1,
      colors: ["#fff"],
    },
    title: {
      text: "Spending Categories",
      style: {
        color: "white",
      },
    },

    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 10,
        dataLabels: {
          total: {
            enabled: true,
            style: {
              fontSize: "13px",
              fontWeight: 900,
              color: "white",
            },
          },
        },
      },
    },

    tooltip: {},
    fill: {
      opacity: 1,
    },
    legend: {
      position: "top",
      horizontalAlign: "left",
      offsetX: 40,
      labels: {
        colors: "white",
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: "white",
        },
      },
    },
    xaxis: {
      categories: xAxis,
      labels: {
        style: {
          colors: "white",
        },
      },
    },
  };

  return (
    <>
      <Chart options={options} series={chartSeries} type="bar" height={350} />
    </>
  );
}

export default StackedBar;
