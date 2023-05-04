import React, { useState, useEffect } from "react";
import CalenderTable from "../../shared/ListTable";
import { Link } from "react-router-dom";
import axios from "../../../store/axios";
import { useHistory } from "react-router-dom";
import { errorAlert } from "../../../utils";
import { selectUser } from "../../../store/slices/userSlice";
import { useSelector } from "react-redux";

const tableHeadings = [
  { id: "resource", name: "Type" },
  { id: "title", name: "Event" },
  { id: "day", name: "Date" },
  { id: "start", name: "Starts" },
  { id: "end", name: "Ends" },
];

function Calender() {
  const [events, setevents] = useState([]);
  const history = useHistory();
  const [storeData, setstoreData] = useState([]);
  const user = useSelector(selectUser);
  const [query, setquery] = useState("");

  useEffect(() => {
    axios.get("/calendar").then((res) => {
      let eventsData = res.data.map((e) => {
        return {
          ...e,
          start: e?.allDay
            ? "All day"
            : e?.start?.replace(/^[^:]*([0-2]\d:[0-5]\d).*$/, "$1"),
          end: e?.allDay
            ? "-"
            : e?.end?.replace(/^[^:]*([0-2]\d:[0-5]\d).*$/, "$1"),
        };
      });
      setevents(eventsData);
      setstoreData(eventsData);
    });
  }, []);

  const handleDelete = (id) => {
    axios.delete(`/calendar/delete/${id}`).then((res) => {
      if (res.data.error) {
        errorAlert(res.data.error);
        return 0;
      }
      setevents(events.filter((event) => event._id !== id));
    });
  };
  const handleEdit = (id) => {
    history.push(`/academics/calender/edit/${id}`);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (query) {
      let newEvents = storeData.filter((i) =>
        i.title.toLowerCase().includes(query.toLowerCase())
      );
      setevents(newEvents);
    } else {
      setevents(storeData);
    }
  };

  return (
    <div>
      <div className="row mb-5">
        <div className="col">
          <form onSubmit={handleSearch} className="d-flex align-items-stretch">
            <input
              value={query}
              onChange={(e) => setquery(e.target.value)}
              type="text"
              className="form-control"
              placeholder="Search by name"
            />
            <button className="btn blue__btn">Search</button>
          </form>
        </div>
        <div className="col">
          {user?.role === "admin" && (
            <Link
              to="/academics/calender/add"
              className="btn btn__lg blue__btn"
            >
              Add New Event
            </Link>
          )}
          <Link
            to="/academics/calender/view"
            className="btn btn__lg blue__btn ml-2"
          >
            View Calendar
          </Link>
        </div>
      </div>
      <CalenderTable
        data={events}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        noActions={user?.role !== "admin" ? true : false}
        tableHeader={tableHeadings}
      />
    </div>
  );
}

export default Calender;
