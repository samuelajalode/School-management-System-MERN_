import React from "react";
import { useForm } from "react-hook-form";
import NumberFormat from "react-number-format";
import { monthYear } from "../../../data";
import { currentCurrency } from "../../../utils";

function PaymentForm({
  month,
  amount,
  setamount,
  remarks,
  setremarks,
  loading,
  handlePayement,
  balance,
  date,
  setdate,
}) {
  const { register, handleSubmit, errors } = useForm();

  return (
    <div className="content__container">
      <form action="">
        <div className="row mb-4">
          <label className="col-sm-3 col-form-label">Amount</label>
          <div className="col-sm-9">
            <div className="d-flex justify-content-between mb-2">
              <strong className="text-info ">
                Salary Due &nbsp;
                <NumberFormat
                  value={balance}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={currentCurrency()}
                />
              </strong>
              <button
                type="button"
                onClick={() => setamount(balance)}
                className="btn blue__btn"
              >
                Pay All
              </button>
            </div>

            <input
              type="number"
              ref={register({ required: true, max: balance + 1 })}
              value={amount}
              onChange={(e) => setamount(e.target.value)}
              className="form-control"
              name="amount"
            />
            {errors.amount && (
              <div className="text-danger">
                Amount is required and it should not be above {balance}{" "}
              </div>
            )}
          </div>
        </div>
        <div className="row mb-4">
          <label className="col-sm-3 col-form-label">Date Paid</label>
          <div className="col-sm-9">
            <input
              type="date"
              value={date}
              ref={register({ required: true })}
              onChange={(e) => setdate(e.target.value)}
              className="form-control"
              name="date"
            />
            {errors.date && (
              <div className="text-danger">This field is required</div>
            )}
          </div>
        </div>
        <div className="row mb-4">
          <label className="col-sm-3 form-label">Month</label>
          <div className="col-sm-9">
            <input
              type="text"
              value={monthYear[month].name}
              readOnly
              className="form-control"
              name="date"
            />
          </div>
        </div>
        <div className="row mb-4">
          <label className="col-sm-3 col-form-label">Remarks</label>
          <div className="col-sm-9">
            <textarea
              rows={5}
              className="form-control"
              value={remarks}
              onChange={(e) => setremarks(e.target.value)}
              name="remarks"
            />
          </div>
        </div>
        <div className="row mb-4">
          <div className="col-sm-9 offset-sm-3">
            <button
              disabled={loading}
              onClick={handleSubmit(handlePayement)}
              className="btn blue__btn"
            >
              {loading && (
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
              )}
              Record Payment
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default PaymentForm;
