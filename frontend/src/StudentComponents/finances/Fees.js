import React from "react";
import { currentCurrency } from "../../utils";

function Fees({ fees, balance, totalPaid, totalBill }) {
  return (
    <div className="content__container blue_bg ">
      <div className="row">
        <div className="col">
          {!fees ? (
            <div className="d-flex justify-content-center">
              <p>No fees details yet </p>
            </div>
          ) : (
            <table className="table table-sm table-borderless text-light">
              <thead>
                <tr>
                  <th className="orange_color" scope="col">
                    FEES
                  </th>
                  <th className="orange_color" scope="col">
                    Amount ({currentCurrency()})
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">Tution Fee</th>
                  <td>{fees?.tution}</td>
                </tr>
                <tr>
                  <th scope="row">Facility Fee</th>
                  <td>{fees?.facility}</td>
                </tr>
                <tr>
                  <th scope="row">Maintenance Fee</th>
                  <th>{fees?.maintenance}</th>
                </tr>
                <tr>
                  <th scope="row">Exam Fee</th>
                  <th>{fees?.exam}</th>
                </tr>
              </tbody>
            </table>
          )}
        </div>
        <div className="col">
          <table className="table table-sm table-borderless text-light">
            <thead>
              <tr>
                <th className="orange_color" scope="col">
                  FEES BALANCES
                </th>
                <th className="orange_color" scope="col">
                  Amount ({currentCurrency()})
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">TOTAL FEES</th>
                <th scope="row">{totalBill}</th>
              </tr>
              <tr>
                <th scope="row">FEES PAID</th>
                <th scope="row">{totalPaid}</th>
              </tr>
              <tr>
                <th className="text-light" scope="row">
                  FEES DUE
                </th>
                <th className="text-light" scope="row">
                  {balance}
                </th>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Fees;
