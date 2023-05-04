import React, { useEffect, useState } from "react";
import ImportContactsIcon from "@material-ui/icons/ImportContacts";
import { Link } from "react-router-dom";
import { selectUser } from "../../store/slices/userSlice";
import { useSelector } from "react-redux";
import axios from "../../store/axios";

function ClassCard({ id }) {
  const [courses, setcourses] = useState([]);
  const user = useSelector(selectUser);

  useEffect(() => {
    axios.get(`/students/student/${user?.userID}`).then((res) => {
      setcourses(res.data.docs);
    });
  }, [user]);

  return (
    <div className=" col-xs-12 col-sm-6 com-md-4 mb-5">
      <div className="classCard">
        {id ? (
          <Link to={`/course/${id}`}>
            <ImportContactsIcon className="icon" />
            <h5>Course Name</h5>
            <span>id</span>
          </Link>
        ) : (
          <div>
            <ImportContactsIcon className="icon" />
            <h5>Courses</h5>
            <span>No course yet</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default ClassCard;
