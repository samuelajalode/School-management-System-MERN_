import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { bankOptions } from "../../../data";
import { currentCurrency } from "../../../utils";

function PaymentForm({
  applyTo,
  setapplyTo,
  bank,
  setbank,
  setchequeNo,
  chequeNo,
  amount,
  setamount,
  remarks,
  setremarks,
  loading,
  handlePayement,
  balance,
  date,
  setdate,
  paymentType,
  setpaymentType,
  scholarship,
}) {
  const { register, handleSubmit, errors } = useForm();

  const handleSelectall = (e) => {
    setapplyTo({
      all: !applyTo?.all,
      tuition: !applyTo?.all,
      examination: !applyTo?.all,
      facility: !applyTo?.all,
      maintanance: !applyTo?.all,
    });
  };

  const [showCheck, setshowCheck] = useState(false);
  return (
    <div className="content__container">
      <form action="">
        <div className="row mb-3">
          <label className="col-sm-3 col-form-label">Fees Due</label>
          <div className="col-md-6">
            <div className="input-group">
              <div className="input-group-text">{currentCurrency()}</div>
              <input
                type="number"
                value={balance}
                readOnly
                className="form-control"
                name="amount"
              />
            </div>
          </div>
          <div className="col-md-3">
            <button
              type="button"
              onClick={() => setamount(balance)}
              className="btn blue__btn"
            >
              Pay All
            </button>
          </div>
        </div>
        <div className="row mb-3">
          <label className="col-sm-3 col-form-label">Amount</label>
          <div className="col-sm-9">
            <div className="input-group">
              <div className="input-group-text">{currentCurrency()}</div>
              <input
                type="number"
                ref={register({ required: true, max: balance + 1 })}
                value={amount}
                onChange={(e) => setamount(e.target.value)}
                className="form-control"
                name="amount"
                placeholder="Enter amount in $"
              />
            </div>

            {errors.amount && (
              <div className="text-danger">
                Amount is required and it should not be above {balance}{" "}
              </div>
            )}
          </div>
        </div>
        <div className="row mb-3">
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
        <div className="row mb-3">
          <label className="col-sm-3 col-form-label">
            Apply to Billed items(s)
          </label>
          <div className="col-sm-9">
            <div className="selectBox">
              <select
                onClick={() => setshowCheck(!showCheck)}
                className="form-select"
              >
                <option hidden>Select options</option>
              </select>
              {showCheck && (
                <div className="showcheckboxes px-3">
                  <>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        onChange={handleSelectall}
                        checked={applyTo?.all}
                        name="exampleRadios"
                        id="exampleRadios1"
                        value="option1"
                      />
                      <label className="form-check-label">Select All</label>
                    </div>
                    <hr />
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="exampleRadios"
                        value="option1"
                        onChange={() =>
                          setapplyTo({ ...applyTo, tuition: !applyTo?.tuition })
                        }
                        checked={applyTo?.tuition}
                      />
                      <label className="form-check-label">Tuition Fee</label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value="option1"
                        name="exampleRadios"
                        onChange={() =>
                          setapplyTo({
                            ...applyTo,
                            examination: !applyTo?.examination,
                          })
                        }
                        checked={applyTo?.examination}
                      />
                      <label className="form-check-label">
                        Examination Fee
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="exampleRadios"
                        value="option1"
                        onChange={() =>
                          setapplyTo({
                            ...applyTo,
                            maintanance: !applyTo?.maintanance,
                          })
                        }
                        checked={applyTo?.maintanance}
                      />
                      <label className="form-check-label">
                        Maintenance Fee
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="exampleRadios"
                        value="option1"
                        onChange={() =>
                          setapplyTo({
                            ...applyTo,
                            facility: !applyTo?.facility,
                          })
                        }
                        checked={applyTo?.facility}
                      />
                      <label className="form-check-label">Facility Fee</label>
                    </div>
                  </>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="row mb-3">
          <label className="col-sm-3 col-form-label">Payment Type</label>
          <div className="col-sm-9">
            <select
              value={paymentType}
              ref={register({ required: true })}
              onChange={(e) => setpaymentType(e.target.value)}
              name="students"
              className="form-select"
            >
              <option hidden defaultValue>
                Choose...
              </option>
              <option value="cash">Cash</option>
              <option value="cheque">Cheque</option>
              <option value="bank-deposit">Bank Deposit</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
        {paymentType === "bank-deposit" && (
          <div className=" mb-3">
            <label className=" col-form-label">Bank</label>
            <div className="">
              <select
                value={bank}
                ref={register({ required: true })}
                onChange={(e) => setbank(e.target.value)}
                name="students"
                className="form-select"
              >
                <option hidden defaultValue>
                  Choose...
                </option>
                {bankOptions &&
                  bankOptions.map((e) => (
                    <option key={e} value={e}>
                      {e}
                    </option>
                  ))}
              </select>
            </div>
          </div>
        )}
        {paymentType === "cheque" && (
          <>
            <div className=" mb-3">
              <label className=" col-form-label">Bank</label>
              <div className="">
                <select
                  value={bank}
                  ref={register({ required: true })}
                  onChange={(e) => setbank(e.target.value)}
                  name="students"
                  className="form-select"
                >
                  <option hidden defaultValue>
                    Choose...
                  </option>
                  {bankOptions &&
                    bankOptions.map((e) => (
                      <option key={e} value={e}>
                        {e}
                      </option>
                    ))}
                </select>
              </div>
            </div>
            <div className="mb-3">
              <label className=" col-form-label">Cheque Number</label>
              <div className="">
                <input
                  type="text"
                  className="form-control"
                  value={chequeNo}
                  onChange={(e) => setchequeNo(e.target.value)}
                  name="cheque"
                />
              </div>
            </div>
          </>
        )}
        <div className="row mb-3">
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
        <div className="row mb-3">
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
