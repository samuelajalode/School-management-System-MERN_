import React, { useState, useEffect } from "react";
import axios from "../../store/axios";
import Table from "../shared/ListTable";
import EditForm from "./EditUsers";
import AddForm from "./AddUser";
import { errorAlert, successAlert } from "../../utils";

const tableHeader = [
  { id: "username", name: "Username" },
  { id: "type", name: "User Type" },
  { id: "lastlogin", name: "Last Login" },
  { id: "createdAt", name: "CreatedAt" },
];

function ManageUsers() {
  const [users, setusers] = useState([]);
  const [openAdd, setopenAdd] = useState(false);
  const [openEdit, setopenEdit] = useState(false);
  const [loadingData, setloadingData] = useState(false);

  //form
  const [type, settype] = useState("");
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [confirmpass, setconfirmpass] = useState("");
  const [loading, setloading] = useState(false);
  const [editID, seteditID] = useState(false);

  const [restrictions, setrestrictions] = useState({
    Students: [
      { name: "New Registration", value: false },
      { name: "View Student Details", value: false },
      { name: "Edit Student", value: false },
      { name: "Student List", value: false },
      { name: "Manage Scholarships", value: false },
      { name: "Record Attendance", value: false },
      { name: "Manage Section", value: false },
      { name: "Manage Campuses", value: false },
      { name: "Manage Dormitories", value: false },
      { name: "Promotions/Demotions", value: false },
      { name: "Prefects", value: false },
      { name: "View Past Students", value: false },
      { name: "View Withdrawn Students", value: false },
      { name: "Delete Student", value: false },
      { name: "Withdraw Student", value: false },
      { name: "Re-enroll withdrawn Student", value: false },
    ],
    Academics: [
      { name: "Manage Divisions", value: false },
      { name: "Manage Classes", value: false },
      { name: "Manage Subjects", value: false },
      { name: "Manage Calendar", value: false },
      { name: "Notes", value: false },
      { name: "SBA", value: false },
      { name: "Year Groups", value: false },
      { name: "Terminal Reports", value: false },
      { name: "Manage Letters / Correspondences", value: false },
    ],
    HR: [
      { name: "Manage Departments", value: false },
      { name: "Add Staff", value: false },
      { name: "View Staff List/Details", value: false },
      { name: "Edit Staff Details", value: false },
      { name: "Staff Payroll", value: false },
      { name: "PAYE Deductions", value: false },
      { name: "Trustee", value: false },
      { name: "SSNIT Contributions", value: false },
      { name: "Staff Bank Details", value: false },
      { name: "PAYE Calculator", value: false },
      { name: "Delete/Archive Staff", value: false },
    ],
    Library: [
      { name: "Books categories", value: false },
      { name: "Books", value: false },
    ],
    Finance: [
      { name: "View Set fees", value: false },
      { name: "Set/Delete Fees", value: false },
      { name: "Prepare Bill", value: false },
      { name: "Bill Payment", value: false },
      { name: "Initiate e-Payment Request", value: false },
      { name: "Non-billable items payment", value: false },
      { name: "View Payments", value: false },
      { name: "Debtors Inventory module (View only)", value: false },
    ],
  });

  useEffect(() => {
    setloadingData(true);
    axios.get("/users").then((res) => {
      setloadingData(false);
      setusers(res.data);
    });
  }, []);

  const handleDelete = (id) => {};

  const handleCheckRole = (e, name) => {
    console.log(e, name);

    setrestrictions(
      Object.entries(restrictions).map((val, arr) =>
        val === e
          ? (restrictions[val] = arr.map((obj) =>
              obj.name === name ? { name, value: !obj.value } : obj
            ))
          : (restrictions[val] = arr)
      )
    );
  };

  const handleEdit = (id) => {
    let selectedUser = users.find((e) => e._id === id);
    settype(selectedUser?.type);
    setusername(selectedUser?.username);
    seteditID(id);
    setopenEdit(true);
  };

  const onEdit = () => {
    setloading(true);
    axios
      .put(`/users/update/${editID}`, {
        type,
        username,
        password,
        restrictions,
      })
      .then((res) => {
        setloading(false);
        if (res.data.error) {
          errorAlert(res.data.error);
          return 0;
        }
        successAlert("successfully save changes");
        setusers(
          users.map((user) => (user._id === editID ? res.data.doc : user))
        );
        settype("");
        setusername("");
        setpassword("");
        setconfirmpass("");
        setopenEdit(false);
      })
      .catch((err) => {
        setloading(false);
        errorAlert("FAILED");
        console.log(err);
      });
  };

  const handleAdd = () => {
    setloading(true);
    axios
      .post("/users/create", {
        type,
        username,
        password,
      })
      .then((res) => {
        setloading(false);
        if (res.data.error) {
          errorAlert(res.data.error);
          return 0;
        }
        successAlert("User successfully added");
        setusers([res.data.doc, ...users]);
        settype("");
        setusername("");
        setpassword("");
        setconfirmpass("");
        setopenAdd(false);
      })
      .catch((err) => {
        setloading(false);
        errorAlert("FAILED");
        console.log(err);
      });
  };

  return (
    <div>
      <div className=" mb-5">
        <div className="d-flex justify-content-between content__container">
          <h4>Staff Users</h4>
          <button onClick={() => setopenAdd(true)} className="btn blue__btn">
            {" "}
            + Add{" "}
          </button>
        </div>
        {loadingData ? (
          <>
            <div className="d-flex justify-content-center content__container">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          </>
        ) : (
          <Table
            data={users.filter((user) => user.type !== "Student")}
            tableHeader={tableHeader}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          ></Table>
        )}
      </div>

      {users.filter((user) => user.type === "Student").length > 0 && (
        <div className=" mb-5">
          <div className="d-flex justify-content-between content__container">
            <h4>Students Users</h4>
            <button onClick={() => setopenAdd(true)} className="btn blue__btn">
              {" "}
              + Add{" "}
            </button>
          </div>
          <Table
            data={users.filter((user) => user.type === "Student")}
            tableHeader={tableHeader}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          ></Table>
        </div>
      )}
      <AddForm
        type={type}
        handleAdd={handleAdd}
        settype={settype}
        setusername={setusername}
        username={username}
        password={password}
        setpassword={setpassword}
        confirmpass={confirmpass}
        setconfirmpass={setconfirmpass}
        open={openAdd}
        loading={loading}
        setOpen={setopenAdd}
      />
      <EditForm
        type={type}
        settype={settype}
        setusername={setusername}
        username={username}
        password={password}
        setpassword={setpassword}
        confirmpass={confirmpass}
        setconfirmpass={setconfirmpass}
        loading={loading}
        open={openEdit}
        handleCheckRole={handleCheckRole}
        onEdit={onEdit}
        setOpen={setopenEdit}
        restrictions={restrictions}
      />
    </div>
  );
}

export default ManageUsers;
