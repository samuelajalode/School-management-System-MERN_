import React, { useState } from "react";
import Search from "./Search";
import Table from "./Table";
import axios from "../../../store/axios";
import { errorAlert } from "../../../utils";

function CombinedReports() {
  const [data, setdata] = useState([]);
  const [term, setterm] = useState("");
  const [year, setyear] = useState("");
  const [classID, setclass] = useState("");
  const [loading, setloading] = useState(false);
  const [show, setshow] = useState(false);

  const handleSearch = (e) => {
    setshow(false);
    e.preventDefault();
    setloading(true);
    if (classID === "" || term === "" || year === "") {
      setloading(false);
      return errorAlert("Please select all fields");
    }
    axios.get(`/sba/class/${classID}/${year}/${term}`).then((result) => {
      setloading(false);
      console.log(result);
      setdata(result.data.docs);
      setshow(true);
    });
  };

  return (
    <div>
      <h3>Combined Reports</h3>
      <div className="mb-3">
        <Search
          term={term}
          setterm={setterm}
          classID={classID}
          setclass={setclass}
          year={year}
          loading={loading}
          setyear={setyear}
          handleSearch={handleSearch}
        />
      </div>
      {show && <Table rows={data} classID={classID} />}
    </div>
  );
}

export default CombinedReports;
