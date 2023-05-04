import React from "react";
import { useForm } from "react-hook-form";
import { staffPosition } from "../../data";

function Form({
  type,
  settype,
  setusername,
  password,
  setpassword,
  confirmpass,
  setconfirmpass,
  loading,
  onSubmit,
  username,
  isEdit,
}) {
  const { register, handleSubmit, errors } = useForm();

  return (
    <form action="">
      <div className="mb-3">
        <label className="form-label"> User Type</label>
        <select
          value={type}
          onChange={(a) => settype(a.target.value)}
          name="item"
          className="form-select"
          aria-label="Default select example"
        >
          <option defaultValue hidden>
            Select
          </option>
          {staffPosition &&
            staffPosition?.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          <option value="Student">Student</option>
        </select>
      </div>
      <div className="mb-3">
        <label className="form-label"> Name</label>
        <input
          name="name"
          type="text"
          value={username}
          ref={register({ required: true })}
          onChange={(e) => setusername(e.target.value)}
          className="form-control"
          placeholder=""
        />
        {errors.name && (
          <span className=" form-error text-danger mb-2">
            This field is required
          </span>
        )}
      </div>
      <div className="mb-3">
        <label className="form-label"> Password</label>
        <input
          name="password"
          type="password"
          value={password}
          ref={register({ required: true })}
          onChange={(e) => setpassword(e.target.value)}
          className="form-control"
          placeholder=""
        />
        {errors.password && (
          <span className=" form-error text-danger mb-2">
            This field is required
          </span>
        )}
      </div>
      <div className="mb-3">
        <label className="form-label">Cormfirm Password</label>
        <input
          name="confirmpassword"
          type="password"
          value={confirmpass}
          ref={register({ required: true, validate: (e) => e === password })}
          onChange={(e) => setconfirmpass(e.target.value)}
          className="form-control"
          placeholder=""
        />
        {errors.confirmpassword && (
          <span className=" form-error text-danger mb-2">
            Please confirm password
          </span>
        )}
      </div>
      <div className="d-flex justify-content-end">
        <button onClick={handleSubmit(onSubmit)} className="btn blue__btn mr-3">
          {loading && (
            <span
              className="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
          )}
          {isEdit ? "Save Changes" : "Add User"}
        </button>
        <button className="btn btn-danger">Cancel</button>
      </div>
    </form>
  );
}

export default Form;
