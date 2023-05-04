import React, { useState } from "react";
import axios from "../../../store/axios";
import { errorAlert, successAlert } from "../../../utils";

function PromotingDormitories({ dormitories }) {
  const [currentdormitories, setcurrentdormitories] = useState("");
  const [nextdormitories, setnextdormitories] = useState("");
  const [loading, setloading] = useState(false);
  const [errors, seterrors] = useState("");

  let currentname = dormitories.find((i) => i._id === currentdormitories);
  let nextname = dormitories.find((i) => i._id === nextdormitories);

  const handleChangeDormitories = (e) => {
    e.preventDefault();
    seterrors(false);
    if (currentdormitories === "" || nextdormitories === "") {
      seterrors({ ...errors, dormitories: true });
      return 0;
    } else {
      setloading(true);
      axios
        .post("/students//upgrade/dormitories", {
          currentdormitories,
          nextdormitories,
        })
        .then(async (res) => {
          setloading(false);
          if (res.data.error) {
            errorAlert(res.data.error);
            return 0;
          }
          successAlert("Changes are successfully done");
          setcurrentdormitories("");
          setnextdormitories("");
          await axios.post("/activitylog/create", {
            activity: `dormitory ${currentname.name} were moved to dormitory ${nextname}`,
            user: "admin",
          });
        })
        .catch((err) => {
          console.log(err);
          setloading(false);
          errorAlert("something went wrong");
        });
    }
  };

  const handleCancelDormitories = (e) => {
    e.preventDefault();
    setcurrentdormitories("");
    setnextdormitories("");
    seterrors({ ...errors, dormitories: false });
  };

  return (
    <form action="" className="content__container mb-5">
      <div className="row mb-5 aligh-items-center">
        <div className="col-12 ">
          <h3 className="mb-4">Promoting Students to another Dormitories</h3>
        </div>
        <div className="col-xs-12 col-sm-6 ">
          <label>Current Dormitory</label>
          <select
            name="dormitories"
            value={currentdormitories}
            onChange={(e) => setcurrentdormitories(e.target.value)}
            className="form-select"
            aria-label="Default select example"
          >
            <option defaultValue hidden>
              select
            </option>
            {dormitories.length > 0 ? (
              dormitories.map((e) => (
                <option value={e._id} key={e._id}>
                  {e.name}
                </option>
              ))
            ) : (
              <option disabled>No options yet</option>
            )}
          </select>
        </div>
        <div className="col-xs-12 col-sm-6 ">
          <label>Promote Dormitory</label>
          <select
            name="nextdormitory"
            value={nextdormitories}
            onChange={(e) => setnextdormitories(e.target.value)}
            className="form-select"
            aria-label="Default select example"
          >
            <option defaultValue hidden>
              select
            </option>
            {dormitories.length > 0 ? (
              dormitories.map((e) => (
                <option value={e._id} key={e._id}>
                  {e.name}
                </option>
              ))
            ) : (
              <option disabled>No options yet</option>
            )}
          </select>
        </div>
        {errors.dormitories && (
          <div className="text-danger"> Please select all field </div>
        )}
        <div className="col-xs-12 col-sm-6   mb-2 mt-4">
          <button
            disabled={loading.dormitories}
            className="btn blue__btn mr-3"
            onClick={handleChangeDormitories}
          >
            Save Changes
          </button>
          <button className="btn btn-danger" onClick={handleCancelDormitories}>
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
}

export default PromotingDormitories;
