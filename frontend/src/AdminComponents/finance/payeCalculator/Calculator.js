import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { currentCurrency } from "../../../utils";
import NumberFormat from "react-number-format";

function Calculator() {
  const { register, handleSubmit, errors } = useForm();
  const [salary, setsalary] = useState("");
  const [allowance, setallowance] = useState("");
  const [ssnit, setssnit] = useState(false);
  const [loading, setloading] = useState(false);
  const [tax, settax] = useState(null);
  const [nettax, setnettax] = useState("");
  const [balanceBeforeTax, setbalanceBeforeTax] = useState("");
  const [ssnitAmount, setssnitAmount] = useState("");

  const handleCalculate = () => {
    setloading(true);
    let total = Number(salary) + Number(allowance);
    let ssnitBalance = 0.135 * total;
    let balance = ssnit ? total - ssnitBalance : total;
    let taxAmount = 0.2 * balance;
    let net = balance - taxAmount;

    setbalanceBeforeTax(total.toFixed(2));
    setssnitAmount(ssnitBalance.toFixed(2));
    settax(taxAmount.toFixed(2));
    setnettax(net.toFixed(2));
    setloading(false);
  };
  return (
    <div>
      <h3>Paye Calculator</h3>
      <form action="" className="content__container col-md-9 mb-3">
        <div className=" mb-3">
          <label htmlFor="name" className=" col-form-label">
            Salary
          </label>
          <input
            value={salary}
            onChange={(e) => setsalary(e.target.value)}
            type="number"
            ref={register({ required: true })}
            className="form-control"
            name="name"
          />
          {errors.name && (
            <span className=" form-error text-danger mb-2">
              This field is required
            </span>
          )}
        </div>
        <div className=" mb-3">
          <label htmlFor="name" className=" col-form-label">
            Allowance
          </label>
          <input
            value={allowance}
            onChange={(e) => setallowance(e.target.value)}
            type="number"
            ref={register({ required: true })}
            className="form-control"
            name="name"
          />
          {errors.name && (
            <span className=" form-error text-danger mb-2">
              This field is required
            </span>
          )}
        </div>
        <div className="col-xs-12 col-sm-6 mb-3">
          <label htmlFor="name" className="form-label">
            Includes SSNIT Contribution
          </label>
          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              onChange={() => setssnit(!ssnit)}
              id="flexSwitchCheckChecked"
              checked={ssnit}
            />
          </div>
        </div>
        <div>
          <button
            onClick={handleSubmit(handleCalculate)}
            className="btn blue__btn"
          >
            {loading && (
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
            )}
            Calculate
          </button>
        </div>
      </form>

      {nettax && (
        <div className="content__container col-md-9 mb-3">
          <h3>Results</h3>
          <table class="table table-bordered">
            <thead>
              <tr>
                <th scope="col"></th>
                <th scope="col">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Total Before Tax</td>
                <td>
                  <NumberFormat
                    value={balanceBeforeTax}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={currentCurrency()}
                  />
                </td>
              </tr>
              {ssnit && (
                <tr>
                  <td>SSNIT Amount </td>
                  <td>
                    <NumberFormat
                      value={ssnitAmount}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={currentCurrency()}
                    />
                  </td>
                </tr>
              )}
              <tr>
                <td>Tax </td>
                <td>
                  <NumberFormat
                    value={tax}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={currentCurrency()}
                  />
                </td>
              </tr>
              <tr>
                <td>Balance After Tax</td>
                <td>
                  <NumberFormat
                    value={nettax}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={currentCurrency()}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Calculator;
