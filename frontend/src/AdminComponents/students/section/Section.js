import React, { useState, useEffect } from "react";
import AddSection from "./AddSection";
import ListSection from "../../shared/ListTable";
import EditSection from "./EditSection";
import axios from "../../../store/axios";
import { errorAlert, successAlert } from "../../../utils";
import { useDispatch } from "react-redux";
import { setSections } from "../../../store/slices/schoolSlice";

const tableHeader = [
  { id: "_id", name: "ID" },
  { id: "name", name: "Section" },
  { id: "createdAt", name: "Added" },
];

function Sections() {
  const [openEdit, setopenEdit] = useState(false);
  const [name, setname] = useState("");
  const [editname, seteditname] = useState("");
  const [id, setid] = useState("");
  const [loading, setloading] = useState(false);
  const [createLoading, setcreateLoading] = useState(false);
  const [dataloading, setdataloading] = useState([]);
  const [sections, setsections] = useState([]);
  const dispatch = useDispatch();

  const handleDelete = (delID) => {
    setloading(true);
    axios
      .delete(`/sections/delete/${delID}`)
      .then(async (res) => {
        setloading(false);
        if (res.data.error) {
          errorAlert(res.data.error);
          return 0;
        }
        setsections(sections.filter((i) => i._id !== delID));
        dispatch(setSections(sections.filter((i) => i._id !== delID)));
        await axios.post("/activitylog/create", {
          activity: `section ${id} was deleted`,
          user: "admin",
        });
      })
      .catch((err) => {
        setloading(false);
        console.log(err);
        errorAlert("something when wrong");
      });
  };

  const handleEdit = (editID) => {
    setopenEdit(true);
    let editSections = sections.find((e) => e._id === editID);
    seteditname(editSections?.name);
    setid(editID);
  };
  const onEdit = () => {
    setloading(true);
    axios
      .put(`/sections/update/${id}`, { name: editname })
      .then(async (res) => {
        setloading(false);
        if (res.data.error) {
          errorAlert(res.data.error);
          return 0;
        }
        setsections(sections.map((i) => (i._id === id ? res.data?.doc : i)));
        dispatch(
          setSections(sections.map((i) => (i._id === id ? res.data?.doc : i)))
        );
        await axios.post("/activitylog/create", {
          activity: `section ${editname} was edited`,
          user: "admin",
        });
        setopenEdit(false);
      })
      .catch((err) => {
        setloading(false);
        console.log(err);
        errorAlert("something when wrong");
      });
  };

  useEffect(() => {
    setdataloading(true);
    axios.get("/sections").then((res) => {
      setdataloading(false);
      console.log(res.data);
      setsections(res.data);
    });
  }, []);

  const handleAddSection = (e) => {
    e.preventDefault();
    setcreateLoading(true);
    axios
      .post("/sections/create", { name })
      .then(async (res) => {
        console.log("submited");
        console.log(res);
        setcreateLoading(false);
        if (res.data.error) {
          errorAlert("something when wrong");
          return 0;
        }
        successAlert("successfully created");
        setsections([res.data.doc, ...sections]);
        dispatch(setSections([res.data.doc, ...sections]));
        await axios.post("/activitylog/create", {
          activity: `section ${name} was added`,
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

  return (
    <div>
      <h3>Sections</h3>
      <div className="row">
        <div className="col-sm-12 mb-5">
          <AddSection
            loading={createLoading}
            name={name}
            setname={setname}
            onSubmit={handleAddSection}
          />
        </div>
        <div className="col-sm-12">
          <ListSection
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            loading={dataloading}
            data={sections}
            tableHeader={tableHeader}
          />
        </div>
      </div>
      <EditSection
        open={openEdit}
        loading={loading}
        setopen={setopenEdit}
        name={editname}
        setname={seteditname}
        onSubmit={onEdit}
      />
    </div>
  );
}

export default Sections;
