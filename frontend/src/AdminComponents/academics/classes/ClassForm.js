import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import axios from "../../../store/axios";
import {
  selectCampuses,
  selectFees,
  selectDivisions,
  selectYearGroup,
} from "../../../store/slices/schoolSlice";
import Checkbox from "@material-ui/core/Checkbox";

function ClassForm(props) {
  const campuses = useSelector(selectCampuses);
  const divisions = useSelector(selectDivisions);
  const groups = useSelector(selectFees);
  const [staff, setstaff] = useState([]);
  const years = useSelector(selectYearGroup);
  const { register, handleSubmit, errors } = useForm();
  let {
    name,
    setname,
    code,
    setcode,
    campus,
    academic,
    setacademic,
    division,
    setdivision,
    group,
    setgroup,
    prefect,
    setprefect,
    sba,
    setsba,
    sbaStaff,
    setsbaStaff,
    setcampus,
    teacher,
    loading,
    isEdit,
    handleAddClass,
    setteacher,
  } = props;

  const [prefects, setprefects] = useState([]);

  useEffect(() => {
    axios.get("/prefects").then((res) => {
      setprefects(res.data);
    });
  }, []);

  useEffect(() => {
    axios.get("/teachers/teachers").then((res) => {
      setstaff(res.data);
    });
  }, []);

  return (
    <form onSubmit={handleSubmit(handleAddClass)} action="">
      <div className="row mb-3">
        <label htmlFor="name" className="col-sm-2 col-form-label">
          Academic Year
        </label>
        <div className="col-sm-10">
          <select
            name="academic-calendar"
            className="form-select"
            value={academic}
            onChange={(e) => setacademic(e.target.value)}
          >
            <option defaultValue hidden>
              Choose...
            </option>
            {years.length > 0 ? (
              years.map((e) => (
                <option value={e.year} key={e.year}>
                  {e.year}
                </option>
              ))
            ) : (
              <option disabled>No data</option>
            )}
          </select>
        </div>
      </div>
      <div className="row mb-3">
        <label htmlFor="name" className="col-sm-2 col-form-label">
          Class Name
        </label>
        <div className="col-sm-10">
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
      </div>
      {!isEdit && (
        <div className="row mb-3">
          <label htmlFor="name" className="col-sm-2 col-form-label">
            Class Code
          </label>
          <div className="col-sm-10">
            <input
              ref={register({ required: true })}
              value={code}
              onChange={(e) => setcode(e.target.value)}
              type="text"
              className="form-control"
              name="code"
            />
            {errors.code && (
              <span className=" form-error text-danger mb-2">
                This field is required
              </span>
            )}
          </div>
        </div>
      )}
      <div className="row mb-3">
        <label htmlFor="name" className="col-sm-2 col-form-label">
          Campus
        </label>
        <div className="col-sm-10">
          <select
            id="campus"
            className="form-select"
            value={campus}
            onChange={(e) => setcampus(e.target.value)}
          >
            <option defaultValue hidden>
              Choose...
            </option>
            {campuses.length > 0 ? (
              campuses.map((e) => (
                <option key={e._id} value={e._id}>
                  {e.name}
                </option>
              ))
            ) : (
              <option disabled>No campuses yet</option>
            )}
          </select>
        </div>
      </div>
      <div className="row mb-3">
        <label htmlFor="name" className="col-sm-2 col-form-label">
          Group
        </label>
        <div className="col-sm-10">
          <select
            id="campus"
            className="form-select"
            value={group}
            onChange={(e) => setgroup(e.target.value)}
          >
            <option defaultValue hidden>
              Choose...
            </option>
            {groups.length > 0 ? (
              groups.map((e) => (
                <option key={e._id} value={e._id}>
                  {e.name}
                </option>
              ))
            ) : (
              <option disabled>No groups yet</option>
            )}
          </select>
        </div>
      </div>
      <div className="row mb-3">
        <label htmlFor="name" className="col-sm-2 col-form-label">
          Division
        </label>
        <div className="col-sm-10">
          <select
            id="campus"
            className="form-select"
            value={division}
            onChange={(e) => setdivision(e.target.value)}
          >
            <option defaultValue hidden>
              Choose...
            </option>
            {divisions.length > 0 ? (
              divisions.map((e) => (
                <option key={e._id} value={e.code}>
                  {e.name}
                </option>
              ))
            ) : (
              <option disabled>No divisions yet</option>
            )}
          </select>
        </div>
      </div>
      <div className="row mb-3">
        <label htmlFor="name" className="col-sm-2 col-form-label">
          Class Teacher
        </label>
        <div className="col-sm-10">
          <select
            value={teacher}
            onChange={(e) => setteacher(e.target.value)}
            id="teacher"
            className="form-select"
          >
            <option defaultValue hidden>
              Choose...
            </option>
            {staff.length > 0 ? (
              staff.map((e) => (
                <option key={e.userID} value={e.userID}>
                  {e.name} {e.surname}
                </option>
              ))
            ) : (
              <option disabled>No staff yet</option>
            )}
          </select>
        </div>
      </div>
      <div className="row mb-3">
        <label htmlFor="name" className="col-sm-2 col-form-label">
          Class Prefect
        </label>
        <div className="col-sm-10">
          <select
            id="campus"
            className="form-select"
            value={prefect}
            onChange={(e) => setprefect(e.target.value)}
          >
            <option defaultValue hidden>
              Choose...
            </option>
            {prefects?.length > 0 ? (
              prefects.map((e) => (
                <option key={e?._id} value={e?.userID}>
                  {e?.name}
                </option>
              ))
            ) : (
              <option disabled>No prefects yet</option>
            )}
          </select>
        </div>
      </div>
      <div className="row mb-3">
        <label htmlFor="name" className="col-sm-2 col-form-label">
          SBA Configuration
        </label>
        <div className="col-sm-10">
          <Checkbox
            checked={sba}
            color="primary"
            onChange={() => setsba(!sba)}
            inputProps={{ "aria-label": "primary checkbox" }}
          />
        </div>
      </div>
      <div className="row mb-3">
        <label htmlFor="name" className="col-sm-2 col-form-label">
          SBA Assign Staff
        </label>
        <div className="col-sm-10">
          <select
            id="campus"
            className="form-select"
            value={sbaStaff}
            onChange={(e) => setsbaStaff(e.target.value)}
          >
            <option defaultValue hidden>
              Choose...
            </option>
            {staff.length > 0 ? (
              staff.map((e) => (
                <option key={e.userID} value={e.userID}>
                  {e.name} {e.surname}
                </option>
              ))
            ) : (
              <option disabled>No staff yet</option>
            )}
          </select>
        </div>
      </div>
      <div className="row">
        <div className="offset-sm-2">
          <button disabled={loading} type="submit" className="btn blue__btn">
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
      </div>
    </form>
  );
}

export default ClassForm;
