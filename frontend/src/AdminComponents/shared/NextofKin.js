import React from "react";

function NextofKin(props) {
  const {
    lastname,
    setlastname,
    name,
    setname,
    errors,
    register,
    telephone,
    settelephone,
    email,
    setemail,
    setaddress,
    address,
    occupation,
    setoccupation,
    relationship,
    setrelationship,
  } = props;

  return (
    <div>
      <h3>Next of Kin Information</h3>
      <div className="row mb-3">
        <div className="col-xs-12 col-sm-6 ">
          <label className="form-label">Name</label>
          <input
            value={name}
            onChange={(e) => setname(e.target.value)}
            name="nextname"
            ref={register({ required: true })}
            type="text"
            className="form-control"
          />
          {errors.nextname && (
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
            ref={register({ required: true })}
            name="nextlastname"
            type="text"
            className="form-control"
          />
          {errors.nextlastname && (
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
            ref={register({ required: true })}
            name="nexttel"
            onChange={(e) => settelephone(e.target.value)}
            className="form-control"
          />
          {errors.nexttel && (
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
            name="nextemail"
            className="form-control"
          />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-xs-12 col-sm-6 ">
          <label className="form-label">Relationship</label>
          <input
            name="relationship"
            value={relationship}
            ref={register({ required: true })}
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
    </div>
  );
}

export default NextofKin;
