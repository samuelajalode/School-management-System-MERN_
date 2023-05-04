import React from "react";

function Search({
  yearGroup,
  academicYear,
  setacademicYear,
  term,
  setterm,
  loading,
  handleSearch,
}) {
  return (
    <form action="" className="content__container">
      <h3>Search</h3>
      <div className="mb-3">
        <label htmlFor="name" className="col-form-label">
          Academic Year
        </label>
        <div className="">
          <select
            name="academic-calendar"
            className="form-select"
            value={academicYear}
            onChange={(e) => setacademicYear(e.target.value)}
          >
            <option defaultValue hidden>
              Choose...
            </option>
            {yearGroup.length > 0 ? (
              yearGroup.map((e) => (
                <option key={e._id} value={e.year}>
                  {e.year}
                </option>
              ))
            ) : (
              <option disabled>No data</option>
            )}
          </select>
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="name" className="col-form-label">
          Term
        </label>
        <div className="">
          <select
            name="academic-calendar"
            className="form-select"
            value={term}
            onChange={(e) => setterm(e.target.value)}
          >
            <option defaultValue hidden>
              Choose...
            </option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </div>
      </div>
      <div className="">
        <button
          onClick={handleSearch}
          disabled={loading}
          type="submit"
          className="btn blue__btn"
        >
          {loading && (
            <span
              className="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
          )}
          {"Search"}
        </button>
      </div>
    </form>
  );
}

export default Search;
