import React from "react";
import { useSelector } from "react-redux";
import {
  selectClasses,
  selectYearGroup,
} from "../../../store/slices/schoolSlice";

function SearchStudent({
  setclassID,
  classID,
  setstudentID,
  studentOptions,
  studentID,
  year,
  setyear,
  term,
  setterm,
  loading,
  handleSearch,
}) {
  const classes = useSelector(selectClasses);
  const years = useSelector(selectYearGroup);

  return (
    <div className="content__container mb-3">
      <h3>Search Student</h3>
      <form action="">
        <div className="mb-3">
          <label className="form-label">Year</label>
          <select
            value={year}
            onChange={(e) => setyear(e.target.value)}
            name="year"
            className="form-select"
          >
            <option hidden defaultValue>
              Choose...
            </option>
            {years.length > 0 ? (
              years.map((e) => (
                <option key={e.year} value={e.year}>
                  {e.year}
                </option>
              ))
            ) : (
              <option disabled>No data</option>
            )}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Term</label>
          <select
            value={term}
            onChange={(e) => setterm(e.target.value)}
            name="year"
            className="form-select"
          >
            <option hidden defaultValue>
              Choose...
            </option>
            <option value={1}>1st</option>
            <option value={2}>2rd</option>
            <option value={3}>3rd</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Class</label>
          <select
            value={classID}
            onChange={(e) => setclassID(e.target.value)}
            name="year"
            className="form-select"
          >
            <option hidden defaultValue>
              Choose...
            </option>
            {classes.length > 0 ? (
              classes.map((e) => (
                <option key={e.classCode} value={e.classCode}>
                  {e.name}
                </option>
              ))
            ) : (
              <option disabled>No data</option>
            )}
          </select>
        </div>

        {loading && (
          <div className="d-flex justify-content-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}
        {studentOptions?.length > 0 && (
          <div className="mb-3">
            <label className="form-label">Student</label>
            <select
              value={studentID}
              onChange={(e) => setstudentID(e.target.value)}
              name="students"
              className="form-select"
            >
              <option hidden defaultValue>
                Choose...
              </option>
              {studentOptions?.length > 0 ? (
                studentOptions.map((e) => (
                  <option key={e.userID} value={e.userID}>
                    {e.name} {e.surname} - {e.userID}
                  </option>
                ))
              ) : (
                <option disabled> No data</option>
              )}
            </select>
          </div>
        )}
        <div>
          <button
            onClick={handleSearch}
            className="btn blue__btn"
            disabled={loading}
          >
            {loading && <div className="spinner-border" role="status"></div>}
            Search
          </button>
        </div>
      </form>
    </div>
  );
}

export default SearchStudent;
