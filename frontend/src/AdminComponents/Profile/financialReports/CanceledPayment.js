import React, { useState, useEffect } from "react";
import ListTable from "../../shared/ListTable";
import axios from "../../../store/axios";
import { useSelector } from "react-redux";
import { selectYearGroup } from "../../../store/slices/schoolSlice";
import { selectUser } from "../../../store/slices/userSlice";
import moment from "moment";

let thismonth = moment().month();
let thisyear = moment().year();
let dayOne = moment(`01/${thismonth}/${thisyear}`).format("YYYY-MM-DD");

const tableHeader = [
  { id: "received_from", name: "Received From" },
  { id: "createdAt", name: "Date" },
  { id: "amount", name: "Amount Paid" },
  { id: "receipt", name: "Receipt Number" },
  { id: "paid", name: "Paid To" },
  { id: "canceledBy", name: "Canceled By" },
  { id: "reason", name: "Cancellation Reason" },
];

function ViewPayment() {
  const [expenditures, setexpenditures] = useState([]);
  const [year, setyear] = useState("");
  const [term, setterm] = useState("");
  const [from, setfrom] = useState(dayOne);
  const [to, setto] = useState(moment().format("YYYY-MM-DD"));
  const [loading, setloading] = useState(false);
  const years = useSelector(selectYearGroup);
  const user = useSelector(selectUser);

  useEffect(() => {
    axios.get("/").then((res) => {
      setexpenditures([]);
    });
  }, []);

  const handleSearch = (e) => {
    setloading(false);
    e.preventDefault();
    console.log("searching");
  };

  return (
    <div>
      <h3 className="">Canceled Payment Reports</h3>
      <form className="content__container row">
        <div className="col-sm-6 col-md-4 mb-3">
          <label htmlFor="name" className=" col-form-label">
            Year
          </label>
          <div className="">
            <select
              name="academic-calendar"
              className="form-select"
              value={year}
              onChange={(e) => setyear(e.target.value)}
            >
              <option defaultValue hidden>
                Choose...
              </option>
              {years &&
                years.map((y) => (
                  <option value={y?.year} key={y._id}>
                    {y?.year}
                  </option>
                ))}
            </select>
          </div>
        </div>

        <div className="col-sm-6 col-md-4 mb-3">
          <label htmlFor="name" className=" col-form-label">
            Term
          </label>
          <div className="">
            <select
              name="academic-calendar"
              className="form-select"
              value={term}
              onChange={(e) => setterm(e.target.value)}
            >
              <option defaultValue hidden>
                Choose...
              </option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
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

      <div className="mt-5 content__container">
        <div className="text-center">
          <h5>
            <strong>{user?.name}</strong>
          </h5>
          <h5>CANCELED PAYMENTS</h5>
          <div>
            From {moment(from).format("DD MMMM YYYY")} - To{" "}
            {moment(to).format("DD MMMM YYYY")}
          </div>
        </div>
        <ListTable
          data={expenditures}
          noActions={true}
          tableHeader={tableHeader}
        />
      </div>
    </div>
  );
}

export default ViewPayment;
