import React, { useState, useEffect } from "react";
import { Avatar } from "@material-ui/core";
import {
  getImgSrc,
  getCapitalize,
  getIntial,
  currentCurrency,
} from "../../utils";
import moment from "moment";
import axios from "../../store/axios";

function MemberPayments({ member, planName }) {
  const [user, setuser] = useState({});

  useEffect(() => {
    axios.get(`/user/${member?.userID}`).then((res) => {
      setuser(res.data.user);
    });
  }, [member]);

  const balance = member.payments.reduce((acc, e) => {
    return Number(acc) + Number(e.amount);
  }, 0);

  return (
    <div className=" content__container">
      <div
        style={{ background: "#051f3e" }}
        className="d-flex flex-column align-items-center p-3 text-light mb-4"
      >
        <Avatar
          src={getImgSrc(user?.profileUrl)}
          style={{ width: "100px", height: "100px" }}
        />
        <h3>
          {getCapitalize(user?.name)} {getIntial(user?.middlename)}{" "}
          {getCapitalize(user?.surname)} - {user?.userID}
        </h3>

        <div>
          <strong>{member?.role} </strong>{" "}
        </div>
        <div>Canteen Membership ID: {member?.memberID}</div>
        <hr />
        <div>
          <strong>
            Payment Plan <span className="text-danger">{planName}</span>{" "}
          </strong>{" "}
        </div>
        <div>Since {moment(member?.date).format("D MMMM  YYYY")} </div>
      </div>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col">Date</th>
            <th scope="col">Months Covered</th>
            <th scope="col">Amount</th>
          </tr>
        </thead>
        <tbody>
          {member?.payments &&
            member?.payments.map((e) => (
              <tr key={e._id}>
                <td>{moment(e?.date).format("D MMMM  YYYY")}</td>
                <td>{e.covers || "-"}</td>
                <td>
                  {currentCurrency()}
                  {e.amount}
                </td>
              </tr>
            ))}
          <tr>
            <td colSpan="2">BALANCE</td>
            <td>
              {currentCurrency()} {balance}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default MemberPayments;
