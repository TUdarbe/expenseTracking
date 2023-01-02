import Chart from "react-apexcharts";
import { MONTHS } from "../../constants";
import { ApexOptions } from "apexcharts";

import { getDocs, collection, query, where } from "firebase/firestore";

import "firebase/firestore";

import database from "../../util/Fbdatabase";

import { useState, useEffect } from "react";

interface ISeries {
  name: string;
  data: number[];
}

interface Props {
  year: number;
  uid: string;
}

function DailyStackedBar({ year, uid }: Props) {
  const [chartSeries, setChartSeries] = useState<ISeries[]>([]);
  const expensesRef = collection(database, "expenses");

  const fetchData = async () => {
    let series: ISeries[] = [];
    const q = query(
      expensesRef,
      where("year", "==", year),
      where("uid", "==", uid)
    );

    const mapObj = new Map();

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      const docData = doc.data();

      const { category, amount, month } = docData;

      if (mapObj.get(category) === undefined) {
        let monthTotals = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

        monthTotals[month] = amount;
        mapObj.set(category, monthTotals);
      } else {
        let monthsTotal: number[] = mapObj.get(category);

        monthsTotal[month] += amount;
        mapObj.set(category, monthsTotal);
      }
    });

    for (const [key, value] of mapObj) {
      let seriesObj: ISeries = {
        name: key,
        data: value,
      };

      series.push(seriesObj);
    }
    setChartSeries(series);
  };

  useEffect(() => {
    fetchData();
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

    colors: ["#42fcff", "#ffba42", "#89f525", "#f5e425", "#f53b47", "#bc3df2"],

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
      categories: MONTHS,
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

export default DailyStackedBar;
