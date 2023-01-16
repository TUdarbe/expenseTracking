import { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import database from "../../util/Fbdatabase";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import "firebase/firestore";
import moment from "moment";

interface Props {
  year: number;
  uid: string;
}

function ColumnChart({ year, uid }: Props) {
  const [chartSeries, setChartSeries] = useState<number[]>([]);
  const [xAxis, setXAxis] = useState<string[]>([]);

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
        const docMonth = data.month;

        const month = moment()
          .month(docMonth)
          .format("MMM")
          .toUpperCase();

        const amount = data.amount;

        if (!acc[month]) {
          acc[month] = {
            month: month,
            data: amount,
          };
        } else {
          acc[month].data += amount;
        }

        return acc;
      }, {});

      const sortedDocs = Object.values(documents).sort(
        (a: any, b: any) =>
          moment()
            .month(a.month)
            .month() -
          moment()
            .month(b.month)
            .month()
      );

      const labels: string[] = (Object.values(sortedDocs) as {
        month: string;
      }[]).map(({ month }) => month);

      const data: number[] = (Object.values(sortedDocs) as {
        data: number;
      }[]).map(({ data }) => data);

      setChartSeries(data);
      setXAxis(labels);
    });
  }, [year]);

  const data = {
    series: [
      {
        data: chartSeries,
      },
    ],
  };

  const options: ApexOptions = {
    title: {
      text: "Total Monthly Spendings",
      style: {
        color: "white",
      },
    },

    chart: {
      type: "bar",
      height: 350,
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
    plotOptions: {
      bar: {
        dataLabels: {
          total: {
            enabled: true,
            offsetX: 0,
            style: {
              fontSize: "13px",
              fontWeight: 900,
              color: "white",
            },
          },
        },
      },
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
      categories: xAxis,
      labels: {
        style: {
          colors: "white",
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: "white",
        },
      },
    },
    fill: {
      opacity: 1,
    },
    colors: ["#283f6b"],
    stroke: {
      width: 1,
      colors: ["#fff"],
    },
  };

  return (
    <>
      <Chart options={options} series={data.series} type="bar" height={350} />
    </>
  );
}

export default ColumnChart;
