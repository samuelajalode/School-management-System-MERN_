import React, { useEffect, useState } from "react";
import Card from "./FinanceCard";
import axios from "../../store/axios";
import moment from "moment";

function AcademicTabs({ count }) {
  const [events, setevents] = useState([]);

  useEffect(() => {
    axios.get("/calendar/upcoming").then((res) => {
      setevents(res.data);
    });
  }, []);

  return (
    <div>
      <h3>Academic Reports</h3>
      <div className="row">
        <div className="col-sm-6 col-md-4">
          <Card
            title="Division"
            name={count?.divisions || 0}
            route="/academics/divisions"
          />
        </div>
        <div className="col-sm-6 col-md-4">
          <Card
            title="Classes"
            name={count?.classes}
            route="/academics/classes"
          />
        </div>
        <div className="col-sm-6 col-md-4">
          <Card
            title="Courses"
            name={count?.courses}
            route="/academics/courses"
          />
        </div>
        <div className="col-sm-6 col-md-4">
          <Card
            title="Class Terminal Report"
            name=" Report"
            route="/academics/progressreports"
          />
        </div>

        <div className="col-sm-6 col-md-4">
          <Card
            title="Admission Report"
            name="View Report"
            route="/reports/admission"
          />
        </div>
        <div className="col-sm-6 col-md-4">
          <Card
            title="Enrollment Statistics"
            name="View Report"
            route="/reports/enrollmentstatics"
          />
        </div>
        <div className="col-sm-6 col-md-4">
          <Card
            title="Academic Transcripts"
            name="View "
            route="/reports/academic"
          />
        </div>
      </div>

      {events.length > 0 && (
        <>
          <h3>Upcoming Events</h3>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Event</th>
                <th scope="col">Start</th>
                <th scope="col">End</th>
              </tr>
            </thead>
            <tbody>
              {events.map((e) => (
                <tr key={e._id}>
                  <td>{e?.title}</td>
                  <td>{moment(e?.start).format("DD MMMM YYYY hh:mm a")}</td>
                  <td>
                    {" "}
                    {e.allDay
                      ? "All Day"
                      : moment(e?.end).format("DD MMMM YYYY hh:mm a")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}

export default AcademicTabs;
