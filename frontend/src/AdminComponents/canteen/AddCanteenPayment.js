import React, { useState, useEffect } from "react";
import AddForm from "./CanteenForm";
import Nav from "./CanteenNav";
import Payments from "./MemberPayments";
import axios from "../../store/axios";
import { errorAlert, successAlert } from "../../utils";

function AddCanteenPayment() {
  const [studentID, setstudentID] = useState("");
  const [members, setmembers] = useState([]);
  const [member, setmember] = useState({});
  const [amount, setamount] = useState("");
  const [loading, setloading] = useState(false);
  const [planPrice, setplanPrice] = useState("");
  const [planName, setplanName] = useState("");
  const [paymentPlan, setpaymentPlan] = useState([]);

  useEffect(() => {
    axios.get("/canteen").then((res) => {
      setmembers(res.data);
    });
  }, []);

  useEffect(() => {
    axios.get("/paymentplan").then((res) => {
      ///console.log(res.data);
      setpaymentPlan(res.data?.plans);
    });
  }, []);

  const handleSelectuser = (id) => {
    let selectedmember = members.find((e) => e.memberID === id);
    setmember(selectedmember);
    let price = paymentPlan.find(
      (e) => e.plan === selectedmember?.paymentMethod
    );
    setplanPrice(price?.price);
    setplanName(price?.name);
    setstudentID(id);
  };

  const handleAdd = () => {
    setloading(true);
    axios
      .put(`/canteen/payment/${studentID}`, {
        amount,
        covers: amount / planPrice,
      })
      .then((res) => {
        setloading(false);
        if (res.data.error) {
          errorAlert(res.data.error);
        }
        successAlert("Payment succefully recorded");
        setamount("");
        setmember(res.data.doc);
      })
      .catch((err) => {
        errorAlert("Payment Failed");
        console.log(err);
        setloading(false);
      });
  };

  return (
    <>
      <Nav />
      <h3>Add Canteen Payment </h3>
      <div className="mb-5 row">
        <div className="col-sm-6  content__container">
          <div className="mb-5">
            <label className="form-label"> Select Canteen Member</label>
            <select
              onChange={(e) => handleSelectuser(e.target.value)}
              className="form-select"
            >
              <option defaultValue hidden>
                Choose...
              </option>
              {members?.length > 0 ? (
                members?.map((e) => (
                  <option key={e.memberID} value={e.memberID}>
                    {e.name} {e.memberID}
                  </option>
                ))
              ) : (
                <option disabled>No members yet</option>
              )}
            </select>
          </div>
          <AddForm
            studentID={studentID}
            setstudentID={handleSelectuser}
            handleAdd={handleAdd}
            loading={loading}
            planPrice={planPrice}
            amount={amount}
            setamount={setamount}
          />
        </div>
        <div className="col-sm-6">
          {planPrice && <Payments planName={planName} member={member} />}
        </div>
      </div>
    </>
  );
}

export default AddCanteenPayment;
