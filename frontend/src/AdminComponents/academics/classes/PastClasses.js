import React, { useState, useEffect } from "react";
import ClassTable from "../../shared/ListTable";
import Search from "../../shared/Search";
import axios from "../../../store/axios";
//import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCampuses, selectStaff } from "../../../store/slices/schoolSlice";

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

  useEffect(() => {
    setloading(true);
    axios.get("/classes/past").then((res) => {
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
      <h3>Past Classes</h3>
      <Search
        title="Search classes "
        inputFields={inputFields}
        handleSearch={handleSearch}
        handleReset={handleReset}
      />
      <div className="content__container">
        <div className="d-flex justify-content-between mb-2">
          <h3>Past Classes</h3>
        </div>
        <ClassTable
          loading={loading}
          data={classes}
          tableHeader={tableHeadings}
          noActions={true}
        />
      </div>
    </div>
  );
}

export default Classes;
