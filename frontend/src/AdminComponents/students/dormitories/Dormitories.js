import React, { useState, useEffect } from "react";
import AddDormitories from "./AddDormitories";
import DormitoryList from "../../shared/ListTable";
import axios from "../../../store/axios";
import Edit from "./DormitoriesModal";
import { errorAlert, successAlert } from "../../../utils";
import { useDispatch } from "react-redux";
import { setDormitories } from "../../../store/slices/schoolSlice";

const tableHeader = [
  { id: "_id", name: "ID" },
  { id: "name", name: "Name" },
  { id: "createdAt", name: "Added" },
];

function Dormitories() {
  const [dormitories, setdormitories] = useState([]);
  const [open, setopen] = useState(false);
  const [name, setname] = useState("");
  const [editname, seteditname] = useState("");
  const [loading, setloading] = useState(false);
  const [editID, seteditID] = useState();
  const [createLoading, setcreateLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get("/dormitories").then((res) => {
      setdormitories(res?.data);
    });
  }, []);

  const handleDelete = (id) => {
    setloading(true);
    axios
      .delete(`/dormitories/delete/${id}`)
      .then(async (res) => {
        setloading(false);
        if (res.data.error) {
          errorAlert(res.data.error);
          return 0;
        }
        setdormitories(dormitories.filter((i) => i._id !== id));
        dispatch(setDormitories(dormitories.filter((i) => i._id !== id)));
        await axios.post("/activitylog/create", {
          activity: `dormitory ${id} was deleted`,
          user: "admin",
        });
      })
      .catch((err) => {
        setloading(false);
        console.log(err);
        errorAlert("something when wrong");
      });
  };

  const handleCreate = (e) => {
    e.preventDefault();
    setcreateLoading(true);
    axios
      .post("/dormitories/create", { name })
      .then(async (res) => {
        console.log("submited");
        console.log(res);
        setcreateLoading(false);
        if (res.data.error) {
          errorAlert("something when wrong");
          return 0;
        }
        successAlert("successfully created");
        console.log(res.data.doc);
        setdormitories([res.data.doc, ...dormitories]);
        dispatch(setDormitories([res.data.doc, ...dormitories]));
        await axios.post("/activitylog/create", {
          activity: `dormitory ${name} was added`,
          user: "admin",
        });
        setname("");
      })
      .catch((err) => {
        setcreateLoading(false);
        console.log(err);
        errorAlert("something when wrong");
      });
  };

  const handleEdit = (id) => {
    setopen(true);
    let editdormitory = dormitories.find((e) => e._id === id);
    seteditname(editdormitory?.name);
    seteditID(editdormitory?._id);
  };

  const onEdit = () => {
    setloading(true);
    axios
      .put(`/dormitories/update/${editID}`, { name: editname })
      .then(async (res) => {
        setloading(false);
        if (res.data.error) {
          errorAlert(res.data.error);
          return 0;
        }
        // let oldArray = dormitories.filter((dorm) => dorm._id !== editID);
        setdormitories(
          dormitories.map((i) => (i._id === editID ? res.data.docs : i))
        );
        dispatch(
          setDormitories(
            dormitories.map((i) => (i._id === editID ? res.data.docs : i))
          )
        );
        await axios.post("/activitylog/create", {
          activity: `dormitory ${name} was edited`,
          user: "admin",
        });
        seteditname("");
        setopen(false);
      })
      .catch((err) => {
        setloading(false);
        errorAlert("something when wrong");
      });
  };

  return (
    <div className="dormitories__page">
      <h3>Dormitories</h3>
      <div className="row">
        <div className="col-sm-12 mb-5">
          <AddDormitories
            name={name}
            setname={setname}
            loading={createLoading}
            onSubmit={handleCreate}
          />
        </div>
        <div className="col-sm-12 ">
          <DormitoryList
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            data={dormitories}
            tableHeader={tableHeader}
          />
        </div>
      </div>
      <Edit
        open={open}
        setopen={setopen}
        name={editname}
        setname={seteditname}
        onSubmit={onEdit}
        loading={loading}
      />
    </div>
  );
}

export default Dormitories;
