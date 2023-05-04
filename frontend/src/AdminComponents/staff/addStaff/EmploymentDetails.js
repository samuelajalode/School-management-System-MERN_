import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "../../../store/axios";
import { bankOptions } from "../../../data";

import {
  selectCampuses,
  selectDepartments,
} from "../../../store/slices/schoolSlice";
import { Link } from "react-router-dom";

function EmploymentDetails(props) {
  const campuses = useSelector(selectCampuses);
  const departments = useSelector(selectDepartments);
  const [positions, setpositions] = useState([]);

  useEffect(() => {
    axios.get("/payrow").then((res) => {
      console.log(res.data);
      setpositions(res.data);
    });
  }, []);

  let {
    role,
    setRole,
    department,
    setDepartment,
    campus,
    setCampus,
    employmentDate,
    setemploymentDate,
    qualification,
    setqualification,
    years,
    setyears,
    bank,
    setbank,
    accountNumber,
    setaccountNumber,
    register,
    errors,
    salary,
    setsalary,
    allowance,
    setallowance,
    ssnit,
    setssnit,
    taxNumber,
    settaxNumber,
  } = props;

  return (
    <div>
      <h3>Employment Details</h3>
      <div className="row mb-3">
        <div className="col-xs-12 col-sm-6  mb-3">
          <div className="d-flex justify-content-between">
            <label className="form-label">Staff Role</label>
            <Link to="/finance/payrow">Add New Roles</Link>
          </div>

          <select
            ref={register({ required: true })}
            value={role}
            onChange={(e) => setRole(e.target.value)}
            name="role"
            className="form-select"
            aria-label="Default select example"
          >
            <option defaultValue hidden>
              select
            </option>
            {positions.length > 0 ? (
              positions.map((e) => (
                <option value={e?.code} key={e?._id}>
                  {e?.name}
                </option>
              ))
            ) : (
              <option>No position set yet</option>
            )}
          </select>
          {positions.length <= 0 && (
            <Link to="/finance/payrow">Add Positions</Link>
          )}
          {errors.role && (
            <span className=" form-error text-danger mb-2">
              Name is required
            </span>
          )}
        </div>
        <div className="col-xs-12 col-sm-6 mb-3">
          <label className="form-label">Departments</label>
          <select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            name="department"
            className="form-select"
            aria-label="Default select example"
          >
            <option defaultValue hidden>
              select
            </option>
            {departments.length > 0 ? (
              departments.map((e) => (
                <option key={e._id} value={e.code}>
                  {e.name}
                </option>
              ))
            ) : (
              <option disabled>No departments yet</option>
            )}
          </select>
        </div>
        <div className="col-xs-12 col-sm-6 mb-3">
          <label className="form-label">Campus</label>
          <select
            name="campus"
            value={campus}
            onChange={(e) => setCampus(e.target.value)}
            className="form-select"
            aria-label="Default select example"
          >
            <option defaultValue hidden>
              select
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

        <div className="col-xs-12 col-sm-6  mb-3">
          <label className="form-label">Employment Date</label>
          <input
            name="employmentdate"
            value={employmentDate}
            onChange={(e) => setemploymentDate(e.target.value)}
            type="date"
            className="form-control"
          />
        </div>
        <div className="col-xs-12 col-sm-6  mb-3">
          <label className="form-label">Bank</label>
          <select
            name="campus"
            value={bank}
            onChange={(e) => setbank(e.target.value)}
            className="form-select"
            aria-label="Default select example"
          >
            <option defaultValue hidden>
              select
            </option>
            {bankOptions.length > 0 ? (
              bankOptions.map((e) => (
                <option key={e} value={e}>
                  {e}
                </option>
              ))
            ) : (
              <option disabled>No data yet</option>
            )}
          </select>
        </div>
        <div className="col-xs-12 col-sm-6  mb-3">
          <label className="form-label"> Account Number</label>
          <input
            name="accountNumber"
            value={accountNumber}
            onChange={(e) => setaccountNumber(e.target.value)}
            type="text"
            className="form-control"
          />
        </div>

        <div className="col-xs-12 col-sm-6">
          <label htmlFor="name" className="form-label">
            Is SSNIT Contributor
          </label>
          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              onChange={() => setssnit(!ssnit)}
              id="flexSwitchCheckChecked"
              checked={ssnit}
            />
          </div>
        </div>
        {ssnit && (
          <div className="col-xs-12 col-sm-6 mb-3">
            <label className="form-label">Tax Identification Number</label>
            <input
              name="lastschool"
              value={taxNumber}
              onChange={(e) => settaxNumber(e.target.value)}
              type="text"
              className="form-control"
            />
          </div>
        )}
        <div className="col-xs-12 col-sm-6 mb-3">
          <label className="form-label">Qualification</label>
          <input
            name="lastschool"
            value={qualification}
            onChange={(e) => setqualification(e.target.value)}
            type="text"
            className="form-control"
          />
        </div>
        <div className="col-xs-12 col-sm-6  mb-3">
          <label className="form-label">Basic Salary</label>
          <input
            name="years"
            value={salary}
            onChange={(e) => setsalary(e.target.value)}
            type="number"
            className="form-control"
          />
        </div>
        <div className="col-xs-12 col-sm-6  mb-3">
          <label className="form-label">Allowance</label>
          <input
            name="years"
            value={allowance}
            onChange={(e) => setallowance(e.target.value)}
            type="number"
            className="form-control"
          />
        </div>
        <div className="col-xs-12 col-sm-6  mb-3">
          <label className="form-label">Years with School</label>
          <input
            name="years"
            value={years}
            onChange={(e) => setyears(e.target.value)}
            type="number"
            className="form-control"
          />
        </div>
      </div>
    </div>
  );
}

export default EmploymentDetails;
