import React, { useState, useEffect } from "react";
//import { Chart } from "react-chartjs-2";
import { Bar } from "@reactchartjs/react-chart.js";
import moment from "moment";
import axios from "../../store/axios";

const date = new Date();
const month = date.getMonth();
var year = date.getFullYear();
var day = date.getDate();
var weekday = date.getDay();
var start = new Date(year, month, day - weekday);
var end = moment(start).add(7, "day").format("dddd D MMMM YYYY");

function AttendanceTabs() {
  const [dates, setdates] = useState([]);
  const [datas, setdatas] = useState([]);

  useEffect(() => {
    let arr = [];
    let d = [];
    for (var i = 0; i < 7; i++) {
      arr.push(moment(start).add(i, "day").format("dd"));
      d.push(Math.floor(Math.random() * Math.floor(100)));
    }
    setdates(arr);
    //setdatas(d);
  }, []);

  useEffect(() => {
    let d = moment(start).format("DD-MM-YYYY");
    console.log(d);
    axios.get(`/count/attendance/week/${d}`).then((res) => {
      setdatas(res.data.map((e) => e.value));
    });
  }, []);

  const data = {
    labels: dates,
    datasets: [
      {
        label: "Attendance",
        data: datas,
        backgroundColor: "#051f3e",
        borderColor: "#051f3e",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  return (
    <div className="dashboard__attendance content__container">
      <h6 className="mb-5">
        Attendance Report from {moment(start).format(" D MMMM YYYY")} to{" "}
        {moment(end).format(" D MMMM YYYY")}
      </h6>
      <Bar data={data} options={options} />
    </div>
  );
}

export default AttendanceTabs;
