import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../store/axios";

function Course() {
  const [courseDetails, setcourseDetails] = useState({});
  const [isClass, setisClass] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    axios.get(`/course/courseCode/${id}`).then((response) => {
      if (response.data.success) {
        setcourseDetails(response.data.docs);
      } else {
        setisClass(false);
        console.log("ERROR", response.data);
      }
    });
  }, [id]);

  return (
    <div>
      <div className="content__container">
        <h3>Course Details</h3>
        {isClass ? (
          <>
            <div className="row mb-3">
              <div className="col-4">Course</div>
              <div className="col-8">{courseDetails?.name || "N/A"}</div>
            </div>
            <div className="row mb-3">
              <div className="col-4">Code</div>
              <div className="col-8">{courseDetails?.code || "N/A"}</div>
            </div>
            <div className="row mb-3">
              <div className="col-8">Course Department</div>
              <div className="col-4">{courseDetails?.type || "N/A"}</div>
            </div>
            <div className="row mb-3">
              <div className="col-4">Course Teacher</div>
              <div className="col-8">{courseDetails?.teacher || "N/A"}</div>
            </div>
          </>
        ) : (
          <div>No Class Details yet </div>
        )}
      </div>
    </div>
  );
}

export default Course;
