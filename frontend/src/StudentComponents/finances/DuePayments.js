import React, { useState } from "react";
import { Link } from "react-router-dom";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import TableList from "../../AdminComponents/shared/ListTable";
import { currentCurrency } from "../../utils";

const tableHeader = [
  { id: "due", name: "Due Date" },
  { id: "payment", name: "payments" },
  { id: "amount", name: `Amount (${currentCurrency()})` },
];

function DuePayments() {
  const [payments, setpayments] = useState([]);
  const [loading, setloading] = useState(false);

  return (
    <div>
      <div className="d-flex justify-content-end mb-5">
        <Link to="/finance/fees/payments">
          Back <ArrowForwardIosIcon />{" "}
        </Link>
      </div>
      <div className="content__container">
        <h3>Due Payments</h3>
        <TableList
          data={payments}
          noActions={true}
          tableHeader={tableHeader}
          loading={loading}
        />
      </div>
    </div>
  );
}

export default DuePayments;
