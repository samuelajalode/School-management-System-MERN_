import React from "react";

function SendMessageForm({
  debtors,
  subject,
  setsubject,
  register,
  errors,
  salutations,
  setsalutations,
  signature,
  setsignature,
  message,
  setmessage,
  closing,
  setclosing,
  loading,
  handlePrint,
  handleSubmit,
}) {
  return (
    <form action="" className="m-5 content__container col-sm-8">
      <h6>
        <strong>{debtors?.length || 0} Debtors</strong>
      </h6>
      <div className="mb-3">
        <label className="form-label">Subject</label>
        <input
          value={subject}
          onChange={(e) => setsubject(e.target.value)}
          ref={register({ required: true })}
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
      <div className="mb-3">
        <label className="form-label">Greeting / Salutation</label>
        <input
          value={salutations}
          onChange={(e) => setsalutations(e.target.value)}
          ref={register({ required: true })}
          type="text"
          className="form-control"
          name="salutation"
        />
        {errors.salutation && (
          <span className=" form-error text-danger mb-2">
            This field is required
          </span>
        )}
      </div>
      <div className="mb-3">
        <label className="form-label">Signature</label>
        <input
          value={signature}
          onChange={(e) => setsignature(e.target.value)}
          ref={register({ required: true })}
          type="text"
          className="form-control"
          name="signature"
        />
        {errors.signature && (
          <span className=" form-error text-danger mb-2">
            This field is required
          </span>
        )}
      </div>
      <div className="mb-3">
        <label className="form-label">Message Body</label>
        <textarea
          value={message}
          onChange={(e) => setmessage(e.target.value)}
          ref={register({ required: true })}
          type="text"
          className="form-control"
          name="message"
        />
        {errors.message && (
          <span className=" form-error text-danger mb-2">
            This field is required
          </span>
        )}
      </div>
      <div className="mb-3">
        <label className="form-label">Closing</label>
        <input
          value={closing}
          onChange={(e) => setclosing(e.target.value)}
          ref={register({ required: true })}
          type="text"
          className="form-control"
          name="closing"
        />
        {errors.closing && (
          <span className=" form-error text-danger mb-2">
            This field is required
          </span>
        )}
      </div>
      <div className="mb-3">
        <button
          onClick={handleSubmit(handlePrint)}
          disabled={loading}
          className="btn blue__btn"
        >
          {loading && (
            <span className="spinner-border spinner-border-sm"></span>
          )}
          Print
        </button>
      </div>
    </form>
  );
}

export default SendMessageForm;
