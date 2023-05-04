import React, { useState, useEffect } from "react";
import ListTable from "../../shared/ListTable";
import axios from "../../../store/axios";
import { getTrimString } from "../../../utils";
import { useSelector } from "react-redux";
import { selectUser } from "../../../store/slices/userSlice";
import ExcelExport from "../../../components/tables/ExcelExport";
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";
import PrintIcon from "@material-ui/icons/Print";
import moment from "moment";

let thismonth = moment().month();
let thisyear = moment().year();
let firstday = moment(`${thisyear}-${thismonth + 1}-01`).format("YYYY-MM-DD");

const tableHeader = [
  { id: "createdAt", name: "Date", date: true },
  { id: "description", name: "Description" },
  { id: "amount", name: "Amount ($)" },
];

function ViewPayment() {
  const [expenditures, setexpenditures] = useState([]);
  const [storeData, setstoreData] = useState([]);
  const [from, setfrom] = useState(firstday);
  const [to, setto] = useState(moment().format("YYYY-MM-DD"));
  const [loading, setloading] = useState(false);
  const user = useSelector(selectUser);

  useEffect(() => {
    axios.get("/transactions").then((res) => {
      let data = res.data.map((e) => {
        return {
          ...e,
          description: getTrimString(e.description, 50),
        };
      });
      setexpenditures(data.filter((i) => i.type === "income"));
      setstoreData(data.filter((i) => i.type === "income"));
    });
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    let newData = [];
    if (to) {
      newData = storeData.filter(
        (i) =>
          moment(i.date, "YYYY-MM-DD").isBefore(moment(to, "YYYY-MM-DD")) ===
          true
      );
    }
    if (from) {
      newData = storeData.filter(
        (i) => moment(i.date).isAfter(moment(from, "YYYY-MM-DD")) === true
      );
    }
    console.log(newData);
    setexpenditures(newData);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleReset = () => {
    setexpenditures(storeData);
  };

  return (
    <div>
      <h3 className="">Supplementary Income Reports</h3>
      <form className="content__container row">
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

      <div className="mt-5 content__container">
        <div id="section-to-print">
          <div className="text-center">
            <h5>
              <strong>{user?.name}</strong>
            </h5>
            <h5>SUPPLEMENTARY INCOME REPORT</h5>
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

        {expenditures.length > 0 && (
          <div className="text-center my-5">
            <button className="btn blue__btn mr-3 " onClick={handlePrint}>
              Print <PrintIcon />
            </button>
            <ExcelExport
              data={expenditures}
              columns={tableHeader}
              btn={
                <>
                  <InsertDriveFileIcon /> Save
                </>
              }
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default ViewPayment;
