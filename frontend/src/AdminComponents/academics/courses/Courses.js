import React, { useState, useEffect } from "react";
import CourseTable from "../../shared/ListTable";
import Search from "../../shared/Search";
import { Link, useHistory } from "react-router-dom";
import axios from "../../../store/axios";
import { errorAlert } from "../../../utils";

const tableHeadings = [
  { id: "code", name: "ID" },
  { id: "name", name: "Course" },
  { id: "type", name: "Course Type" },
  { id: "teacher", name: "Teacher" },
];

function Courses() {
  const [name, setname] = useState("");
  const [depart, setdepart] = useState("");
  const [storeData, setstoreData] = useState([]);
  const [teacher, setteacher] = useState("");
  const [courses, setcourses] = useState([]);
  const history = useHistory();
  const [loading, setloading] = useState(false);

  useEffect(() => {
    setloading(true);
    axios.get("/courses").then((res) => {
      setstoreData(res.data);
      setcourses(res.data);
      setloading(false);
    });
  }, []);

  const inputFields = [
    {
      type: "text",
      label: "Search Name",
      value: name,
      name: "name",
      onChange: setname,
    },
    {
      type: "text",
      label: "Search Type",
      value: depart,
      name: "type",
      onChange: setdepart,
    },
    {
      type: "text",
      label: "Search Teacher",
      value: teacher,
      name: "teacher",
      onChange: setteacher,
    },
  ];

  const handleDelete = (id) => {
    const ans = window.confirm("are you sure you want to delete");
    if (ans) {
      axios.delete(`/courses/delete/${id}`).then((res) => {
        if (res.data.error) {
          errorAlert(res.data.error);
          return 0;
        }
        setcourses(courses.filter((course) => course._id !== id));
      });
    }
  };
  const handleEdit = (id) => {
    history.push(`/academics/courses/edit/${id}`);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    let newClasses = [];
    if (name) {
      newClasses = storeData.filter(
        (i) =>
          i?.name.toLowerCase().includes(name?.toLowerCase()) ||
          i?.code.toLowerCase().includes(name?.toLowerCase())
      );
    }
    if (depart) {
      newClasses = newClasses.filter((i) =>
        i?.type.toLowerCase().includes(depart?.toLowerCase())
      );
    }
    if (teacher) {
      newClasses = newClasses.filter((i) =>
        i?.teacher.toLowerCase().includes(teacher?.toLowerCase())
      );
    }
    setcourses(newClasses);
  };

  const handleReset = (e) => {
    e.preventDefault();
    setname("");
    setdepart("");
    setteacher("");
    setcourses(storeData);
  };

  return (
    <div>
      <Search
        title="Courses List"
        handleSearch={handleSearch}
        handleReset={handleReset}
        inputFields={inputFields}
      />
      <div className="content__container">
        <div className="d-flex justify-content-between mb-2">
          <h3>Courses List</h3>
          <Link
            to={`/academics/courses/add`}
            className="btn orange__btn btn__lg"
          >
            Add New Course
          </Link>
        </div>
        <CourseTable
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          data={courses}
          loading={loading}
          handleSearch={handleSearch}
          tableHeader={tableHeadings}
        />
      </div>
    </div>
  );
}

export default Courses;
