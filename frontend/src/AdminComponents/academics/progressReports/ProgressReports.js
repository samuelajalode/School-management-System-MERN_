import React, { useState } from "react";
import Search from "./Search";
import Table from "./Table";
import axios from "../../../store/axios";
import { errorAlert } from "../../../utils";

function ProgressReports() {
  const [data, setdata] = useState([]);
  const [classID, setclassID] = useState("");
  const [term, setterm] = useState("");
  const [academicYear, setacademicYear] = useState("");
  const [loading, setloading] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    setloading(true);
    if (classID === "" || term === "" || academicYear === "") {
      setloading(false);
      return errorAlert("Please select all fields");
    }
    axios.get(`/students/class/${classID}`).then((res) => {
      setloading(false);
      if (res.data.error) {
        return errorAlert(res.data.error);
      }
      setdata(res.data.users);
    });
  };

  return (
    <div>
      <h3>Progress Reports</h3>
      <div className="mb-3">
        <Search
          classID={classID}
          setclass={setclassID}
          term={term}
          loading={loading}
          setterm={setterm}
          academicYear={academicYear}
          setacademicYear={setacademicYear}
          handleSearch={handleSearch}
        />
      </div>
      {data.length > 0 && <Table rows={data} term={term} year={academicYear} />}
    </div>
  );
}

export default ProgressReports;
