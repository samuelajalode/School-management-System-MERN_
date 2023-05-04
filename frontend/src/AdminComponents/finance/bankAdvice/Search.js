import React from "react";
import { useForm } from "react-hook-form";
import { monthYear, bankOptions } from "../../../data";

function Search({
  year,
  setyear,
  years,
  month,
  setmonth,
  bank,
  setbank,
  loading,
  onSearch,
  teachers,
}) {
  const { register, handleSubmit, errors } = useForm();

  return (
    <form className="row">
      <div className="col-sm-3">
        <label className="form-label">Select Year</label>
        <select
          ref={register({ required: true })}
          value={year}
          onChange={(e) => setyear(e.target.value)}
          name="class"
          className="form-select"
        >
          <option defaultValue hidden>
            Choose...
          </option>
          {years?.length > 0 ? (
            years.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))
          ) : (
            <option disabled>No data yet</option>
          )}
        </select>
        {errors.class && (
          <span className=" form-error text-danger mb-2">
            This field is required
          </span>
        )}
      </div>
      <div className="col-sm-3">
        <label className="form-label">Select Month</label>
        <select
          ref={register({ required: true })}
          value={month}
          onChange={(e) => setmonth(e.target.value)}
          name="class"
          className="form-select"
        >
          <option defaultValue hidden>
            Choose...
          </option>
          {monthYear?.length > 0 ? (
            monthYear.map((option) => (
              <option key={option.id} value={option.name}>
                {option.name}
              </option>
            ))
          ) : (
            <option disabled>No data yet</option>
          )}
        </select>
        {errors.class && (
          <span className=" form-error text-danger mb-2">
            This field is required
          </span>
        )}
      </div>
      <div className="col-sm-3">
        <label className="form-label">Select Teacher</label>
        <select
          ref={register({ required: true })}
          value={bank}
          onChange={setbank}
          name="class"
          className="form-select"
        >
          <option defaultValue hidden>
            Choose...
          </option>
          {teachers?.length > 0 ? (
            teachers.map((option) => (
              <option key={option.userID} value={option.userID}>
                {option.userID}
              </option>
            ))
          ) : (
            <option disabled>No data yet</option>
          )}
        </select>
        {errors.class && (
          <span className=" form-error text-danger mb-2">
            This field is required
          </span>
        )}
      </div>
      <div className="col-sm-3">
        <button
          disabled={loading}
          onClick={handleSubmit(onSearch)}
          className="btn blue__btn mt-4"
        >
          {loading && (
            <span
              className="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
          )}
          {"Generate Report"}
        </button>
      </div>
    </form>
  );
}

export default Search;
