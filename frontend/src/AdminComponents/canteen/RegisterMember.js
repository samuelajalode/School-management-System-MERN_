import React, { useEffect, useState } from "react";
import RegisterForm from "../shared/AddMemberCanteeForm";
import axios from "../../store/axios";
import { errorAlert, successAlert } from "../../utils";
import Nav from "./CanteenNav";

function RegisterMember() {
  const [name, setname] = useState("");
  const [userID, setuserID] = useState("");
  const [role, setrole] = useState("student");
  const [classID, setclass] = useState("");
  const [packageID, setpackage] = useState("");
  const [loading, setloading] = useState(false);
  const [search, setsearch] = useState("");
  const [students, setstudents] = useState([]);
  const [teachers, setteachers] = useState([]);

  useEffect(() => {
    axios.get("/students").then((res) => setstudents(res.data));
  }, []);

  useEffect(() => {
    axios.get("/teachers").then((res) => setteachers(res.data));
  }, []);

  const handleaddMember = () => {
    setloading(true);
    axios
      .post("/canteen/create", {
        name,
        userID,
        role,
        classID,
        paymentMethod: packageID,
      })
      .then((res) => {
        setloading(false);
        if (res.data?.error) {
          errorAlert(res.data.error);
          return 0;
        }
        successAlert(`member with id ${res.data.user?.memberID}`);
        setname("");
        setuserID("");
        setrole("");
        setclass("");
        setpackage("");
      })
      .catch((err) => {
        setloading(false);
        console.log(err);
        errorAlert("Something when wrong");
      });
  };

  const handleSelectUser = (val) => {
    setsearch(val);
    let users = role === "student" ? students : teachers;
    let selected = users.find((i) => i.userID === val);
    setuserID(val);
    setname(selected?.name + "  " + selected?.surname);
  };

  return (
    <>
      <Nav />
      <h3 className="mb-3"> Register Canteen Member</h3>
      <div className="content__container">
        <div className="row g-3 mx-3">
          <div className="col-3 form-check">
            <input
              onClick={(e) => setrole(e.target.value)}
              className="form-check-input"
              value="student"
              type="radio"
              name="flexRadioDefault"
              defaultChecked
            />
            <label className="form-check-label">Student</label>
          </div>
          <div className="col-3 form-check">
            <input
              onClick={(e) => setrole(e.target.value)}
              className="form-check-input"
              value="staff"
              type="radio"
              name="flexRadioDefault"
            />
            <label className="form-check-label">Staff</label>
          </div>
        </div>

        <form action="" className="my-4">
          <label className="form-label">
            Search {role} by Name or Student ID
          </label>
          <select
            className="form-select col-8"
            value={search}
            onChange={(e) => handleSelectUser(e.target.value)}
          >
            {role === "staff" ? (
              <>
                <option hidden>Select</option>
                {teachers.length > 0 ? (
                  teachers.map((e) => (
                    <option key={e.userID} value={e.userID}>
                      {e.userID} {e.name} {e.surname}
                    </option>
                  ))
                ) : (
                  <option disabled>No students yet</option>
                )}
              </>
            ) : (
              <>
                <option hidden>Select</option>
                {students.length > 0 ? (
                  students.map((e) => (
                    <option key={e.userID} value={e.userID}>
                      {e.userID} {e.name} {e.surname}
                    </option>
                  ))
                ) : (
                  <option disabled>No students yet</option>
                )}
              </>
            )}
          </select>
        </form>
        <RegisterForm
          name={name}
          onCreate={handleaddMember}
          setname={setname}
          userID={userID}
          setuserID={setuserID}
          role={role}
          loading={loading}
          classID={classID}
          setclass={setclass}
          setpaymentPackage={setpackage}
        />
      </div>
    </>
  );
}

export default RegisterMember;
