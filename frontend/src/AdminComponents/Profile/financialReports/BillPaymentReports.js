import React, { useState, useEffect } from "react";
import ListTable from "../../shared/ListTable";
import axios from "../../../store/axios";
import { getTrimString } from "../../../utils";
import { useSelector } from "react-redux";
import { selectUser } from "../../../store/slices/userSlice";
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";
import PrintIcon from "@material-ui/icons/Print";
import { selectYearGroup } from "../../../store/slices/schoolSlice";
//import { pdf } from "../../../components/tables/pdf";
import moment from "moment";
import ExcelExport from "../../../components/tables/ExcelExport";

let thismonth = moment().month();
let thisyear = moment().year();
let firstday = moment(`${thisyear}-${thismonth + 1}-01`).format("YYYY-MM-DD");

const tableHeader = [
  { id: "date", name: "Date", date: true },
  { id: "paymentMethod", name: "Type" },
  { id: "userID", name: "Student" },
  { id: "amount", name: "Amount" },
  { id: "_id", name: "Receipt Number" },
  { id: "academicYear", name: "Year" },
  { id: "term", name: "Term Semester" },
];

function ViewPayment() {
  const [expenditures, setexpenditures] = useState([]);
  const [storeData, setstoreData] = useState([]);
  const [year, setyear] = useState("");
  const [term, setterm] = useState("");
  const [from, setfrom] = useState(firstday);
  const [to, setto] = useState(moment().format("YYYY-MM-DD"));
  const [loading, setloading] = useState(false);
  const years = useSelector(selectYearGroup);
  const user = useSelector(selectUser);

  useEffect(() => {
    axios.get("/transactions/students/fees").then((res) => {
      let data = res.data.map((e) => {
        return {
          ...e,
          description: getTrimString(e.description, 50),
        };
      });
      setexpenditures(data);
      setstoreData(data);
    });
  }, []);

  const handlePrint = () => {
    window.print();
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("searching");
    setloading(true);
    setfrom(firstday);
    setto(moment().format("YYYY-MM-DD"));
    let newData = [];
    if (year) {
      newData = storeData.filter((i) =>
        i.academicYear?.toLowerCase().includes(year.toLowerCase())
      );
    }
    if (term) {
      newData = newData.filter((i) =>
        i.term?.toLowerCase().includes(term.toLowerCase())
      );
    }

    setexpenditures(newData);
    setloading(false);
  };

  return (
    <div>
      <h3 className="">Bill Payment Reports</h3>
      <form className="content__container row">
        <div className="col-sm-6 ">
          <label htmlFor="name" className=" col-form-label">
            Year
          </label>
          <div className="mb-3">
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

        <div className="col-sm-6 mb-3">
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

      <div className="mt-5" id="section-to-print">
        <div className="text-center mb-3">
          <h5>
            <strong>{user?.name}</strong>
          </h5>
          <h5>BILL PAYMENTS RECEIVED</h5>
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
  );
}

export default ViewPayment;
