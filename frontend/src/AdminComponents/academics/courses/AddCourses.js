/* eslint-disable array-callback-return */
import React, { useState } from "react";
import AddForm from "./CourseForm";
import GoBack from "../../shared/GoBack";
import axios from "../../../store/axios";
import { errorAlert, successAlert } from "../../../utils";
import { useDispatch, useSelector } from "react-redux";
import { setCourses, selectCourses } from "../../../store/slices/schoolSlice";

function AddCourses() {
  const [name, setname] = useState("");
  const [code, setcode] = useState("");
  const [loading, setloading] = useState("");
  const [type, settype] = useState("");
  const [teacher, setteacher] = useState("");
  const [classesArr, setclassesArr] = useState([
    { _id: "", teacher: "", class: "" },
  ]);
  const [classID, setclassID] = useState("");
  const dispatch = useDispatch();
  const courses = useSelector(selectCourses);

  const handleSetclasses = (e) => {
    setclassID(e);
    let newClasses = classesArr.push(e);
    setclassesArr(newClasses);
  };

  const handleUniqueVal = (arr) => {
    let unique = [];
    arr.map((i) => {
      let check = unique.find(
        (e) => e.class === i.class || e.teacher === i.teacher
      );
      if (!check) {
        unique.push(i);
      }
    });
    return unique;
  };

  const handleAddCourse = () => {
    setloading(true);
    let classesData = classesArr.filter(
      (e) => e.class !== "" || e.teacher !== ""
    );
    let classes = handleUniqueVal(classesData);
    axios
      .post("/courses/create", {
        name,
        code,
        type,
        teacher,
        classID,
        classes,
      })
      .then((res) => {
        if (res.data.error) {
          setloading(false);
          errorAlert(res.data.error);
          return 0;
        }
        dispatch(setCourses([res.data.doc, ...courses]));
        setloading(false);
        successAlert("successfull added");
        setname("");
        setcode("");
        setteacher("");
        settype("");
        setclassesArr([]);
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
          handleSetclasses={handleSetclasses}
          setname={setname}
          code={code}
          teacher={teacher}
          setteacher={setteacher}
          type={type}
          setclassesArr={setclassesArr}
          classesArr={classesArr}
          classID={classID}
          settype={settype}
          loadin={loading}
          setcode={setcode}
        />
      </div>
    </>
  );
}

export default AddCourses;
