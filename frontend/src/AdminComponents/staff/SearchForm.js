import React from 'react'

function Search() {
    return (
        <form  className="mb-5">
            <div className="row g-3">
                <div className="col">
                    <input 
                    type="text" 
                    name="studentID" 
                    className="form-control py-4" 
                    placeholder="Search by Staff ID" 
                    aria-label="First name"/>
                </div>
                <div className="col">
                    <input 
                    type="text" 
                    name="name" 
                    className="form-control py-4" 
                    placeholder="Search by Name" 
                    aria-label="Last name"/>
                </div>
                <div className="col">
                    <button type="submit" className="btn blue__btn">Search</button>
                </div>
            </div>
        </form>
    )
}

export default Search
