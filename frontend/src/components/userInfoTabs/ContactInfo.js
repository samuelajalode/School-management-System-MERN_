import React from 'react'

function ContactInfo({user}) {
    return (
        <div>
             <div className="row  mb-3">
                <div className="col-4">Telephone Number: </div>
                <div className="col-6">{user?.telephone || "N/A"}</div>
            </div>
            <div className="row  mb-3">
                <div className="col-4">Mobile Number: </div>
                <div className="col-6">{user?.mobilenumber || "N/A"}</div>
            </div>
            <div className="row  mb-3">
                <div className="col-4">Area of Residence: </div>
                <div className="col-6">{user?.physicalAddress || "N/A"} </div>
            </div>
            <div className="row  mb-3">
                <div className="col-4">Postal Address</div>
                <div className="col-6">{user?.postalAddress || "N/A"} </div>
            </div>
        </div>
    )
}

export default ContactInfo
