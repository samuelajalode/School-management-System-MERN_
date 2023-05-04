import React from "react";
import {
  selectYearGroup,
  selectClasses,
} from "../../../store/slices/schoolSlice";
import { useSelector } from "react-redux";

function Search({
  handleSearch,
  classID,
  setclass,
  loading,
  term,
  setterm,
  year,
  setyear,
}) {
  const classes = useSelector(selectClasses);
  const yearGroup = useSelector(selectYearGroup);

  return (
    <form className="content__container col-8 mb-5">
      <h6>Search Class</h6>
      <div className="mb-3">
        <label htmlFor="name" className="col-form-label">
          Class
        </label>
        <div className="">
          <select
            name="academic-calendar"
            className="form-select"
            value={classID}
            onChange={(e) => setclass(e.target.value)}
          >
            <option defaultValue hidden>
              Choose...
            </option>
            {classes.length > 0 ? (
              classes.map((e) => (
                <option key={e._id} value={e.classCode}>
                  {e.name}
                </option>
              ))
            ) : (
              <option disabled>No classes yet</option>
            )}
          </select>
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="name" className="col-form-label">
          Academic Year
        </label>
        <div className="">
          <select
            name="academic-calendar"
            className="form-select"
            value={year}
            onChange={(e) => setyear(e.target.value)}
          >
            <option defaultValue hidden>
              Choose...
            </option>
            {yearGroup.length > 0 ? (
              yearGroup.map((e) => (
                <option key={e._id} value={e.year}>
                  {e.year}
                </option>
              ))
            ) : (
              <option disabled>No data</option>
            )}
          </select>
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="name" className="col-form-label">
          Term
        </label>
        <div className="">
          <select
            name="academic-calendar"
            className="form-select"
            value={term}
            onChange={(e) => setterm(e.target.value)}
          >
            <option defaultValue hidden>
              Choose...
            </option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </div>
      </div>
      <div className="">
        <div>
          <button
            onClick={handleSearch}
            disabled={loading}
            type="submit"
            className="btn blue__btn"
          >
            {loading && (
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
            )}
            {"Search"}
          </button>
        </div>
      </div>
    </form>
  );
}

export default Search;
