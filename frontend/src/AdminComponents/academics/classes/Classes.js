import React, { useState, useEffect } from "react";
import ClassTable from "../../shared/ListTable";
import Search from "../../shared/Search";
import { Link } from "react-router-dom";
import axios from "../../../store/axios";
import { useHistory } from "react-router-dom";
import { errorAlert } from "../../../utils";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCampuses,
  setClasses,
  selectStaff,
} from "../../../store/slices/schoolSlice";

const tableHeadings = [
  { id: "classCode", name: "ID" },
  { id: "name", name: "Class" },
  { id: "campusID", name: "Campus" },
  { id: "group", name: "Group" },
  { id: "division", name: "Division" },
  { id: "prefect", name: "Prefect" },
  { id: "teacherID", name: "Class Teacher" },
  { id: "sba", name: "S.B.A Config" },
  { id: "sbaStaff", name: "SBA Staff" },
];

function Classes() {
  const [name, setname] = useState("");
  const [campus, setcampus] = useState("");
  const [teacher, setteacher] = useState("");
  const [classes, setclasses] = useState([]);
  const [storeData, setstoreData] = useState([]);
  const staff = useSelector(selectStaff);
  const [loading, setloading] = useState(false);
  const campuses = useSelector(selectCampuses);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    setloading(true);
    axios.get("/classes").then((res) => {
      setloading(false);
      let data = res.data;
      let classesData = data.map((e) => {
        return {
          ...e,
          num: 0,
          sba: e.sba ? "set" : "not set",
          teacherID:
            (staff.find((i) => i.userID === e.teacherID)?.name || "-") +
            " " +
            (staff.find((i) => i.userID === e.teacherID)?.surname || ""),
          campusID: campuses.find((i) => i._id === e.campusID)?.name,
        };
      });
      setclasses(classesData);
      setstoreData(classesData);
    });
  }, [staff, campuses]);

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
      label: "Search Campus",
      value: campus,
      name: "campus",
      onChange: setcampus,
    },
    {
      type: "text",
      label: "Search Teacher",
      value: teacher,
      name: "teacher",
      onChange: setteacher,
    },
  ];

  const handleDeleteClass = (id) => {
    const ans = window.confirm("are you sure you want to delete");
    if (ans) {
      axios.delete(`/classes/delete/${id}`).then(async (res) => {
        if (res.data.error) {
          errorAlert(res.data.error);
          return 0;
        }
        setclasses(classes.filter((course) => course._id !== id));
        let deleted = classes.find((course) => course._id === id);
        dispatch(setClasses(classes.filter((course) => course._id !== id)));
        await axios.post("/activitylog/create", {
          activity: ` ${deleted?.name} class was deleted`,
          user: "admin",
        });
        await await axios.post(`/fees/delete/name`, { name });
      });
    }
  };

  const handleEditClass = (id) => {
    history.push(`/academics/classes/edit/${id}`);
  };

  const handleReset = (e) => {
    e.preventDefault();
    setname("");
    setcampus("");
    setteacher("");
    setclasses(storeData);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    let newClasses = [];
    if (name) {
      newClasses = storeData.filter(
        (i) =>
          i?.name.toLowerCase().includes(name?.toLowerCase()) ||
          i?.classCode.toLowerCase().includes(name?.toLowerCase())
      );
    }
    if (campus) {
      newClasses = newClasses.filter((i) =>
        i?.campusID.toLowerCase().includes(campus?.toLowerCase())
      );
    }
    if (teacher) {
      newClasses = newClasses.filter((i) =>
        i?.teacherID.toLowerCase().includes(teacher?.toLowerCase())
      );
    }
    setclasses(newClasses);
  };

  return (
    <div>
      <Search
        title="Search classes "
        inputFields={inputFields}
        handleSearch={handleSearch}
        handleReset={handleReset}
      />
      <div className="content__container">
        <div className="d-flex justify-content-between mb-2">
          <h3>Classes List</h3>
          <Link to="/academics/classes/add" className="btn orange__btn btn__lg">
            Add New Class
          </Link>
        </div>
        <ClassTable
          handleEdit={handleEditClass}
          loading={loading}
          handleDelete={handleDeleteClass}
          data={classes}
          tableHeader={tableHeadings}
        />
      </div>
    </div>
  );
}

export default Classes;
