import React, { useState, useEffect } from "react";
import FileTable from "./NotesTable";
import { Link } from "react-router-dom";
import Search from "../../shared/Search";
import { useHistory } from "react-router-dom";
import axios from "../../../store/axios";
import { errorAlert } from "../../../utils";
import { useSelector } from "react-redux";
import { selectUser } from "../../../store/slices/userSlice";

const tableHead = [
  { id: "date", name: "Added" },
  { id: "topic", name: "Topic" },
  { id: "courseID", name: "Course" },
  { id: "classID", name: "Class" },
  { id: "senderId", name: "Teacher" },
  { id: "file", name: "File" },
];

function Notes() {
  const [subject, setsubject] = useState("");
  const [classID, setclass] = useState("");
  const [teacher, setteacher] = useState("");
  const [notes, setnotes] = useState([]);
  const [storedata, setstoredata] = useState([]);
  const history = useHistory();
  const user = useSelector(selectUser);

  console.log(notes);

  useEffect(() => {
    axios.get("/notes").then((res) => {
      setnotes(res.data);
      setstoredata(res.data);
    });
  }, []);

  const handleReset = (e) => {
    e.preventDefault();
    setteacher("");
    setclass("");
    setsubject("");
    setnotes(storedata);
  };

  const handleEdit = (id) => {
    history.push(`/academics/notes/edit/${id}`);
  };

  const handleDelete = (id) => {
    axios.delete(`/notes/delete/${id}`).then((res) => {
      if (res.data.error) {
        errorAlert(res.data.error);
      }
      setnotes(notes.filter((e) => e._id !== id));
    });
  };

  const searchInputForm = [
    {
      type: "text",
      name: "subject",
      label: "Search by Course",
      value: subject,
      onChange: setsubject,
    },
    {
      type: "text",
      name: "class",
      label: "Search by Class",
      value: classID,
      onChange: setclass,
    },
    {
      type: "text",
      name: "teacher",
      label: "Search by Teacher",
      value: teacher,
      onChange: setteacher,
    },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    let newClasses = [];
    if (classID) {
      newClasses = storedata.filter((i) =>
        i?.classID?.toLowerCase().includes(classID?.toLowerCase())
      );
    }
    if (subject) {
      newClasses = storedata.filter((i) =>
        i?.courseID?.toLowerCase().includes(subject?.toLowerCase())
      );
    }
    if (teacher) {
      newClasses = storedata.filter((i) =>
        i?.senderId?.toLowerCase().includes(teacher?.toLowerCase())
      );
    }
    setnotes(newClasses);
  };

  return (
    <div>
      <Search
        title="Academics Notes"
        handleReset={handleReset}
        handleSearch={handleSearch}
        inputFields={searchInputForm}
      />
      <div className="content__container">
        <div className="d-flex justify-content-between">
          <h3>Notes List</h3>
          <Link to="/academics/notes/add" className="btn blue__btn ">
            Add Notes
          </Link>
        </div>
        <FileTable
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          data={notes}
          user={user?.id}
          tableHeader={tableHead}
        />
      </div>
    </div>
  );
}

export default Notes;
