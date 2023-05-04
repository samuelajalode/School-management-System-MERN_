import React, { useState } from "react";
import ListTable from "../../../AdminComponents/shared/ListTable";
import moment from "moment";

let thismonth = moment().month();
let thisyear = moment().year();
let dayOne = moment(`01/${thismonth}/${thisyear}`).format("YYYY-MM-DD");

const tableHeader = [
  { id: "createdAt", name: "Date" },
  { id: "userID", name: "Student ID" },
  { id: "name", name: "Name" },
  { id: "amount", name: "Amount" },
  { id: "description", name: "Description" },
  { id: "status", name: "Status" },
  { id: "time", name: "Entry Time" },
];

function TellerReports() {
  const [from, setfrom] = useState(dayOne);
  const [to, setto] = useState(moment().format("YYYY-MM-DD"));
  const [status, setstatus] = useState("");
  const [teller, setteller] = useState("");
  const [tellers, settellers] = useState([]);
  const [loading, setloading] = useState(false);
  const [data, setdata] = useState([]);

  const handleSearch = (e) => {
    setloading(false);
    settellers([]);
    setdata([]);
    e.preventDefault();
  };

  const handlePrint = () => {
    window.print();
  };
  return (
    <div>
      <h3>Teller Reports</h3>
      <form className="content__container row">
        <div className="col-sm-6 col-md-4 mb-3">
          <label htmlFor="name" className=" col-form-label">
            Teller
          </label>
          <div className="">
            <select
              name="academic-calendar"
              className="form-select"
              value={teller}
              onChange={(e) => setteller(e.target.value)}
            >
              <option defaultValue hidden>
                Choose...
              </option>
              {tellers &&
                tellers.map((y) => (
                  <option value={y} key={y}>
                    {y}
                  </option>
                ))}
            </select>
          </div>
        </div>

        <div className="col-sm-6 col-md-4 mb-3">
          <label htmlFor="name" className=" col-form-label">
            Payment Status
          </label>
          <div className="">
            <select
              name="academic-calendar"
              className="form-select"
              value={status}
              onChange={(e) => setstatus(e.target.value)}
            >
              <option defaultValue hidden>
                Choose...
              </option>
              <option value="all">All</option>
              <option value="paid">Paid</option>
              <option value="canceled">Canceled</option>
            </select>
          </div>
        </div>

        <div className="col-sm-6 col-md-4 mb-3">
          <label htmlFor="name" className=" col-form-label">
            From
          </label>
          <div className="å">
            <input
              value={from}
              onChange={(e) => setfrom(e.target.value)}
              type="date"
              className="form-control"
              name="from"
            />
          </div>
        </div>
        <div className="col-sm-6 col-md-4 mb-3">
          <label htmlFor="name" className=" col-form-label">
            To
          </label>
          <div className="">
            <input
              value={to}
              onChange={(e) => setto(e.target.value)}
              type="date"
              className="form-control"
              name="to"
            />
          </div>
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

      <div className="content__container mt-5">
        <ListTable data={data} noActions={true} tableHeader={tableHeader} />
      </div>
      {data.length > 0 && (
        <div className="d-flex justify-content-center mt-3">
          <button onClick={handlePrint} className="btn blue__btn">
            Print
          </button>
          <button className="btn blue__btn">Save</button>
        </div>
      )}
    </div>
  );
}

export default TellerReports;
