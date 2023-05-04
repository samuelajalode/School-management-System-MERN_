import React from 'react'

function SearchAttendance() {
    return (
        <form  className="mb-5 content__container">
        <h3 className="mb-3">Staff Attendance</h3>
        <div className="row g-3 mb-3">
            <div className="col-xs-12 col-sm-6 col-md-4">
                <label htmlFor="">Search by Department</label>
                <select class="form-select form-select-sm py-2" aria-label=".form-select-sm example">
                    <option disabled hidden selected>Select Class</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                </select>
            </div>
            <div className="col-xs-12 col-sm-6 col-md-4">
               <label htmlFor="">Select by Positon</label>
                <select class="form-select form-select-sm py-2" aria-label=".form-select-sm example">
                    <option disabled hidden selected>Select Section</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                </select>
            </div>
            <div className="col-xs-12 col-sm-6 col-md-4">  
                <label htmlFor="">Select Month</label>
                <select class="form-select form-select-sm py-2" aria-label=".form-select-sm example">
                    <option disabled hidden selected>Select Section</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                </select>
            </div>
        </div>
        <div className="row g-3 ">
            <button className="btn orange__btn col-3 mr-3 mb-3">Search</button>
            <button className="btn blue__btn col-3  mr-3 mb-3">Reset</button>
        </div>
    </form>
    )
}

export default SearchAttendance
