import React, { useState } from "react";
import AddForm from "./DepartmentForm";
import GoBack from "../../shared/GoBack";
import axios from "../../../store/axios";
import { errorAlert, successAlert } from "../../../utils";
import { useDispatch, useSelector } from "react-redux";
import {
  selectDepartments,
  setDepartments,
} from "../../../store/slices/schoolSlice";

function AddCourses() {
  const [name, setname] = useState("");
  const [code, setcode] = useState("");
  const [loading, setloading] = useState("");
  const [type, settype] = useState("");
  const [teacher, setteacher] = useState("");
  const departments = useSelector(selectDepartments);
  const dispatch = useDispatch();

  const handleAddCourse = () => {
    setloading(true);
    axios
      .post("/courses/create", { name, code, type, teacher })
      .then(async (res) => {
        setloading(false);
        if (res.data.error) {
          setloading(false);
          errorAlert(res.data.error);
          return 0;
        }
        dispatch(setDepartments([res.data.doc, ...departments]));
        await axios.post("/activitylog/create", {
          activity: `new department ${name}  was added`,
          user: "admin",
        });
        successAlert("successfull added");
        setname("");
        setcode("");
        setteacher("");
        settype("");
      })
      .catch(() => {
        setloading(false);
        errorAlert("sorry something when wrong");
      });
  };

  return (
    <>
      <GoBack link="/academics/courses" name="Go back to Courses List" />
      <div className="content__container">
        <h3>Add New Course</h3>
        <AddForm
          onSubmit={handleAddCourse}
          name={name}
          setname={setname}
          code={code}
          teacher={teacher}
          setteacher={setteacher}
          type={type}
          settype={settype}
          loadin={loading}
          setcode={setcode}
        />
      </div>
    </>
  );
}

export default AddCourses;
