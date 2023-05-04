import React from "react";

function SendToForm({
  message,
  setmessage,
  onSend,
  recipient,
  setrecipient,
  sender,
  sendto,
  searchOptions,
  loading,
  error,
}) {
  return (
    <form action="" className=" content__container form__sender">
      <div className="header">
        <h3>Send Message to {sendto}</h3>
      </div>
      <div className="row mb-2 px-3">
        <label className="col-sm-2" htmlFor="">
          Recipient:
        </label>
        <div className="col-sm-10">
          <select
            value={recipient}
            onChange={(e) => setrecipient(e.target.value)}
            id="inputState"
            className="form-select"
          >
            <option defaultChecked hidden>
              Choose...
            </option>
            {searchOptions ? (
              searchOptions()
            ) : (
              <option disabled>No options</option>
            )}
          </select>
        </div>
      </div>

      <div className="row mb-2 px-3">
        <label className="col-sm-2" htmlFor="">
          Sender:
        </label>
        <div className="col-sm-10">
          <input className="form-control" value={sender} type="text" readOnly />
        </div>
      </div>
      <div className="mb-2 row">
        <div className="col-12">
          <textarea
            value={message}
            onChange={(e) => setmessage(e.target.value)}
            className="form-control"
            name=""
            rows="10"
            required
            placeholder="Type here"
          ></textarea>
        </div>
        {error && <div className="text-danger text-center mb-2">{error}</div>}
        <div className="col-12">
          <button
            disabled={loading}
            onClick={onSend}
            className="btn blue__btn w-100"
          >
            {loading && (
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
            )}
            Send
          </button>
        </div>
      </div>
    </form>
  );
}

export default SendToForm;
