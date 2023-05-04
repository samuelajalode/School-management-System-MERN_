import React, { useState } from "react";
import axios from "../../../store/axios";
import { errorAlert, successAlert } from "../../../utils";
import { setClasses } from "../../../store/slices/schoolSlice";
import { useDispatch } from "react-redux";

function PromotingPast({ classes }) {
  const dispatch = useDispatch();
  const [currentclass, setcurrentclass] = useState("");
  const [loading, setloading] = useState("");
  const [errors, seterrors] = useState({
    classes: false,
  });

  const handleChangeClasses = (e) => {
    e.preventDefault();
    seterrors({ ...errors, classes: false });
    if (currentclass === "") {
      seterrors({ ...errors, classes: true });
      return 0;
    } else {
      setloading(true);
      axios
        .post("/students/upgrade/graduate", { currentclass })
        .then(async (res) => {
          setloading(false);
          if (res.data.error) {
            errorAlert(res.data.error);
            return 0;
          }
          successAlert("Changes are successfully done");
          dispatch(
            setClasses(classes.filter((course) => course._id !== currentclass))
          );
          await axios.post("/activitylog/create", {
            activity: `students in class ${currentclass} was graduated`,
            user: "admin",
          });
          setcurrentclass("");
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
    seterrors({ ...errors, classes: false });
  };

  return (
    <div>
      <form className="content__container mb-5">
        <div className="row mb-3 aligh-items-center">
          <div className="col-12 ">
            <h3 className="mb-4">Graduate Students</h3>
          </div>
          <div className="col-xs-12 col-sm-6   mb-2">
            <label>Select Class</label>
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

          {errors.classes && (
            <div className="text-danger"> Please select all field </div>
          )}
        </div>
        <div className="col-xs-12 col-sm-6   mb-2 mt-4">
          <button
            disabled={loading.classes}
            className="btn blue__btn mr-3"
            onClick={handleChangeClasses}
          >
            Submit
          </button>
          <button className="btn btn-danger" onClick={handleCancelClass}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default PromotingPast;
