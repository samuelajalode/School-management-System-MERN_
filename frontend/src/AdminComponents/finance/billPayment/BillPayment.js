import React, { useState } from "react";
import SearchStudent from "./SearchStudent";
import PaymentForm from "./PaymentForm";
import ViewStudent from "./ViewStudent";
import axios from "../../../store/axios";
import Loading from "../../../Loading";
import { errorAlert, successAlert } from "../../../utils";

function BillPayment() {
  const [year, setyear] = useState("");
  const [term, setterm] = useState("");
  const [classID, setclassID] = useState("");
  const [studentID, setstudentID] = useState("");
  const [studentOptions, setstudentOptions] = useState([]);
  const [amount, setamount] = useState("");
  const [date, setdate] = useState("");
  const [bank, setbank] = useState("");
  const [chequeNo, setchequeNo] = useState("");
  const [paymentType, setpaymentType] = useState("");

  const [applyTo, setapplyTo] = useState({
    all: false,
    tuition: false,
    examination: false,
    facility: false,
    maintenance: false,
  });
  const [remarks, setremarks] = useState("");
  const [loading, setloading] = useState(false);
  const [transactions, settransactions] = useState([]);
  const [loadingStudents, setloadingStudents] = useState(false);
  const [user, setuser] = useState({});
  const [feetype, setfeetype] = useState({});
  const [balance, setbalance] = useState(0);
  const [totalBill, settotalBill] = useState(0);
  const [totalPaid, settotalPaid] = useState(0);
  const [show, setshow] = useState(false);
  const [scholarship, setscholarship] = useState(null);

  const handleSelectStudent = async (e) => {
    e.preventDefault();
    if (!term) {
      return errorAlert("Please select term");
    }
    if (!year) {
      return errorAlert("Please select year");
    }

    if (!studentID) {
      return errorAlert("Please select student");
    }
    setshow(false);
    setloading(true);

    let transactionData = await axios.get(`/transactions/student/${studentID}`);
    let thisMonthTrans = transactionData.data.filter(
      (e) => e.fees.term === term && e.fees.academicYear === year
    );
    settransactions(thisMonthTrans);

    let studentData = await axios.get(`/students/student/${studentID}`);
    let student = studentData.data?.student;
    setuser(student);
    const scholarshipData = await axios.get(
      `/scholarships/${student?.scholarship}`
    );

    let feesData = await axios.get(
      `/fees/type/${student?.classID}/${student?.status}`
    );

    setfeetype(feesData?.data);

    let bill = Object.values(feesData?.data).reduce(
      (t, value) => Number(t) + Number(value),
      0
    );

    let paid = thisMonthTrans?.reduce((accumulator, element) => {
      return Number(accumulator) + Number(element?.amount);
    }, 0);

    if (scholarshipData.data.doc) {
      setscholarship(scholarshipData.data.doc);
      paid = paid + (Number(scholarshipData.data.doc.percentage) / 100) * bill;
    }

    console.log(paid);
    settotalBill(bill);
    settotalPaid(paid);
    setbalance(bill - paid);
    setloading(false);
    setshow(true);
  };

  const handleSelectClass = (id) => {
    setloadingStudents(true);
    setstudentOptions([]);
    setstudentID("");
    setclassID(id);
    axios
      .get(`/students/class/${id}`)
      .then((res) => {
        setloadingStudents(false);
        if (res.data.error) {
          errorAlert(res.data.error);
          return 0;
        }
        setstudentOptions(res.data.users);
      })
      .catch((err) => {
        console.log(err);
        setloadingStudents(false);
      });
  };

  const handlePayement = () => {
    setloading(true);
    axios
      .post("/transactions/create", {
        date,
        amount,
        paymentMethod: paymentType,
        type: "income",
        description: remarks,
        bank,
        chequeNumber: chequeNo,
        category: "fees",
        fees: {
          userID: studentID,
          term,
          academicYear: year,
          applyTo,
        },
      })
      .then((res) => {
        setloading(false);
        if (res.data.error) {
          errorAlert(res.data.error);
        }
        let newTransactions = [res.data.doc, ...transactions];
        settransactions(newTransactions);
        const paid = newTransactions?.reduce((accumulator, element) => {
          return Number(accumulator) + Number(element?.amount);
        }, 0);
        settotalPaid(paid);
        setbalance(totalBill - paid);
        successAlert("Payment successfully made");
        setdate("");
        setamount("");
        setremarks("");
        setchequeNo("");
        setbank("");
        setpaymentType("");
      })
      .catch(() => {
        setloading(false);
        errorAlert("Transaction Failed");
      });
  };

  return (
    <div>
      {loading && <Loading />}
      <h3>Student Bill Payment</h3>
      <div className="row">
        <div className="col-sm-6">
          <SearchStudent
            loading={loadingStudents}
            studentID={studentID}
            setstudentID={setstudentID}
            setclassID={handleSelectClass}
            handleSearch={handleSelectStudent}
            classID={classID}
            year={year}
            term={term}
            setterm={setterm}
            setyear={setyear}
            studentOptions={studentOptions}
          />

          {show && (
            <div className="content__container">
              {scholarship && (
                <div>
                  <strong>
                    {" "}
                    Students granted {scholarship?.name} which covers{" "}
                    {scholarship?.percentage}% of the fees
                  </strong>
                </div>
              )}{" "}
              {balance > 0 ? (
                <PaymentForm
                  balance={balance}
                  amount={amount}
                  year={year}
                  scholarship={scholarship}
                  term={term}
                  setterm={setterm}
                  setyear={setyear}
                  chequeNo={chequeNo}
                  setchequeNo={setchequeNo}
                  bank={bank}
                  setbank={setbank}
                  setamount={setamount}
                  date={date}
                  applyTo={applyTo}
                  setapplyTo={setapplyTo}
                  setdate={setdate}
                  paymentType={paymentType}
                  setpaymentType={setpaymentType}
                  remarks={remarks}
                  setremarks={setremarks}
                  handlePayement={handlePayement}
                  loading={loading}
                />
              ) : (
                <div className="content__container text-center">
                  <h5 className="text-info">
                    {totalBill === 0
                      ? " fees  not set yet"
                      : "Fees is fully paid"}{" "}
                  </h5>
                </div>
              )}
            </div>
          )}
        </div>
        <div className="col-sm-6">
          {show && (
            <ViewStudent
              transactions={transactions}
              scholarship={scholarship}
              user={user}
              balance={balance}
              feetype={feetype}
              totalBill={totalBill}
              total={totalPaid}
              id={studentID}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default BillPayment;
