import React, { useEffect, useState } from "react";
import Search from "./Search";
import Table from "./Table";
import axios from "../../../store/axios";
import Reminder from "./SendLetter";
import Message from "./SendMessage";
import { currentCurrency } from "../../../utils";

const tableHeader = [
  { id: "userID", name: "Student ID" },
  { id: "name", name: "Name" },
  { id: "classID", name: "Class" },
  { id: "total", name: `Total Bill ${currentCurrency()}` },
  { id: "amount", name: `Amount Paid ${currentCurrency()}` },

  { id: "owe", name: `Amount Owed ${currentCurrency()}` },
];

function DebtorsList() {
  const [data, setdata] = useState([]);
  const [year, setyear] = useState("");
  const [term, setterm] = useState("");
  const [classID, setclassID] = useState("all");
  const [campus, setcampus] = useState("");
  const [show, setshow] = useState(false);
  const [loading, setloading] = useState(false);
  const [fees, setfees] = useState([]);
  const [openLetter, setopenLetter] = useState(false);
  const [openMessage, setopenMessage] = useState(false);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    axios.get("/fees").then((res) => {
      setfees(res.data);
    });
  }, []);

  const handleSearch = () => {
    setloading(true);
    let bal = (u) => {
      let fee = fees.find((z) => z?.code === u?.classID);
      return fee
        ? Object.values(fee[u.status] || {}).reduce(
            (t, v) => Number(t) + Number(v),
            0
          )
        : 0;
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
    });
  };

  let debtors = selected.map((e) => {
    let student = data.find((i) => i.userID === e);
    return {
      ...student,
    };
  });

  return (
    <div>
      <h3> Bill Reminder</h3>
      <div className="content__container mb-5">
        <Search
          year={year}
          setyear={setyear}
          term={term}
          handleSearch={handleSearch}
          classID={classID}
          setclassID={setclassID}
          campus={campus}
          setcampus={setcampus}
          setterm={setterm}
          loading={loading}
        />
      </div>
      {show && (
        <>
          <div className="content__container" id="section-to-print">
            <div className="text-center">
              <h3>
                DEBTORS LIST FOR {term}/ {year}
              </h3>
            </div>
            <Table
              selected={selected}
              setSelected={setSelected}
              tableHeader={tableHeader}
              data={data}
            />
          </div>
          <div className="text-center my-2">
            <button
              onClick={() => setopenLetter(true)}
              className="btn blue__btn mr-2"
            >
              Continue
            </button>
            <button
              onClick={() => setopenMessage(true)}
              className="btn blue__btn ml-3"
            >
              send message
            </button>
          </div>
        </>
      )}
      {debtors.length > 0 && (
        <>
          <Message
            debtors={debtors}
            open={openMessage}
            setOpen={setopenMessage}
          />
          <Reminder
            debtors={debtors}
            open={openLetter}
            setOpen={setopenLetter}
          />
        </>
      )}
    </div>
  );
}

export default DebtorsList;
