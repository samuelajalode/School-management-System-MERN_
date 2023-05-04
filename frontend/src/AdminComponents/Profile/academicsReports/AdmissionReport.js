import React, { useState } from "react";
import axios from "../../../store/axios";
import moment from "moment";
import {errorAlert} from '../../../utils'

function AdmissionReport() {
  const [from, setfrom] = useState("");
  const [to, setto] = useState("");
  const [loading, setloading] = useState("");
  const [data, setdata] = useState(null);
  const [show, setshow] = useState(false)

  const handleSearch = (e) => {
    e.preventDefault();
    if(!from){
      return errorAlert("select from date")
    }
     if(!to){
      return errorAlert("select to date")
    }
    setloading(true);
    axios.get(`/students/student/admission/${from}/${to}`).then((res) => {
      setdata(res.data);
      setloading(false);
      setshow(true)
    }).catch(err => {
      setloading(false);
      console.log(err)
    });
  };

  return (
    <div>
      <h3> Admissions Reports</h3>
      <div className="content__container mb-5">
        <form action="" className="row">
          <div className="mb-3 col-sm-4">
            <label className="form-label">From</label>
            <input
              value={from}
              onChange={(e) => setfrom(e.target.value)}
              type="date"
              className="form-control"
            />
          </div>
          <div className="mb-3 col-sm-4">
            <label className="form-label">To</label>
            <input
              value={to}
              onChange={(e) => setto(e.target.value)}
              type="date"
              className="form-control"
            />
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
      {show && 
      <div className="content__container">
        <div className="text-center">
          <h3>ADMISSIONS REPORT</h3>
          <div>
            Period {moment(from).format("DD MMMM YYYY")} -{" "}
            {moment(to).format("DD MMMM YYYY")}
          </div>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Division</th>
              <th scope="col">Day Students</th>
              <th scope="col">Borders</th>
              <th scope="col">Total Admission</th>
            </tr>
          </thead>
          <tbody>
            {data ? (
              <tr>
                <td>{data?.division || "-"}</td>
                <td>{data?.day}</td>
                <td>{data?.border}</td>
                <td>{data?.admission}</td>
              </tr>
            ) : (
              <tr>
                <td colSpan={4}>No admissions recorded for selected period.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    }
    </div>
  );
}

export default AdmissionReport;
