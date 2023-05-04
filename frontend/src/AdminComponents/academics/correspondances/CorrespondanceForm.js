import React from "react";
import { useForm } from "react-hook-form";

function CorrespondanceForm(props) {
  const { register, handleSubmit, errors } = useForm();

  let {
    salutation,
    setsalutation,
    subject,
    setsubject,
    body,
    setbody,
    closing,
    setclosing,
    signature,
    setsignature,
    date,
    setdate,
    address,
    setaddress,
    loading,
    isEdit,
    handleFunc,
  } = props;

  return (
    <form onSubmit={handleSubmit(handleFunc)} action="">
      <div className=" mb-3">
        <label htmlFor="name" className="col-sm-2 col-form-label">
          Address
        </label>
        <div className="col-sm-10">
          <textarea
            ref={register({ required: true })}
            value={address}
            onChange={(e) => setaddress(e.target.value)}
            name="address"
            rows="3"
            className="form-control"
          ></textarea>
          {errors.address && (
            <span className=" form-error text-danger mb-2">
              This field is required
            </span>
          )}
        </div>
      </div>
      <div className=" mb-3">
        <label htmlFor="name" className="col-sm-2 col-form-label">
          Salutations
        </label>
        <div className="col-sm-10">
          <input
            value={salutation}
            onChange={(e) => setsalutation(e.target.value)}
            type="text"
            ref={register({ required: true })}
            className="form-control"
            name="salutation"
          />
          {errors.salutation && (
            <span className=" form-error text-danger mb-2">
              This field is required
            </span>
          )}
        </div>
      </div>
      <div className=" mb-3">
        <label htmlFor="name" className="col-sm-2 col-form-label">
          Subject
        </label>
        <div className="col-sm-10">
          <input
            ref={register({ required: true })}
            value={subject}
            onChange={(e) => setsubject(e.target.value)}
            type="text"
            className="form-control"
            name="subject"
          />
          {errors.subject && (
            <span className=" form-error text-danger mb-2">
              This field is required
            </span>
          )}
        </div>
      </div>
      <div className=" mb-3">
        <label htmlFor="name" className="col-sm-2 col-form-label">
          Body
        </label>
        <div className="col-sm-10">
          <textarea
            className="form-control"
            name="body"
            ref={register({ required: true })}
            value={body}
            onChange={(e) => setbody(e.target.value)}
            rows="10"
          ></textarea>
          {errors.body && (
            <span className=" form-error text-danger mb-2">
              This field is required
            </span>
          )}
        </div>
      </div>
      <div className=" mb-3">
        <label htmlFor="name" className="col-sm-2 col-form-label">
          Closing
        </label>
        <div className="col-sm-10">
          <input
            ref={register({ required: true })}
            value={closing}
            onChange={(e) => setclosing(e.target.value)}
            type="text"
            className="form-control"
            name="closing"
          />
          {errors.body && (
            <span className=" form-error text-danger mb-2">
              This field is required
            </span>
          )}
        </div>
      </div>
      <div className=" mb-3">
        <label htmlFor="name" className="col-sm-2 col-form-label">
          Signature
        </label>
        <div className="col-sm-10">
          <textarea
            className="form-control"
            name="signature"
            ref={register({ required: true })}
            value={signature}
            onChange={(e) => setsignature(e.target.value)}
            rows="3"
          ></textarea>
          {errors.signature && (
            <span className=" form-error text-danger mb-2">
              This field is required
            </span>
          )}
        </div>
      </div>
      <div className=" mb-3">
        <label htmlFor="name" className="col-sm-2 col-form-label">
          Date
        </label>
        <div className="col-sm-10">
          <input
            ref={register({ required: true })}
            value={date}
            onChange={(e) => setdate(e.target.value)}
            type="date"
            className="form-control"
            name="date"
          />
          {errors.date && (
            <span className=" form-error text-danger mb-2">
              This field is required
            </span>
          )}
        </div>
      </div>
      <div className="">
        <div className="col-sm-10">
          <button disabled={loading} type="submit" className="btn blue__btn">
            {loading && (
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
            )}
            {isEdit ? "Save Changes" : "Add"}
          </button>
        </div>
      </div>
    </form>
  );
}

export default CorrespondanceForm;
