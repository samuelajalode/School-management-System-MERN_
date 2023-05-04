import React, { useState } from "react";
import { Avatar } from "@material-ui/core";
import {
  getImgSrc,
  getCapitalize,
  getIntial,
  currentCurrency,
} from "../../../utils";
import NumberFormat from "react-number-format";
import Transactions from "./Transactions";

function ViewStudent({
  id,
  transactions,
  user,
  feetype,
  total,
  totalBill,
  balance,
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
        <h6>{getCapitalize(user?.position)}</h6>
        <button onClick={() => setOpen(true)} className="btn blue__btn">
          View Transactions
        </button>
      </div>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col">Payrow</th>
            <th scope="col">Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Salary</td>
            <td>
              <NumberFormat
                value={feetype?.salary}
                displayType={"text"}
                thousandSeparator={true}
                prefix={currentCurrency()}
              />
            </td>
          </tr>
          <tr>
            <td>Allowance</td>
            <td>
              <NumberFormat
                value={feetype?.allowance}
                displayType={"text"}
                thousandSeparator={true}
                prefix={currentCurrency()}
              />
            </td>
          </tr>
          <tr>
            <td>Bonus</td>
            <td>
              <NumberFormat
                value={feetype?.bonus}
                displayType={"text"}
                thousandSeparator={true}
                prefix={currentCurrency()}
              />
            </td>
          </tr>
          <tr>
            <td>TOTAL SALARY</td>
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
            <td>TOTAL PAID</td>
            <td>
              <NumberFormat
                value={total}
                displayType={"text"}
                thousandSeparator={true}
                prefix={currentCurrency()}
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
                  prefix={currentCurrency()}
                />
              </strong>
            </td>
          </tr>
        </tbody>
      </table>

      <Transactions
        open={open}
        id={id}
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
