import React from "react";
import { useForm } from "react-hook-form";
import { getYearsList } from "../../../utils";

export default function AddClassGroup({
  name,
  setname,
  onSubmit,
  loading,
  year,
  setyear,
}) {
  const { register, handleSubmit, errors } = useForm();
  const yearOptions = getYearsList(10);
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="content__container">
      <h3>Add Year Group</h3>
      <div className="mb-3">
        <label className="form-label"> Name</label>
        <input
          type="text"
          value={name}
          ref={register({ required: true })}
          placeholder="eg WASSCE 2016/2015"
          onChange={(e) => setname(e.target.value)}
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
        <label>Year</label>
        <select
          value={year}
          onChange={(e) => setyear(e.target.value)}
          className="form-select"
          aria-label="Default select example"
        >
          <option defaultValue hidden>
            Select
          </option>
          {yearOptions &&
            yearOptions.map((e) => (
              <option value={e} key={e}>
                {e}
              </option>
            ))}
        </select>
      </div>
      <div className="mb-3">
        <button disabled={loading} type="submit" className="btn blue__btn">
          {loading && (
            <span
              className="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
          )}
          {"Add"}
        </button>
      </div>
    </form>
  );
}
