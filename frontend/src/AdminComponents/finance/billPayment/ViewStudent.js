import React, { useState } from "react";
import { Avatar } from "@material-ui/core";
import {
  getImgSrc,
  getCapitalize,
  getIntial,
  currentCurrency,
} from "../../../utils";
import NumberFormat from "react-number-format";
import Transactions from "./ViewStudentPayment";

function ViewStudent({
  id,
  transactions,
  user,
  feetype,
  total,
  totalBill,
  balance,
  scholarship,
}) {
  const [open, setOpen] = useState(false);
  const name =
    getCapitalize(user?.name) +
    " " +
    getIntial(user?.middlename || " ") +
    getCapitalize(user?.surname);

  return (
    <div className="content__container">
      <div
        style={{ background: "#ffa201" }}
        className="d-flex flex-column align-items-center p-3 text-light mb-4"
      >
        <Avatar
          src={getImgSrc(user?.profileUrl)}
          style={{ width: "100px", height: "100px" }}
        />
        <h3>{name} </h3>
        <h5>{id}</h5>
        <h6>
          {getCapitalize(user?.status)} - {getCapitalize(user?.fees)}
        </h6>
        <button onClick={() => setOpen(true)} className="btn blue__btn">
          View Transactions
        </button>
      </div>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col">Fees</th>
            <th scope="col">Amount {currentCurrency()}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Tution Fee</td>
            <td>
              <NumberFormat
                value={feetype?.tution}
                displayType={"text"}
                thousandSeparator={true}
              />
            </td>
          </tr>
          <tr>
            <td>Maintenance Fee</td>
            <td>
              <NumberFormat
                value={feetype?.maintenance}
                displayType={"text"}
                thousandSeparator={true}
              />
            </td>
          </tr>
          <tr>
            <td>Facility Fee</td>
            <td>
              <NumberFormat
                value={feetype?.facility}
                displayType={"text"}
                thousandSeparator={true}
              />
            </td>
          </tr>
          <tr>
            <td>Exams Fee</td>
            <td>
              <NumberFormat
                value={feetype?.exam}
                displayType={"text"}
                thousandSeparator={true}
              />
            </td>
          </tr>
          <tr>
            <td>TOTAL BILL</td>
            <td>
              <NumberFormat
                value={totalBill}
                displayType={"text"}
                thousandSeparator={true}
              />
            </td>
          </tr>
          {scholarship && (
            <tr>
              <td>
                SCHOLARSHIP: {scholarship?.name}-{scholarship?.percentage}%
              </td>
              <td>
                <NumberFormat
                  value={(Number(scholarship?.percentage) / 100) * totalBill}
                  displayType={"text"}
                  thousandSeparator={true}
                />
              </td>
            </tr>
          )}
          <tr>
            <td>TOTAL PAID</td>
            <td>
              <NumberFormat
                value={total}
                displayType={"text"}
                thousandSeparator={true}
              />
            </td>
          </tr>
          <tr>
            <td>
              <strong>BALANCE</strong>
            </td>
            <td>
              <strong>
                <NumberFormat
                  value={balance}
                  displayType={"text"}
                  thousandSeparator={true}
                />
              </strong>
            </td>
          </tr>
        </tbody>
      </table>

      <Transactions
        open={open}
        setOpen={setOpen}
        name={name}
        totalBill={totalBill}
        totalPaid={total}
        balance={balance}
        transactions={transactions}
      />
    </div>
  );
}

export default ViewStudent;
