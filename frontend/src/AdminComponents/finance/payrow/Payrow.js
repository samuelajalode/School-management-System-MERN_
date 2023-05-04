import React, { useState, useEffect } from "react";
import EditIcon from "@material-ui/icons/Edit";
import { IconButton } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import axios from "../../../store/axios";
import Edit from "./EditPayrow";
import { selectUser } from "../../../store/slices/userSlice";
import { useSelector } from "react-redux";
import { errorAlert, successAlert, currentCurrency } from "../../../utils";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

function PaymentPlan() {
  const user = useSelector(selectUser);
  const [planData, setplanData] = useState([]);
  const [openEditService, setopenEditService] = useState(false);
  const [openAddService, setopenAddService] = useState(false);
  const [name, setname] = useState("");
  const [editID, seteditID] = useState("");
  const [loading, setloading] = useState(false);
  const [allowance, setallowance] = useState("");
  const [bonus, setbonus] = useState("");
  const [salary, setsalary] = useState("");

  useEffect(() => {
    axios.get("/payrow").then((res) => {
      setplanData(res.data);
    });
  }, []);

  let sign = currentCurrency();

  const handleAddPlans = () => {
    setloading(true);
    axios
      .post("/payrow/add", {
        name,
        salary,
        allowance,
        bonus,
      })
      .then(async (res) => {
        if (res.data.error) {
          errorAlert(res.data.error);
          return 0;
        }
        setloading(false);
        setopenAddService(false);
        setsalary("");
        setallowance("");
        setbonus("");
        setname("");
        successAlert("Changes Saved");
        setplanData([res.data.doc, ...planData]);
        await axios.post("/activitylog/create", {
          activity: ` ${name} payrow was created`,
          user: "admin",
        });
      })
      .catch(() => {
        setloading(false);
        errorAlert("Changes failed to save");
      });
  };

  const handleClickEditOpen = (id) => {
    setopenEditService(true);
    let pay = planData?.find((e) => e._id === id);
    setsalary(pay?.salary);
    setallowance(pay?.allowance);
    setbonus(pay?.bonus);
    setname(pay?.name);
    seteditID(id);
  };

  const handleEditService = () => {
    setloading(true);
    axios
      .put(`/payrow/update/${editID}`, {
        salary,
        allowance,
        bonus,
      })
      .then(async (res) => {
        setloading(false);
        if (res.data.error) {
          errorAlert(res.data.error);
          return 0;
        }
        setopenEditService(false);
        setsalary("");
        setallowance("");
        setbonus("");
        setname("");
        successAlert("Changes Saved");
        let newData = planData;
        let index = planData.findIndex((e) => e._id === editID);
        newData[index] = res.data.doc;
        setplanData(newData);
        await axios.post("/activitylog/create", {
          activity: ` ${name} payrow was edited`,
          user: "admin",
        });
      })
      .catch((err) => {
        setloading(false);
        console.log(err);
        errorAlert("Changes failed to save");
      });
  };

  const handleDeletePlan = (id) => {
    axios
      .delete(`/payrow/delete/${id}`)
      .then((res) => {
        if (res.data.error) {
          errorAlert(res.data.error);
          return 0;
        }
        setplanData(planData.filter((e) => e._id !== id));
      })
      .catch((err) => {
        console.log(err);
        errorAlert("Delete failed");
      });
  };

  return (
    <div>
      <h3 className="my-5">Staff Roles and Payrow Details</h3>
      <table className="table content__container">
        <thead>
          <tr>
            <th scope="col">
              <h4>Staff Position</h4>
              <p>
                {" "}
                <small> Available position in the school </small>
              </p>
            </th>
            <th>
              <h5>
                <strong> Salary ({sign})</strong>
              </h5>
            </th>
            <th>
              <h5>
                <strong> Allowance ({sign})</strong>
              </h5>
            </th>
            <th>
              <h5>
                <strong> Bonus ({sign})</strong>
              </h5>
            </th>
            {user?.role === "admin" && (
              <th>
                <h5>Action</h5>
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {planData &&
            planData.map((plan) => (
              <tr key={plan._id}>
                <th scope="row">{plan?.name}</th>
                <td>{plan?.salary}</td>
                <td>{plan?.allowance}</td>
                <td>{plan?.bonus}</td>
                {user?.role === "admin" && (
                  <td className="d-flex">
                    <IconButton onClick={() => handleClickEditOpen(plan?._id)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDeletePlan(plan?._id)}>
                      <DeleteForeverIcon />
                    </IconButton>
                  </td>
                )}
              </tr>
            ))}
          <tr>
            <th colSpan="4">Add Additional Position</th>
            <th>
              <IconButton onClick={() => setopenAddService(true)}>
                <AddIcon />
              </IconButton>
            </th>
          </tr>
        </tbody>
      </table>

      {/* edit */}
      <Edit
        open={openEditService}
        loading={loading}
        salary={salary}
        setsalary={setsalary}
        bonus={bonus}
        name={name}
        setname={setname}
        allowance={allowance}
        setallowance={setallowance}
        setbonus={setbonus}
        setOpen={setopenEditService}
        onSubmit={handleEditService}
      />

      {/* add new */}
      <Edit
        name={name}
        loading={loading}
        setname={setname}
        allowance={allowance}
        setallowance={setallowance}
        open={openAddService}
        salary={salary}
        bonus={bonus}
        setbonus={setbonus}
        setsalary={setsalary}
        isAdd={true}
        setOpen={setopenAddService}
        onSubmit={handleAddPlans}
      />
    </div>
  );
}

export default PaymentPlan;
