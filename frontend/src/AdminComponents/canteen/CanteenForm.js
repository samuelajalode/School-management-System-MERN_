import React from "react";
import { useForm } from "react-hook-form";

function CanteenForm(props) {
  const { register, handleSubmit, errors } = useForm();
  let {
    studentID,
    setstudentID,
    planPrice,
    amount,
    setamount,
    handleAdd,
    loading,
  } = props;

  return (
    <form action="" className="row g-3">
      <div className="col-md-10">
        <label className="form-label">Canteen Member ID</label>
        <input
          value={studentID}
          ref={register({ required: true })}
          onChange={(e) => setstudentID(e.target.value)}
          type="text"
          className="form-control"
          name="userID"
        />
        {errors.userID && (
          <span className=" form-error text-danger mb-2">
            This field is required
          </span>
        )}
      </div>
      {planPrice && (
        <div className="col-md-10">
          <label className="form-label">Amount Paid</label>
          {[1, 2, 3].map((e) => (
            <div className="form-check">
              <input
                className="form-check-input"
                value={planPrice * e}
                type="radio"
                //checked={paymentMethod === "weekly"}
                onClick={(e) => setamount(e.target.value)}
                name="flexRadioDefault"
              />
              <label className="form-check-label">{planPrice * e}</label>
            </div>
          ))}
          <input
            value={amount}
            ref={register({ required: true })}
            readOnly
            type="number"
            className="form-control"
            name="amount"
          />
          {errors.amount && (
            <span className=" form-error text-danger mb-2">
              This field is required
            </span>
          )}
        </div>
      )}

      <div className="col-xs-12">
        <button
          disabled={loading}
          onClick={handleSubmit(handleAdd)}
          className="btn blue__btn"
        >
          {loading && (
            <span
              className="spinner-border spinner-border-sm"
              role="status"
            ></span>
          )}
          Add
        </button>
      </div>
    </form>
  );
}

export default CanteenForm;
