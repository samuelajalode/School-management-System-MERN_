import React, { useState, useEffect } from "react";
import ListTable from "../../../AdminComponents/shared/ListTable";
import axios from "../../../store/axios";
import { getTrimString } from "../../../utils";
import { useSelector } from "react-redux";
import { selectUser } from "../../../store/slices/userSlice";
import moment from "moment";
import { bankOptions } from "../../../data";
import PrintIcon from "@material-ui/icons/Print";

const tableHeader = [
  { id: "date", name: "Date" },
  { id: "category", name: "Category" },
  { id: "description", name: "Description" },
  { id: "amount", name: "Amount" },
  { id: "paymentMethod", name: "Payment Type" },
];

let thismonth = moment().month();
let thisyear = moment().year();
let firstday = moment(`${thisyear}-${thismonth + 1}-01`).format("YYYY-MM-DD");

function ViewPayment() {
  const [expenditures, setexpenditures] = useState([]);
  const [type, settype] = useState("");
  const [bank, setbank] = useState("");
  const [from, setfrom] = useState(firstday);
  const [to, setto] = useState(moment().format("YYYY-MM-DD"));
  const [loading, setloading] = useState(false);
  const [storeData, setstoreData] = useState([]);
  const user = useSelector(selectUser);
  const [selectedto, setselectedto] = useState(moment().format("YYYY-MM-DD"));
  const [selectedfrom, setselectedfrom] = useState(firstday);

  useEffect(() => {
    console.log("loading");

    axios
      .get("/transactions")
      .then((res) => {
        console.log(res.data, "data");
        let results = res.data.filter((i) => i.type === "expenditure");
        let data = results.map((e) => {
          return {
            ...e,
            description: getTrimString(e.description, 50),
          };
        });
        setexpenditures(data);
        setstoreData(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSearch = (e) => {
    setloading(true);
    e.preventDefault();
    let newData = [];
    if (to) {
      newData = storeData.filter((i) => moment(i.date).isBefore(to));
    }
    if (from) {
      newData = storeData.filter((i) => moment(i.date).isAfter(from));
    }
    if (type) {
      newData = storeData.filter((i) => i.type.includes(type));
    }
    if (bank) {
      newData = newData.filter((i) => i.bank.includes(bank));
    }

    setselectedfrom(from);
    setselectedto(to);

    setexpenditures(newData);
    setloading(false);
  };

  const handleReset = (e) => {
    e.preventDefault();
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div>
      <h3 className="">Expenditure Reports </h3>
      <form className="content__container row">
        <div className="col-sm-6 col-md-4 mb-3">
          <label htmlFor="name" className=" col-form-label">
            Payment Type
          </label>
          <div className="">
            <select
              name="academic-calendar"
              className="form-select"
              value={type}
              onChange={(e) => settype(e.target.value)}
            >
              <option defaultValue hidden>
                Choose...
              </option>
              <option value="1">cash</option>
              <option value="1">bank deposit</option>
              <option value="2">cheque</option>
              <option value="3">other</option>
            </select>
          </div>
        </div>

        <div className="col-sm-6 col-md-4 mb-3">
          <label htmlFor="name" className=" col-form-label">
            Bank
          </label>
          <div className="">
            <select
              name="academic-calendar"
              className="form-select"
              value={bank}
              onChange={(e) => setbank(e.target.value)}
            >
              <option defaultValue hidden>
                Choose...
              </option>
              {bankOptions &&
                bankOptions.map((y) => (
                  <option value={y} key={y}>
                    {y}
                  </option>
                ))}
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
            Search
          </button>
          <button
            onClick={handleReset}
            type="submit"
            className="btn btn-danger mx-2"
          >
            Reset
          </button>
        </div>
      </form>
      <div className="mt-5 content__container" id="section-to-print">
        <div className="text-center">
          <h5>
            <strong>{user?.name}</strong>
          </h5>
          <h5>EXPENDITURE REPORT</h5>
          <div>
            From {moment(selectedfrom).format("DD MMMM YYYY")} - To{" "}
            {moment(selectedto).format("DD MMMM YYYY")}
          </div>
        </div>
        <ListTable
          data={expenditures}
          noActions={true}
          tableHeader={tableHeader}
        />
      </div>
      <div>
        <div className="text-center">
          <button className="btn blue__btn mr-3  " onClick={handlePrint}>
            Print <PrintIcon />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ViewPayment;
