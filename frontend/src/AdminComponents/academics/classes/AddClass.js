import { useState } from "react";
import React from "react";
import ClassForm from "./ClassForm";
import axios from "../../../store/axios";
import { errorAlert, successAlert } from "../../../utils";
//import GoBack from "../../shared/GoBack";
import { useDispatch, useSelector } from "react-redux";
import { selectClasses, setClasses } from "../../../store/slices/schoolSlice";

function AddClass() {
  const [name, setname] = useState("");
  const [campus, setcampus] = useState("");
  const [teacher, setteacher] = useState("");
  const [code, setcode] = useState("");
  const [loading, setloading] = useState(false);
  const [academic, setacademic] = useState("");
  const dispatch = useDispatch();
  const classes = useSelector(selectClasses);
  const [division, setdivision] = useState("");
  const [group, setgroup] = useState("");
  const [prefect, setprefect] = useState("");
  const [sba, setsba] = useState(false);
  const [sbaStaff, setsbaStaff] = useState("");

  const handleAddClass = () => {
    setloading(true);
    axios
      .post("/classes/create", {
        classCode: code,
        name,
        campusID: campus,
        teacherID: teacher,
        academic,
        prefect,
        division,
        sba,
        group,
        sbaStaff,
      })
      .then(async (res) => {
        let { data } = res;
        setloading(false);
        if (data?.error) {
          errorAlert(data.error);
          return 0;
        }
        successAlert(`${data.doc?.classCode} is successfully added`);
        setloading(false);
        dispatch(setClasses([data.doc, ...classes]));
        await axios.post("/activitylog/create", {
          activity: ` ${name} class was created`,
          user: "admin",
        });
        await axios.post("/fees/create", { name, code: name.toLowerCase() });
        setcampus("");
        setcode("");
        setname("");
        setacademic("");
        setteacher("");
        setgroup("");
        setdivision("");
      })
      .catch((e) => {
        console.log(e);
        errorAlert("something when wrong");
        setloading(false);
      });
  };

  return (
    <>
      {/* <GoBack link="/academics/classes" name="Back  to Classes List" /> */}
      <div className="content__container">
        <h3>Add Class</h3>
        <ClassForm
          name={name}
          setname={setname}
          campus={campus}
          setcampus={setcampus}
          code={code}
          academic={academic}
          setacademic={setacademic}
          loading={loading}
          setcode={setcode}
          teacher={teacher}
          handleAddClass={handleAddClass}
          setteacher={setteacher}
          setdivision={setdivision}
          division={division}
          setgroup={setgroup}
          group={group}
          setprefect={setprefect}
          prefects={prefect}
          sba={sba}
          setsba={setsba}
          sbaStaff={sbaStaff}
          setsbaStaff={setsbaStaff}
        />
      </div>
    </>
  );
}

export default AddClass;
