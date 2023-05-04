import React, { useState, useEffect } from "react";
import Search from "../../AdminComponents/shared/Search";
import Table from "../../AdminComponents/shared/AttendanceTable";
import { Link } from "react-router-dom";
import axios from "../../store/axios";
import { useParams } from "react-router-dom";

function Attendance() {
  const [date, setDate] = useState("");
  const [attendanceData, setattendanceData] = useState([]);
  const [storedata, setstoredata] = useState([]);
  const { id } = useParams();

  const handleSearch = (e) => {
    setDate(e);
    console.log(e);
    console.log(storedata);
    let searchData = storedata.filter(
      (i) => new Date(i.createdAt).toISOString().slice(0, 10) === e
    );
    console.log(searchData);
    setattendanceData(searchData);
  };

  useEffect(() => {
    axios.get("/attendance/students").then((res) => {
      console.log(res.data);
      let classData = res.data.filter((e) => e.classID === id);
      console.log(classData);
      setstoredata(classData);
      setattendanceData(classData);
    });
  }, [id]);

  const inputFields = [
    {
      type: "date",
      label: "Search by Date",
      value: date,
      name: "date",
      onChange: handleSearch,
    },
  ];

  return (
    <div>
      <div className="d-flex justify-content-around float-right">
        <div>
          <Link to="/academics/classes" className="btn blue__btn m-2">
            Class Details
          </Link>
        </div>
        <div>
          <Link
            to={`/academics/classes/attendance/record/${id}`}
            className="btn blue__btn m-2"
          >
            Register Today's Attendance
          </Link>
        </div>
      </div>
      <div className=" mb-4">
        <Search
          handleSearch={handleSearch}
          title={`Student's Attendance for ${id}`}
          isReset={true}
          noActions={true}
          inputFields={inputFields}
        />
      </div>
      <Table isStaff={true} attendanceData={attendanceData} />
    </div>
  );
}

export default Attendance;
