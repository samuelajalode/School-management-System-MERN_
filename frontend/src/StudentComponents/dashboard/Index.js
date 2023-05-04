import React, { useState, useEffect } from "react";
import Cards from "../../components/dashboard/Card";
import NoticeBoard from "../../components/dashboard/NoticeBoard";
import SchoolCalender from "../../components/dashboard/SchoolCalender";
import axios from "../../store/axios";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/slices/userSlice";
import ImportContactsIcon from "@material-ui/icons/ImportContacts";
import NotificationsActiveIcon from "@material-ui/icons/NotificationsActive";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";
import AcademicYear from "../../AdminComponents/dashboard/AcademicYear";
import Loading from "../../Loading";

function Index() {
  const [count, setcount] = useState({
    courses: 0,
    notifications: 0,
    events: 0,
    attendance: 0,
  });
  const user = useSelector(selectUser);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    setloading(true);
    axios.get(`/student/count/${user?.userID}`).then((res) => {
      setloading(false);
      console.log(res.data);
      setcount(res.data.count);
    });
  }, [user]);

  let attendancePercentage = (count?.attendance / 30) * 100;

  return (
    <div className="student__dashboard">
      {loading && <Loading />}
      <div className="row">
        <Cards
          icon={<ImportContactsIcon />}
          title="Courses"
          value={count?.courses}
          link={"/academics/course"}
        />
        <Cards
          icon={<NotificationsActiveIcon />}
          title="Notifications"
          value={count?.notifications}
          link={"/notifications"}
        />
        <Cards
          icon={<CalendarTodayIcon />}
          title=" Upcoming Events"
          value={count?.events}
          link="/academics/calendar"
        />
        <Cards
          icon={<AssignmentTurnedInIcon />}
          title="Attendance"
          isPercentage={true}
          value={attendancePercentage.toFixed(2)}
          link="/attendance"
        />
      </div>
      <div className="row mb-5">
        <div className="col-xs-12 col-sm-12 col-md-6">
          <SchoolCalender />
        </div>
        <div className="col-xs-12 col-sm-12 col-md-6">
          <NoticeBoard />
        </div>
        <div className="col-xs-12 col-sm-12 col-md-6">
          <AcademicYear />
        </div>
      </div>
    </div>
  );
}

export default Index;
