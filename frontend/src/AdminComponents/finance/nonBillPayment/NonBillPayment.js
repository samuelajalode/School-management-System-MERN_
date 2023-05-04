import React, { useState } from "react";
import Payment from "./Payment";
import Search from "./Search";
import axios from "../../../store/axios";
import { errorAlert, successAlert } from "../../../utils";

function NonBillPayment() {
  const [date, setdate] = useState("");
  const [year, setyear] = useState("");
  const [term, setterm] = useState("");
  const [remarks, setremarks] = useState("");
  const [paymentType, setpaymentType] = useState("");
  const [bank, setbank] = useState("");
  const [chequeNum, setchequeNum] = useState("");
  const [classID, setclassID] = useState("");
  const [studentID, setstudentID] = useState("");
  const [amount, setamount] = useState("");
  const [studentsOptions, setstudentsOptions] = useState([]);
  const [loading, setloading] = useState(false);
  const [loadingPayment, setloadingPayment] = useState(false);

  const handleSelectClass = (id) => {
    setloading(true);
    setstudentsOptions([]);
    setstudentID("");
    setclassID(id);
    axios
      .get(`/students/class/${id}`)
      .then((res) => {
        setloading(false);
        if (res.data.error) {
          errorAlert(res.data.error);
          return 0;
        }
        setstudentsOptions(res.data.users);
      })
      .catch((err) => {
        console.log(err);
        setloading(false);
      });
  };

  const handleSelectStudent = async (id) => {
    setloading(true);
    setstudentID(id);
    setloading(false);
  };

  const handlePayment = () => {
    setloadingPayment(true);
    axios
      .post("/nonbillpayment/create", {
        amount,
        bank,
        chequeNum,
        year,
        student: studentID,
        term,
        paymentType,
        remarks,
      })
      .then((res) => {
        setloadingPayment(false);
        if (res.data.error) {
          return errorAlert(res.data.error);
        }
        successAlert("Successfully payment completed");
        setamount("");
        setbank("");
        setyear("");
        setchequeNum("");
        setdate("");
        setterm("");
        setremarks("");
      });
  };

  return (
    <div>
      <Search
        classID={classID}
        loading={loading}
        term={term}
        setterm={setterm}
        year={year}
        setyear={setyear}
        studentOptions={studentsOptions}
        setclassID={handleSelectClass}
        studentID={studentID}
        setstudentID={handleSelectStudent}
      />
      {studentID && (
        <Payment
          setremarks={setremarks}
          chequeNo={chequeNum}
          setdate={setdate}
          setchequeNo={setchequeNum}
          paymentType={paymentType}
          setpaymentType={setpaymentType}
          term={term}
          remarks={remarks}
          amount={amount}
          setamount={setamount}
          bank={bank}
          setbank={setbank}
          date={date}
          loading={loadingPayment}
          handlePayement={handlePayment}
          year={year}
          setyear={setyear}
          setterm={setterm}
        />
      )}
    </div>
  );
}

export default NonBillPayment;
