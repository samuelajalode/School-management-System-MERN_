import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectClasses } from "../../../store/slices/schoolSlice";
import axios from "../../../store/axios";
import { errorAlert } from "../../../utils";
import { useForm } from "react-hook-form";

const min = new Date().getFullYear();

function AddPrefect({
  name,
  setname,
  userID,
  setuserID,
  handleAdd,
  position,
  setposition,
  loading,
  startYear,
  endYear,
  yearOptions,
  setstartYear,
  setendYear,
}) {
  const classes = useSelector(selectClasses);
  const [students, setstudents] = useState([]);
  const [selectedStudent, setselectedStudent] = useState("");
  const { register, handleSubmit, errors, reset } = useForm();

  const handleSearchbyClass = (e) => {
    setname("");
    setuserID("");
    axios.get(`/students/class/${e}`).then((res) => {
      console.log(res.data);
      if (res.data.error) {
        console.log("error");
        errorAlert(res.data.error);
        return 0;
      }
      setstudents(
        res.data.users.map((user) => {
          return {
            id: user.userID,
            name: user.name,
            surname: user.surname,
          };
        })
      );
    });
  };

  const handleCancel = () => {
    reset();
    setname("");
    setuserID("");
    setposition("");
    setendYear("");
    setstartYear(min);
  };

  const handleSelectStudent = (id) => {
    let selectedstudent = students.find((e) => e.id === id);
    console.log(id, selectedstudent);
    setname(selectedstudent?.name + " " + selectedstudent?.surname);
    setuserID(selectedstudent?.id);
    setselectedStudent(id);
  };

  return (
    <div className="">
      <div className="mb-5 content__container">
        <h3>Search Student</h3>
        <div className="row">
          <div className="col-md-12">
            <label className="form-label">Student's Class</label>
            <select
              onChange={(e) => handleSearchbyClass(e.target.value)}
              id="inputState"
              className="form-select"
            >
              <option defaultValue hidden>
                Choose...
              </option>
              {classes.map((e) => (
                <option key={e.classCode} value={e.classCode}>
                  {e.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="row">
          {students.length > 0 && (
            <div className="col-md-12">
              <label className="form-label">OR Select Student's Class</label>
              <select
                onChange={(e) => handleSelectStudent(e.target.value)}
                id="inputState"
                className="form-select"
                value={selectedStudent}
              >
                <option defaultValue hidden>
                  Choose...
                </option>
                {students.map((e) => (
                  <option key={e.id} value={e.id}>
                    {e.id} {e.name} {e.surname}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      </div>

      <div className="content__container">
        <h3 className="mb-4">Add Prefect</h3>
        <form action="">
          <div className="row mb-3">
            <label className="col-sm-3 col-form-label">Name</label>
            <div className="col-sm-9">
              <input
                type="text"
                value={name}
                ref={register({ required: true })}
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
          </div>
          <div className="row mb-3">
            <label className="col-sm-3 col-form-label">Student ID</label>
            <div className="col-sm-9">
              <input
                type="text"
                ref={register({ required: true })}
                className="form-control"
                value={userID}
                onChange={(e) => setuserID(e.target.value)}
                name="userId"
              />
              {errors.userId && (
                <span className=" form-error text-danger mb-2">
                  This field is required
                </span>
              )}
            </div>
          </div>
          <div className="row mb-3">
            <label className="col-sm-3 col-form-label">Position</label>
            <div className="col-sm-9">
              <select
                ref={register({ required: true })}
                name="position"
                onChange={(e) => setposition(e.target.value)}
                className="form-select"
              >
                <option defaultValue hidden>
                  Choose...
                </option>
                <option value="Headgirl">Head Girl</option>
                <option value="Headboy">Head Boy</option>
                <option value="Vice Headgirl">Vice Headgirl</option>
                <option value="Vice Headboy">Vice Headboy</option>
                <option value="Senior Prefect">Senior Prefect</option>
                <option value="Prefect">Prefect </option>
                <option value="other">Other </option>
              </select>
              {errors.position && (
                <span className=" form-error text-danger mb-2">
                  This field is required
                </span>
              )}
            </div>
          </div>
          <div className="row mb-3">
            <label className="col-sm-3 col-form-label">From Year</label>
            <div className="col-sm-9">
              <select
                name="start_year"
                value={startYear}
                onChange={(e) => setstartYear(e.target.value)}
                className="form-select"
              >
                <option defaultValue hidden>
                  Choose...
                </option>
                {yearOptions &&
                  yearOptions.map((e) => (
                    <option key={e} value={e}>
                      {e}
                    </option>
                  ))}
              </select>
              {errors.start_year && (
                <span className=" form-error text-danger mb-2">
                  This field is required
                </span>
              )}
            </div>
          </div>
          <div className="row mb-3">
            <label className="col-sm-3 col-form-label">To Year</label>
            <div className="col-sm-9">
              <select
                name="end_year"
                value={endYear}
                onChange={(e) => setendYear(e.target.value)}
                className="form-select"
              >
                <option defaultValue hidden>
                  Choose...
                </option>
                {yearOptions &&
                  yearOptions
                    .map((e) => (
                      <option key={e} value={e}>
                        {e}
                      </option>
                    ))
                    .slice(1)}
              </select>
              {errors.start_year && (
                <span className=" form-error text-danger mb-2">
                  This field is required
                </span>
              )}
            </div>
          </div>

          <div className="row mb-3">
            <div className="offset-sm-3">
              <button
                disabled={loading}
                onClick={handleSubmit(handleAdd)}
                className="btn blue__btn "
              >
                {loading && (
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                )}
                Add
              </button>
              <button onClick={handleCancel} className="btn btn-danger ml-3">
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddPrefect;
