import React, { useState } from "react";
import { errorAlert, successAlert } from "../../utils";
import axios from "../../store/axios";
import { useForm } from "react-hook-form";

function ChangePassword({ id }) {
  const [oldpassword, setoldpassword] = useState("");
  const [newpassword, setnewpassword] = useState("");
  const { register, handleSubmit, errors } = useForm();
  const [loading, setloading] = useState(false);

  const handleChangePassword = () => {
    setloading(true);
    axios
      .post(`/change/password/${id}`, {
        newPassword: newpassword,
        oldPassword: oldpassword,
      })
      .then((res) => {
        setloading(false);
        if (res.data.error) {
          errorAlert(res.data.error);
          return 0;
        }
        successAlert("password successfully change");
        setoldpassword("");
        setnewpassword("");
      })
      .catch((err) => {
        setloading(false);
        console.log(err);
        errorAlert("Failed to change password");
      });
  };

  return (
    <form action="" className="mb-5 content__container">
      <h4>Change Password</h4>
      <div className="row mb-3">
        <label className="col-sm-3 col-form-label">Old Password</label>
        <div className="col-sm-9">
          <input
            onChange={(e) => setoldpassword(e.target.value)}
            ref={register({ required: true })}
            value={oldpassword}
            type="password"
            className="form-control"
            name="oldpassword"
          />
          {errors.oldpassword && (
            <span className=" form-error text-danger mb-2">
              This field is required
            </span>
          )}
        </div>
      </div>
      <div className="row mb-3">
        <label className="col-sm-3 col-form-label">New Password</label>
        <div className="col-sm-9">
          <input
            onChange={(e) => setnewpassword(e.target.value)}
            ref={register({ required: true })}
            value={newpassword}
            type="password"
            className="form-control"
            name="newpassword"
          />
          {errors.newpassword && (
            <span className=" form-error text-danger mb-2">
              This field is required
            </span>
          )}
        </div>
      </div>
      <div className="row mb-3">
        <div className="offset-3 col-sm-9">
          <button
            disabled={loading}
            type="submit"
            onClick={handleSubmit(handleChangePassword)}
            className="btn blue__btn"
          >
            {loading && (
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
            )}
            Submit
          </button>
        </div>
      </div>
    </form>
  );
}

export default ChangePassword;
