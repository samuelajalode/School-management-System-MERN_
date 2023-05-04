import React, { useState } from "react";
import StaffSearch from "./StaffSearch";
import PaymentForm from "./PaymentForm";
import ViewStaff from "./ViewStaff";
import axios from "../../../store/axios";
import { selectacademicYear } from "../../../store/slices/schoolSlice";
import { useSelector } from "react-redux";
import { errorAlert, successAlert } from "../../../utils";

const today = new Date();
const currentMonth = today.getMonth();

function BillPayment() {
  const current = useSelector(selectacademicYear);
  const [userID, setuserID] = useState("");
  const [month, setmonth] = useState(currentMonth);
  const [amount, setamount] = useState("");
  const [year, setyear] = useState(current?.currentYear);
  const [date, setdate] = useState("");
  const [bank, setbank] = useState("");
  const [remarks, setremarks] = useState("");
  const [loading, setloading] = useState(false);
  const [transactions, settransactions] = useState([]);
  const [loadingStaff, setloadingStaff] = useState(false);
  const [user, setuser] = useState({});
  const [payrowType, setpayrowType] = useState({});
  const [balance, setbalance] = useState(100);
  const [totalBill, settotalBill] = useState(0);
  const [totalPaid, settotalPaid] = useState(0);

  const [show, setshow] = useState(false);

  const handleSelectStaff = async (e) => {
    e.preventDefault();
    if (userID === "") {
      return errorAlert("Select staff member");
    }
    setloadingStaff(true);
    let transactionData = await axios.get(`/transactions/staff/pay/${userID}`);
    let thisMonthTrans = transactionData.data.filter(
      (e) => e.month === Number(month) && e.year === year
    );
    let alltransactions = thisMonthTrans;

    settransactions(alltransactions);

    let staffData = await axios.get(`/teachers/${userID}`);
    let staff = staffData.data?.teacher;
    //console.log(staff);
    setuser(staff);

    let payData = await axios.get(`/payrow/${staff?.position}`);
    let pay = payData?.data.docs;
    //console.log(pay);
    setpayrowType(pay);
    //console.log(alltransactions);

    const bill =
      Number(pay?.allowance) + Number(pay?.salary) + Number(pay?.bonus);

    let monthTrans = alltransactions.filter(
      (e) => Number(e?.month) === currentMonth
    );

    const paid = monthTrans?.reduce((accumulator, element) => {
      return Number(accumulator) + Number(element?.amount);
    }, 0);
    settotalBill(bill);
    settotalPaid(paid);
    setbalance(bill - paid);
    setloadingStaff(false);
    setshow(true);
  };

  const handlePayement = () => {
    setloading(true);
    axios
      .post("/transactions/create", {
        date,
        amount,
        type: "expenditure",
        description: remarks,
        bank,
        category: "pay",
        pay: {
          accountNumber: user?.accountNumber,
          bank: user?.bank,
          userID,
          position: user?.position,
          month,
          year,
          salary: totalBill,
        },
      })
      .then(async (res) => {
        setloading(false);
        if (res.data.error) {
          errorAlert(res.data.error);
        }
        await axios.post("/activitylog/create", {
          activity: `salary payment to staff member ${userID}`,
          user: "admin",
        });
        let newTransactions = [res.data.doc, ...transactions];
        settransactions(newTransactions);

        settotalPaid(totalPaid - amount);
        setbalance(totalBill - amount);
        //console.log(paid, totalBill);
        successAlert("Payment successfully done");
        setdate("");
        setamount("");
        setremarks("");
        setbank("");
      })
      .catch((err) => {
        console.log(err);
        setloading(false);
        errorAlert("Transaction Failed");
      });
  };

  return (
    <div>
      <h3>Salary Payment</h3>
      <div className="row">
        <div className="col-sm-6">
          <StaffSearch
            month={month}
            setmonth={setmonth}
            userID={userID}
            year={year}
            setyear={setyear}
            setuserID={setuserID}
            loading={loadingStaff}
            handleSearch={handleSelectStaff}
          />
          {show && !loadingStaff && (
            <>
              {" "}
              {balance > 0 ? (
                <PaymentForm
                  balance={balance}
                  amount={amount}
                  bank={bank}
                  setbank={setbank}
                  setamount={setamount}
                  month={month}
                  date={date}
                  setdate={setdate}
                  remarks={remarks}
                  setremarks={setremarks}
                  handlePayement={handlePayement}
                  loading={loading}
                />
              ) : (
                <div className="content__container text-center">
                  <h5 className="text-info">Pay All Staff</h5>
                </div>
              )}
            </>
          )}
        </div>
        <div className="col-sm-6">
          {show && !loadingStaff && (
            <ViewStaff
              transactions={transactions}
              user={user}
              balance={balance}
              feetype={payrowType}
              totalBill={totalBill}
              total={totalPaid}
              id={userID}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default BillPayment;
