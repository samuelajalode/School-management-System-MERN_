import React, { useEffect, useState } from "react";
import Search from "./Search";
import Table from "./Table";
import axios from "../../../store/axios";
import Excel from "../../../components/tables/ExcelExport";
import { errorAlert, currentCurrency } from "../../../utils";

const tableHeader = [
  { id: "userID", name: "Student ID" },
  { id: "name", name: "Name" },
  { id: "classID", name: "Class" },
  { id: "total", name: `Total Fees ${currentCurrency()}` },
  { id: "amount", name: `Amount Paid ${currentCurrency()}` },
  { id: "owe", name: `Amount Owed ${currentCurrency()}` },
];

function DebtorsList() {
  const [data, setdata] = useState([]);
  const [year, setyear] = useState("");
  const [term, setterm] = useState("");
  const [classID, setclassID] = useState("all");
  const [campus, setcampus] = useState("");
  const [amount, setamount] = useState("");
  const [show, setshow] = useState(false);
  const [loading, setloading] = useState(false);
  const [fees, setfees] = useState([]);
  const [selectedterm, setselectedterm] = useState("");
  const [selectedyear, setselectedyear] = useState("");

  useEffect(() => {
    axios.get("/fees").then((res) => {
      setfees(res.data);
    });
  }, []);

  const handleSearch = () => {
    if (!year) {
      return errorAlert("Please select year");
    }
    if (!term) {
      return errorAlert("Please select term");
    }
    setloading(true);

    let bal = (u) => {
      let fee = fees.find((z) => z?.code === u?.classID);
      if (fee) {
        return fee
          ? Object.values(fee[u?.status] || {}).reduce(
              (t, v) => Number(t) + Number(v),
              0
            )
          : 0;
      }
      return 0;
    };
    axios.get(`/students/unpaidfees/${year}/${term}`).then((res) => {
      let students = res.data.map((e) => {
        let total = bal(e);
        return {
          ...e,
          bill: total,
          owe: total - e.amount,
          total,
        };
      });
      let dataAll = students.filter((e) => e.owe > 0);

      if (classID !== "all") {
        dataAll = dataAll.filter((e) => e.classID === classID);
      }
      setdata(dataAll);
      setshow(true);
      setloading(false);
      setselectedyear(year);
      setselectedterm(term);
    });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div>
      <h3> Debtors List</h3>
      <div className="content__container mb-5">
        <Search
          year={year}
          setyear={setyear}
          term={term}
          campus={campus}
          setcampus={setcampus}
          classID={classID}
          setclassID={setclassID}
          amount={amount}
          handleSearch={handleSearch}
          setterm={setterm}
          loading={loading}
        />
      </div>
      {show && (
        <>
          <div className="content__container" id="section-to-print">
            <div className="text-center">
              <h3>
                DEBTORS LIST FOR Term {selectedterm}/ {selectedyear}
              </h3>
            </div>
            <Table
              noData="No debtors yet"
              tableHeader={tableHeader}
              data={data}
            />
          </div>
          <div className="text-center my-3">
            <button onClick={handlePrint} className="btn blue__btn mr-2">
              Print
            </button>
            <Excel data={data} columns={tableHeader} btn="Save" />
          </div>
        </>
      )}
    </div>
  );
}

export default DebtorsList;
