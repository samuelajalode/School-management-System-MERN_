import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectYearGroup, selectFees } from "../../../store/slices/schoolSlice";
import Table from "../../../components/tables/ListTable";
import { errorAlert } from "../../../utils";
import axios from "../../../store/axios";
import PrintIcon from "@material-ui/icons/Print";

const tableHeader = [
  { id: "userID", name: "Student ID" },
  { id: "name", name: "Student" },
  { id: "classID", name: "Class" },
  { id: "average", name: "Average" },
  { id: "position", name: "Position" },
];

function ClassGroupTerminalReports() {
  const [group, setgroup] = useState("");
  const [year, setyear] = useState("");
  const [term, setterm] = useState("");
  const years = useSelector(selectYearGroup);
  const groups = useSelector(selectFees);
  const [loading, setloading] = useState("");
  const [data, setdata] = useState([]);
  const [classname, setclassname] = useState("");
  const [termname, settermname] = useState("");
  const [yearname, setyearname] = useState("");

  console.log(groups);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!group) {
      return errorAlert("Select Class");
    }
    if (!year) {
      return errorAlert("Select academic year");
    }
    if (!term) {
      return errorAlert("Select term");
    }
    setloading(true);
    axios.get(`/students`).then((res) => {
      setloading(false);
      let students = res.data?.map((user) => {
        return {
          _id: user._id,
          userID: user.userID,
          classID: user.classID,
          name: user.name + " " + user.surname,
          average: "not set yet",
          position: "not set yet",
          fees: user.fees,
        };
      });
      setdata(students);
      setclassname(group);
      settermname(term);
      setyearname(year);
    });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div>
      <h3>Class Group Terminal Reports</h3>
      <div className="content__container mb-5">
        <form className="row">
          <div className="mb-3 col-sm-4">
            <label className="form-label">Year Group</label>
            <select
              name="type"
              value={group}
              onChange={(e) => setgroup(e.target.value)}
              id="inputState"
              className="form-select"
            >
              <option defaultValue hidden>
                Choose...
              </option>
              {years.length > 0 ? (
                years.map((e) => (
                  <option key={e._id} value={e.year}>
                    {e.name}
                  </option>
                ))
              ) : (
                <option disabled>No class yet</option>
              )}
            </select>
          </div>
          <div className="mb-3 col-sm-4">
            <label className="form-label">Academic Year</label>
            <select
              name="type"
              value={year}
              onChange={(e) => setyear(e.target.value)}
              id="inputState"
              className="form-select"
            >
              <option defaultValue hidden>
                Choose...
              </option>
              {years.length > 0 ? (
                years.map((e) => (
                  <option key={e._id} value={e.year}>
                    {e.year}
                  </option>
                ))
              ) : (
                <option disabled>No year yet</option>
              )}
            </select>
          </div>
          <div className="mb-3 col-sm-4">
            <label className="form-label">Term / Semester</label>
            <select
              name="type"
              value={term}
              onChange={(e) => setterm(e.target.value)}
              id="inputState"
              className="form-select"
            >
              <option defaultValue hidden>
                Choose...
              </option>
              <option value="1">1st</option>
              <option value="2">2nd</option>
              <option value="3">3rd</option>
            </select>
          </div>
          <div className="mb-3">
            <button
              onClick={handleSearch}
              disabled={loading}
              type="submit"
              className="btn blue__btn"
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
      {classname && (
        <div className="content__container" id="section-to-print">
          <div className="text-center mb-3">
            <h3>CLASS TERMINAL REPORT</h3>
            <div className="d-flex justify-content-around mt-2">
              <h6>Group: {classname}</h6>
              <h6>Academic Year: {yearname}</h6>
              <h6>Term: {termname}</h6>
            </div>
          </div>
          <Table data={data} tableHeader={tableHeader} />
        </div>
      )}

      {data.length > 0 && (
        <div className="text-center mt-2">
          <button onClick={handlePrint} className="btn blue__btn">
            Print
            <PrintIcon />
          </button>
        </div>
      )}
    </div>
  );
}

export default ClassGroupTerminalReports;
