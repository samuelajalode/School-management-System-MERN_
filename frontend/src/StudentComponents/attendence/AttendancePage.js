import React, { useState, useEffect } from "react";
import AttendanceTable from "../../components/tables/AttendanceTable";
import axios from "../../store/axios";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/slices/userSlice";

function Attendance() {
  const [attendanceData, setattendanceData] = useState([]);
  const user = useSelector(selectUser);

  useEffect(() => {
    axios.get(`/attendance/user/${user?.userID}`).then((res) => {
      console.log(res);
      setattendanceData(res.data);
    });
  }, [user]);

  return (
    <div className="attendance">
      <h3 className="mb-3">Attendance List</h3>
      <AttendanceTable attendanceData={attendanceData} />
    </div>
  );
}

export default Attendance;
