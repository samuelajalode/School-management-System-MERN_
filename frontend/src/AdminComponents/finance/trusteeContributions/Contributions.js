import React, { useState, useEffect } from "react";
import Table from "./Table";
import axios from "../../../store/axios";
import { monthYear } from "../../../data";
import { useSelector } from "react-redux";
import { selectUser } from "../../../store/slices/userSlice";
import { getYearsPast, errorAlert, currentCurrency } from "../../../utils";
import Export from "../../../components/tables/ExcelExport";

const tableHeader = [
  { id: "userID", name: "Staff ID" },
  { id: "taxNumber", name: "SSNIT Number" },
  { id: "name", name: "Name" },
  { id: "surname", name: "Surname" },
  { id: "position", name: "Staff Position" },
  { id: "tax", name: "5% Contribution" },
  { id: "salary", name: `Salary (${currentCurrency()})` },
];

function Contributions() {
  const [data, setdata] = useState([]);
  const [staff, setstaff] = useState([]);
  const years = getYearsPast(20);
  const [year, setyear] = useState("");
  const [month, setmonth] = useState("");
  const [loading, setloading] = useState(false);
  const [show, setshow] = useState(false);
  const user = useSelector(selectUser);
  const [selectedyear, setselectedyear] = useState("");
  const [selectedmonth, setselectedmonth] = useState("");

  useEffect(() => {
    axios.get(`/teachers`).then((res) => {
      setstaff(res.data);
    });
  });

  const handleSearch = (n) => {
    n.preventDefault();
    if (!year) {
      return errorAlert("Please select year");
    }
    if (!month) {
      return errorAlert("Please select month");
    }
    setloading(true);
    if (year && month) {
      axios
        .get(`/transactions/pay/${year}/${month}`)
        .then((res) => {
          setloading(false);
          setdata(
            res.data.docs &&
              res.data.docs?.map((e) => {
                let result = staff.find((i) => i.userID === e.pay.userID);
                return {
                  userID: result?.userID,
                  position: result?.position,
                  name: result?.name,
                  surname: result?.surname,
                  tax: (e.salary || 0) * 0.05,
                  salary: e?.salary,
                  taxNumber: result?.ssnit ? result?.taxNumber : "not set",
                  allowance: result?.salary,
                };
              })
          );
          setloading(false);
          setshow(true);
          setselectedmonth(month);
          setselectedyear(year);
        })
        .catch((err) => {
          console.log(err, "ERROR");

          setloading(false);
        });
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div>
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
              className="btn blue__btn mt-4"
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
      {show && (
        <div className="content__container">
          {" "}
          <div id="section-to-print">
            <div className="text-center">
              <h3>
                <strong>{user?.name}</strong>
              </h3>
              <h5>
                5% January Petra Trust Contribution List for{" "}
                {selectedmonth && monthYear[selectedmonth].name} {selectedyear}
              </h5>
            </div>

            <Table data={data} tableHeader={tableHeader} />
          </div>
          {data.length > 0 && (
            <div className="d-flex justify-content-center mt-5">
              <button onClick={handlePrint} className="btn blue__btn mr-2">
                {" "}
                View / Print
              </button>

              <Export
                className="btn blue__btn ml-2"
                data={data}
                columns={tableHeader}
              ></Export>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Contributions;
