import React, { useState, useEffect } from "react";
import {
  selectYearGroup,
  selectClasses,
  selectCourses,
} from "../../../store/slices/schoolSlice";
import { useSelector } from "react-redux";
import axios from "../../../store/axios";

function Search({
  classID,
  setclass,
  loading,
  term,
  setterm,
  academicYear,
  setacademicYear,
  course,
  setcourse,
  handleSearch,
}) {
  const classes = useSelector(selectClasses);
  //const courses = useSelector(selectCourses);
  const yearGroup = useSelector(selectYearGroup);
  const [courses, setcourses] = useState();

  const handleSelectClass = async (e) => {
    setclass(e);
    setcourse("");
    await axios.get(`courses/class/${e}`).then((res) => {
      setcourses(
        res.data.docs.map((i) => {
          return {
            code: i.code,
            name: i.name,
          };
        })
      );
    });
  };

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
            onChange={(e) => handleSelectClass(e.target.value)}
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
      {classID && (
        <>
          <div className="mb-3">
            <label htmlFor="name" className="col-form-label">
              Course
            </label>
            <div className="">
              <select
                name="academic-calendar"
                className="form-select"
                value={course}
                onChange={(e) => setcourse(e.target.value)}
              >
                <option defaultValue hidden>
                  Choose...
                </option>
                {courses?.length > 0 ? (
                  courses.map((e) => (
                    <option key={e._id} value={e.code}>
                      {e.name}
                    </option>
                  ))
                ) : (
                  <option disabled>No courses yet for this class</option>
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
                value={academicYear}
                onChange={(e) => setacademicYear(e.target.value)}
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
        </>
      )}
      <div className="">
        <div>
          <button
            onClick={handleSearch}
            disabled={loading || !classID}
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
