import React, { useState, useEffect } from "react";
import Notice from "./Notices";
import CreateNotice from "./CreatNotice";
import axios from "../../store/axios";
import {} from "../../store/slices/schoolSlice";
import { errorAlert, successAlert } from "../../utils";

function NotificationsPage() {
  const [notices, setnotices] = useState([]);
  const [storeData, setstoreData] = useState([]);
  const [title, settitle] = useState("");
  const [date, setdate] = useState("");
  const [createdBy, setcreatedBy] = useState("");
  const [description, setdescription] = useState("");
  const [loading, setloading] = useState("");
  const [searchDate, setsearchDate] = useState("");
  const [searchTitle, setsearchTitle] = useState("");
  const [openEdit, setopenEdit] = useState(false);

  //edit
  const [editTitle, seteditTitle] = useState("");
  const [editDescription, seteditDescription] = useState("");
  const [editDate, seteditDate] = useState("");
  const [editCreatedBy, seteditCreatedBy] = useState("");
  const [editloading, seteditloading] = useState(false);
  const [editID, seteditID] = useState("");

  useEffect(() => {
    axios.get("/notification").then((res) => {
      setnotices(res.data);
      console.log(res.data);
      setstoreData(res.data);
    });
  }, []);

  const handleEditNotice = () => {
    seteditloading(true);
    axios
      .put(`/notification/update/${editID}`, {
        title: editTitle,
        date: editDate,
        createdBy: editCreatedBy,
        description: editDescription,
      })
      .then((res) => {
        seteditloading(false);
        if (res.data.error) {
          errorAlert(res.data.error);
          return 0;
        }
        successAlert("Notice successfully edited");
        seteditTitle("");
        seteditDate("");
        seteditCreatedBy("");
        seteditDescription("");
        setopenEdit(false);
        let arr = notices.filter((e) => e._id !== editID);
        setnotices([res.data.doc, ...arr]);
      })
      .catch((err) => {
        console.log(err);
        seteditloading(false);
        errorAlert("Failed to create");
      });
  };

  const handleDelete = (e) => {
    e.preventDefault();
    axios
      .delete(`/notification/delete/${editID}`)
      .then((res) => {
        if (res.data.error) {
          errorAlert(res.data.error);
          return 0;
        }
        setnotices(notices.filter((e) => e._id !== editID));
        successAlert("Notice deleted");
      })
      .catch((err) => {
        errorAlert("Failed to delete");
      });
  };

  const handleCreate = () => {
    setloading(true);
    axios
      .post("/notification/create", {
        title,
        date,
        createdBy,
        description,
      })
      .then((res) => {
        setloading(false);
        if (res.data.error) {
          errorAlert(res.data.error);
          return 0;
        }
        successAlert("Notice created");
        settitle("");
        setdate("");
        setcreatedBy("");
        setdescription("");
        setnotices([res.data.doc, ...notices]);
      })
      .catch((err) => {
        console.log(err);
        setloading(false);
        errorAlert("Failed to create");
      });
  };

  const handleReset = (e) => {
    e.preventDefault();
    setsearchTitle("");
    setsearchDate("");
    setnotices(storeData);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (title || date) {
      let newNotices = [];
      if (title) {
        newNotices = storeData.filter(
          (i) =>
            i.title.toLowerCase().includes(searchTitle.toLowerCase()) ||
            i.description.toLowerCase().includes(searchTitle.toLowerCase())
        );
      }
      if (date) {
        newNotices = storeData.filter(
          (i) => new Date(i.createdAt).toISOString().slice(0, 10) === date
        );
      }

      setnotices(newNotices);
    } else {
      setnotices(storeData);
    }
  };

  const editData = {
    date: editDate,
    setdate: seteditDate,
    loading: editloading,
    handleCreate: handleEditNotice,
    title: editTitle,
    settitle: seteditTitle,
    description: editDescription,
    setdescription: seteditDescription,
    createdby: editCreatedBy,
    setcreatedby: seteditCreatedBy,
    seteditID: seteditID,
  };

  return (
    <div>
      <h3 className="mb-3">Notice Board</h3>
      <CreateNotice
        date={date}
        setdate={setdate}
        loading={loading}
        handleCreate={handleCreate}
        title={title}
        settitle={settitle}
        description={description}
        setdescription={setdescription}
        createdby={createdBy}
        setcreatedby={setcreatedBy}
      />
      <div id="notifications">
        <Notice
          searchDate={searchDate}
          openEdit={openEdit}
          handleReset={handleReset}
          setopenEdit={setopenEdit}
          handleSearch={handleSearch}
          setsearchDate={setsearchDate}
          searchTitle={searchTitle}
          setsearchTitle={setsearchTitle}
          notices={notices}
          handleDelete={handleDelete}
          editData={editData}
        />
      </div>
    </div>
  );
}

export default NotificationsPage;
