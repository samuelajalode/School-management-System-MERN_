import React from 'react'

function SearchPayrow() {
    return (
        <form  className="mb-5 content__container">
            <div className="row g-3">
                <div className="col">
                    <input 
                    type="text" 
                    name="staffID" 
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
                    <input 
                    type="text" 
                    name="name" 
                    className="form-control py-4" 
                    placeholder="Search by Staff Type" 
                    aria-label="Last name"/>
                </div>
                <div className="col">
                    <input 
                    type="text" 
                    name="name" 
                    className="form-control py-4" 
                    placeholder="Search by Status" 
                    aria-label="Last name"/>
                </div>
                <div className="col">
                    <button type="submit" className="btn blue__btn">Search</button>
                </div>
            </div>
        </form>
    )
}

export default SearchPayrow
