import React, { useState } from "react";
import AddForm from "./DivisionForm";
import GoBack from "../../shared/GoBack";
import axios from "../../../store/axios";
import { errorAlert, successAlert } from "../../../utils";
import { useSelector, useDispatch } from "react-redux";
import {
  selectDivisions,
  setDivisions,
} from "../../../store/slices/schoolSlice";

function AddCourses() {
  const [name, setname] = useState("");
  const [code, setcode] = useState("");
  const [loading, setloading] = useState("");
  const [type, settype] = useState("");
  const [teacher, setteacher] = useState("");
  const divisions = useSelector(selectDivisions);
  const dispatch = useDispatch();

  const handleAddCourse = () => {
    setloading(true);
    axios
      .post("/courses/create", { name, code, type, teacher })
      .then(async (res) => {
        if (res.data.error) {
          setloading(false);
          errorAlert(res.data.error);
          return 0;
        }
        setloading(false);
        dispatch(setDivisions([res.data.doc, ...divisions]));
        await axios.post("/activitylog/create", {
          activity: `new division was added`,
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
