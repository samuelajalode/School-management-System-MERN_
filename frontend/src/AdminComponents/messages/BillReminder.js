import React, { useEffect, useState } from "react";
import Search from "../finance/billReminder/Search";
import Table from "../finance/billReminder/Table";
import axios from "../../store/axios";
import Message from "../finance/billReminder/SendMessage";

const tableHeader = [
  { id: "userID", name: "Student ID" },
  { id: "name", name: "Name" },
  { id: "classID", name: "Class" },
  { id: "total", name: "Total Bill" },
  { id: "amount", name: "Amount Paid" },
  { id: "owe", name: "Amount Owed" },
];

function DebtorsList() {
  const [data, setdata] = useState([]);
  const [year, setyear] = useState("");
  const [term, setterm] = useState("");
  const [classID, setclassID] = useState("");
  const [campus, setcampus] = useState("");
  const [listby, setlistby] = useState("");
  const [listValue, setlistValue] = useState("");
  const [filterValue, setfilterValue] = useState("");
  const [filterBy, setfilterBy] = useState("");
  const [amount, setamount] = useState("");
  const [pastStudents, setpastStudents] = useState("");
  const [withdrawStudent, setwithdrawStudent] = useState("");
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
      let fee = fees.find((z) => z?.code === u?.fees);
      return fee
        ? Object.values(fee[u.status] || {}).reduce(
            (t, v) => Number(t) + Number(v),
            0
          )
        : 0;
    };
    axios.get(`/students/unpaidfees`).then((res) => {
      let thisyear = res.data.filter((i) => i.academicYear === year);
      let thisData = thisyear.filter((i) => i.term === term);
      let students = thisData.map((e) => {
        let total = bal(e);
        return {
          ...e,
          arrears: 0,
          bill: total,
          owe: total - e.amount,
          total,
        };
      });
      let dataAll = students.filter((e) => e.owe > 0);

      if (classID) {
        setdata(dataAll.filter((e) => e.classID === classID));
      }
      if (campus) {
        setdata(dataAll.filter((e) => e.campus === campus));
      }
      setdata(dataAll);
      setdata(students.filter((e) => e.owe > 0));
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
      <h3>SMS Bill Reminder</h3>
      <div className="content__container mb-5">
        <Search
          year={year}
          setyear={setyear}
          term={term}
          handleSearch={handleSearch}
          setterm={setterm}
          classID={classID}
          setclassID={setclassID}
          setcampus={setcampus}
          campus={campus}
          loading={loading}
        />
      </div>
      {show && (
        <>
          <div className="content__container" id="section-to-print">
            <div className="text-center">
              <h3>
                DEBTORS LIST FOR {term} - {year}
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
        </>
      )}
    </div>
  );
}

export default DebtorsList;
