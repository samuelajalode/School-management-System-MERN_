import React, { useState } from "react";
import { getID, getEmailPattern } from ".././../utils";

function Guadian({ setguadian, guadian }) {
  const [telephone, settelephone] = useState("");
  const [name, setname] = useState("");
  const [lastname, setlastname] = useState("");
  const [email, setemail] = useState("");
  const [relationship, setrelationship] = useState("");
  const [occupation, setoccupation] = useState("");
  const [address, setaddress] = useState("");
  const [errors, seterrors] = useState({
    name: false,
    lastname: false,
    mobile: false,
    relationship: false,
  });

  const handleAddGuadian = (e) => {
    e.preventDefault();
    seterrors({
      name: false,
      lastname: false,
      mobile: false,
      relationship: false,
    });
    let re = getEmailPattern();
    if (!re.test(String(email).toLowerCase())) {
      seterrors({ ...errors, email: true });
    }
    if (name === "") {
      seterrors({ ...errors, name: true });
    }
    if (lastname === "") {
      seterrors({ ...errors, lastname: true });
    }
    if (telephone === "") {
      seterrors({ ...errors, mobile: true });
    }
    if (relationship === "") {
      seterrors({ ...errors, relationship: true });
    }

    if (name !== "" && relationship !== "" && lastname !== "") {
      seterrors({
        name: false,
        lastname: false,
        mobile: false,
        relationship: false,
      });
      setname("");
      setlastname("");
      setrelationship("");
      setaddress("");
      setoccupation("");
      setemail("");
      settelephone("");
      setguadian([
        ...guadian,
        {
          mobile: telephone,
          name,
          lastname,
          email,
          relationship,
          occupation,
          address,
          id: getID(),
        },
      ]);
    }
  };

  return (
    <div>
      <h3>Guadian Information</h3>
      <div className="row mb-3">
        <div className="col-xs-12 col-sm-6 ">
          <label className="form-label">Name</label>
          <input
            value={name}
            onChange={(e) => setname(e.target.value)}
            name="name"
            type="text"
            className="form-control"
          />
          {errors.name && (
            <span className=" form-error text-danger mb-2">
              Name is required
            </span>
          )}
        </div>
        <div className="col-xs-12 col-sm-6 ">
          <label className="form-label">Last name</label>
          <input
            value={lastname}
            onChange={(e) => setlastname(e.target.value)}
            name="lastname"
            type="text"
            className="form-control"
          />
          {errors.lastname && (
            <span className=" form-error text-danger mb-2">
              Lastname is required
            </span>
          )}
        </div>
        <div className="col-xs-12 col-sm-6 ">
          <label name="mobile" className="form-label">
            Mobile Number
          </label>
          <input
            type="tel"
            value={telephone}
            onChange={(e) => settelephone(e.target.value)}
            className="form-control"
          />
          {errors.mobile && (
            <span className=" form-error text-danger mb-2">
              Mobile number is required
            </span>
          )}
        </div>
        <div className="col-xs-12 col-sm-6 ">
          <label className="form-label">Email</label>
          <input
            value={email}
            onChange={(e) => setemail(e.target.value)}
            type="email"
            name="lastname"
            className="form-control"
          />
          {errors.email && (
            <span className=" form-error text-danger mb-2">
              Valid email is required
            </span>
          )}
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-xs-12 col-sm-6 ">
          <label className="form-label">Relationship</label>
          <input
            name="relationship"
            value={relationship}
            onChange={(e) => setrelationship(e.target.value)}
            type="text"
            className="form-control"
          />
          {errors.relationship && (
            <span className=" form-error text-danger mb-2">
              Relationship with student is required
            </span>
          )}
        </div>
        <div className="col-xs-12 col-sm-6 ">
          <label className="form-label">Occupations</label>
          <input
            value={occupation}
            onChange={(e) => setoccupation(e.target.value)}
            type="text"
            name={occupation}
            className="form-control"
          />
          {errors.occupation && (
            <span className=" form-error text-danger mb-2">
              Occupation is required
            </span>
          )}
        </div>
        <div className="col-xs-12 col-sm-6 ">
          <label className="form-label">Address</label>
          <textarea
            rows={3}
            value={address}
            onChange={(e) => setaddress(e.target.value)}
            type="text"
            name="address"
            className="form-control"
          />
        </div>
      </div>
      <div onClick={handleAddGuadian} className="mb-3">
        <button className="btn orange__btn">Add Guadian</button>
      </div>
    </div>
  );
}

export default Guadian;
