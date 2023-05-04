import React, { useState, useEffect } from "react";
import Search from "../../shared/Search";
import StudentsTable from "./Table";
import axios from "../../../store/axios";
import {
  selectYearGroup,
  selectClasses,
} from "../../../store/slices/schoolSlice";
import { useSelector } from "react-redux";
import { errorAlert, successAlert } from "../../../utils";
import { pdf } from "../../../components/tables/pdf";
import Loading from "../../../Loading";
import Modal from "./Readmit";

const headCells = [
  { id: "userID", numeric: false, disablePadding: false, label: "StudentID" },
  { id: "photoUrl", numeric: false, disablePadding: false, label: "Photo" },
  { id: "name", numeric: false, disablePadding: true, label: "Name" },
  {
    id: "middlename",
    disablePadding: true,
    label: "Middle Name",
  },
  { id: "surname", disablePadding: true, label: "Last Name" },
  { id: "year", disablePadding: false, label: "Graduation Year" },
  { id: "class", disablePadding: false, label: "Class" },
  { id: "Gender", disablePadding: false, label: "Gender" },
];

function AllStudents() {
  const [name, setname] = useState("");
  const [id, setid] = useState("");
  const [year, setyear] = useState("");
  const [students, setstudents] = useState([]);
  const years = useSelector(selectYearGroup);
  const classes = useSelector(selectClasses);
  const [storeData, setstoreData] = useState([]);
  const [loading, setloading] = useState(false);
  const [open, setopen] = useState(false);
  const [classID, setclass] = useState("");
  const [selectedUser, setselectedUser] = useState({});
  const [editloading, seteditloading] = useState(false);

  const yearsOptions = years.map((e) => {
    return {
      name: e.year,
      id: e.year,
    };
  });

  useEffect(() => {
    setloading(true);
    axios.get("/students/past").then((res) => {
      setloading(false);
      console.log(res.data);
      setstudents(res.data);
      setstoreData(res.data);
    });
  }, []);

  const generatePDF = () => {
    const headers = [
      { key: "userID", label: "UserID" },
      { key: "name", label: "Name" },
      { key: "middleName", label: "Middle Name" },
      { key: "surname", label: " SurName" },
      { key: "gender", label: "Gender" },
      { key: "classID", label: "Class" },
    ];

    pdf({ data: students, headers, filename: "Allstudents" });
  };

  const handleReset = (e) => {
    e.preventDefault();
    setname("");
    setid("");
    setyear("");
    setstudents(storeData);
  };

  const inputFields = [
    {
      type: "text",
      value: id,
      label: "Search by Student ID",
      name: "Student ID",
      onChange: setid,
    },
    {
      type: "text",
      label: "Search by Name",
      value: name,
      name: "Name",
      onChange: setname,
    },
    {
      type: "select",
      options: yearsOptions,
      label: "Search by Academic Year",
      value: year,
      name: "year",
      onChange: setyear,
    },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    let newStudents = [];
    if (year) {
      newStudents = storeData.filter((i) =>
        i.classID.toLowerCase().includes(year.toLowerCase())
      );
    }
    if (name) {
      newStudents = storeData.filter(
        (i) =>
          i.name.toLowerCase().includes(name.toLowerCase()) ||
          i.surname.toLowerCase().includes(name.toLowerCase())
      );
    }
    if (id) {
      newStudents = storeData.filter((i) =>
        i.userID.toLowerCase().includes(id.toLowerCase())
      );
    }
    setstudents(newStudents);
  };

  const handleAdmission = (id) => {
    let selected = students.find((e) => e.userID === id);
    setselectedUser(selected);
    setopen(true);
  };

  const handleonSubmitAdmission = () => {
    seteditloading(true);
    axios
      .put(`/students/readmit/${selectedUser?.userID}`, { classID })
      .then((res) => {
        seteditloading(false);
        if (res.data.error) {
          return errorAlert(res.data.error);
        }
        setopen(false);
        successAlert("changes successfully saved");
        setselectedUser({});
        setclass("");
        setstudents(students.filter((e) => e.userID !== selectedUser?.userID));
      });
  };

  const handleDelete = (i) => {
    let ans = window.confirm(`Are sure you want to delete user ${i}`);
    if (ans) {
      axios.delete(`/user/delete/${i}`).then((res) => {
        if (res.data.error) {
          errorAlert(res.data.error);
        }
        setstudents(students.filter((e) => e.userID !== id));
      });
    }
  };

  return (
    <div>
      {loading && <Loading />}
      <Search
        title="Past Students"
        handleReset={handleReset}
        handleSearch={handleSearch}
        inputFields={inputFields}
      />
      <StudentsTable
        route="students"
        handleDelete={handleDelete}
        students={students}
        noData="No past students yet"
        noAction={true}
        handleWithdraw={handleAdmission}
        headCells={headCells}
      />
      <div className="d-flex justify-content-end">
        <button onClick={generatePDF} className="btn orange__btn ">
          Download PDF
        </button>
      </div>
      <Modal
        classID={classID}
        setclass={setclass}
        classes={classes}
        open={open}
        loading={editloading}
        onSubmit={handleonSubmitAdmission}
        setOpen={setopen}
      />
    </div>
  );
}

export default AllStudents;
