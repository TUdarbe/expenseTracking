import React, {
  useCallback,
  useMemo,
  useRef,
  useState,
  useEffect,
} from "react";
import Chart from "react-apexcharts";
import { DAYS, CATEGORIES, MONTHS } from "../../constants";
import { ApexOptions } from "apexcharts";
import database from "../../util/Fbdatabase";
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
import moment from "moment";

interface Props {
  year: number;
}

interface IExpense {
  date: Date;
  category: any;
  description: string;
  amount: number;
  note: string;
}

type Series = {
  name?: string;
  data: any[];
};

function DailyColumnChart({ year }: Props) {
  const [chartData, setChartData] = useState<number[]>([]);
  const [xAxis, setXAxis] = useState<any[]>([]);
  const [series, setSeries] = useState<any[]>([]);

  const expensesRef = collection(database, "expenses");

  const fetchData = async () => {
    let monthTotals = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    //const year = moment().year();
    //For each month query totals

    for (var i = 0; i < monthTotals.length; i++) {
      let monthlyTotal = 0;

      const q = query(
        expensesRef,
        where("month", "==", i),
        where("year", "==", year)
      );

      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        const docData = doc.data();

        let date = Number(moment(docData.date).month());

        monthTotals[date] += docData.amount;
        //setChartData(monthTotals);
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

  //console.log(JSON.stringify(data));

  // const data = {
  //   series: series,
  // };

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
