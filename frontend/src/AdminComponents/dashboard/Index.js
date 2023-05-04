import React, { useEffect, useState } from "react";
import Cards from "./Cards";
import SchoolCalender from "../../components/dashboard/SchoolCalender";
import Population from "./SchoolPopulation";
import StaffPopulation from "./StaffPopulation";
import Attendance from "./Attendance";
import NoticeBoard from "../../components/dashboard/NoticeBoard";
import AcademicYear from "./AcademicYear";
import RecentActivities from "./RecentActivity";
import axios from "../../store/axios";
import Loading from "../../Loading";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/slices/userSlice";

function Index() {
  const [count, setcount] = useState({});
  const [events, setevents] = useState([]);
  const user = useSelector(selectUser);
  const [loading, setloading] = useState(false);
  const [show, setshow] = useState(false);

  useEffect(() => {
    setloading(true);
    axios.get("/count").then((res) => {
      setloading(false);
      if (res?.data) {
        setcount(res.data);
        setshow(true);
      }
    });
  }, []);

  useEffect(() => {
    axios.get("/calendar").then((res) => {
      setevents(res.data);
    });
  }, []);

  return (
    <>
      {loading && <Loading />}
      <>
        {/* cards */}
        <Cards counts={count} />
        <div className="row mb-5">
          <div className="col-xs-12 col-sm-12 col-md-6  mb-5">
            <Attendance />
          </div>
          <div className="col-xs-12 col-sm-12 col-md-6  mb-5">
            <RecentActivities />
          </div>
          <div className="col-xs-12 col-sm-12 col-md-8  mb-5">
            <SchoolCalender events={events} user={user.role} />
          </div>

          <div className="col-xs-12 col-sm-12 col-md-6  mb-5">
            <NoticeBoard isDashboard={true} user={user.role} />
          </div>

          <div className="col-xs-12 col-sm-12 col-md-6  mb-5">
            <AcademicYear isEdit={true} />
          </div>
          {show && (
            <>
              <div className="col-xs-12 col-sm-12 col-md-6  mb-5">
                <Population
                  femaleStudents={count?.femaleStudents}
                  maleStudents={count?.maleStudents}
                />
              </div>
              <div className="col-xs-12 col-sm-12 col-md-6  mb-5">
                <StaffPopulation
                  femaleStudents={count?.femaleStaff}
                  maleStudents={count?.maleStaff}
                />
              </div>
            </>
          )}
        </div>
      </>
    </>
  );
}

export default Index;
