import React, { useState, useEffect } from "react";
import Table from "../../AdminComponents/shared/RegisterAttendance";
import axios from "../../store/axios";
import { errorAlert, successAlert } from "../../utils";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/slices/userSlice";
import moment from "moment";
import { useParams } from "react-router-dom";

function RegisterAttendance() {
  const [loading, setloading] = useState(false);
  const [students, setstudents] = useState([]);
  const user = useSelector(selectUser);
  const { id } = useParams();

  useEffect(() => {
    axios.get(`/students/class/${id}`).then((res) => {
      if (res.data.error) {
        errorAlert(res.data.error);
      }
      let data = res.data.users?.map((student) => {
        return {
          userID: student.userID,
          name: student.name,
          surname: student.surname,
          status: false,
        };
      });
      setstudents(data);
      console.log(data);
    });
  }, [id]);

  const handleRegisterAttendance = () => {
    setloading(true);
    axios
      .post("/attendance/register", {
        users: students,
        classID: id,
        role: "students",
        user: user?.id,
      })
      .then((res) => {
        setloading(false);
        if (res.data.error) {
          errorAlert(res.data.error);
          return 0;
        }
        successAlert("Today's Attendance is successfully recorded");
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
        setloading(false);
        errorAlert("Sorry something when wrong");
      });
  };

  return (
    <div>
      <div className="content__container mb-5">
        <h3>Register Today's Attendance for {id}</h3>
        <h6>{moment().format("Do MMMM  YYYY")}</h6>
      </div>

      <Table
        attendanceData={students}
        handleRegister={handleRegisterAttendance}
        loading={loading}
        setattendanceData={setstudents}
      />
    </div>
  );
}

export default RegisterAttendance;
