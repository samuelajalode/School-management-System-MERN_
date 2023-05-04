import React, { useState } from "react";
import axios from "../../../store/axios";
import { errorAlert, successAlert } from "../../../utils";

function PromotingClass({ classes }) {
  const [currentclass, setcurrentclass] = useState("");
  const [nextclass, setnextclass] = useState("");
  const [loading, setloading] = useState("");
  const [errors, seterrors] = useState({
    classes: false,
  });

  const handleChangeClasses = (e) => {
    e.preventDefault();
    seterrors({ ...errors, classes: false });
    if (currentclass === "" || nextclass === "") {
      seterrors({ ...errors, classes: true });
      return 0;
    } else {
      setloading(true);
      axios
        .post("/students/upgrade/class", { currentclass, nextclass })
        .then(async (res) => {
          setloading(false);
          if (res.data.error) {
            errorAlert(res.data.error);
            return 0;
          }
          successAlert("Changes are successfully done");
          await axios.post("/activitylog/create", {
            activity: `students in class ${currentclass} were moved to class ${nextclass}`,
            user: "admin",
          });
          setcurrentclass("");
          setnextclass("");
        })
        .catch((err) => {
          console.log(err);
          setloading(false);
          errorAlert("something went wrong");
        });
    }
  };

  const handleCancelClass = (e) => {
    e.preventDefault();
    setcurrentclass("");
    setnextclass("");
    seterrors({ ...errors, classes: false });
  };

  return (
    <div>
      <form className="content__container mb-5">
        <div className="row mb-5 aligh-items-center">
          <div className="col-12 ">
            <h3 className="mb-4">Promoting Students to the next Class</h3>
          </div>
          <div className="col-xs-12 col-sm-6   mb-2">
            <label>Current Class</label>
            <select
              name="class"
              value={currentclass}
              onChange={(e) => setcurrentclass(e.target.value)}
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
          <div className="col-xs-12 col-sm-6   mb-2">
            <label>Promote Class</label>
            <select
              name="class"
              value={nextclass}
              onChange={(e) => setnextclass(e.target.value)}
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
          {errors.classes && (
            <div className="text-danger"> Please select all field </div>
          )}
          <div className="col-xs-12 col-sm-6   mb-2 mt-4">
            <button
              disabled={loading.classes}
              className="btn blue__btn mr-3"
              onClick={handleChangeClasses}
            >
              Save Changes
            </button>
            <button className="btn btn-danger" onClick={handleCancelClass}>
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default PromotingClass;
