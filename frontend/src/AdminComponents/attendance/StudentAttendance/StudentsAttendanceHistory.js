import React, { useState, useEffect } from "react";
import Search from "../../shared/Search";
import Table from "../../shared/AttendanceTable";
import { Link } from "react-router-dom";
import axios from "../../../store/axios";
import { useSelector } from "react-redux";
import { selectClasses } from "../../../store/slices/schoolSlice";

function Attendance() {
  const [classID, setclassID] = useState("");
  const [date, setDate] = useState("");
  const [attendanceData, setattendanceData] = useState([]);
  const [storeData, setstoreData] = useState([]);
  const classes = useSelector(selectClasses);

  const handleSearch = (e) => {
    e.preventDefault();
    let newClasses = [];
    if (classID) {
      newClasses = storeData.filter((i) =>
        i?.classID?.toLowerCase().includes(classID?.toLowerCase())
      );
    }
    if (date) {
      //let today = new Date()
      newClasses = newClasses.filter((i) =>
        i?.date?.includes(new Date(date).toISOString())
      );
    }
    setattendanceData(newClasses);
  };

  const handleReset = (e) => {
    e.preventDefault();
    setclassID("");
    setDate("");
    setattendanceData(storeData);
  };

  useEffect(() => {
    axios.get("/attendance/students").then((res) => {
      console.log(res.data);
      setattendanceData(res.data);
      setstoreData(res.data);
    });
  }, []);

  const inputFields = [
    {
      type: "select",
      label: "Search by Class",
      value: classID,
      options: classes.map((e) => {
        return {
          id: e.classCode,
          name: e.name,
        };
      }),
      name: "studentID",
      onChange: setclassID,
    },
    // {
    //   type: "date",
    //   label: "Search by Date",
    //   value: date,
    //   name: "date",
    //   onChange: setDate,
    // },
  ];

  return (
    <div>
      <Search
        handleSearch={handleSearch}
        handleReset={handleReset}
        title="Student's Attendance"
        inputFields={inputFields}
      />
      <div className="content__container">
        <div className="d-flex justify-content-between mb-3">
          <h3>Attendance Record</h3>
          <Link to="/attendance/students/register" className="btn blue__btn">
            Register Attendance
          </Link>
        </div>
        <Table attendanceData={attendanceData} />
      </div>
    </div>
  );
}

export default Attendance;
