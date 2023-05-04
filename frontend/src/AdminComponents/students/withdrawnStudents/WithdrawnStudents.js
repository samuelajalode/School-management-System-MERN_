import React, { useState, useEffect } from "react";
import Search from "../../shared/Search";
import StudentsTable from "../../shared/TableListUsers";
import axios from "../../../store/axios";
import { selectClasses } from "../../../store/slices/schoolSlice";
import { useSelector } from "react-redux";
import { errorAlert } from "../../../utils";
import { pdf } from "../../../components/tables/pdf";

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
  { id: "status", disablePadding: false, label: "Status" },
  { id: "class", disablePadding: false, label: "Class" },
  { id: "Gender", disablePadding: false, label: "Gender" },
];

function AllStudents() {
  const [name, setname] = useState("");
  const [id, setid] = useState("");
  const [classID, setclass] = useState("");
  const [students, setstudents] = useState([]);
  const classes = useSelector(selectClasses);
  const [storeData, setstoreData] = useState([]);

  const classesOptions = classes.map((e) => {
    return {
      name: e.name,
      id: e.classCode,
    };
  });

  useEffect(() => {
    axios.get("/students/withdraw").then((res) => {
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
    setclass("");
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
      options: classesOptions,
      label: "Search by Section",
      value: classID,
      name: "Class",
      onChange: setclass,
    },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    let newStudents = [];
    if (classID) {
      newStudents = storeData.filter((i) =>
        i.classID.toLowerCase().includes(classID.toLowerCase())
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

  const handleWithdraw = (i) => {
    let ans = window.confirm(
      `Are you sure you want to withdraw this student ${i}`
    );
    console.log(ans);
    if (ans) {
      axios.put(`/students/update/${i}`, { withdraw: false }).then((res) => {
        if (res.data.error) {
          errorAlert(res.data.error);
        }
        console.log(res);
        setstudents(students.filter((e) => e.userID !== i));
      });
    }
  };

  return (
    <div>
      <Search
        title="Withdrawn Students"
        handleReset={handleReset}
        handleSearch={handleSearch}
        inputFields={inputFields}
      />
      <StudentsTable
        route="students"
        isWithdraw={true}
        handleWithdraw={handleWithdraw}
        handleDelete={handleDelete}
        students={students}
        headCells={headCells}
        noData="No withdrawn students yet"
      />
      <div className="d-flex justify-content-end">
        <button onClick={generatePDF} className="btn orange__btn ">
          Download PDF
        </button>
      </div>
    </div>
  );
}

export default AllStudents;
