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
} from "firebase/firestore";
import * as firebase from "firebase/app";
import "firebase/firestore";
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

function DailyColumnChart() {
  const [chartData, setChartData] = useState<IExpense[]>([]);
  const [xAxis, setXAxis] = useState<any[]>([]);
  const [series, setSeries] = useState<any[]>([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     /*
  //       TODO:
  //         - Query data to get pass 7 days
  //         - Fetch data for each category
  //         - Fetch that data and populate series on chart
  //         - Fetch data timestamps and convert it into date
  //         - Update the state of the xAxis
  //         - Edit X-Axis so that shows the pass 7 days in YYYY-MM-DD format
  //     */

  //     const startDate = moment.utc().valueOf();

  //     const endDate = moment()
  //       .utc()
  //       .subtract(1, "w")
  //       .format("X");

  //     const expenseObj = {};

  //     const expenseData: IExpense[] = [];

  //     //const querySnapshot = await getDocs(collection(database, "expenses"));

  //     const expensesRef = collection(database, "expenses");

  //     const q = query(
  //       expensesRef,
  //       where("date", ">=", Timestamp.fromMillis(startDate))
  //       //    where("date", "<=", endDate)
  //     );

  //     const querySnapshot = await getDocs(q);
  //     const seriesArr: Series[] = [];

  //     querySnapshot.forEach((doc) => {
  //       const docData = doc.data();

  //       //console.log("QUERY DATA ===>" + doc.data());
  //       const seriesObj = {} as Series;

  //       seriesObj.name = docData.category;

  //       seriesObj.data = [docData.amount];

  //       console.log(JSON.stringify(seriesObj));

  //       seriesArr.push(seriesObj);

  //       expenseData.push(doc.data() as IExpense);

  //       setChartData(expenseData);
  //     });
  //     setSeries(seriesArr);
  //   };
  //   fetchData();
  // }, []);

  const data = {
    series: [
      {
        data: [44, 55, 33, 22, 31],
      },
    ],
  };

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
