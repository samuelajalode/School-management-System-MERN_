import React, { useState, useEffect } from "react";
import EditForm from "./CourseForm";
import axios from "../../../store/axios";
import { useParams } from "react-router-dom";
import { errorAlert, successAlert } from "../../../utils";

function EditCourse() {
  const [name, setname] = useState("");
  const [code, setcode] = useState("");
  const [loading, setloading] = useState("");
  const [type, settype] = useState("");
  const [teacher, setteacher] = useState("");
  const [classID, setclassID] = useState("");
  const { id } = useParams();
  const [classesArr, setclassesArr] = useState([]);

  const handleSetclasses = (e) => {
    setclassID(e);
    setclassesArr([...classesArr, e]);
  };

  const handleUniqueVal = (arr) => {
    let unique = [];
    arr.map((i) => {
      let check = unique.find(
        (e) => e.class === i.class && e.teacher === i.teacher
      );
      if (!check) {
        unique.push(i);
      }
    });
    return unique;
  };

  useEffect(() => {
    axios.get(`/courses/${id}`).then((res) => {
      console.log(res.data);
      if (res.data.error) {
        errorAlert(res.data.error);
        return 0;
      }
      const { docs } = res.data;
      setclassID(docs?.classID);
      setname(docs?.name);
      settype(docs?.type);
      setteacher(docs?.teacher);
      setcode(docs?.code);
      setclassesArr(docs?.classes);
    });
  }, [id]);

  const handleEdit = () => {
    setloading(true);
    let classesData = classesArr.filter(
      (e) => e.class !== "" || e.teacher !== ""
    );
    let classes = handleUniqueVal(classesData);
    console.log(classesData);
    axios
      .put(`/courses/update/${id}`, {
        name,
        code,
        type,
        teacher,
        classID,
        classes,
      })
      .then((res) => {
        if (res.data.error) {
          errorAlert(res.data.error);
          return 0;
        }
        successAlert("successfully edited");
        setloading(false);
        console.log(classes);
      })
      .catch(() => {
        errorAlert("Something went wrong");
        setloading(false);
      });
  };

  return (
    <>
      {/* <GoBack link="/academics/courses" name="Go back to Courses List" /> */}
      <div className="content__container">
        <h3 className="mb-4">Edit Course</h3>
        <EditForm
          type={type}
          settype={settype}
          setteacher={setteacher}
          teacher={teacher}
          onSubmit={handleEdit}
          name={name}
          handleSetclasses={handleSetclasses}
          loading={loading}
          setname={setname}
          classID={classID}
          classesArr={classesArr}
          setclassesArr={setclassesArr}
          code={code}
          isEdit={true}
          setcode={setcode}
        />
      </div>
    </>
  );
}

export default EditCourse;
