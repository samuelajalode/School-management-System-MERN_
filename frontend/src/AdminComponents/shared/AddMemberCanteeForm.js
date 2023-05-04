import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { selectClasses } from "../../store/slices/schoolSlice";
import { staffPosition } from "../../data";
import axios from "../../store/axios";

function AddMemberCanteeForm(props) {
  const { register, handleSubmit, errors } = useForm();
  let {
    userID,
    loading,
    role,
    setuserID,
    name,
    setname,
    classID,
    setclass,
    setpaymentPackage,
    onCreate,
  } = props;
  const classes = useSelector(selectClasses);
  const [paymentPlan, setpaymentPlan] = useState([]);

  useEffect(() => {
    axios.get("/paymentplan").then((res) => {
      setpaymentPlan(res.data?.plans);
    });
  }, []);

  console.log(role);

  return (
    <form action="" className=" g-3">
      <div className="col-md-8 mb-3">
        <label className="form-label">
          {" "}
          {role === "student" ? "Student ID" : "Staff ID"}{" "}
        </label>
        <input
          value={userID}
          ref={register({ required: true })}
          onChange={(e) => setuserID(e.target.value)}
          type="text"
          className="form-control"
          name="userID"
        />
        {errors.userId && (
          <span className=" form-error text-danger mb-2">
            This field is required
          </span>
        )}
      </div>
      <div className="col-md-8 mb-3">
        <label className="form-label"> Full Name </label>
        <input
          value={name}
          ref={register({ required: true })}
          onChange={(e) => setname(e.target.value)}
          type="text"
          className="form-control"
          name="name"
        />
        {errors.name && (
          <span className=" form-error text-danger mb-2">
            This field is required
          </span>
        )}
      </div>
      <div className="col-md-8 mb-3">
        {role === "student" ? (
          <>
            <label className="form-label">Class</label>
            <select
              value={classID}
              ref={register({ required: true })}
              onChange={(e) => setclass(e.target.value)}
              name="class"
              className="form-select"
            >
              <option defaultValue hidden>
                Choose...
              </option>
              {classes.length > 0 ? (
                classes.map((e) => (
                  <option key={e.classCode} value={e.classCode}>
                    {e.name}
                  </option>
                ))
              ) : (
                <option disabled>no classes yet</option>
              )}
            </select>
          </>
        ) : (
          <>
            <label className="form-label">Staff's Position</label>
            <select
              value={classID}
              onChange={(e) => setclass(e.target.value)}
              name="class"
              className="form-select"
            >
              <option defaultValue hidden>
                Choose...
              </option>
              {staffPosition.length > 0 ? (
                staffPosition.map((e) => (
                  <option key={e} value={e}>
                    {e}
                  </option>
                ))
              ) : (
                <option disabled>no data yet</option>
              )}
            </select>
          </>
        )}
      </div>
      <div className="col-md-8 mb-3">
        <label className="form-label">
          Select Payment Plan{" "}
          <a href="/canteen/payments/plan">View Payment Plans available</a>
        </label>
        <select
          onChange={(e) => setpaymentPackage(e.target.value)}
          name="class"
          className="form-select"
        >
          <option defaultValue hidden>
            Choose...
          </option>
          {paymentPlan?.length > 0 ? (
            paymentPlan?.map((e) => (
              <option key={e._id} value={e.plan}>
                {e.name}
              </option>
            ))
          ) : (
            <option disabled>no data yet</option>
          )}
        </select>
      </div>
      <div className="mb-3">
        <button
          disabled={loading}
          onClick={handleSubmit(onCreate)}
          className="btn blue__btn"
        >
          {loading && (
            <span
              className="spinner-border spinner-border-sm"
              role="status"
            ></span>
          )}
          Register
        </button>
      </div>
    </form>
  );
}

export default AddMemberCanteeForm;
