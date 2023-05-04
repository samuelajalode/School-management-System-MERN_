import React from "react";
import Card from "./FinanceCard";

function FinancialTabs() {
  return (
    <div>
      <h3>Financial Reports</h3>
      <div className="row">
        <div className="col-sm-6 col-md-4">
          <Card name="Bill Payment Report" route="/reports/billpayment" />
        </div>
        <div className="col-sm-6 col-md-4">
          <Card
            name="Non-Bill Payment Report"
            route="/reports/nonbillpayment"
          />
        </div>

        <div className="col-sm-6 col-md-4">
          <Card name="Expenditure Report" route="/reports/expenditure" />
        </div>
        <div className="col-sm-6 col-md-4">
          <Card
            name="Supplementary Income Report"
            route="/reports/supplementaryincome"
          />
        </div>

        <div className="col-sm-6 col-md-4">
          <Card
            name="Student Payments History "
            route="/reports/studentpaymentshistory"
          />
        </div>
        <div className="col-sm-6 col-md-4">
          <Card name="Class Ledger Report" route="/reports/classledger" />
        </div>

        <div className="col-sm-6 col-md-4">
          <Card name=" Debtors Report" route="/reports/nondebtors" />
        </div>
      </div>
    </div>
  );
}

export default FinancialTabs;
