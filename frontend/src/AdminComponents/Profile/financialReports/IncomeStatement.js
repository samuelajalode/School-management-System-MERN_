import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../../store/slices/userSlice";
import moment from "moment";
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";
import PrintIcon from "@material-ui/icons/Print";
import { pdf } from "../../../components/tables/pdf";

let thismonth = moment().month();
let thisyear = moment().year();
let firstday = moment(`${thisyear}-${thismonth + 1}-01`).format("YYYY-MM-DD");

function IncomeStatement() {
  const user = useSelector(selectUser);
  const [from, setfrom] = useState(firstday);
  const [to, setto] = useState(moment().format("YYYY-MM-DD"));
  const [loading, setloading] = useState("");
  const data = [
    { name: "Revenue", id: "" },
    { name: "Fee Payments", id: "0" },
    { name: "Other Income", id: "0" },
    { name: "Expenses", id: "-" },
    { name: "Net income", id: "0" },
  ];

  const handleSearch = () => {
    setloading(false);
    console.log("searching...");
  };

  const handleSave = () => {
    const headers = [
      { key: "name", label: "" },
      { key: "id", label: "" },
    ];

    pdf({
      data: data,
      headers,
      filename: "Itemized",
      title: user?.name,
      subheading: "INCOME STATEMENT REPORT",
      date: `  From ${moment(from).format("DD MMMM YYYY")} - To{" "}
    ${moment(to).format("DD MMMM YYYY")}`,
    });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div>
      <form className="content__container row">
        <div className="col-sm-6 col-md-4 mb-3">
          <label htmlFor="name" className=" col-form-label">
            From
          </label>
          <div className="">
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
          <h5>INCOME STATEMENT</h5>
          <div>
            From {moment(from).format("DD MMMM YYYY")} - To{" "}
            {moment(to).format("DD MMMM YYYY")}
          </div>
        </div>
        <table className="table table-borderless">
          <thead>
            <tr>
              <th scope="col"></th>
              <th scope="col">Amount ($)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="col">
                <strong>Revenues</strong>
              </th>
              <th scope="col"></th>
            </tr>
            <tr>
              <td className="pl-5">Fee Payment</td>
              <td>0</td>
            </tr>
            <tr>
              <td className="pl-5">Others income</td>
              <td>0</td>
            </tr>
            <br />
            <tr>
              <td>
                <strong>Expenses</strong>
              </td>
              <td></td>
            </tr>
            <br />
            <tr>
              <td>
                <strong>Net Income</strong>
              </td>
              <td>0</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="d-flex justify-content-center mt-3">
        <button onClick={handlePrint} className="btn blue__btn">
          Print <PrintIcon />
        </button>
        <button onClick={handleSave} className="btn blue__btn ml-3">
          Save <InsertDriveFileIcon />
        </button>
      </div>
    </div>
  );
}

export default IncomeStatement;
