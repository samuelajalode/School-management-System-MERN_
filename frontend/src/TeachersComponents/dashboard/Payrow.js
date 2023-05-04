import React, { useState, useEffect } from "react";
import TableList from "../../AdminComponents/shared/ListTable";
import { selectUser } from "../../store/slices/userSlice";
import { useSelector } from "react-redux";
import axios from "../../store/axios";
import NumberFormat from "react-number-format";
import EditIcon from "@material-ui/icons/Edit";
import { monthYear } from "../../data";
import EditBank from "./EditBank";
import { errorAlert, successAlert, currentCurrency } from "../../utils";

const tableHeader = [
  { id: "date", name: "Date" },
  { id: "amount", name: `Amount ${currentCurrency()}` },
  { id: "month", name: "For Month" },
];

const today = new Date();
const currentMonth = today.getMonth();

function Payrow() {
  const [payrowData, setpayrowData] = useState([]);
  const [payrowType, setpayrowType] = useState({});
  const [totalBill, settotalBill] = useState(0);
  const [balance, setbalance] = useState(0);
  const [totalPaid, settotalPaid] = useState();
  const [loading, setloading] = useState(false);
  const [editLoading, seteditLoading] = useState(false);
  const [open, setopen] = useState(false);
  const [bank, setbank] = useState("");
  const [accountNumber, setaccountNumber] = useState("");
  const user = useSelector(selectUser);

  useEffect(() => {
    const getdata = async () => {
      setloading(true);
      let transactionData = await axios.get(
        `/transactions/staff/pay/${user?.userID}`
      );
      let alltransactions = transactionData.data;
      let monthData = alltransactions.map((e) => {
        return {
          ...e,
          month: monthYear[e.month].name,
        };
      });
      setpayrowData(monthData);
      let staffData = await axios.get(`/teachers/${user?.userID}`);
      let staff = staffData.data?.teacher;
      setaccountNumber(staff?.accountNumber);
      setbank(staff?.bank);
      console.log(staff);

      let payData = await axios.get(`/payrow/${staff?.position}`);
      let pay = payData?.data.docs;
      console.log(pay);
      setpayrowType(pay);
      console.log(alltransactions);

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
      setloading(false);
    };
    getdata();
  }, [user]);

  const handleEditBank = () => {
    seteditLoading(true);
    axios
      .put(`/teachers/update/${user?.id}`, {
        bank,
        accountNumber,
      })
      .then(async (res) => {
        seteditLoading(false);
        if (res.data.error) {
          errorAlert(res.data.error);
          let staffData = await axios.get(`/teachers/${user?.id}`);
          let staff = staffData.data?.teacher;
          setaccountNumber(staff?.accountNumber);
          setbank(staff?.bank);
          return 0;
        }
        successAlert("Changes successfully saved");
        console.log(res.data);
        setopen(false);
      })
      .catch((err) => {
        console.log(err);
        seteditLoading(false);
        errorAlert("Changes Failed");
      });
  };

  return (
    <div>
      <div className="row">
        <div className="col-sm-6">
          <div className="content__container mb-5">
            <h3>Salary Details</h3>
            <div>
              <div className="row  mb-3">
                <div className="col-sm-4">Position Role: </div>
                <div className="col-sm-8">{payrowType?.name}</div>
              </div>
              <div className="row  mb-3">
                <div className="col-sm-4">Monthy Salary: </div>
                <div className="col-sm-8">
                  <NumberFormat
                    value={payrowType?.salary}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={currentCurrency()}
                  />
                </div>
              </div>
              <div className="row  mb-3">
                <div className="col-sm-4">Allowance: </div>
                <div className="col-sm-8">
                  <NumberFormat
                    value={payrowType?.allowance}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={currentCurrency()}
                  />
                </div>
              </div>
              <div className="row  mb-3">
                <div className="col-sm-4">Bonus: </div>
                <div className="col-sm-8">
                  <NumberFormat
                    value={payrowType?.bonus}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={currentCurrency()}
                  />
                </div>
              </div>
              <div className="row  mb-3">
                <div className="col-sm-4">Account Number: </div>
                <div className="col-sm-8">{accountNumber}</div>
              </div>
              <div className="row mb-3">
                <div className="col-sm-4">Bank Branch:</div>
                <div className="col-sm-8">
                  <div>{bank}</div>
                  <button className="btn" onClick={() => setopen(true)}>
                    <EditIcon />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-6">
          <div
            style={{ background: "#ffa201" }}
            className="d-flex flex-column align-items-center p-3 text-light mb-4"
          >
            <h3>This Month Pay</h3>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Payrow</th>
                  <th scope="col">Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td> SALARY</td>
                  <td>
                    <NumberFormat
                      value={totalBill}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={currentCurrency()}
                    />
                  </td>
                </tr>
                <tr>
                  <td> PAID</td>
                  <td>
                    <NumberFormat
                      value={totalPaid}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={currentCurrency()}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>Due Pay</strong>{" "}
                  </td>
                  <td>
                    <strong>
                      <NumberFormat
                        value={balance}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={currentCurrency()}
                      />
                    </strong>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="mb-3">
        <h3>Salary Payments Records</h3>
        <TableList
          data={payrowData}
          loading={loading}
          noActions={true}
          tableHeader={tableHeader}
        />
      </div>

      <EditBank
        open={open}
        bank={bank}
        loading={editLoading}
        setbank={setbank}
        accountNumber={accountNumber}
        setaccountNumber={setaccountNumber}
        onSubmit={handleEditBank}
        setOpen={setopen}
      />
    </div>
  );
}

export default Payrow;
