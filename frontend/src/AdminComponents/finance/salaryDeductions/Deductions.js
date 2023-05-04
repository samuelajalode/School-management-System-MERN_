import React, { useEffect, useState } from "react";
import Form from "./Form";
import Table from "../../shared/ListTable";
import axios from "../../../store/axios";
import { useSelector } from "react-redux";
import { selectStaff } from "../../../store/slices/schoolSlice";
import { errorAlert, successAlert, currentCurrency } from "../../../utils";
import Edit from "./Edit";

const tableHeader = [
  { id: "name", name: "Name" },
  { id: "amount", name: `Amount (${currentCurrency()})` },
  { id: "number", name: "Number of Staff" },
];

function Deductions() {
  const [data, setdata] = useState([]);
  const [amount, setamount] = useState("");
  const [name, setname] = useState();
  const [staff, setstaff] = useState([]);
  const [loading, setloading] = useState(false);
  const Allstaff = useSelector(selectStaff);

  //edit
  const [editLoading, seteditLoading] = useState(false);
  const [openEdit, setopenEdit] = useState(false);
  const [editID, seteditID] = useState("");
  const [editname, seteditname] = useState("");
  const [editamount, seteditamount] = useState("");
  const [editstaff, seteditstaff] = useState([]);

  useEffect(() => {
    axios.get("/deductions").then((res) => {
      setdata(
        res.data.map((e) => {
          return {
            ...e,
            number: e.staff?.length,
          };
        })
      );
    });
  }, []);

  const handleSetStaff = (e) => {
    console.log("clicked", e.target.value);
    if (staff.includes(e.target.value)) {
      setstaff(staff.filter((i) => i !== e.target.value));
    } else {
      setstaff([...staff, e.target.value]);
    }
  };

  const handleEditSetStaff = (e) => {
    console.log("clicked", e.target.value);

    if (editstaff.includes(e.target.value)) {
      seteditstaff(editstaff.filter((i) => i !== e.target.value));
    } else {
      seteditstaff([...editstaff, e.target.value]);
    }
    console.log(editstaff);
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      let d = [];
      Allstaff.map((res) => d.push(res?.userID));
      setstaff(d);
    } else {
      setstaff([]);
    }
  };

  const handleSelectAllEdit = (e) => {
    if (e.target.checked) {
      let d = [];
      Allstaff.map((res) => d.push(res?.userID));
      seteditstaff(d);
    } else {
      seteditstaff([]);
    }
  };

  const handleDelete = (id) => {
    axios.delete(`/deductions/delete/${id}`).then((res) => {
      setdata(data.filter((e) => e?._id !== id));
    });
  };

  const handleEdit = (id) => {
    setopenEdit(true);
    let obj = data.find((e) => e._id === id);
    seteditname(obj?.name);
    seteditamount(obj?.amount);
    seteditstaff(obj?.staff);
    seteditID(id);
  };

  const onEdit = () => {
    seteditLoading(true);
    axios
      .put(`/deductions/update/${editID}`, {
        name: editname,
        staff: editstaff,
        amount: editamount,
      })
      .then(async (res) => {
        seteditLoading(false);
        if (res.data.error) {
          return errorAlert(res.data.error);
        }
        successAlert("Successfully save changes");
        let newDoc = {
          ...res.data.doc,
          number: res.data.doc.staff?.length,
        };
        setdata(data.map((doc) => (doc._id === editID ? newDoc : doc)));
        seteditname("");
        seteditamount("");
        seteditstaff([]);
        setopenEdit(false);
        await axios.post("/activitylog/create", {
          activity: `salary deductions was edited`,
          user: "admin",
        });
      });
  };

  const handlesubmit = () => {
    setloading(true);
    axios
      .post(`/deductions/create`, {
        name,
        staff,
        amount,
      })
      .then(async (res) => {
        setloading(false);
        if (res.data.error) {
          return errorAlert(res.data.error);
        }
        successAlert("Successfully added");
        setdata([res.data.doc, ...data]);
        setname("");
        setamount("");
        setstaff([]);
        await axios.post("/activitylog/create", {
          activity: `salary deductions is added`,
          user: "admin",
        });
      });
  };

  return (
    <div>
      <h3 className="mb-3">Salary Deductions</h3>
      <div className="row">
        <div className="col-sm-5">
          <div className="content__container">
            <h5>Add Deduction </h5>
            <Form
              handleSetStaff={handleSetStaff}
              amount={amount}
              handleSelectAll={handleSelectAll}
              Allstaff={Allstaff}
              loading={loading}
              staff={staff}
              setamount={setamount}
              name={name}
              setname={setname}
              onSubmit={handlesubmit}
            />
          </div>
        </div>
        <div className="col-sm-7">
          <div className="">
            <Table
              handleDelete={handleDelete}
              data={data}
              handleEdit={handleEdit}
              tableHeader={tableHeader}
            />
          </div>
        </div>
      </div>
      <Edit
        handleSelectAll={handleSelectAllEdit}
        Allstaff={Allstaff}
        loading={editLoading}
        handleSetStaff={handleEditSetStaff}
        staff={editstaff}
        setamount={seteditamount}
        name={editname}
        setname={seteditname}
        amount={editamount}
        open={openEdit}
        onSubmit={onEdit}
        setOpen={setopenEdit}
      />
    </div>
  );
}

export default Deductions;
