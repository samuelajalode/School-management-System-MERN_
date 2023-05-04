import React, { useState, useEffect } from "react";
import axios from "../../store/axios";
import { selectFees } from "../../store/slices/schoolSlice";
import { useSelector } from "react-redux";

function AcademicTab({ user }) {
  const [section, setsection] = useState("");
  const [fees, setfees] = useState("");
  const [campus, setcampus] = useState("");
  const [scholarship, setscholarship] = useState("");
  const feesSelector = useSelector(selectFees);

  console.log(user);
  useEffect(() => {
    if (user?.fees) {
      let type = feesSelector.find((e) => e.code === user?.fees);
      setfees(type?.name);
    }

    if (user?.scholarship) {
      axios.get(`/scholarships/${user?.scholarship}`).then((res) => {
        setscholarship(res.data?.doc?.name);
      });
    }
    if (user?.campusID) {
      axios.get(`/campuses/${user?.campusID}`).then((res) => {
        console.log(res.data);
        setcampus(res.data?.docs?.name);
      });
    }

    if (user?.section) {
      axios.get(`/sections/${user?.section}`).then((res) => {
        setsection(res.data.doc?.name);
      });
    }
  }, [user, feesSelector]);

  return (
    <div>
      <div className="row  mb-3">
        <div className="col-4">Class </div>
        <div className="col-6">{user?.classID} </div>
      </div>
      <div className="row  mb-3">
        <div className="col-4">Section/ House </div>
        <div className="col-6">{section || "-"}</div>
      </div>
      <div className="row  mb-3">
        <div className="col-4">Student Status </div>
        <div className="col-6">{user?.status} </div>
      </div>
      {user?.status === ("border" || "freshBorder") && (
        <div className="row  mb-3">
          <div className="col-4">Dormitory </div>
          <div className="col-6">{user?.dormitoryID} </div>
        </div>
      )}
      <div className="row  mb-3">
        <div className="col-4">Campus </div>
        <div className="col-6">{campus || "N/A"}</div>
      </div>
      <div className="row  mb-3">
        <div className="col-4">Scholarship </div>
        <div className="col-6">{scholarship || "N/A"}</div>
      </div>
      <div className="row  mb-3">
        <div className="col-4">Fees Category </div>
        <div className="col-6">{fees || "-"} </div>
      </div>
      <div className="row  mb-3">
        <div className="col-4">Last School </div>
        <div className="col-6">{user?.lastSchool?.school || "N/A"} </div>
      </div>
      <div className="row  mb-3">
        <div className="col-4">Reason for Leaving last School </div>
        <div className="col-6"> {user?.lastSchool?.reason || "N/A"} </div>
      </div>
    </div>
  );
}

export default AcademicTab;
