import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "../../store/axios";
import CanteenNav from "./CanteenNav";
import { errorAlert, successAlert } from "../../utils";

function EditMember() {
  const [name, setname] = useState("");
  const [paymentMethod, setpaymentMethod] = useState("");
  const [loading, setloading] = useState(false);
  const [paymentPlan, setpaymentPlan] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    axios.get(`/canteen/${id}`).then((res) => {
      if (res.data.error) {
        console.log(res.data.error);
        return 0;
      }
      const member = res.data.user;
      setname(member?.name);
      setpaymentMethod(member?.paymentMethod);
    });
  }, [id]);

  useEffect(() => {
    axios.get("/paymentplan").then((res) => {
      setpaymentPlan(res.data?.plans);
      console.log(res.data);
    });
  }, []);

  const handleEdit = (e) => {
    e.preventDefault();
    setloading(true);
    axios
      .put(`/canteen/update/${id}`, { paymentMethod, name })
      .then((res) => {
        setloading(false);
        if (res.data.error) {
          errorAlert(res.data.error);
          return 0;
        }
        successAlert("Successfully edited");
      })
      .catch(() => {
        setloading(false);
        errorAlert("something went wrong");
      });
  };

  return (
    <div>
      <CanteenNav />
      <h3>Edit Canteen Member {id}</h3>
      <form className="content__container">
        <div className="col-md-6 mb-4">
          <label className="form-label">Name</label>
          <input
            type="text"
            value={name}
            readOnly
            //onChange={e => setname(e.target.value)}
            className="form-control"
            name="name"
          />
        </div>
        <div className="col-md-8 mb-3">
          <label className="form-label">Select Payment Method</label>
          <label className="form-label">
            Select Payment Plan{" "}
            <a href="/canteen/payments/plan">View Payment Plans available</a>
          </label>
          <select
            onChange={(e) => setpaymentMethod(e.target.value)}
            name="paymentMethod"
            className="form-select"
          >
            <option defaultValue hidden>
              Choose...
            </option>
            {paymentPlan.length > 0 ? (
              paymentPlan.map((e) => (
                <option key={e._id} value={e.plan}>
                  {e.name}
                </option>
              ))
            ) : (
              <option disabled>no data yet</option>
            )}
          </select>
        </div>
        <div>
          <button
            disabled={loading}
            onClick={handleEdit}
            className="btn blue__btn"
          >
            {loading && (
              <span
                className="spinner-border spinner-border-sm"
                role="status"
              ></span>
            )}
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditMember;
