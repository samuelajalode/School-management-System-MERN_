import React, { useState } from "react";
import Table from "./Table";
import axios from "../../../store/axios";
import { monthYear } from "../../../data";
import { useSelector } from "react-redux";
import { selectUser } from "../../../store/slices/userSlice";
import {
  getYearsPast,
  errorAlert,
  currentCurrency,
  successAlert,
} from "../../../utils";
import Export from "../../../components/tables/ExcelExport";
import SetContributions from "./SetContributions";

function Contributions() {
  const [data, setdata] = useState([]);
  const years = getYearsPast(20);
  const [year, setyear] = useState("");
  const [month, setmonth] = useState("");
  const [loading, setloading] = useState(false);
  const [show, setshow] = useState(false);
  const user = useSelector(selectUser);
  const [selectedyear, setselectedyear] = useState("");
  const [selectedmonth, setselectedmonth] = useState("");
  const [open, setopen] = useState(false);
  const [percentage, setpercentage] = useState("");
  const [id, setid] = useState("");
  const [editloading, seteditloading] = useState(false);

  const tableHeader = [
    { id: "userID", name: "Staff ID" },
    { id: "SSNITNumber", name: "SSNIT Number" },
    { id: "name", name: "Name" },
    { id: "position", name: "Staff Position" },
    { id: "contribution", name: `${percentage}% Contribution` },
    { id: "salary", name: `Salary (${currentCurrency()})` },
  ];

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
        .get(`/ssnit/teachers/${year}/${month}`)
        .then((res) => {
          setloading(false);
          let percentage = res.data.docs.percentage;
          setpercentage(percentage);
          setid(res.data.docs._id);
          setdata(
            res.data.docs &&
              res.data.docs.teachers?.map((e) => {
                return {
                  userID: e?.userID,
                  position: e?.position,
                  SSNITNumber: e?.SSNITNumber,
                  name: e?.name,
                  salary: e?.salary || "-",
                  contribution: e.salary ? e.salary * percentage : "not set",
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

  const handleChangePercentage = () => {
    seteditloading(true);
    axios.put(`/ssnit/update/${id}`, { percentage }).then((res) => {
      seteditloading(false);
      if (res.data.error) {
        return errorAlert(res.data.error);
      }

      successAlert("successfully save changes");
      setopen(false);
    });
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
            <div className="d-flex justify-content-between">
              <div className="text-center">
                <h3>
                  <strong>{user?.name}</strong>
                </h3>
                <h5>
                  {percentage}% January SSNIT Contribution List for{" "}
                  {selectedmonth && monthYear[selectedmonth].name}{" "}
                  {selectedyear}
                </h5>
              </div>
              <div>
                <button onClick={() => setopen(true)} className="btn blue__btn">
                  Edit SSNIT Contributions
                </button>
              </div>
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
      <SetContributions
        percentage={percentage}
        setpercentage={setpercentage}
        open={open}
        loading={editloading}
        onSubmit={handleChangePercentage}
        setOpen={setopen}
      />
    </div>
  );
}

export default Contributions;
