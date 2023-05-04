import React, { useState, useEffect } from "react";
import axios from "../../store/axios";
import { Link } from "react-router-dom";
import TableList from "../../AdminComponents/shared/ListTable";
import { errorAlert, successAlert } from "../../utils";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/slices/userSlice";
import moment from "moment";
import EditForm from "./ChangeMembership";
import Loading from "../../Loading";

const tableHeader = [
  { id: "date", name: "Date" },
  { id: "amount", name: "Amount ($)" },
];

function Canteen() {
  const [data, setdata] = useState([]);
  const [member, setmember] = useState(null);
  const user = useSelector(selectUser);
  const [classID, setclassID] = useState("");
  const [loading, setloading] = useState(false);
  const [packageID, setpackage] = useState("");
  const [paymentPlan, setpaymentPlan] = useState([]);
  const [openEdit, setopenEdit] = useState(false);

  useEffect(() => {
    axios.get("/paymentplan").then((res) => {
      setpaymentPlan(res.data?.plans);
    });
  }, []);

  useEffect(() => {
    axios
      .get(`/canteen/user/${user?.userID}`)
      .then(async (res) => {
        if (res.data.success) {
          setmember(res.data.user);
          setdata(res.data.user.payments);
          setpackage(res.data.user.paymentMethod);
        } else {
          await axios
            .get(`/students/student/${user?.userID}`)
            .then((response) => {
              setclassID(response?.data?.student);
            });
          setmember(null);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [user]);

  const handleJoin = () => {
    setloading(true);
    axios
      .post("/canteen/create", {
        name: user?.name + " " + user?.lastName,
        userID: user?.id,
        role: user?.role,
        classID,
        paymentMethod: packageID,
      })
      .then((res) => {
        setloading(false);
        if (res.data?.error) {
          errorAlert(res.data.error);
          return 0;
        }
        setmember(res.data?.user);
        successAlert(`member with id ${res.data.user?.memberID}`);
        setpackage("");
      })
      .catch((err) => {
        setloading(false);
        console.log(err);
        errorAlert("Something when wrong");
      });
  };

  const handleSignout = () => {
    axios.delete(`/canteen/delete/${member?.memberID}`).then((res) => {
      if (res.data?.error) {
        errorAlert(res.data?.error);
        return 0;
      }

      setmember(null);
    });
  };

  const handleEdit = () => {
    setloading(true);
    axios
      .put(`/canteen/update/${member?.memberID}`, { paymentMethod: packageID })
      .then((res) => {
        setloading(false);
        if (res.data.error) {
          errorAlert(res.data.error);
          return 0;
        }
        successAlert("Changes saved");
        setmember(res.data.doc);
        setopenEdit(false);
        setpackage(res.data.doc.paymentMethod);
      });
  };

  let plan = paymentPlan?.find((e) => e.plan === member?.paymentMethod);

  return (
    <div>
      {loading && <Loading />}
      {member ? (
        <>
          <div className="d-flex justify-content-end mb-2">
            <Link className="btn orange__btn" to="/finance/canteen/pricing">
              View Canteen Pricing
            </Link>
            <button
              onClick={() => setopenEdit(true)}
              className="btn orange__btn ml-2"
            >
              Change Membership Plan
            </button>
          </div>

          <div className="blue_bg p-3 mb-4">
            <div className="d-flex justify-content-between">
              <div>
                <h4>
                  Membership ID{" "}
                  <span className="orange_color">{member?.memberID}</span>{" "}
                </h4>
                <h6>Join at {moment().format("D MMMM YYYY")}</h6>
                <h6>
                  Payment Plan{" "}
                  <span className="orange_color">{plan?.name}</span>{" "}
                </h6>
              </div>
              <div>
                <button className="btn btn-danger" onClick={handleSignout}>
                  Sign out your membership
                </button>
              </div>
            </div>
          </div>
          <TableList noActions={true} data={data} tableHeader={tableHeader} />
        </>
      ) : (
        <div className="content__container  mt-5">
          <h3 className="mb-3">You are not a canteen member yet</h3>
          <div>
            <a href="/finance/canteen/pricing">View Payment Plans available</a>
          </div>
          <div className=" mb-3">
            <label className="form-label">Select Payment Plan {"  "}</label>
            <select
              onChange={(e) => setpackage(e.target.value)}
              name="class"
              className="form-select"
            >
              <option defaultValue hidden>
                Choose...
              </option>
              {paymentPlan?.length > 0 ? (
                paymentPlan?.map((e) => (
                  <option key={e._id} value={e.plan}>
                    {e.name}
                  </option>
                ))
              ) : (
                <option disabled>no data yet</option>
              )}
            </select>
          </div>
          <button
            onClick={handleJoin}
            disabled={loading}
            className="blue__btn btn"
            to="/canteen/join"
          >
            {loading && (
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
            )}
            Join
          </button>
        </div>
      )}

      <EditForm
        open={openEdit}
        handleEdit={handleEdit}
        loading={loading}
        paymentPlan={paymentPlan}
        setpackage={setpackage}
        setOpen={setopenEdit}
      />
    </div>
  );
}

export default Canteen;
