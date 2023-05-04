import React from "react";
import { useForm } from "react-hook-form";
import Checkbox from "@material-ui/core/Checkbox";

function Form({
  name,
  setname,
  amount,
  setamount,
  handleSetStaff,
  staff,
  handleSelectAll,
  Allstaff,
  onSubmit,
  loading,
  isEdit,
}) {
  const { register, handleSubmit, errors } = useForm();
  //console.log(handleSetStaff, isEdit);

  return (
    <form>
      <div className=" mb-3">
        <label htmlFor="name" className=" col-form-label">
          Name
        </label>
        <input
          value={name}
          onChange={(e) => setname(e.target.value)}
          type="text"
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
      <div className="mb-3">
        <label htmlFor="amount" className=" col-form-label">
          Amount
        </label>
        <input
          value={amount}
          onChange={(e) => setamount(e.target.value)}
          type="number"
          ref={register({ required: true })}
          className="form-control"
          name="amount"
        />
        {errors.amount && (
          <span className=" form-error text-danger mb-2">
            This field is required
          </span>
        )}
      </div>
      <div className="mb-3">
        <label htmlFor="amount" className=" col-form-label">
          Select Staff
        </label>
        <div className="row">
          <div className="col-9">Select All</div>
          <div className="col-3">
            <Checkbox
              // checked={Allstaff.length === staff.length ? true : false}
              onChange={handleSelectAll}
              color="primary"
            />
          </div>
        </div>
        <hr />
        {Allstaff &&
          Allstaff.map((e, i) => (
            <div key={i} className="row">
              <div className="col-9">
                {e?.name} {e?.surname}
              </div>
              <div className="col-3">
                <Checkbox
                  value={e?.userID}
                  checked={staff.includes(e?.userID)}
                  onChange={handleSetStaff}
                  color="primary"
                />
              </div>
            </div>
          ))}
      </div>
      <div>
        <button onClick={handleSubmit(onSubmit)} className="btn blue__btn">
          {loading && (
            <span
              className="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
          )}
          {isEdit ? "Save Changes" : "Add"}
        </button>
      </div>
    </form>
  );
}

export default Form;
