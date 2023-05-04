import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "../../../store/axios";
import { useSelector } from "react-redux";
import {
  selectDepartments,
  selectClasses,
} from "../../../store/slices/schoolSlice";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import { IconButton } from "@material-ui/core";

function CourseForm(props) {
  const [teachers, setteachers] = useState([]);
  const departments = useSelector(selectDepartments);
  const classes = useSelector(selectClasses);
  //const [classes, setclasses] = useState([])

  let {
    type,
    teacher,
    setteacher,
    settype,
    name,
    setname,
    code,
    setcode,
    onSubmit,
    loading,
    isEdit,
    setclassesArr,
    classesArr,
  } = props;

  console.log(classesArr);

  useEffect(() => {
    axios.get("/teachers/teachers").then((res) => {
      setteachers(res.data);
    });
  }, []);

  const handleSetClassClass = (val, id) => {
    setclassesArr(
      classesArr.map((e) =>
        e._id === id ? { _id: id, class: val, teacher: e.teacher } : e
      )
    );
  };

  const handleSetClassTeacher = (val, id) => {
    setclassesArr(
      classesArr.map((e) =>
        e._id === id ? { _id: id, class: e.class, teacher: val } : e
      )
    );
  };

  const handleAddClass = () => {
    let _id = Math.random().toString(16).slice(2);
    setclassesArr([...classesArr, { class: "", teacher: "", _id }]);
  };

  const handleDeleteClass = (id) => {
    let newClasses = classesArr.filter((i) => i._id !== id);
    console.log(newClasses);
    setclassesArr(newClasses);
  };

  const { register, handleSubmit, errors } = useForm();

  return (
    <form action="" onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-3">
        <label className="form-label">Course Name</label>
        <input
          type="text"
          value={name}
          ref={register({ required: true })}
          onChange={(e) => setname(e.target.value)}
          className="form-control"
          name="name"
        />
        {errors.name && (
          <span className=" form-error text-danger mb-2">
            This field is required
          </span>
        )}
      </div>
      {!isEdit && (
        <div className="mb-3">
          <label className="form-label">Course Code</label>
          <input
            type="text"
            value={code}
            ref={register({ required: true })}
            onChange={(e) => setcode(e.target.value)}
            className="form-control"
            name="code"
          />
          {errors.code && (
            <span className="form-error text-danger mb-2">
              This field is required
            </span>
          )}
        </div>
      )}
      <div className="mb-3">
        <label className="form-label">Departments</label>
        <select
          name="type"
          value={type}
          onChange={(e) => settype(e.target.value)}
          id="inputState"
          className="form-select"
        >
          <option defaultValue hidden>
            Choose...
          </option>
          {departments.length > 0 ? (
            departments.map((e) => (
              <option key={e._id} value={e.code}>
                {e.name}
              </option>
            ))
          ) : (
            <option disabled>No departments yet</option>
          )}
        </select>
      </div>

      <div className="mb-3">
        <div className="d-flex justify-content-between mb-3">
          <label className="form-label">Classes</label>
        </div>
        <div className="mb-3">
          {classesArr &&
            classesArr.map((e) => (
              <div className=" row" key={e._id}>
                <div className="col-sm-5 mb-3">
                  <select
                    name="type"
                    value={e.class}
                    onChange={(v) => handleSetClassClass(v.target.value, e._id)}
                    id="inputState"
                    className="form-select"
                  >
                    <option defaultValue hidden>
                      Choose...
                    </option>
                    {classes.length > 0 ? (
                      classes.map((i) => {
                        return (
                          <option key={i._id} value={i.classCode}>
                            {i.name}
                          </option>
                        );
                      })
                    ) : (
                      <option disabled>No classes yet yet</option>
                    )}
                  </select>
                </div>
                <div className="col-sm-5">
                  <select
                    name="type"
                    value={e.teacher}
                    onChange={(v) =>
                      handleSetClassTeacher(v.target.value, e._id)
                    }
                    id="inputState"
                    className="form-select"
                  >
                    <option defaultValue hidden>
                      Choose...
                    </option>
                    {teachers.length > 0 ? (
                      teachers.map((i) => (
                        <option key={i._id} value={i.userID}>
                          {i.name} {""} {i.surname}
                        </option>
                      ))
                    ) : (
                      <option disabled>No teachers registered yet</option>
                    )}
                  </select>
                </div>
                <div className="col-sm-2">
                  <IconButton onClick={() => handleDeleteClass(e._id)}>
                    <HighlightOffIcon></HighlightOffIcon>
                  </IconButton>
                </div>
              </div>
            ))}
        </div>
        <div className="d-flex justify-content-start">
          <button type="button" onClick={handleAddClass} className="btn ">
            <AddCircleOutlineIcon></AddCircleOutlineIcon>
            Add Class{" "}
          </button>
        </div>
      </div>

      <div className="mb-5">
        <label className="form-label">Head Teacher</label>
        <select
          name="type"
          value={teacher}
          onChange={(e) => setteacher(e.target.value)}
          id="inputState"
          className="form-select"
        >
          <option defaultValue hidden>
            Choose...
          </option>
          {teachers.length > 0 ? (
            teachers.map((e) => (
              <option key={e?.userID} value={e?.userID}>
                {e.name} {e.surname}
              </option>
            ))
          ) : (
            <option disabled>No data</option>
          )}
        </select>
      </div>
      <div className="mb-3">
        <button disabled={loading} type="submit" className="btn blue__btn">
          {loading && (
            <span
              className="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
          )}
          {isEdit ? "Save Changes" : "Add"}
        </button>
      </div>
    </form>
  );
}

export default CourseForm;
