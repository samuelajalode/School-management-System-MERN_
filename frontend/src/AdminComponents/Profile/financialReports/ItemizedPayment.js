import React, { useState } from "react";
//import axios from "../../../store/axios";
import { useSelector } from "react-redux";
import { selectYearGroup } from "../../../store/slices/schoolSlice";
import { selectUser } from "../../../store/slices/userSlice";
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";
import PrintIcon from "@material-ui/icons/Print";
import moment from "moment";
import { pdf } from "../../../components/tables/pdf";

let thismonth = moment().month();
let thisyear = moment().year();
let firstday = moment(`${thisyear}-${thismonth + 1}-01`).format("YYYY-MM-DD");

function NonBillPayment() {
  const [data, setdata] = useState([
    {
      tuition: "0",
      facility: "0",
      maintenance: "0",
      exam: "0",
      transportion: "0",
      arrears: "0",
      bills: "0",
      total: "0",
    },
  ]);
  const [year, setyear] = useState("");
  const [term, setterm] = useState("");
  const [from, setfrom] = useState(firstday);
  const [to, setto] = useState(moment().format("YYYY-MM-DD"));
  const [loading, setloading] = useState(false);
  const user = useSelector(selectUser);
  const years = useSelector(selectYearGroup);

  const handleSave = () => {
    setdata([
      {
        tuition: "0",
        facility: "0",
        maintenance: "0",
        exam: "0",
        transportion: "0",
        arrears: "0",
        bills: "0",
        total: "0",
      },
    ]);
    const headers = [
      { key: "tuition", label: "Tuition Fee" },
      { key: "facility", label: "Facility User Fee" },
      { key: "maintenance", label: "Facility Maintenance Fee" },
      { key: "exam", label: "Examination Fee" },
      { key: "transportion", label: "Transportation Fee" },
      { key: "arrears", label: "Arrears" },
      { key: "bills", label: "Custom Bills" },
      { key: "total", label: "Total" },
    ];

    pdf({ data: data, headers, filename: "Itemized" });
  };

  const handlePrint = () => {
    window.print();
  };

  const handleSearch = (e) => {
    setloading(false);
    e.preventDefault();
  };

  return (
    <div>
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

      <div className="content__container mt-5">
        <div className="text-center">
          <h5>
            <strong>{user?.name}</strong>
          </h5>
          <h5>SUMMARY OF BILL PAYMENTS RECEIVED</h5>
          <div>
            From {moment(from).format("DD MMMM YYYY")} - To{" "}
            {moment(to).format("DD MMMM YYYY")}
          </div>
        </div>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col">ITEM</th>
              <th scope="col">AMOUNT</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Tuition Fee</td>
              <td>${0}</td>
            </tr>
            <tr>
              <td>Facility User Fee</td>
              <td>${0}</td>
            </tr>
            <tr>
              <td>Facility Maintenance Fee</td>
              <td>${0}</td>
            </tr>
            <tr>
              <td>Examination Fee</td>
              <td>${0}</td>
            </tr>
            <tr>
              <td>Transportation Fee</td>
              <td>${0}</td>
            </tr>
            <tr>
              <td>Arrears</td>
              <td>${0}</td>
            </tr>
            <tr>
              <td>Custom Bills</td>
              <td>${0}</td>
            </tr>
            <tr>
              <td>
                <strong>Total</strong>
              </td>
              <td>
                <strong>${0}</strong>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="d-flex justify-content-center mt-3">
          <button onClick={handlePrint} className="btn blue__btn">
            Print <PrintIcon />
          </button>
          <button onClick={handleSave} className="btn blue__btn ml-3">
            Save <InsertDriveFileIcon />
          </button>
        </div>
      </div>
    </div>
  );
}

export default NonBillPayment;
