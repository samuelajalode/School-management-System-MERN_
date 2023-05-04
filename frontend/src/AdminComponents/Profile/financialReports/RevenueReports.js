import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../../store/slices/userSlice";
import {
  selectCampuses,
  selectDivisions,
  selectSection,
  selectYearGroup,
} from "../../../store/slices/schoolSlice";

function RevenueReports() {
  const [searchBy, setsearchBy] = useState("");
  const [year, setyear] = useState("");
  const [selected, setselected] = useState("");
  const sections = useSelector(selectSection);
  const divisions = useSelector(selectDivisions);
  const campuses = useSelector(selectCampuses);
  const years = useSelector(selectYearGroup);
  const user = useSelector(selectUser);

  return (
    <div>
      <h3>Expected Revenue Reports</h3>
      <div>
        <form action="" className="row">
          <div className="row mb-3">
            <label className="col-sm-3 col-form-label">Academic Year</label>
            <div className="col-sm-9">
              <select
                value={year}
                onChange={(e) => setyear(e.target.value)}
                name="year"
                className="form-select"
              >
                <option hidden defaultValue>
                  Choose...
                </option>
                {years &&
                  years.map((e) => (
                    <option key={e._id} value={e?.year}>
                      {e?.year}
                    </option>
                  ))}
              </select>
            </div>
            <div className="row">
              <div className="col-sm-6">
                <label className=" col-form-label">Filter By</label>
                <div className="">
                  <select
                    value={year}
                    onChange={(e) => setyear(e.target.value)}
                    name="year"
                    className="form-select"
                  >
                    <option hidden defaultValue>
                      Choose...
                    </option>
                    <option value="section">Section</option>
                    <option value="division">Division</option>
                    <option value="campus">Campus</option>
                  </select>
                </div>
              </div>
              {searchBy === "section" && (
                <div className="col-sm-6">
                  <label className=" col-form-label">Section</label>
                  <div className="">
                    <select
                      value={selected}
                      onChange={(e) => setselected(e.target.value)}
                      name="selected"
                      className="form-select"
                    >
                      <option hidden defaultValue>
                        Choose...
                      </option>
                      {sections.map((e) => (
                        <option key={e._id} value={e.name}>
                          {e.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}
              {searchBy === "division" && (
                <div className="col-sm-6">
                  <label className=" col-form-label">Division</label>
                  <div className="">
                    <select
                      value={selected}
                      onChange={(e) => setselected(e.target.value)}
                      name="selected"
                      className="form-select"
                    >
                      <option hidden defaultValue>
                        Choose...
                      </option>
                      {divisions.map((e) => (
                        <option key={e._id} value={e.name}>
                          {e.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              {searchBy === "division" && (
                <div className="col-sm-6">
                  <label className=" col-form-label">Campuses</label>
                  <div className="">
                    <select
                      value={selected}
                      onChange={(e) => setselected(e.target.value)}
                      name="selected"
                      className="form-select"
                    >
                      <option hidden defaultValue>
                        Choose...
                      </option>
                      {campuses.map((e) => (
                        <option key={e._id} value={e.name}>
                          {e.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}
            </div>
          </div>
        </form>
        <div>
          <div className="text-center">
            <h6>
              <strong>{user?.name}</strong>
            </h6>
            <h6>EXPECTED REVENUE REPORT</h6>
            <div>{year} Academic Year</div>
            <div>
              {searchBy} - {selected}
            </div>
          </div>
          <table class="table">
            <thead>
              <tr>
                <th scope="col">TERM / SEMESTER</th>
                <th scope="col">EXPECTED REVENUE</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1st</td>
                <td>$ 0.00</td>
              </tr>
              <tr>
                <td>2nd</td>
                <td>$ 0.00</td>
              </tr>
              <tr>
                <td>3rd</td>
                <td>$ 0.00</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="d-flex content__container">
        <button className="btn blue__btn ml-2">Print</button>
        <button className="btn blue__btn">Save</button>
      </div>
    </div>
  );
}

export default RevenueReports;
