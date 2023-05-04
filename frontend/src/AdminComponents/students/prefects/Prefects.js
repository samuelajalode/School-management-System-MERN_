import React, { useState, useEffect } from "react";
import AddPrefect from "./AddPrefect";
import PrefectsList from "../../shared/ListTable";
import axios from "../../../store/axios";
import { errorAlert, successAlert } from "../../../utils";
import EditModel from "./EditPrefects";

const tableHeader = [
  { id: "userID", name: "Student ID" },
  { id: "name", name: "name" },
  { id: "position", name: "Position" },
  { id: "startYear", name: "From" },
  { id: "endYear", name: "To" },
];

const min = new Date().getFullYear();
const max = min + 20;

const yearArray = () => {
  let arr = [];
  for (let index = min; index < max; index++) {
    arr.push(index);
  }
  return arr;
};

function Prefects() {
  const [name, setname] = useState("");
  const [userID, setuserID] = useState("");
  const [position, setposition] = useState("");
  const [open, setopen] = useState(false);
  const [loading, setloading] = useState("");
  const [startYear, setstartYear] = useState(min);
  const [endYear, setendYear] = useState("");
  const [editloading, seteditloading] = useState("");
  const [editname, seteditname] = useState("");
  const [edituserID, setedituserID] = useState("");
  const [editposition, seteditposition] = useState("");
  const [editendYear, seteditendYear] = useState("");
  const [prefects, setprefects] = useState([]);
  const [editid, seteditid] = useState("");
  const [dataloading, setdataloading] = useState(false);

  useEffect(() => {
    setdataloading(true);
    axios.get("/prefects").then((res) => {
      setdataloading(false);
      setprefects(res?.data);
    });
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`/prefects/delete/${id}`)
      .then((res) => {
        setloading(false);
        if (res.data.error) {
          errorAlert(res.data.error);
          return 0;
        }
        setprefects(prefects.filter((i) => i._id !== id));
      })
      .catch((err) => {
        console.log(err);
        errorAlert("something when wrong");
      });
  };

  const handleedit = (id) => {
    let selecteduser = prefects.find((e) => e._id === id);
    seteditname(selecteduser?.name);
    setopen(true);
    seteditendYear(selecteduser?.endYear);
    seteditposition(selecteduser?.position);
    setedituserID(selecteduser?.userID);
    seteditid(id);
  };

  const handleAdd = () => {
    setloading(true);
    axios
      .post("/prefects/add", {
        name,
        userID,
        position,
        startYear: min,
        endYear,
      })
      .then(async (res) => {
        setloading(false);
        if (res.data.error) {
          errorAlert(res.data.error);
          return 0;
        }
        successAlert("New Prefect successfully added");
        setname("");
        setuserID("");
        setposition("");
        setstartYear("");
        setendYear("");
        setprefects([res.data.doc, ...prefects]);
        await axios.post("/activitylog/create", {
          activity: `prefect  ${name} was added`,
          user: "admin",
        });
      })
      .catch((err) => {
        console.log(err);
        setloading(false);
        errorAlert("Failed to add");
      });
  };

  const onEdit = () => {
    seteditloading(true);
    axios
      .put(`/prefects/update/${edituserID}`, {
        name: editname,
        posistion: editposition,
        endYear: editendYear,
        userID: edituserID,
      })
      .then(async (res) => {
        seteditloading(false);
        if (res.data.error) {
          errorAlert(res.data.error);
          return 0;
        }
        successAlert(" Prefect successfully edited");
        seteditname("");
        setopen(false);
        setedituserID("");
        seteditposition("");
        setendYear("");
        let filteredData = prefects.filter((e) => e._id !== editid);
        setprefects([res.data.doc, ...filteredData]);
        await axios.post("/activitylog/create", {
          activity: `prefect  ${name}  was edited`,
          user: "admin",
        });
      })
      .catch((err) => {
        console.log(err);
        seteditloading(false);
        errorAlert("Failed to edit");
      });
  };

  return (
    <div className="dormotories__page">
      <h3>Prefects</h3>
      <div className="row">
        <div className="col-sm-12 col-md-5">
          <AddPrefect
            name={name}
            setname={setname}
            userID={userID}
            yearOptions={yearArray()}
            loading={loading}
            startYear={startYear}
            endYear={endYear}
            setstartYear={setstartYear}
            setendYear={setendYear}
            setuserID={setuserID}
            handleAdd={handleAdd}
            posistion={position}
            setposition={setposition}
          />
        </div>
        <div className="col-sm-12 col-md-7">
          <PrefectsList
            handleEdit={handleedit}
            loading={dataloading}
            noData="No prefects yet"
            handleDelete={handleDelete}
            data={prefects}
            tableHeader={tableHeader}
          />
        </div>
      </div>
      <EditModel
        onEdit={onEdit}
        open={open}
        setopen={setopen}
        name={editname}
        loading={editloading}
        setname={seteditname}
        setendYear={seteditendYear}
        endYear={editendYear}
        position={editposition}
        setposition={seteditposition}
        userID={edituserID}
        setuserID={setedituserID}
        yearOptions={yearArray()}
      />
    </div>
  );
}

export default Prefects;
