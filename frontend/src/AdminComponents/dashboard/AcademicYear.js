import React, { useState, useEffect } from "react";
import AcademicYearModel from "./AcademicYearModal";
import axios from "../../store/axios";
import { errorAlert, successAlert } from "../../utils";
import {
  selectacademicYear,
  setAcademicYear,
} from "../../store/slices/schoolSlice";
import { useSelector, useDispatch } from "react-redux";

function AcademicYear({ isEdit }) {
  const [open, setOpen] = useState(false);
  const [from, setfrom] = useState("");
  const [term, setterm] = useState("");
  const [loading, setloading] = useState(false);
  const academicYear = useSelector(selectacademicYear);
  const dispatch = useDispatch();
  const [years, setyears] = useState([]);

  useEffect(() => {
    axios.get("/yeargroup").then((res) => {
      setyears(res.data);
    });
  }, []);

  const handleSubmit = () => {
    setloading(true);
    axios
      .post(`/academicyear/set/admin`, {
        currentYear: `${from}`,
        currentTerm: term,
      })
      .then((res) => {
        setloading(false);
        if (res.data.error) {
          errorAlert(res.data.error);
          return 0;
        }
        setOpen(false);
        successAlert("successfully set");
        dispatch(setAcademicYear(res.data.docs));
        setfrom("");
        setterm("");
      })
      .catch((err) => {
        setloading(false);
        errorAlert("Error");
      });
  };

  return (
    <div className="content__container">
      <div className="d-flex justify-content-between mb-3">
        <h3>Current Academic Year</h3>
        {isEdit && (
          <div>
            <button onClick={() => setOpen(true)} className="btn blue__btn">
              {academicYear?.error ? "Set" : "Change"}
            </button>
          </div>
        )}
      </div>
      {academicYear?.error ? (
        <div className="badge bg-danger  p-3">Not set yet</div>
      ) : (
        <div className="d-flex justify-content-between">
          <div className="badge bg-success ">
            <h6 className="text-warning">
              {" "}
              <strong> Year</strong>
            </h6>
            <h4>{academicYear?.currentYear}</h4>
          </div>
          <div className="badge bg-success">
            <h6 className="text-warning">
              {" "}
              <strong> Term</strong>
            </h6>
            <h4>{academicYear?.currentTerm}</h4>
          </div>
        </div>
      )}
      <AcademicYearModel
        from={from}
        setfrom={setfrom}
        open={open}
        term={term}
        years={years}
        loading={loading}
        handleSubmit={handleSubmit}
        setterm={setterm}
        setOpen={setOpen}
      />
    </div>
  );
}

export default AcademicYear;
