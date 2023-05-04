import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Table from "../../components/tables/PeriodAttendanceTable";
import { selectClasses } from "../../store/slices/schoolSlice";
import { Bar } from "@reactchartjs/react-chart.js";
import { monthYear } from "../../data";
import moment from "moment";
import axios from "../../store/axios";
import { errorAlert } from "../../utils";

const date = new Date();
const month = date.getMonth();
var year = date.getFullYear();
var daysInMonth = new Date(year, month + 1, 0).getDate();
var start = new Date(year, month, 1);

function AttendanceTabs() {
  const [dates, setdates] = useState([]);
  const [datas, setdatas] = useState([]);
  const [period, setperiod] = useState("");
  const [classID, setclassID] = useState("");
  const classes = useSelector(selectClasses);
  const [loading, setloading] = useState("");
  const [show, setshow] = useState(false);
  const [attendanceData, setattendanceData] = useState([]);
  //const [storeData, setstoreData] = useState([]);
  // const [attendance, setattendance] = useState([]);

  // useEffect(() => {
  //   axios.get("/attendance/student").then((res) => {
  //    // setattendance(res.data);
  //   });
  // }, []);

  useEffect(() => {
    let arr = [];
    let d = [];
    for (var i = 0; i < daysInMonth; i++) {
      arr.push(moment(start).add(i, "day").format("dd D MMM YYYY"));
      d.push(Math.floor(Math.random() * Math.floor(100)));
    }
    setdates(arr);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    setloading(false);
    if (!classID) {
      return errorAlert("Please select class");
    }
    if (!period) {
      return errorAlert("Please select period");
    }
    setloading(true);
    axios.get(`/students/class/${classID}`).then((res) => {
      setloading(false);
      if (res.data.error) {
        setshow(true);
        return setattendanceData([]);
      }
      let newData = res.data.users.map((i) => {
        return {
          userID: i.userID,
          name: i.name,
          surname: i.surname,
          classID: i.classID,
          gender: i.gender,
          status: i.status,
          attendance: Number(period),
        };
      });
      setshow(true);
      setattendanceData(newData);
    });
  };

  useEffect(() => {
    axios.get("/count/attendance").then((res) => {
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

  // const handlePrint = () => {
  //   window.print();
  // };
  return (
    <div id="section-to-print">
      <div className="content__container mb-3">
        <form action="" className="row">
          <div className="mb-3 col-sm-4">
            <label className="form-label">Class</label>
            <select
              name="type"
              value={classID}
              onChange={(e) => setclassID(e.target.value)}
              id="inputState"
              className="form-select"
            >
              <option defaultValue hidden>
                Choose...
              </option>
              {classes.length > 0 ? (
                classes.map((e) => (
                  <option key={e._id} value={e.classCode}>
                    {e.name}
                  </option>
                ))
              ) : (
                <option disabled>No class yet</option>
              )}
            </select>
          </div>
          <div className="mb-3 col-sm-4">
            <label className="form-label">Period</label>
            <select
              name="type"
              value={period}
              onChange={(e) => setperiod(e.target.value)}
              id="inputState"
              className="form-select"
            >
              <option defaultValue hidden>
                Choose...
              </option>
              <option value="1">Today</option>
              <option value="2">Yesterday</option>
              <option value="7">This Week</option>
              <option value="7">Last Week</option>
              <option value="30">This Month</option>
              <option value="30">Last Month</option>
            </select>
          </div>
          <div className="mb-3 col-sm-4">
            <button
              onClick={handleSearch}
              disabled={loading}
              type="submit"
              className="btn blue__btn mt-3"
            >
              {loading && (
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
              )}
              Search
            </button>
          </div>
        </form>
      </div>
      {show && (
        <div className="mb-5" id="section-to-print">
          <div id="section-to-print">
            <Table attendanceData={attendanceData} />
          </div>
          {/* <div className="d-flex justify-content-center my-3">
            <button onClick={handlePrint} className="btn blue__btn">
              Print
            </button>
          </div> */}
        </div>
      )}
      <h3 className="mb-5">
        Attendance Report for {monthYear[month]?.name} {year}
      </h3>
      <Bar data={data} options={options} />
    </div>
  );
}

export default AttendanceTabs;
