import React from "react";
//import IntlTelInput from "react-intl-tel-input";
import "react-intl-tel-input/dist/main.css";

function Contact(props) {
  let {
    setmobilenumber,
    mobilenumber,
    settelephone,
    residence,
    setresidence,
    telephone,
    postalAddress,
    errors,
    register,
    setpostalAddress,
  } = props;

  return (
    <div>
      <h3>Contact Details</h3>
      <div className="row mb-3">
        <div className="col-xs-12 col-sm-6 ">
          <label className="form-label">Mobile Number</label>
          <input
            name="mobile"
            type="tel"
            value={mobilenumber}
            ref={register({ required: true })}
            onChange={(e) => setmobilenumber(e.target.value)}
            className="form-control"
            placeholder="phone number if any"
          />
          {errors.mobile && (
            <span className=" form-error text-danger mb-2">
              This field is required
            </span>
          )}
        </div>
        <div className="col-xs-12 col-sm-6">
          <label className="form-label">Phone Number</label>
          <input
            value={telephone}
            onChange={(e) => settelephone(e.target.value)}
            name="phone"
            type="tel"
            ref={register({ required: true })}
            className="form-control"
            placeholder="phone number if any"
          />
          {errors.phone && (
            <span className=" form-error text-danger mb-2">
              This field is required
            </span>
          )}
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-xs-12 col-sm-6">
          <label className="form-label">Area of Residence</label>
          <textarea
            value={residence}
            ref={register({ required: true })}
            onChange={(e) => setresidence(e.target.value)}
            rows={3}
            name="residence"
            type="text"
            className="form-control"
          ></textarea>
          {errors.residence && (
            <span className=" form-error text-danger mb-2">
              This field is required
            </span>
          )}
        </div>

        <div className="col-xs-12 col-sm-6">
          <label className="form-label">Postal Address</label>
          <textarea
            rows={3}
            value={postalAddress}
            onChange={(e) => setpostalAddress(e.target.value)}
            type="email"
            name="lastname"
            className="form-control"
          ></textarea>
        </div>
      </div>
    </div>
  );
}

export default Contact;
