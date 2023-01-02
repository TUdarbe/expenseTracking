import { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import { DAYS, CATEGORIES, MONTHS } from "../../constants";
import { ApexOptions } from "apexcharts";
import database from "../../util/Fbdatabase";
import { getDocs, collection, query, where } from "firebase/firestore";

import "firebase/firestore";
import moment from "moment";

interface Props {
  year: number;
  uid: string;
}

function DailyColumnChart({ year, uid }: Props) {
  const [chartData, setChartData] = useState<number[]>([]);

  const expensesRef = collection(database, "expenses");

  const fetchData = async () => {
    let monthTotals = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (var i = 0; i < monthTotals.length; i++) {
      const q = query(
        expensesRef,
        where("month", "==", i),
        where("year", "==", year),
        where("uid", "==", uid)
      );

      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        const docData = doc.data();

        let date = Number(moment(docData.date).month());

        monthTotals[date] += docData.amount;
      });
    }
    setChartData(monthTotals);
  };

  useEffect(() => {
    fetchData();
  }, [year]);

  const data = {
    series: [
      {
        data: chartData,
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
      categories: MONTHS,
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
  };

  return (
    <>
      <Chart options={options} series={data.series} type="bar" height={350} />
    </>
  );
}

export default DailyColumnChart;
