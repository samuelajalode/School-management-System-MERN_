import React from "react";
import { useForm } from "react-hook-form";

function CalendarForm(props) {
  const { register, handleSubmit, errors } = useForm();

  let {
    title,
    settitle,
    setdescription,
    description,
    starttime,
    setstarttime,
    startdate,
    setstartdate,
    allday,
    setallday,
    endtime,
    isEdit,
    onSubmit,
    loading,
    setendtime,
    type,
    settype,
  } = props;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-3">
        <label className="form-label">Event Title</label>
        <input
          value={title}
          onChange={(e) => settitle(e.target.value)}
          ref={register({ required: true })}
          type="text"
          className="form-control"
          name="event"
        />
        {errors.event && (
          <span className=" form-error text-danger mb-2">
            This field is required
          </span>
        )}
      </div>
      <div className="mb-3">
        <label className="form-label">Event Description</label>
        <textarea
          value={description}
          onChange={(e) => setdescription(e.target.value)}
          type="text"
          rows={4}
          className="form-control"
          name="description"
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Event Type</label>
        <select
          value={type}
          onChange={(e) => settype(e.target.value)}
          name="type"
          className="form-select"
        >
          <option defaultValue hidden>
            Choose...
          </option>
          <option>Holiday</option>
          <option>Easter Break</option>
          <option>Mid Term</option>
          <option>Break</option>
          <option>Trip</option>
          <option>Sports</option>
          <option>Competitons</option>
          <option>Visiting Day</option>
          <option>Mid Term Assessment</option>
          <option>Independence Holiday</option>
          <option>Revision Week</option>
          <option>Other</option>
        </select>
      </div>
      <div className="mb-3 ">
        <label className="form-label">Date</label>
        <input
          value={startdate}
          ref={register({ required: true })}
          onChange={(e) => setstartdate(e.target.value)}
          type="date"
          className="form-control"
          name="startdate"
        />
        {errors.starttime && (
          <span className=" form-error text-danger mb-2">
            This field is required
          </span>
        )}
      </div>
      <div className="mb-3">
        <div className="form-check form-switch ">
          <label htmlFor="allday" className="form-check-label mr-5">
            All Day
          </label>
          <input
            value={allday}
            checked={allday}
            onChange={(e) => setallday(e.target.checked)}
            className="form-check-input"
            type="checkbox"
            name="allday"
          />
        </div>
      </div>
      {!allday && (
        <div className="row">
          <div className="mb-3 col-sm-6">
            <label className="form-label">Start Time</label>
            <input
              value={starttime}
              ref={register({ required: true })}
              onChange={(e) => setstarttime(e.target.value)}
              type="time"
              className="form-control"
              name="starttime"
            />
            {errors.starttime && (
              <span className=" form-error text-danger mb-2">
                This field is required
              </span>
            )}
          </div>
          <div className="mb-3 col-sm-6">
            <label className="form-label">End Time</label>
            <input
              value={endtime}
              ref={register({ required: true })}
              onChange={(e) => setendtime(e.target.value)}
              type="time"
              className="form-control"
              name="endtime"
            />
            {errors.endtime && (
              <span className=" form-error text-danger mb-2">
                This field is required
              </span>
            )}
          </div>
        </div>
      )}
      <div className="mb-3">
        <button disabled={loading} className="btn blue__btn">
          {loading && (
            <span className="spinner-border spinner-border-sm"></span>
          )}
          {isEdit ? "Save Changes" : "Add"}
        </button>
      </div>
    </form>
  );
}

export default CalendarForm;
