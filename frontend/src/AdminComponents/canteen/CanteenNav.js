import React from 'react'
import {NavLink} from 'react-router-dom'

function CanteenNav() {
    return (
        <div className="d-flex xs-flex-column sm-flex-row justify-content-end">
            <NavLink  activeStyle={{ color: '#ffa201' }} className="btn" to="/canteen/members/register">Add  Canteen Member </NavLink>
            <NavLink activeStyle={{ color: '#ffa201' }} className="btn" to="/canteen/members">All Members</NavLink>
            <NavLink activeStyle={{ color: '#ffa201' }} className="btn" to="/canteen/payments/plan">Payments Plan</NavLink>
            <NavLink activeStyle={{ color: '#ffa201' }} className="btn" to="/canteen/payments/add">Make Payment</NavLink>
            <NavLink activeStyle={{ color: '#ffa201' }} className="btn" to="/canteen/payments">All Payments</NavLink>
            
        </div>
    )
}

export default CanteenNav
