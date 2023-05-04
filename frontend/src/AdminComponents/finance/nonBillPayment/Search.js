import React from "react";
import { useSelector } from "react-redux";
import {
  selectClasses,
  selectYearGroup,
} from "../../../store/slices/schoolSlice";
import { useForm } from "react-hook-form";

function SearchStudent({
  setclassID,
  classID,
  setstudentID,
  studentOptions,
  studentID,
  term,
  setterm,
  year,
  setyear,
  loading,
}) {
  const classes = useSelector(selectClasses);
  const years = useSelector(selectYearGroup);
  const { register, handleSubmit, errors } = useForm();

  return (
    <div className="content__container mb-3">
      <h3>Search Student</h3>
      <form action="" className="row">
        <div className="col-sm-6">
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
        </div>
        {studentOptions?.length > 0 && (
          <div className="col-sm-6">
            <div className=" mb-3">
              <label className=" col-form-label">Academic Year</label>
              <div className="">
                <select
                  value={year}
                  onChange={(e) => setyear(e.target.value)}
                  name="students"
                  className="form-select"
                >
                  <option hidden defaultValue>
                    Choose...
                  </option>
                  {years?.length > 0 ? (
                    years.map((e) => (
                      <option key={e.year} value={e.year}>
                        {e.year}
                      </option>
                    ))
                  ) : (
                    <option disabled> No data</option>
                  )}
                </select>
                {errors.year && (
                  <div className="text-danger">This field is required</div>
                )}
              </div>
            </div>
            <div className=" mb-3">
              <label className=" col-form-label">Term</label>
              <div className="">
                <select
                  value={term}
                  onChange={(e) => setterm(e.target.value)}
                  name="students"
                  className="form-select"
                >
                  <option hidden defaultValue>
                    Choose...
                  </option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </select>
                {errors.term && (
                  <div className="text-danger">This field is required</div>
                )}
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}

export default SearchStudent;
