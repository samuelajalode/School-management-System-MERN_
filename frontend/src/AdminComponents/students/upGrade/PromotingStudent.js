import React, { useState, useEffect } from "react";
import axios from "../../../store/axios";
import { errorAlert, successAlert } from "../../../utils";

function PromotingStudent({ classes }) {
  const [newClass, setnewClass] = useState("");
  const [student, setstudent] = useState("");
  const [oldClass, setoldClass] = useState("");
  const [loadingStudents, setloadingStudents] = useState("");
  const [classStudents, setclassStudents] = useState("");
  const [loading, setloading] = useState("");

  const handleSelectClassStudents = (e) => {
    setoldClass(e.target.value);
    setloadingStudents(true);
    axios.get(`/students/class/${e.target.value}`).then((res) => {
      setloadingStudents(false);
      setclassStudents(res.data.users);
    });
    // setclassStudents()
  };

  const handleChangeStudentClass = (e) => {
    e.preventDefault();
    if (!student) {
      return errorAlert("Please select student");
    }
    if (!newClass) {
      return errorAlert("Please select new class");
    }
    setloading(true);
    axios
      .put(`/students/update/${student}`, { classID: newClass })
      .then(async (res) => {
        setloading(false);
        if (res.data.error) {
          return errorAlert(res.data.error);
        }
        successAlert("Changes successfully saved");
        setoldClass("");
        setnewClass("");
        setstudent("");
        await axios.post("/activitylog/create", {
          activity: `student ${student} was moved to class ${newClass}`,
          user: "admin",
        });
      });
  };

  return (
    <div>
      <form action="">
        <div className="content__container mb-5">
          <div className="col-12 ">
            <h3 className="mb-4">Promoting Student to another Class</h3>
          </div>
          <div className="row">
            <div className="mb-2">
              <label>Select Class</label>
              <select
                name="class"
                value={oldClass}
                onChange={handleSelectClassStudents}
                className="form-select"
                aria-label="Default select example"
              >
                <option defaultValue hidden>
                  select
                </option>
                {classes?.length > 0 ? (
                  classes.map((e) => (
                    <option key={e.classCode} value={e.classCode}>
                      {" "}
                      {e.name}{" "}
                    </option>
                  ))
                ) : (
                  <option disabled>No options yet</option>
                )}
              </select>
            </div>
            {loadingStudents && (
              <div className="d-flex justify-content-center">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            )}
            {oldClass && (
              <>
                <div className="mb-2">
                  <label>Select Student</label>
                  <select
                    name="class"
                    value={student}
                    onChange={(e) => setstudent(e.target.value)}
                    className="form-select"
                    aria-label="Default select example"
                  >
                    <option defaultValue hidden>
                      select
                    </option>
                    {classStudents?.length > 0 ? (
                      classStudents.map((e) => (
                        <option key={e.userID} value={e.userID}>
                          {" "}
                          {e?.name} {e?.surname}
                        </option>
                      ))
                    ) : (
                      <option disabled>No options yet</option>
                    )}
                  </select>
                </div>
                <div className="mb-2">
                  <label>Select Move to</label>
                  <select
                    name="class"
                    value={newClass}
                    onChange={(e) => setnewClass(e.target.value)}
                    className="form-select"
                    aria-label="Default select example"
                  >
                    <option defaultValue hidden>
                      select
                    </option>
                    {classes?.length > 0 ? (
                      classes.map((e) => (
                        <option key={e.classCode} value={e.classCode}>
                          {" "}
                          {e.name}{" "}
                        </option>
                      ))
                    ) : (
                      <option disabled>No options yet</option>
                    )}
                  </select>
                </div>
              </>
            )}
            <div className="col-xs-12 col-sm-6   mb-2 mt-4">
              <button
                disabled={loading.classes}
                className="btn blue__btn mr-3"
                onClick={handleChangeStudentClass}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default PromotingStudent;
