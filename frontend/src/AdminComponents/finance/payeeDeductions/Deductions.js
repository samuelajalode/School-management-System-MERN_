import React, { useState } from "react";
import { monthYear } from "../../../data";
import { errorAlert, getYearsPast } from "../../../utils";
import axios from "../../../store/axios";
import Table from "./Table";
import { useSelector } from "react-redux";
import { selectUser } from "../../../store/slices/userSlice";
//import moment from "moment";

//Employee's SSF
const tableHeader = [
  { id: "userID", name: "Staff ID" },
  { id: "name", name: "Name" },
  { id: "position", name: "Category of Staff" },
  { id: "salary", name: "Basic Salary" },
  { id: "ssf", name: "Employee's SSF" },
  { id: "allowance", name: "Cash Allowance" },
  { id: "emolument", name: "Total Cash Emolument" },
  { id: "income", name: "Chargeable Income" },
  { id: "payable", name: "Total Tax Deductible & Payable" },
];

function Deductions() {
  const [data, setdata] = useState([]);
  const [year, setyear] = useState("");
  const [month, setmonth] = useState(0);
  const [loading, setloading] = useState("");
  const years = getYearsPast(20);
  const [isGenerate, setisGenerate] = useState(false);
  const user = useSelector(selectUser);

  const [selectedMonth, setselectedMonth] = useState(0);
  const [selectedYear, setselectedYear] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (year === "" || month === "") {
      return errorAlert("Both year and month are required");
    }
    setloading(true);
    const getUser = async (i) => {
      let userData = await axios.get(`/teachers/${i}`);
      return userData?.data?.teacher;
    };
    axios.get(`/transactions/staff/pay`).then((res) => {
      setisGenerate(true);
      setselectedMonth(month);
      setselectedYear(year);
      let arrData = [];
      res.data.map(async (doc) => {
        let u = await getUser(doc?.userID);
        arrData.push({
          userID: u?.userID,
          position: u?.position,
          name: u?.name,
          surname: u?.surname,
          taxNumber: u?.taxNumber,
          salary: u?.salary,
          allowance: u?.salary,
        });
      });
      console.log(arrData);
      setdata(arrData);
    });
    setloading(false);
  };

  const handlePrint = () => {
    window.print();
  };

  // const handlePrint = () => {
  //   window.print();
  // };
  console.log(data);
  return (
    <div>
      <h3>Paye Deductions</h3>
      <form action="" className="content__container mb-5">
        <div className="row">
          <div className="col-sm-4">
            <label htmlFor="">Year</label>
            <div className="">
              <select
                value={year}
                name="transfer"
                onChange={(e) => setyear(e.target.value)}
                className="form-select"
              >
                <option defaultValue hidden>
                  Choose...
                </option>
                {years &&
                  years.map((id) => (
                    <option key={id} value={id}>
                      {id}
                    </option>
                  ))}
              </select>
            </div>
          </div>
          <div className="col-sm-4">
            <label htmlFor="">Month</label>
            <div className="">
              <select
                value={month}
                name="month"
                onChange={(e) => setmonth(e.target.value)}
                className="form-select"
              >
                <option defaultValue hidden>
                  Choose...
                </option>
                {monthYear &&
                  monthYear.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.name}
                    </option>
                  ))}
              </select>
            </div>
          </div>
          <div className="col-sm-4">
            <button
              disabled={loading}
              className="btn blue__btn"
              onClick={handleSearch}
            >
              {loading && (
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
              )}
              Generate
            </button>
          </div>
        </div>
      </form>

      {isGenerate && (
        <>
          <div className="content__container" id="section-to-print">
            <div>
              <h6>
                <strong>
                  EMPLOYER'S MONTHLY TAX DEDUCTIONS SCHEDULE (P.A.Y.E)
                </strong>
              </h6>
              <div className="row">
                <div className="col-2">Name</div>
                <div className="col-2">{user?.name}</div>
              </div>
              <div className="row">
                <div className="col-2">Month</div>
                <div className="col-2">
                  {monthYear[selectedMonth].name} {selectedYear}
                </div>
              </div>
            </div>

            <Table data={data} tableHeader={tableHeader}></Table>
            <div className="mt-3">
              <p>
                I hereby declare that the information provided above is complete
                and accurate.
              </p>

              <div>
                <div className="row mb-2">
                  <div className="col-4">Name of Declarant</div>
                  <div className="col-4">
                    ..........................................
                  </div>
                </div>
                <div className="row mb-2">
                  <div className="col-4">Designation</div>
                  <div className="col-4">
                    ..........................................
                  </div>
                </div>
                <div className="row mb-2">
                  <div className="col-4">Signature</div>
                  <div className="col-4">
                    ..........................................
                  </div>
                </div>
                <div className="row mb-2">
                  <div className="col-4">Date</div>
                  <div className="col-4">
                    ..........................................
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-center my-3">
            <button onClick={() => handlePrint()} className="btn blue__btn">
              Print
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Deductions;
