import React, { useEffect, useState } from "react";
import Logout from "../../components/settings/Logout";
import Profile from "../../components/profile/UpdateProfile";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, logout, update } from "../../store/slices/userSlice";
import axios from "../../store/axios";
import ChangePassword from "../../components/settings/ChangePassword";
import { useForm } from "react-hook-form";
import EditIcon from "@material-ui/icons/Edit";
import { errorAlert, successAlert } from "../../utils";
import { LoginString } from "../../store/localStorage";
import NameModal from "./ModalName";

function SettingsPage() {
  const { register, handleSubmit, errors } = useForm();
  const [admin, setadmin] = useState({});
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [name, setname] = useState("");
  const [editfullname, seteditfullname] = useState("");
  const [motto, setmotto] = useState("");
  const [email, setemail] = useState("");
  const [address, setaddress] = useState("");
  const [telephone, settelephone] = useState("");
  const [loading, setloading] = useState(false);
  const [open, setOpen] = useState(false);
  const [editloading, seteditloading] = useState(false);

  useEffect(() => {
    axios.get(`/school`).then((res) => {
      let data = res?.data;
      setadmin(data);
      setname(data?.name || "Enter School Name");
      setmotto(data?.motto);
      setemail(data?.email);
      setaddress(data?.address);
      settelephone(data?.telephone);
      seteditfullname(data?.fullName);
    });
  }, []);

  const handleCancel = (e) => {
    e.preventDefault();
    setname(admin?.name);
    setmotto(admin?.motto);
    setemail(admin?.email);
    setaddress(admin?.address);
    settelephone(admin?.telephone);
  };

  const handleEditname = (e) => {
    e.preventDefault();
    seteditloading(true);
    console.log(editfullname);
    axios
      .put(`/school/update/${admin?.userID}`, {
        fullName: editfullname,
      })
      .then((res) => {
        seteditloading(false);
        if (res.data.error) {
          errorAlert(res.data.error);
          return 0;
        }
        successAlert("Changes are saved");
        setOpen(false);
      })
      .catch((err) => {
        console.log(err);
        seteditloading(false);
        errorAlert("Failed to save changes");
      });
  };

  const handleEdit = () => {
    setloading(true);
    axios
      .put(`/school/update/${admin?.userID}`, {
        name,
        address,
        motto,
        email,
        telephone,
      })
      .then((res) => {
        setloading(false);
        if (res.data.error) {
          errorAlert(res.data.error);
          return 0;
        }
        successAlert("Changes are saved");
        dispatch(
          update({
            name: name,
          })
        );
        localStorage.setItem(LoginString.NAME, name);
      })
      .catch((err) => {
        console.log(err);
        setloading(false);
        errorAlert("Failed to save changes");
      });
  };

  return (
    <div>
      <div className="content__container d-flex flex-column align-items-center mb-5">
        <Profile id={user?.userID} profile={user?.photoUrl} />
        <h2>
          {editfullname}{" "}
          <span>
            <EditIcon onClick={(e) => setOpen(true)} />
          </span>
        </h2>
        <form className="row">
          <div className="col-sm-6 mb-3">
            <label className=" col-form-label">Name</label>
            <div className="">
              <input
                onChange={(e) => setname(e.target.value)}
                ref={register({ required: true })}
                value={name}
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
          </div>
          <div className="col-sm-6 mb-3">
            <label className=" col-form-label">Motto</label>
            <div className="">
              <input
                onChange={(e) => setmotto(e.target.value)}
                ref={register({ required: true })}
                value={motto}
                type="text"
                className="form-control"
                name="motto"
              />
              {errors.motto && (
                <span className=" form-error text-danger mb-2">
                  This field is required
                </span>
              )}
            </div>
          </div>
          <div className="col-sm-6 mb-3">
            <label className=" col-form-label">Email</label>
            <div className="">
              <input
                onChange={(e) => setemail(e.target.value)}
                ref={register({ required: true })}
                value={email}
                type="email"
                className="form-control"
                name="email"
              />
              {errors.email && (
                <span className=" form-error text-danger mb-2">
                  This field is required
                </span>
              )}
            </div>
          </div>
          <div className="col-sm-6 mb-3">
            <label className=" col-form-label">Telephone</label>
            <div className="">
              <input
                onChange={(e) => settelephone(e.target.value)}
                ref={register({ required: true })}
                value={telephone}
                type="tel"
                className="form-control"
                name="telephone"
              />
              {errors.telephone && (
                <span className=" form-error text-danger mb-2">
                  This field is required
                </span>
              )}
            </div>
          </div>
          <div className="col-sm-6 mb-3">
            <label className=" col-form-label">Address</label>
            <div className="">
              <textarea
                rows={5}
                onChange={(e) => setaddress(e.target.value)}
                ref={register({ required: true })}
                value={address}
                className="form-control"
                name="address"
              />
              {errors.address && (
                <span className=" form-error text-danger mb-2">
                  This field is required
                </span>
              )}
            </div>
          </div>
          <div className="col-sm-6 mt-5">
            <button
              disabled={loading}
              onClick={handleSubmit(handleEdit)}
              className="btn blue__btn"
            >
              {loading && (
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
              )}
              Save Changes
            </button>
            <button onClick={handleCancel} className="btn btn-danger ml-3">
              Cancel
            </button>
          </div>
        </form>
      </div>
      <NameModal
        open={open}
        setOpen={setOpen}
        name={editfullname}
        loading={editloading}
        setname={seteditfullname}
        handleEdit={handleEditname}
      />

      <div id="changepassword">
        <ChangePassword id={user?.id} />
      </div>

      <Logout user={user} dispatch={dispatch} loggout={logout} />
    </div>
  );
}

export default SettingsPage;
